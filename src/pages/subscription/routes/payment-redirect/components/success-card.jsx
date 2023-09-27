import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import success from "@/assets/lotties/success.json";
import Lottie from "lottie-react-web";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SuccessCard = ({ endDate }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // FORMAT DATE
  const inputDateString = endDate;
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

  return (
    <Card className="flex flex-col items-center justify-center p-10 shadow-md">
      <div className="flex w-[100px] mt-[-20px]">
        <Lottie
          //   className="lottie"
          options={{
            animationData: success,
            loop: false,
          }}
        />
      </div>
      <div className="flex flex-col space-y-4 items-center justify-center text-center mt-[-5px]">
        <h1 className="text-xl font-bold">{t("Active plan!")}</h1>
        <p>
          {t("Your subscription ends on")} <br />
          {/* <span className="font-semibold">30 days</span> <br /> on:{" "} */}
          <span className="font-semibold">{formattedDate}</span>
        </p>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          {t("Go to my account")}
        </Button>
      </div>
    </Card>
  );
};

export default SuccessCard;
