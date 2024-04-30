import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FC } from "react";
import { P } from "./P";
import { H1 } from "./H1";
import { H2 } from "./H2";
import { H3 } from "./H3";
import cn from "classnames"

interface InterfaceMarkdown {
  text: string;
  className?: string;
  paw?: boolean;
}

export const Markdown: FC<InterfaceMarkdown> = ({ text, className, paw }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: (props) => <P className={className}>{props.children}</P>,
        h1: (props) => <H1 className={className}>{props.children}</H1>,
        h2: (props) => (
          <H2 className={className} paw={paw}>
            {props.children}
          </H2>
        ),
        h3: (props) => <H3 className={className}>{props.children}</H3>,
        li: (props) => <li className={cn(className, 'mb-2')}>{props.children}</li>,
        ul: (props) => <ul className={className}>{props.children}</ul>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};
