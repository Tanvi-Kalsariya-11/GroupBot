import { PerChat } from "@/components/Chat";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
import React from "react";
import { auth } from "../../../auth";
import { Session } from "@/lib/types";
import { getMissingKeys } from "../actions";
import TempChat from "@/components/TempChat";

const Chat = async () => {
  const id = nanoid();
  // const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();
  return (
    <div className="w-full p-4 bg-gray-200 h-[calc(100vh_-_64px)]">
      <AI initialAIState={{ chatId: id, messages: [] }}>
        {/* <PerChat id={id} missingKeys={missingKeys} /> */}
        <TempChat />
      </AI>
    </div>
  );
};

export default Chat;
