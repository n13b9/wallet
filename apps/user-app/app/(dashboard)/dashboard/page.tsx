import React from "react";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id) || 0,
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getAllTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.OnRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id) || 0,
    },
  });

  return transactions.map((t) => ({
    amount: t.amount,
    time: t.startTime,
    status: t.status,
    provider: t.provider,
  }));
}

async function getUserDeatils() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.user?.id) || 0,
    },
  });

  return {
    email: user?.email,
    id: user?.id,

    name: user?.name,
    number: user?.number,
    password: user?.password,
  };
}

const Dashboard = async () => {
  const balance = await getBalance();
  const transactions = await getAllTransactions();
  const user = await getUserDeatils();
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f2f0e8" }}>
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 ml-3 font-bold">
        Welcome {user.name || "Customer"}
      </div>

      <div className="bg-white p-5 mx-3 rounded-2xl flex flex-col">
        <span>Account Balance</span>
        <span className="text-3xl"> ${balance.amount} </span>
      </div>

      <div className="pt-4 mx-3">
        <OnRampTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
