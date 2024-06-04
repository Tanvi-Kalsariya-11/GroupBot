"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Provider = ({ children }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (!user) {
      if (
        searchParams.get("email")?.length &&
        token === searchParams.get("token")
      ) {
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email: searchParams.get("email"), count: 1 })
        );
        router.push("/chat");
        localStorage.removeItem('token')
      } else {
        router.push("/auth/login");
      }
    }
  }, [searchParams.get("email")]);

  return <>{children}</>;
};

export default Provider;
