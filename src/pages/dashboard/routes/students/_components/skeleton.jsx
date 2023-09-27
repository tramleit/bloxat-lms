import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const StudentsSkeleton = () => {
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <div className="flex items-center justify-between">
          <Skeleton className="md:w-[300px] w-[150px] h-14" />
          <div className="flex flex-row items-center space-x-3">
            <Skeleton className="md:w-[180px] w-[80px] h-11" />
          </div>
        </div>
        {/* Search Input For filtering */}
        <div className="flex items-center">
          <Skeleton className="md:w-[300px] w-full h-[30px]" />
        </div>
        {/* Students DataTable */}
        <Skeleton className="w-full h-[400px]" />
      </div>
    </div>
  );
};

export default StudentsSkeleton;
