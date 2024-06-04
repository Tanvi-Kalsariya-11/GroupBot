import React from "react";
import { AvtarIcon, PersonIcon } from "../Icons";
import classNames from "classnames";
type GroupCardsPropsType = {
  active: boolean;
  handleOnClick?: () => void;
};

const GroupCard = ({ active, handleOnClick }: GroupCardsPropsType) => {
  return (
    <div
      className={classNames(
        "w-full rounded-lg p-2 flex items-center cursor-pointer hover:bg-white hover:shadow",
        active && "bg-white shadow"
      )}
      onClick={handleOnClick}
    >
      <div className="w-full flex items-center gap-2">
        <button className="flex justify-center border p-4 rounded-full bg-white">
          <AvtarIcon />
        </button>
        <div>
          <div className="text-sm font-bold">Demo</div>
          <div className="text-sm">1 users</div>
        </div>
      </div>

      <button className="flex justify-center border p-1 rounded-full bg-white">
        <PersonIcon />
      </button>
    </div>
  );
};

export default GroupCard;
