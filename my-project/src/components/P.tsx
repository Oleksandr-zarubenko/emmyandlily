import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const P: FC<Props> = ({ children, className }) => (
  <p className="mb-4">{children}</p>
);
