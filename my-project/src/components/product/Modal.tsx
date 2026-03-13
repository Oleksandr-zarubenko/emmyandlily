"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  onDismiss: () => void;
};

export function Modal({ children, onDismiss }: ModalProps) {
  const dialogRef = useRef<React.ComponentRef<"dialog">>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onDismiss();
    };

    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [onDismiss]);

  if (typeof window === "undefined") return null;

  const target = document.getElementById("modal-root") ?? document.body;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-black/50"
    >
      <div className="fixed inset-0 z-110 flex items-center justify-center overflow-y-auto p-2 md:p-4">
        <div className="w-full" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </dialog>,
    target
  );
}
