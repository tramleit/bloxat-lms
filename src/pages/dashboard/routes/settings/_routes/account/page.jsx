import React, { useEffect, useState } from "react";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Box, Check, CreditCard } from "lucide-react";
import EditAccountForm from "./components/edit-account-form";
import UploadForm from "./components/upload-form";
import useCourseStore from "@/store/courses/courses-store";
import Loading from "@/components/loading/loading";
import useBillingStore from "@/store/billing/billing-store";
import { useNavigate, useParams } from "react-router-dom";

const AccountPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const { courses, loading, fetchCoursesByUserId } = useCourseStore();
  // get billing data to show the plan
  const { billingData, fetchBillingData } = useBillingStore();

  // const router = useRouter();

  // TO CAPITALIZE THE FIRST LETTER OF A STRING
  function capitalizeFirstLetter(str) {
    // Check if the string is empty or null
    if (!str) return str;

    // Capitalize the first letter and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    fetchCoursesByUserId();
  }, []);

  // FETCH BILLING DATA
  useEffect(() => {
    // Replace 'userId' with the actual user ID you want to fetch data for
    fetchBillingData(currentUser?.user_id, 0, 1);
  }, []);

  // Loading
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <BackButton
              onClick={() => {
                navigate(`/${course_id}/settings`);
              }}
            />

            <Heading
              title="Account"
              description="View and update your profile details."
            />
          </div>
          {/* <Button disabled={loading} variant="destructive" size="icon" onClick={() => {}}>
        <Trash className="h-4 w-4" />
      </Button> */}
        </div>
        <Separator />
        {/* Content */}
        <div className="flex flex-col space-y-8 w-full">
          {/* Avatar + Upload  */}
          <UploadForm currentUser={currentUser} />
          <EditAccountForm currentUser={currentUser} />

          {/* TODO: let's see what we're going to do with these cards */}

          {/* Three Cards */}
          <div className="grid gap-4 grid-cols-3">
            {/* Courses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses</CardTitle>

                <Box className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              {/* Card Content */}
              <CardContent>
                <div className="text-2xl font-bold">{courses?.count}</div>

                {/* IF FREE TRIAL */}
                {billingData?.length == 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Free Trial
                  </p>
                )}
                {/* If there's a plan */}
                {billingData?.length !== 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {capitalizeFirstLetter(billingData[0]?.plan)} Plan
                  </p>
                )}
              </CardContent>
            </Card>
            {/* Courses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>

                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              {/* Card Content */}
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                {/* IF FREE TRIAL */}
                {billingData?.length == 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Free Trial
                  </p>
                )}
                {/* If there's a plan */}
                {billingData?.length !== 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {capitalizeFirstLetter(billingData[0]?.plan)} Plan
                  </p>
                )}
              </CardContent>
            </Card>
            {/* Courses */}
            <Card className="border-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">Plan</CardTitle>

                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              {/* Card Content */}
              <CardContent className="relative">
                {/* IF FREE TRIAL */}
                {billingData?.length == 0 && (
                  <p className="text-2xl font-bold">Free Trial</p>
                )}
                {/* If there's a plan */}
                {billingData?.length !== 0 && (
                  <p className="text-2xl font-bold">
                    {capitalizeFirstLetter(billingData[0]?.plan)} Plan
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">Active</p>
                <div className="absolute right-5 bottom-5 ">
                  <Button
                    onClick={() => {
                      navigate(`/${course_id}/settings/plan`);
                    }}
                  >
                    Go to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
