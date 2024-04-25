import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const P: FC<Props> = ({ children, className }) => (
  <p className={cn("", className)}>{children}</p>
);
