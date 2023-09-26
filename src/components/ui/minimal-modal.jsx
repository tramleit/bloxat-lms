// import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const MinimalModal = ({  isOpen, onClose, children }) => {
  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        {/* <DialogHeader className="md:hidden lg:flex flex">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader> */}
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default MinimalModal;
