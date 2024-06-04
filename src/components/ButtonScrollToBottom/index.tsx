"use client";

import * as React from "react";

import classNames from "classnames";
import { ArrowDownIcon } from "../Icons";

interface ButtonScrollToBottomProps {
  className?: string;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ButtonScrollToBottom = ({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) => {
  return (
    <button
      className={classNames(
        "absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2",
        isAtBottom ? "opacity-0" : "opacity-100",
        className
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <ArrowDownIcon />
      <span className="sr-only">Scroll to bottom</span>
    </button>
  );
};
export default ButtonScrollToBottom;
