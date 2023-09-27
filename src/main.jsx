// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-phone-input-2/lib/material.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ThemeProvider } from "@/providers/theme-provider.jsx";
import { TourProvider } from "@reactour/tour";
import steps from "@/lib/tour-steps";
import TourNextButton from "@/components/tour-next-button.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider attribute="class" defaultTheme="light">
    <TourProvider
      steps={steps}
      startAt={0}
      disableKeyboardNavigation={true}
      disableDotsNavigation={true}
      onClickMask={() => {}}
      styles={{
        popover: (base) => ({
          ...base,
          "--reactour-accent": "#000",
          borderRadius: 10,
        }),
        maskArea: (base) => ({ ...base, rx: 10 }),
        maskWrapper: (base) => ({ ...base, color: "#000" }),
        badge: (base) => ({ ...base, left: "auto", right: "-0.8125em" }),
        close: (base) => ({ ...base, left: "auto", right: 8, top: 8 }),
      }}
      prevButton={() => {
        return <></>;
      }}
      nextButton={({
        // Button,
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        const last = currentStep === stepsLength - 1;
        const thisStep = currentStep;
        return (
          <TourNextButton
            lastStep={last}
            currentStep={thisStep}
            onClick={() => {
              if (last) {
                setIsOpen(false);
              } else {
                setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
              }
            }}
          />
        );
      }}
      badgeContent={({ totalSteps, currentStep }) =>
        currentStep + 1 + "/" + totalSteps
      }
      showBadge={false}
      // showCloseButton={enabledParts.includes("close")}
      showCloseButton={false}
      showNavigation={true}
      showPrevNextButtons={true}
      showDots={false}
    >
      <App />
    </TourProvider>
  </ThemeProvider>
);

//  <React.StrictMode></React.StrictMode>

// <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
