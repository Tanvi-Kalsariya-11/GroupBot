"use client";

import { useFormState, useFormStatus } from "react-dom";
// import { authenticate } from "@/app/auth/login/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SpinnerIcon } from "../Icons";
import { authenticate, sendMagicLink } from "@/app/auth/login/action";
import { useEffect, useState } from "react";
import { getMessageFromCode, nanoid } from "@/lib/utils";

export default function LoginForm() {
  const [mailMSg, setMailMSg] = useState(false);
  const router = useRouter();
  const [result, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (result) {
      console.log(" : RESULT : ", result);

      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
      } else {
        localStorage.setItem(result.formData[0][0], result.formData[0][1]);
        toast.success(getMessageFromCode(result.resultCode));
        router.refresh();
        router.push("/");
      }
    }
  }, [result, router]);

  return (
    <form
      action={async (e) => {
        if (e.get("email")) {
          const id = nanoid();
          const email = e.get("email");
          localStorage.setItem("token", id);
          console.log(" : IDD : ", id);
          

          await sendMagicLink(email, id);
          setMailMSg(true);

          // router.push("/chat");
        }
      }}
      className="flex flex-col items-center gap-4 space-y-3"
    >
      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96">
        <h1 className="mb-3 text-2xl font-bold">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          {/* <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div> */}
        </div>
        {mailMSg && (
          <div className="border border-green-300 mt-2 p-3 rounded shadow">
            <p className="text-xs text-green-500">
              A link has been sent to your email address. Please click the link
              to login
            </p>
          </div>
        )}
        <LoginButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800"
      aria-disabled={pending}
      type="submit"
    >
      {pending ? <SpinnerIcon /> : "Log in"}
    </button>
  );
}
