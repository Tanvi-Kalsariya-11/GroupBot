"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserMenu from "../UserMenu";

const UserOrLogin = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      const sessionUser = sessionStorage.getItem("user");
      if (sessionUser?.length) {
        const user = JSON?.parse(sessionUser || "");
        if (user) {
          setUser(user);
        }
      }
    }
  }, []);

  return (
    <div className="flex items-center">
      {user?.email ? (
        <div className="flex items-center gap-2">
          <UserMenu />
          <div className="text-lg font-semibold">{user?.email}</div>
        </div>
      ) : (
        <button className="-ml-2">
          <Link href="/auth/login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default UserOrLogin;
