import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/config/i18n";
import SetupHeader from "../../_components/setup-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const LangSetupPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <SetupHeader />
        {/* End Header */}
        {/* Content */}
        <div className="flex flex-row items-center h-full">
          {/* Left Side */}
          <div className="flex flex-col flex-1 items-center justify-center h-full text-center">
            <div className="flex flex-col space-y-2 ">
              <h1 className="text-3xl font-bold tracking-tight">
                {"Let's setup your portal!"} <span className="wave">👋</span>
              </h1>
              <p className="text-muted-foreground">Process takes 2 minutes</p>
            </div>
            <Separator className="mt-4 w-1/5" />
            <h2 className="mt-6 text-xl font-bold ">
              {t("Choose a language")}
            </h2>
            <div className="flex flex-col space-y-5 mt-6 md:w-[300px] w-full md:px-0 px-10">
              <Button
                variant="yellow"
                size="lg"
                onClick={() => {
                  changeLanguage("en");
                  navigate("/setup");
                }}
              >
                English
              </Button>
              <Button
                variant="yellow"
                size="lg"
                onClick={() => {
                  changeLanguage("ar");
                  navigate("/setup");
                }}
              >
                العربية
              </Button>
            </div>
          </div>
        </div>
        {/* End Content */}
        {/* Bottom Part */}
        {/* <Bottom
          onClick={() => {
            updateBrandName();
          }}
          disabled={loading}
        /> */}
        {/* End Bottom */}
      </div>
    </>
  );
};

export default LangSetupPage;
