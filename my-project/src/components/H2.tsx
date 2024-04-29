import { FC, ReactNode } from "react";
import cn from "classnames";
import { Paw } from "./icons/Paw3";

type Props = {
  children: ReactNode;
  className?: string;
  paw?: boolean;
};

export const H2: FC<Props> = ({ children, className, paw }) => (
  <h2
    className={cn(
      "items-center text-t24 font-bold leading-7 tracking-[0.12px] xl:text-t32n xl:leading-9 xl:tracking-[0.16px]",
      className
    )}
  >
    {children}
    {paw && <Paw className="ml-4 inline h-8 w-8 flex-shrink-0" />}
  </h2>
);
