import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react-web";
import { cn } from "@/lib/utils";
import { changeLanguage } from "@/config/i18n";
import { buttonVariants } from "@/components/ui/button";
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"
// import { useEffect, useState } from "react";
// import Lottie from "lottie-react-web";
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"
import rotate from "@/assets/lotties/rotate.json";
import { SignupForm } from "../../_components/signup-form";
import Logo from "@/assets/images/logo/bloxat-white.webp";
import LogoDark from "@/assets/images/logo/bloxat-black.webp";

import useIsMobile from "@/hooks/use-is-mobile";
import { Button } from "@/components/ui/button";
import SupportHover from "@/components/support-hover";
// export const metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// };

const Signup = () => {
  const isMobile = useIsMobile();

  const { t } = useTranslation();

  const currentLanguage = localStorage.getItem("bxSelectedLanguage") || "en";

  const [langState, setLangState] = useState(currentLanguage);

  return (
    <>
      <SupportHover showRequiresAuth={false} />
      <div className="container relative  h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8 flex flex-row items-center space-x-4">
          {langState === "en" ? (
            <Button
              variant="ghost"
              onClick={() => {
                changeLanguage("ar");
                setLangState("ar");
              }}
            >
              العربية
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                changeLanguage("en");
                setLangState("en");
              }}
            >
              English
            </Button>
          )}
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "secondary" }), "")}
          >
            {t("Login")}
          </Link>
        </div>

        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex overflow-y-clip">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="flex items-center justify-center h-full text-black z-10">
            <div className="relative flex w-[330px]">
              <Lottie
                options={{
                  animationData: rotate,
                  loop: true,
                }}
                speed={0.5}
              />
            </div>
          </div>
          {/* LOGO */}
          <div className="absolute left-4 top-4 md:left-8 md:top-8 z-10">
            <img
              src={Logo}
              alt="Logo"
              className="h-[22px] w-auto"
              // width={0}
              // height={900}
              draggable={false}
            />
          </div>
        </div>
        <div className="fade-up lg:p-8">
          <div className="mx-auto flex md:w-[350px] w-screen md:px-0 px-10 flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 justify-center items-center   text-center mt-10">
              {/* Mobile only visible logo */}
              {isMobile && (
                <img
                  src={LogoDark}
                  className="w-[100px] h-auto mb-3"
                  alt="Bloxat Logo"
                  draggable={false}
                />
              )}
              <h1 className="text-2xl font-semibold tracking-tight md:flex hidden">
                {t("Create your Bloxat account")}
              </h1>
            </div>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="https://bloxat.com/terms-of-service/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="https://bloxat.com/privacy-policy/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
