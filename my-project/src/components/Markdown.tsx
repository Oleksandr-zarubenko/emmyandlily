import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FC } from "react";
import { P } from "./P";

interface InterfaceMarkdown {
  text: string;
  className?: string;
}

export const Markdown: FC<InterfaceMarkdown> = ({ text, className }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: (props) => <P className={className}>{props.children}</P>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};
