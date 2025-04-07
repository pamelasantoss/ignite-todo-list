import * as ToastPrimitive from "@radix-ui/react-toast";
import styles from "./Toast.module.scss";
import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";

export function Toast() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <button
        className={`${styles.button} large`}
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Clique aqui para abrir o toast
      </button>

      <ToastPrimitive.Root
        className={styles.toastContainer}
        open={open}
        onOpenChange={setOpen}
      >
        <ToastPrimitive.Title className={styles.toastTitle} asChild>
          <p>Scheduled: Catch up</p>
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className={styles.toastDescription} asChild>
          <p>Mensagem de descrição!</p>
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
