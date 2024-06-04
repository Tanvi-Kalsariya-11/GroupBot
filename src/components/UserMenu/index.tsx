import React, { useState } from "react";
import { PersonIcon } from "../Icons";
import { useRouter } from "next/navigation";
import useClickOutside from "@/lib/hooks/useClickOutside";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const dropdownRef = useClickOutside(() => {
    setOpen(false);
  });
  return (
    <div className="relative">
      <button
        className="flex justify-center border p-3 rounded-full bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        <PersonIcon />
      </button>
      {open && (
        <div
          className="absolute bg-white z-10 p-4 rounded-lg"
          ref={dropdownRef}
        >
          <button
            className="rounded w-full p-2 hover:bg-gray-200"
            onClick={() => setOpen(false)}
          >
            Profile
          </button>
          <button
            className="rounded w-full p-2 hover:bg-gray-200 text-nowrap"
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              router.push("/auth/login");
              setOpen(false);
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
