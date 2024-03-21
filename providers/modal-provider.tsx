"use client";

import { useEffect, useState } from "react";

import { RenameDialog } from "@/components/rename-dialog";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameDialog />
    </>
  );
};
