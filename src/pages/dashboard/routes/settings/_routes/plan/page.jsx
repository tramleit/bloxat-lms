import { useEffect, useState } from "react";
import { BackButton } from "@/components/back-button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columnsBilling } from "./components/columns-billing";
import { useCurrentUser } from "@/hooks/use-current-user";
import Loading from "@/components/loading/loading";
import useBillingStore from "@/store/billing/billing-store";
import ActiveCard from "./components/active-card";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PlanPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  // to get the billing data .. to show in the table and to see the last plan we're on
  const { billingData, loading, fetchBillingData } = useBillingStore();

  //   Pagination
  // For Pagination
  const [page, setPage] = useState(0);
  // Next page function
  function nextPage() {
    if (page !== billingData?.count - 1) {
      setPage(page + 1);
      //   fetchEnrollments(courseId, page + 1, "");
    }
  }

  // Previous page function
  function previousPage() {
    if (page >= 1) {
      setPage(page - 1);
      //   fetchEnrollments(courseId, page - 1, "");
    }
  }

  // dates
  // SHOW REMAINING DAYS FOR SUBSCRIPTION
  // Assuming currentUser.subscription_end is a string in ISO format, like "2024-09-16T08:05:53.000Z"
  const subscriptionEndDate = new Date(currentUser.subscription_end);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = subscriptionEndDate - currentDate;

  // Calculate the remaining days
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  console.log("Remaining days until subscription ends:", remainingDays);

  ////////////////////////////////////////
  // SHOW REMAINING DAYS FOR TRIAL
  const trialEndDate = new Date(currentUser.trial_end);
  // const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const trialTimeDifference = trialEndDate - currentDate;

  // Calculate the remaining days
  const trialRemainingDays = Math.ceil(
    trialTimeDifference / (1000 * 60 * 60 * 24)
  );

  console.log("Remaining days until subscription ends:", remainingDays);

  const { t } = useTranslation();

  // FETCH BILLING DATA
  useEffect(() => {
    // Replace 'userId' with the actual user ID you want to fetch data for
    fetchBillingData(currentUser?.user_id, page, 3);
  }, [page]);

  console.log("plan page", billingData);

  if (!currentUser || loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <BackButton
              onClick={() => {
                navigate(`/${course_id}/settings`);
              }}
            />

            <Heading
              title={t("Plan")}
              description={t("Upgrade or renew your Bloxat plan")}
            />
          </div>
        </div>
        <Separator />
        {/* Content */}
        <div className="flex flex-col space-y-7 w-full">
          <div className="flex flex-row items-start space-x-5">
            {/* SUBSCRIPTION */}
            {/* IF THE SUBSCRIPTION IS ACTIVE */}
            {/* Today is less then the end date */}
            {currentUser?.subscription_end &&
              new Date() < new Date(currentUser.subscription_end) && (
                <ActiveCard
                  title={"Active"}
                  color={"bg-blueBloxLight"}
                  textColor={"text-white"}
                  planName={`${billingData[0]?.plan.toUpperCase()} subscription`}
                  daysRemaining={remainingDays}
                  showRemaining={remainingDays <= 2 ? true : false}
                />
              )}

            {/* TRIAL */}
            {/* IF THE TRIAL IS ACTIVE */}
            {/* Today is less then the end date AND THERE'S NO SUBSCRIPTION */}
            {currentUser?.trial_end &&
              new Date() < new Date(currentUser.trial_end) &&
              !currentUser?.subscription_end && (
                <ActiveCard
                  title={t("Free Trial")}
                  color={"bg-sky"}
                  textColor={"text-black"}
                  planName={t("21 days trial")}
                  daysRemaining={trialRemainingDays}
                  showRemaining={trialRemainingDays <= 2 ? true : false}
                />
              )}
          </div>
          <Separator />
          {/* Billing history */}
          <div className="flex flex-col space-y-1">
            <h3 className="font-semibold text-xl">{t("Billing History")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("Here you can review all of your payments to Bloxat")}
            </p>
          </div>

          <DataTable
            columns={columnsBilling}
            data={billingData}
            nextPage={() => {
              nextPage();
            }}
            prevPage={() => {
              previousPage();
            }}
            nextDisabled={billingData?.length < 3 ? true : false}
            prevDisabled={page === 0 ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
