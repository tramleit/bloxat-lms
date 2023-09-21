import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NextButton = ({ onClick, disabled, loading }) => {
  return (
    <Button onClick={onClick} className="space-x-1.5" disabled={disabled}>
      {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      <span>Next</span>
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
};

export default NextButton;
