import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import React from "react";

const PaymentSkeleton = () => {
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
        {/* Content */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          {/* Paymob */}
          <Skeleton className="h-[155px] w-full" />

          {/* Instapay */}
          <Skeleton className="h-[155px] md:w-[600px]" />

          {/* <ProviderCard /> */}
          {/* <ProviderCard /> */}
        </div>
        {/* <PaymentSettingsForm initialData={course} /> */}
      </div>
    </div>
  );
};

export default PaymentSkeleton;
