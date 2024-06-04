import React from "react";
import { PersonIcon } from "../Icons";
import UserOrLogin from "../UserOrLogin";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl  justify-between">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-bold">Custom AI</h2>
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Header;
