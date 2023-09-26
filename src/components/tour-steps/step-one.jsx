import { useTranslation } from "react-i18next";

const StepOne = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-2 text-black">
      <h1 className="text-xl font-bold tracking-tight">
        {t("Course switcher 👆")}
      </h1>
      <p className="">
        {t("You can switch through your courses by clicking here.")}
        <ol className="space-y-2 mt-4 font-semibold">
          <li className="flex flex-row items-center ">
            {" "}
            <div
              className={"w-3 h-3 rounded-full mr-4 p-2 bg-yellowBloxDark"}
            />
            {t("The yellow dot means that the course is not published yet.")}
          </li>
          <li className="flex flex-row items-center ">
            {" "}
            <div className={"w-3 h-3 rounded-full p-2 mr-4 bg-lemonBloxDark"} />
            {t("The green dot means that the course is published.")}
          </li>
        </ol>
      </p>
    </div>
  );
};

export default StepOne;
