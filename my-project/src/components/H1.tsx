import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H1: FC<Props> = ({ children, className }) => (
  <h1 className={cn("font-playfair text-t32 xl:text-t53", className)}>
    {children}
  </h1>
);
