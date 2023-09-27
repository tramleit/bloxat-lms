import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const QuickSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:h-[80vh] h-[80vh] md:h-screen text-center md:px-0 px-5">
      {/* <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {currentUser?.first_name}!{" "}
          <span className="wave">👋</span>
        </h1> */}
      <Skeleton className="md:w-[200px] w-full h-6 mb-5" />
      <Skeleton className="md:w-[550px] w-full h-14" />

      {/* <p className="text-muted-foreground mt-3">
          Quickly access what you need
        </p> */}
      <div className="flex flex-col space-y-5 mt-10 w-[350px]">
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
      </div>
    </div>
  );
};

export default QuickSkeleton;
