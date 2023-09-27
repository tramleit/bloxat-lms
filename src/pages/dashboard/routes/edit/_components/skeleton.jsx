import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
// import React from "react";

const EditSkeleton = () => {
  return (
    <div className="p-8 pt-6">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Skeleton className="md:w-[300px] w-[150px] h-14" />
          <div className="flex flex-row items-center space-x-3">
            <Skeleton className="md:w-[180px] w-[80px] h-11" />
          </div>
        </div>

        <Separator className="mt-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  gap-6 mt-6">
        <div>
          <div className="flex items-center gap-x-2">
            {/* <IconBadge Icon={LayoutDashboard} /> */}

            <Skeleton className="w-[200px] h-[50px] mb-5" />
          </div>
          <Skeleton className="w-full h-[100px]" />

          <Skeleton className="w-full h-[100px]" />

          <div className="flex md:flex-row flex-col items-start md:space-x-4 space-x-0 mt-10 ">

            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[150px]" />
          </div>
        </div>
        {/* Right side */}
        <div className="space-y-6">
          {/* Content */}
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge Icon={ListChecks} /> */}
              <Skeleton className="w-[200px] h-[50px] mb-5" />

              {/* <h2 className="text-xl">Course content</h2> */}
            </div>
            <Skeleton className="w-full h-[400px]" />
          </div>
          {/* Price */}
          <div>
            {/* <div className="flex items-center gap-x-2">
                <IconBadge Icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSkeleton;
