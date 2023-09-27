import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import React from "react";

const LessonSkeleton = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          {/* <Link
            to={`/${course_id}/edit`}
            className="flex items-center text-sm  hover:bg-slate-100 dark:hover:bg-[#2d2d2d] w-fit px-2 py-1 rounded-md transition mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to course edit
          </Link> */}

          <div className="flex items-center justify-between">
            <Skeleton className="md:w-[300px] w-[150px] h-14" />
            <div className="flex flex-row items-center space-x-3">
              <Skeleton className="md:w-[180px] w-[80px] h-11" />
            </div>
          </div>
          <Separator className="mt-4" />
        </div>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge Icon={LayoutDashboardIcon} /> */}
              <Skeleton className="w-[200px] h-[50px] mb-5" />
            </div>
            {/* Title form */}
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[200px]" />
            <div>
              <div className="flex items-center gap-x-2 mt-6">
                {/* <IconBadge Icon={Files} /> */}
                <Skeleton className="w-[200px] h-[50px] mb-5" />
              </div>
              <Skeleton className="w-full h-[200px]" />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div>
          <div className="flex items-center gap-x-2">
            {/* <IconBadge Icon={Video} /> */}
            <Skeleton className="w-[200px] h-[50px] mb-5" />
          </div>
          {/* Video Form */}
          <Skeleton className="w-full h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default LessonSkeleton;
