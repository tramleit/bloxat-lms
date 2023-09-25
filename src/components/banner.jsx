import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex justify-center items-center w-full dark:text-black",
  {
    variants: {
      variant: {
        warning: "bg-yellowBloxLight border-yellow-30 text-primary md:text-center text-start",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({ label, variant, button }) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
      {button}
    </div>
  );
};
