"use client";
import React, { useEffect, useState } from "react";
import { AvtarIcon, ChatBubbleIcon } from "../Icons";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";

const SidebarNavigations = () => {
  const pathName = usePathname();

  const [active, setActive] = useState("/");
  const router = useRouter();

  const data = [
    {
      link: "/chat",
      icon: <ChatBubbleIcon />,
    },
    {
      link: "/assistants",
      icon: <AvtarIcon />,
    },
  ];

  const gotoPage = (data: any) => {
    router.push(data.link);
    setActive(data.link);
  };

  useEffect(() => {
    setActive(pathName);
  }, [pathName]);

  return (
    <>
      {!pathName.includes("login") && pathName !== "/" && (
        <div className="p-4 flex flex-col gap-3">
          {data.map((d, ind) => (
            <button
              className={classNames(
                "flex justify-center border p-3 rounded-full hover:bg-gray-200",
                active === d.link && "bg-gray-200 shadow"
              )}
              onClick={() => gotoPage(d)}
              key={ind}
            >
              {d.icon}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarNavigations;
