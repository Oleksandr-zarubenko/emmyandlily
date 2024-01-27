import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H2: FC<Props> = ({ children, className }) => (
  <h2 className={cn("mb-10 text-t40 text-primary", className)}>{children}</h2>
);
