import { useTranslation } from "react-i18next";

const StepTwo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-2 text-black">
      <h1 className="text-xl font-bold tracking-tight">{t("Quick ✨")}</h1>
      <p className="">
        {t("Here you can quickly access what you need")}
        <ol className="space-y-2 font-semibold mt-4">
          <li className="flex flex-row items-center space-x-2">
            1. {t("Add a")}{" "}
            <span className="font-bold  mx-1">{t("new course")}</span> 📦
          </li>
          <li className="flex flex-row items-center space-x-2">
            2. {t("Manage your")}{" "}
            <span className="font-bold  mx-1">{t("course content")}</span>
            👨‍💻
          </li>
          <li className="flex flex-row items-center space-x-2">
            3. {t("Change your")}{" "}
            <span className="font-bold  mx-1">{t("payment method")}</span> 💳
          </li>
          <li className="flex flex-row items-center space-x-2">
            4. <span className="font-bold  mx-1">{t("View-b")}</span>{" "}
            {t("your portal")}
            👀
          </li>
        </ol>
      </p>
    </div>
  );
};

export default StepTwo;
