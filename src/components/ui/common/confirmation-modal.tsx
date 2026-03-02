"use client";

import { AlertTriangle } from "lucide-react";
import { Modal } from "./modal";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  isLoading?: boolean;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl font-medium border border-border/50 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={variant === "danger"
              ? "px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              : "px-5 py-2.5 rounded-xl font-medium bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            }
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        {variant === "danger" && (
          <div className="shrink-0 p-2 rounded-xl bg-red-500/20">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
        )}
        <p className="text-muted-foreground">{message}</p>
      </div>
    </Modal>
  );
}
