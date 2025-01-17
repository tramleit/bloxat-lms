import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "@/components/loading/loading";
import PlanCard from "@/components/plan-card";
import {
  MONTHLY_PRICE_EGP,
  YEARLY_PRICE_EGP,
} from "@/config/subscription-config";
import { useCurrentUser } from "@/hooks/use-current-user";
import { startPaymentProcess } from "@/hooks/use-paymob";
import Logo from "@/assets/images/logo/bloxat-blue.webp";

const TrialEnded = () => {
  const { t } = useTranslation();
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

  if (!currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="fade-up flex flex-col items-center justify-center md:h-screen md:py-0 py-10 md:px-0 px-5  space-y-4">
      <img
        src={Logo}
        className="w-[110px] h-auto"
        alt="Bloxat"
        draggable={false}
      />
      <h1 className="px-2 py-1 rounded-md font-base text-center">
        {t("Your 21 days free trial has ended")}
      </h1>
      <h2 className="font-bold text-xl text-center">
        {t("Pick a plan to continue using Bloxat")}
      </h2>
      <div className="flex md:flex-row flex-col items-center md:space-x-5 space-x-0 md:space-y-0 space-y-5">
        {/* MONTH */}
        <PlanCard
          duration={t("Monthly")}
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
          ctaText={t("Get plan")}
          loading={monthlyLoading}
          disabled={monthlyLoading || yearlyLoading ? true : false}
        />
        {/* YEAR */}
        <PlanCard
          duration={t("Yearly")}
          color={"bg-yellowBloxLight"}
          price="5,000"
          extraText={t("Save 1,000 EGP")}
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
          ctaText={t("Get plan")}
          loading={yearlyLoading}
          disabled={monthlyLoading || yearlyLoading ? true : false}
        />
      </div>
    </div>
  );
};

export default TrialEnded;
