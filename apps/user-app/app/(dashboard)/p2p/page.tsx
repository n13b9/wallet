import { SendCard } from "../../../components/SendCard";

import { P2PTransactions } from "../../../components/P2PTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Center } from "@repo/ui/center";

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

export default async function () {
  const transactions = await getP2PTransactions();

  return (
    <div className="w-screen" style={{ backgroundColor: "#f2f0e8" }}>
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 ml-3 font-bold">
        P2P Transfers
      </div>
      <div className="flex flex-row">
        <div className="w-1/3 ml-4">
          <SendCard />
        </div>
        <div className="w-2/3 mx-4 ">
          <P2PTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
