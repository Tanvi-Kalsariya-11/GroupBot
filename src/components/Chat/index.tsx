"use client";

import { useEffect, useState } from "react";
import { useUIState, useAIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import classNames from "classnames";
import { ChatList } from "../ChatList";
import { ChatPanel } from "../ChatPanel";
import { EmptyScreen } from "../EmptyScreen";
import { useLocalStorage } from "@/lib/hooks/useLocaleStorage";
import { Message, Session } from "@/lib/types";
import { useScrollAnchor } from "@/lib/hooks/useScrollAnchor";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session;
  missingKeys: string[];
}

export function PerChat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();

  const [aiState] = useAIState();

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  // useEffect(() => {
  //   if (session?.user) {
  //     if (!path.includes("chat") && messages.length === 1) {
  //       window.history.replaceState({}, "", `/chat/${id}`);
  //     }
  //   }
  // }, [id, path, session?.user, messages]);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [aiState.messages, router]);

  // useEffect(() => {
  //   setNewChatId(id);
  // });

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] flex flex-col h-[calc(100vh_-_64px)]"
      ref={scrollRef}
    >
      <div
        className={classNames("pt-4 md:pt-4 overflow-auto h-[calc(100%_-_16px)]", className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
