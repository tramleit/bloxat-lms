import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SalesSkeleton = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="md:w-[300px] w-[150px] h-14" />
          <div className="flex flex-row items-center space-x-3">
            <Skeleton className="md:w-[180px] w-[80px] h-11" />
          </div>
        </div>

        <Separator />
        <div className="grid gap-4 md:grid-cols-4 grid-cols-1">
          {/* Card */}
          <Skeleton className="h-[150px] w-full" />

          {/* End Card */}
          {/* Card */}
          <Skeleton className="h-[150px] w-full" />

          {/* End Card */}
          {/* Card */}
          <Skeleton className="h-[150px] w-full" />

          {/* End Card */}
          {/* Card */}
          <Skeleton className="h-[150px] w-full" />

          {/* End Card */}
        </div>
        {/* Chart */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7 w-full">
          {/* Graph */}
          <div className="flex-1 col-span-4 ">
            {/* Card */}
            <Skeleton className="h-[400px] w-full" />

            {/* End Card */}
          </div>
          {/* recent sales */}
          <Skeleton className="h-[400px] w-full md:col-span-3 col-span-4" />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default SalesSkeleton;
