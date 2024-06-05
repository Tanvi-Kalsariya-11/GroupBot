import ChatSidebar from "@/components/ChatSidebar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full flex h-[calc(100vh_-_64px)] ">
      <ChatSidebar />
      {children}
    </div>
  );
};

export default Layout;
