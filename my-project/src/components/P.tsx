import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const P: FC<Props> = ({ children, className }) => (
  <p className={cn("mb-4 text-t16 text-dark md:text-t20", className)}>
    {children}
  </p>
);
