import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const AccountSkeleton = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="md:w-[300px] w-[150px] h-14" />
          <div className="flex flex-row items-center space-x-3">
            {/* <Skeleton className="md:w-[180px] w-[80px] h-11" /> */}
          </div>
        </div>
        <Separator />
        {/* Content */}
        <div className="flex flex-col space-y-8 w-full">
          {/* Avatar + Upload  */}
          {/* <UploadForm currentUser={currentUser} />

<EditAccountForm currentUser={currentUser} /> */}

          <Skeleton className="w-full h-[380px]" />
          {/* TODO: let's see what we're going to do with these cards */}

          {/* Three Cards */}
          <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
            {/* Courses */}
            <Skeleton className="h-[150px] w-full" />
            {/* Courses */}
            <Skeleton className="h-[150px] w-full" />
            {/* Courses */}
            <Skeleton className="h-[150px] w-full" />
          </div>
        </div>
      </div>
      <div className="md:h-0 h-10" />
    </div>
  );
};

export default AccountSkeleton;
