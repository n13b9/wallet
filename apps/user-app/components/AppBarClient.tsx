"use client";
import { Appbar } from "@repo/ui/appbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const AppBarClient = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <Appbar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
      />
    </div>
  );
};

export default AppBarClient;
