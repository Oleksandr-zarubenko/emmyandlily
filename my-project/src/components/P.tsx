import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const P: FC<Props> = ({ children, className }) => (
  <p className={cn("text-t14 leading-[1.3] xl:text-t16", className)}>
    {children}
  </p>
);
