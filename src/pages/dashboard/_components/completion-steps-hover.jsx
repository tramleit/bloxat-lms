import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Step from "./step";

export const CompletionStepsHover = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // Retrieve the value from local storage
  const completionData = JSON.parse(localStorage.getItem("bxCompletion"));

  return (
    <>
      {Array.isArray(completionData) &&
        !completionData.every((element) => element === true) && (
          <div className="absolute bottom-[-60px] hover:bottom-10 left-40 right-40 transition-all duration-200 ease-in-out z-50">
            {/* bottom-[-80px] hover:bottom-10 */}
            <div className=" bg-white dark:bg-[#262626] rounded-lg py-5 px-20 shadow-lg border ">
              {/* Skip button */}
              <Button
                className="absolute right-5 top-5"
                variant="secondary"
                size="sm"
                onClick={() => {
                  localStorage.setItem(
                    "bxCompletion",
                    JSON.stringify([true, true, true])
                  );
                  window.location.href = `/${course_id}`;
                  return;
                }}
              >
                Skip
              </Button>
              <div className="flex flex-row items-center justify-between ">
                <Step
                  stepNumber="1"
                  label="Payment Method"
                  description="Connect a payment method to your account"
                  onClick={() => {
                    navigate(`/${course_id}/settings/payment`);
                  }}
                  completed={
                    Array.isArray(completionData) && completionData[0] === true
                      ? true
                      : false
                  }
                  enableButton={
                    Array.isArray(completionData) && completionData[0] === false
                      ? true
                      : false
                  }
                  viewButton={false}
                />

                {/* <Separator className="flex-1 dark:bg-[#393939]" /> */}

                <Step
                  stepNumber="2"
                  label="Course Content"
                  description="Finish & publish your course"
                  onClick={() => {
                    navigate(`/${course_id}/edit`);
                  }}
                  completed={
                    Array.isArray(completionData) && completionData[1] === true
                      ? true
                      : false
                  }
                  enableButton={
                    Array.isArray(completionData) &&
                    completionData[0] === true &&
                    completionData[1] === false
                      ? true
                      : false
                  }
                  viewButton={false}
                />

                {/* <Separator className="flex-1 dark:bg-[#393939]" /> */}

                <Step
                  stepNumber="3"
                  label="View & Share"
                  description="View your portal as a student"
                  completed={
                    Array.isArray(completionData) && completionData[2] === true
                      ? true
                      : false
                  }
                  enableButton={false}
                  viewButton={
                    Array.isArray(completionData) &&
                    completionData[0] === true &&
                    completionData[1] === true &&
                    completionData[2] === false
                      ? true
                      : false
                  }
                  courseId={course_id}
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};
