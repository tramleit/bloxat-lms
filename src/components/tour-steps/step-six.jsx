import { useTranslation } from "react-i18next";

const StepSix = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-2 text-black">
      <h1 className="text-xl font-bold tracking-tight">
        {t("It's that simple! 🙌💎")}
      </h1>
      <p className="font-semibold">
        {t("Now we need to make sure that your portal is ready to be used!")}
      </p>
      <p>{t("In three easy steps — takes 3 minutes")}</p>
      <ol className="space-y-1 font-semibold">
        <li>{t("1. Setup your payment method 💳")}</li>
        <li>{t("2. Add your course content 🧠")}</li>
        <li>{t("3. Share your portal and get paid! 💵")}</li>
      </ol>
    </div>
  );
};

export default StepSix;
