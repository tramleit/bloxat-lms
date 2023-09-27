// import { useTranslation } from "react-i18next";
import StepOne from "@/components/tour-steps/step-one";
import StepTwo from "@/components/tour-steps/step-two";
import StepThree from "@/components/tour-steps/step-three";
import StepFour from "@/components/tour-steps/step-four";
import StepFive from "@/components/tour-steps/step-five";
import StepSix from "@/components/tour-steps/step-six";

const steps = [
  {
    selector: '[data-tour="1"]',
    content: <StepOne />,
    highlightedSelectors: [".ReactModal__Content"],
    mutationObservables: [".ReactModal__Overlay"],
  },
  {
    selector: '[data-tour="2"]',
    content: <StepTwo />,
  },
  {
    selector: '[data-tour="3"]',
    content: <StepThree />,
  },
  {
    selector: '[data-tour="4"]',
    content: <StepFour />,
  },
  {
    selector: '[data-tour="5"]',
    content: <StepFive />,
  },
  {
    selector: '[data-tour="6"]',
    content: <StepSix />,
  },
];

export default steps;
