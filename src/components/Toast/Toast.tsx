import * as ToastPrimitive from "@radix-ui/react-toast";
import styles from "./Toast.module.scss";
import { X } from "@phosphor-icons/react";
import { TaskStatus } from "../../hooks/useTasks";

interface ToastProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  status: TaskStatus
}

export function Toast({ open, setOpen, status }: ToastProps) {
  return (
    <>
      <ToastPrimitive.Root
        className={styles.toastContainer}
        open={open}
        onOpenChange={setOpen}
        duration={2000}
      >
        <ToastPrimitive.Title className={styles.toastTitle} asChild>
          <p>{status.title}</p>
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className={styles.toastDescription} asChild>
          <p>{status.description}</p>
        </ToastPrimitive.Description>
        <ToastPrimitive.Close asChild aria-label="Close the toast">
          <button className={`${styles.button} small fixed`}>
            <X size={20} />
          </button>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className={styles.toastViewport} />
    </>
  );
}
