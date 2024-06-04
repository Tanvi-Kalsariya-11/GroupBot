import React from "react";

import classNames from "classnames";
import ExternalLink from "../ExternalLink";

const FooterText = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      className={classNames(
        "px-2 text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      Open source AI chatbot built with{" "}
      <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{" "}
      <ExternalLink href="https://github.com/vercel/ai">
        Vercel AI SDK
      </ExternalLink>
      .
    </p>
  );
};

export default FooterText