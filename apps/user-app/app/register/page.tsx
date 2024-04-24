"use client";
import { Button } from "@repo/ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="flex flex-col justify-center items-center p-8 border-2 border-gray rouneded-2xl w-1/5 gap-2">
        <hr />
        <label htmlFor="username" className="">
          Name
        </label>
        <input
          className="border border-gray-300 h-12 px-4 rounded-lg"
          id="username"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="username"
        />

        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-300 h-12 px-4 rounded-lg"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-300 h-12 px-4 rounded-lg"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <label htmlFor="phone">Phone</label>
        <input
          className="border border-gray-300 h-12 px-4 rounded-lg mb-2"
          id="phone"
          type="phone number"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          placeholder="phone"
        />
        <Button onClick={handleRegister}> Register </Button>

        {/* <Link href="/login"> Visit Loing Page</Link> */}
      </div>
    </div>
  );
};

export default SignUp;
