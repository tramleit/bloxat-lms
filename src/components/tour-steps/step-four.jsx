import { useTranslation } from "react-i18next";

const StepFour = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-2 text-black">
      <h1 className="text-xl font-bold tracking-tight">{t("Students 👨‍💻")}</h1>
      <p className="">
        {t("View the students who enrolled in your current course.")}
        <ol className="space-y-2 font-semibold mt-4">
          <li>
            1. {t("View their details &")}{" "}
            <span className="font-bold mx-[0.5px]">{t("progress")}</span>{" "}
            {t("in your course")} 🔍
          </li>
          <li>
            2. {t("Copy your")}{" "}
            <span className="font-bold mx-[0.5px]">{t("payment link")} </span>{" "}
            {t("& share")} 💵
          </li>
          <li>
            3.{" "}
            <span className="font-bold mx-[0.5px]">
              {t("Add a new student")}
            </span>{" "}
            {t("manually")} ✏️
          </li>
          <li>
            4. <span className="font-bold mx-[0.5px]">{t("Delete")}</span>{" "}
            {t("students if you need to")} 🤷‍♂️
          </li>
        </ol>
      </p>
    </div>
  );
};

export default StepFour;
