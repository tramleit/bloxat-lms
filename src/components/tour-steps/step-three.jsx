import React from "react";
import { useTranslation } from "react-i18next";

const StepThree = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-2 text-black">
      <h1 className="text-xl font-bold tracking-tight">{t("Sales 💸")}</h1>
      <p className="">
        {t("See your course sales.")}
        <ol className="space-y-2 font-semibold mt-4">
          <li className="flex flex-row items-center space-x-2">
            1. {t("View your")}{" "}
            <span className="font-bold underline mx-1">{t("current")}</span>{" "}
            {t("course sales")}
          </li>
          <li className="flex flex-row items-center space-x-2">
            2. {t("View sales of")}{" "}
            <span className="font-bold underline mx-1">{t("all")}</span>{" "}
            {t("courses-b")}
          </li>
          <li className="flex flex-row items-center space-x-2">
            3. {t("Graph to compare your sales performance 📊")}
          </li>
        </ol>
      </p>
    </div>
  );
};

export default StepThree;
