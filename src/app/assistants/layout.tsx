import ChatSidebar from "@/components/ChatSidebar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full flex h-[calc(100vh_-_theme(spacing.16))] ">
      <ChatSidebar />
      {children}
    </div>
  );
};

export default Layout;
