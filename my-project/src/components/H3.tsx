import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H3: FC<Props> = ({ children, className }) => (
  <h3 className={cn("", className)}>{children}</h3>
);
