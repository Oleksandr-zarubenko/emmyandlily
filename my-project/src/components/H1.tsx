import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H1: FC<Props> = ({ children, className }) => (
  <h1 className={cn("text-t20 mb-4 text-dark", className)}>{children}</h1>
);
