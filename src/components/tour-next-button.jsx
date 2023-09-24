// import { useNavigate } from "react-router-dom";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const TourNextButton = (props) => {
  //   const navigate = useNavigate();

  const { onClick } = props;
  const { lastStep } = props;
  const { currentStep } = props;

  //   const {
  //     setTourStarted,
  //     setViewARSidePanel,
  //     setExpandedARView,
  //     setGoToApp,
  //     setGoToStore,
  //     setGoToPush,
  //     setGoToConnect,
  //     setGoToDocs,
  //     setGoToOverview,
  //     setGoToProfile,
  //     setGoToSettings,
  //   } = useStateContext();

  // for navigation

  return (
    <Button
      //   onClick={() => {
      //     // if they're normal steps then go to the next step
      //     if (!lastStep) {
      //       onClick();
      //     } else {
      //       // if it's the last step then
      //     }
      //   }}
      className="w-fit bg-black text-white hover:bg-[#242424] hover:text-white"
      onClick={() => {
        if (lastStep) {
          onClick();
          //   set in local storage that we started with completing the account so we can show the bottom overlay of account completion
          localStorage.setItem(
            "bxCompletion",
            JSON.stringify([false, false, false])
          );
          window.location.reload();
          return;
          // Each zero represents a step .. so payment method, course content, share
        } else {
          onClick();
        }
      }}
      //   variant='yellow'
    >
      <span className="text-[14px]">
        {lastStep ? "Let's do it! 🤩" : "Next"}
      </span>
      {lastStep ? null : <ArrowRight className="w-4 h-4 ml-2" />}
    </Button>
  );
};

export default TourNextButton;
