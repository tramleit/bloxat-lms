import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "@/config/api-base-config";
import { DAYS_FOR_TRIAL } from "@/config/subscription-config";
import SetupHeader from "../../_components/setup-header";
import Bottom from "../../_components/Bottom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { changeLanguage } from "@/config/i18n";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
            <div className="flex flex-col space-y-5 mt-6 w-1/4">
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
