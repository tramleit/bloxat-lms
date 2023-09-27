import { useEffect, useState } from "react";
import CreateModal from "@/components/modals/create-modal/create-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateModal />
    </>
  );
};

export default ModalProvider;
