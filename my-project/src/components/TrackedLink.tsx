"use client";

import { Link } from "@/i18n/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;

interface TrackedLinkProps extends LinkProps {
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
}

export function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        sendGAEvent("event", eventName, eventParams ?? {});
        onClick?.(event);
      }}
    />
  );
}
