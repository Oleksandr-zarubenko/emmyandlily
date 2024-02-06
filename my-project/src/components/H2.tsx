import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H2: FC<Props> = ({ children, className }) => (
  <h2 className={cn("text-t30 text-primary md:text-t40", className)}>
    {children}
  </h2>
);
