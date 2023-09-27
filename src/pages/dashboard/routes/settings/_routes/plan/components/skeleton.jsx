import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PlanSkeleton = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {" "}
        <div className="flex items-center justify-between">
          <Skeleton className="md:w-[200px] w-[150px] h-14" />
          <div className="flex flex-row items-center space-x-3">
            {/* <Skeleton className="md:w-[180px] w-[80px] h-11" /> */}
          </div>
        </div>
        <Separator />
        {/* Content */}
        <div className="flex flex-col space-y-7 w-full">
          <div className="flex flex-row items-start space-x-5">
            {/* SUBSCRIPTION */}
            {/* IF THE SUBSCRIPTION IS ACTIVE */}
            {/* Today is less then the end date */}
            <Skeleton className="w-[300px] h-[350px]" />
          </div>
          <Separator />
          {/* Billing history */}
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-[180px] h-[30px]" />
            <Skeleton className="w-[100px] h-[30px]" />
          </div>

          <Skeleton className="w-full h-[170px]" />
        </div>
      </div>
    </div>
  );
};

export default PlanSkeleton;
