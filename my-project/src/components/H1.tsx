import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H1: FC<Props> = ({ children, className }) => (
  <h1 className={cn("mb-4 text-t16 text-bg_secondary md:text-t24n", className)}>
    {children}
  </h1>
);
