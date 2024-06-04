"use client";
import React, { useState } from "react";
import { AvtarIcon, GroupIcon, PersonIcon, PlusIcon } from "../Icons";
import GroupCard from "../GroupCard";

const ChatSidebar = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="w-full max-w-[300px] border border-t-0 ">
      <div className="flex items-center justify-between p-3 border border-t-0 border-l-0 border-r-0">
        <h3 className="text-lg font-bold">Personal</h3>
        <button>
          <PlusIcon />
        </button>
      </div>

      <div className="flex items-center justify-between p-3 border border-t-0 border-l-0 border-r-0">
        <button className="bg-white p-3 w-full rounded-full font-semibold shadow flex justify-center gap-2 items-center">
          <GroupIcon />
          Groups
        </button>
      </div>

      <div className="w-full p-3 flex flex-col gap-2">
        {[1, 2].map((e, ind) => (
          <GroupCard
            key={ind}
            active={e === active}
            handleOnClick={() => setActive(e)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
