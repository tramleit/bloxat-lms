import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const Bottom = ({ onClick, enableSkip, onSkip, disabled }) => {
  return (
    <div className="mt-auto border-t border-black dark:border-[#2f2f2f] flex h-20 items-center px-6">
      <div className="ml-auto space-x-4">
        {enableSkip && (
          <Button variant="outline" onClick={onSkip} className="space-x-1.5" disabled={disabled}>
            <span>Skip</span>
          </Button>
        )}

        <Button onClick={onClick} className="space-x-1.5" disabled={disabled}>
          <span>Next</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Bottom;