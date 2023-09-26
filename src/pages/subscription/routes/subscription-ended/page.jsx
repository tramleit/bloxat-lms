import React, { useState } from "react";
import Loading from "@/components/loading/loading";
import PlanCard from "@/components/plan-card";
import {
  MONTHLY_PRICE_EGP,
  YEARLY_PRICE_EGP,
} from "@/config/subscription-config";
import { useCurrentUser } from "@/hooks/use-current-user";
import { startPaymentProcess } from "@/hooks/use-paymob";
import Logo from "@/assets/images/logo/bloxat-blue.webp";

const SubscriptionEndedPage = () => {
  const currentUser = useCurrentUser();

  // FOR MONTHLY
  const currentDate = new Date(); // Get the current date and time
  const afterMonthDate = new Date(currentDate); // Create a copy of the current date
  // YOU CAN CHANGE THE TRIAL DURATION HERE
  // 21 DAYS
  afterMonthDate.setDate(currentDate.getDate() + 30); // Add 30 days to the copy

  // Format the future date as a string in "YYYY-MM-DDTHH:mm:ss.sssZ" format
  const formattedAfterMonthDate = afterMonthDate.toISOString();

  // FOR YEARLY
  // const currentDate = new Date(); // Get the current date and time
  const afterYearDate = new Date(currentDate); // Create a copy of the current date
  // Set the date to be one year from the current date
  afterYearDate.setFullYear(currentDate.getFullYear() + 1);

  // Format the future date as a string in "YYYY-MM-DDTHH:mm:ss.sssZ" format
  const formattedAfterYearDate = afterYearDate.toISOString();

  // LOADING THE PAYMOB IFRAME STATE
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [yearlyLoading, setYearlyLoading] = useState(false);

  // FORMAT DATE
  const inputDateString = currentUser?.subscription_end;
  const date = new Date(inputDateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // To display AM/PM
  };

  const formattedDate = date.toLocaleString("en-US", options);

  console.log(formattedDate); // Output: "September 16, 2024, 8:05 PM"

  if (!currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <img
        src={Logo}
        className="w-[110px] h-auto"
        alt="Bloxat"
        draggable={false}
      />
      <div className="flex flex-col space-y-1">
        <h1 className="px-2 py-1 rounded-md font-base">
          Your subscription has <span className="font-semibold">ended</span> on
        </h1>
        <p className="">{formattedDate}</p>
      </div>

      <h2 className="font-bold text-xl">Pick a plan to renew</h2>
      <div className="flex flex-row items-center space-x-5">
        {/* MONTH */}
        <PlanCard
          duration="Monthly"
          color={"bg-lemonBloxLight"}
          price="497"
          onClick={() => {
            setMonthlyLoading(true);
            startPaymentProcess(
              MONTHLY_PRICE_EGP,
              "EGP",
              "monthly",
              formattedAfterMonthDate,
              currentUser?.first_name,
              currentUser?.last_name,
              currentUser?.email,
              currentUser?.phone_number,
              currentUser?.user_id,
              currentDate,
              "card"
            );
          }}
          ctaText="Get plan"
          loading={monthlyLoading}
          disabled={monthlyLoading || yearlyLoading ? true : false}
        />
        {/* YEAR */}
        <PlanCard
          duration="Yearly"
          color={"bg-yellowBloxLight"}
          price="5,000"
          extraText="Save 1,000 EGP"
          onClick={() => {
            setYearlyLoading(true);
            startPaymentProcess(
              YEARLY_PRICE_EGP,
              "EGP",
              "yearly",
              formattedAfterYearDate,
              currentUser?.first_name,
              currentUser?.last_name,
              currentUser?.email,
              currentUser?.phone_number,
              currentUser?.user_id,
              currentDate,
              "card"
            );
          }}
          ctaText="Get plan"
          loading={yearlyLoading}
          disabled={monthlyLoading || yearlyLoading ? true : false}
        />
      </div>
    </div>
  );
};

export default SubscriptionEndedPage;
