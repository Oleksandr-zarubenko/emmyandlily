import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FC } from "react";
import { P } from "./P";
import { H1 } from "./H1";

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
        h1: (props) => <H1 className={className}>{props.children}</H1>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};
