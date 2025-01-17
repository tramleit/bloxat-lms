import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Banner } from "@/components/banner";
// import { useWarnings } from "@/hooks/use-warnings";
import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
import useIsMobile from "@/hooks/use-is-mobile";

const WarningsBanners = ({ warnings, courseId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Retrieve the value from local storage
  const completionData = JSON.parse(localStorage.getItem("bxCompletion"));

  const isMobile = useIsMobile();

  return (
    <>
      {/* If the completion account is [true, true, true] in local storage then we can show the warning banners if there's a warning because we're not in the setup completion mode */}
      {Array.isArray(completionData) &&
        completionData.every((element) => element === true) && (
          <>
            {" "}
            {/* If there's no payment method setup */}
            {warnings?.paymob_enabled === false &&
              warnings?.instapay_enabled === false && (
                <Banner
                  variant="warning"
                  label={t(
                    "Setup your payment method to accept payments from your students."
                  )}
                  button={
                    <Button
                      size="sm"
                      variant="blue"
                      className="ml-3"
                      onClick={() => {
                        navigate(`/${courseId}/settings/payment`);
                      }}
                    >
                      {isMobile ? t("Go") : t("Setup payment")}
                    </Button>
                  }
                />
              )}
            {/* If the course is unpublished */}
            {warnings?.isCoursePublished === false &&
              (warnings?.paymob_enabled === true ||
                warnings?.instapay_enabled === true) && (
                <Banner
                  variant="warning"
                  label={t(
                    "This course is not published. It will not be visible to your students."
                  )}
                  button={
                    <Button
                      size="sm"
                      variant="blue"
                      className="ml-3"
                      onClick={() => {
                        navigate(`/${courseId}/edit`);
                      }}
                    >
                      {isMobile ? t("Go") : t("Edit course")}
                      {/* <ArrowRight className="h-4 w-4 ml-2" /> */}
                    </Button>
                  }
                />
              )}
          </>
        )}
    </>
  );
};

export default WarningsBanners;
