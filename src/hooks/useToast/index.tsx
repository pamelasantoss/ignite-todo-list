import { useEffect, useRef, useState } from "react";

export const useToast = () => {
  const [openToast, setOpenToast] = useState(false);
  const timerRef = useRef(0);

  const handleToast = () => {
    setOpenToast(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpenToast(true);
    }, 100);
  }
  
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return {
    openToast,
    setOpenToast,
    handleToast
  }
}