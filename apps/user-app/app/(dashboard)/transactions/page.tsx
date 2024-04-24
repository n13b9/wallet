import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { Card } from "@repo/ui/card";

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

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id) || 0,
    },
  });
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    from: t.fromUserId,
    to: t.toUserId,
  }));
}

const TransactionsPage = async () => {
  const user = await getUserDeatils();
  const transactions = await getAllTransactions();
  const trxns = await getP2PTransactions();
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f2f0e8" }}>
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 ml-3 font-bold">
        Welcome {user.name || "Customer"}
      </div>

      <div className="pt-4 mx-3">
        <OnRampTransactions transactions={transactions} />
      </div>
      <div className="pt-4 mx-3">
        <Card title="P2P Transactions">
          <div className="pt-2">
            {trxns.map((t) => (
              <div className="flex justify-between">
                <div>
                  <div className="text-sm">Received INR</div>
                  <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  + Rs {t.amount / 100}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsPage;
