import { Banner } from "@/components/banner";
import { useWarnings } from "@/hooks/use-warnings";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WarningsBanners = ({ warnings, courseId }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* If there's no payment method setup */}
      {warnings?.paymob_enabled === false &&
        warnings?.instapay_enabled === false && (
          <Banner
            variant="warning"
            label="Setup your payment method to accept payments from your students."
            button={
              <Button
                size="sm"
                className="ml-3 bg-blue-500 text-white hover:bg-blue-400"
                onClick={() => {
                  navigate(`/${courseId}/settings/payment`);
                }}
              >
                Setup payment
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
            label="This course is not published. It will not be visible to your students."
            button={
              <Button
                size="sm"
                className="ml-3 bg-blue-500 text-white hover:bg-blue-400"
                onClick={() => {
                  navigate(`/${courseId}/edit`);
                }}
              >
                Edit course
              </Button>
            }
          />
        )}
    </>
  );
};

export default WarningsBanners;
