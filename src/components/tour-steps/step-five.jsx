import { useTranslation } from "react-i18next";

const StepFive = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-2 text-black">
      <h1 className="text-xl font-bold tracking-tight">{t("Settings ⚙️")}</h1>
      <p className="">
        {t("Manage your portal settings")}
        <ol className="space-y-2 font-semibold mt-4">
          <li>
            1. {t("Change your-b")}{" "}
            <span className="font-bold mx-[0.5px]">
              {t("account information")}
            </span>{" "}
            🔑
          </li>
          <li>
            2. {t("Change the")}{" "}
            <span className="font-bold mx-[0.5px]">{t("logo")}</span>{" "}
            {t("and branding of your portal")} 🖼️
          </li>
          <li>
            3. {t("Change the-c")}{" "}
            <span className="font-bold mx-[0.5px]">
              {t("payment method-c")}
            </span>{" "}
            {t("of your portal-c")} 💳
          </li>
          <li>
            4. {t("Check your")}{" "}
            <span className="font-bold mx-[0.5px]">{t("Bloxat plan")}</span> 🚀
          </li>
        </ol>
      </p>
    </div>
  );
};

export default StepFive;
