import { getMissingKeys } from "@/app/actions";
import TempChat from "@/components/TempChat";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
import React from "react";

const Chat = () => {
  const id = nanoid();
  // const session = (await auth()) as Session;
  // const missingKeys = await getMissingKeys();
  return (
    <div className="w-full p-4 bg-gray-200 h-[calc(100vh_-_64px)]">
      {/* <AI initialAIState={{ chatId: id, messages: [] }}> */}
      {/* <PerChat id={id} missingKeys={missingKeys} /> */}
      <TempChat />
      {/* </AI> */}
    </div>
  );
};

export default Chat;
