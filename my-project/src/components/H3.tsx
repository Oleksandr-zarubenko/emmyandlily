import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H3: FC<Props> = ({ children, className }) => (
  <h3
    className={cn("mb-4 text-t18 font-bold leading-6 xl:text-t24n", className)}
  >
    {children}
  </h3>
);
