import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="mb-10">
      <div className="flex flex-row mt-5 mb-10">
        <div className="flex flex-col w-1/2 justify-center mx-10 gap-5 my-10">
          <h1 className="text-5xl font-bold mx-10">
            {" "}
            India's Most-loved Payments App
          </h1>
          <h2 className="text-2xl mx-10">
            {" "}
            Recharge & pay bills, book flights & movie tickets, open a savings
            account, invest in stocks & mutual funds, and do a lot more.{" "}
          </h2>
        </div>
        <div className="">
          <img
            src="https://assetscdn1.paytm.com/images/catalog/view_item/850762/1706796536129.png"
            height={500}
            width={500}
          />
        </div>
      </div>
      <div className="h-[300px] p-5" style={{ backgroundColor: "#00baf2" }}>
        <h3 className="text-3xl text-white font-bold"> Pay Bills & Book </h3>
        <div className="flex flex-row justify-between p-5">
          <div className="flex flex-col items-center gap-4 p-6 hover:bg-gray-300">
            <img
              src="https://assetscdn1.paytm.com/images/catalog/view_item/733295/1626259710574.png"
              height={50}
              width={50}
            />
            <span className="text-white"> Book Movie Tickets </span>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 hover:bg-gray-300">
            <img
              src="https://assetscdn1.paytm.com/images/catalog/view_item/733299/1626251017535.png"
              height={50}
              width={50}
            />
            <span className="text-white"> Recharge Mobile </span>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 hover:bg-gray-300">
            <img
              src="https://assetscdn1.paytm.com/images/catalog/view_item/733296/1626259884425.png"
              height={50}
              width={50}
            />
            <span className="text-white"> Pay Electricity Bill </span>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 hover:bg-gray-300">
            <img
              src="https://assetscdn1.paytm.com/images/catalog/view_item/729996/1626260477699.png"
              height={50}
              width={50}
            />
            <span className="text-white"> Travel booking </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
