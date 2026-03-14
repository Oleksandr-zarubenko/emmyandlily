"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  onDismiss: () => void;
};

export function Modal({ children, onDismiss }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onDismiss();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDismiss]);

  if (typeof window === "undefined") return null;

  const target = document.getElementById("modal-root") ?? document.body;

  return createPortal(
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-110">
      <div
        className="fixed inset-0 overflow-y-auto bg-black/50 p-2 md:p-4"
        onClick={onDismiss}
      >
        <div className="flex min-h-full items-start justify-center xl:items-center">
          <div
            className="flex w-full justify-center"
            // onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    target
  );
}
