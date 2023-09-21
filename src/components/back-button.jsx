import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton({ onClick }) {
  return (
    <Button
      variant="ghost"
      className="w-[50px] h-[50px] rounded-full"
      onClick={onClick}
    >
      <ArrowLeft />
    </Button>
  );
}
