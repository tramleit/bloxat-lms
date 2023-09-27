import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import React from "react";
import { Icons } from "@/components/icons";

const PlanCard = ({
  duration,
  color,
  price,
  onClick,
  ctaText,
  disabled,
  loading,
  extraText,
}) => {
  const { t, i18n } = useTranslation();

  // To check the current language
  const currentLanguage = i18n.language;

  return (
    <>
      <Card className="w-[300px] hover:shadow-md transition-all duration-150 ease-in-out">
        <CardHeader className="flex flex-col space-y-3">
          <div className="flex flex-row items-center ">
            <h2
              className={`text-sm ${color} px-2 py-0.5 rounded-md font-semibold text-black`}
            >
              {duration}
            </h2>
            {extraText && (
              <span className="ml-2 font-semibold">{extraText}</span>
            )}

            {/* <span>eh</span> */}
          </div>
          <CardTitle className="font-bold text-3xl">{price} EGP</CardTitle>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-3 ">
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2 ">
              <Check className="h-4 w-4 text-[#01D95A]" />
              {currentLanguage === "ar" ? (
                <p>
                  {t("courses")}{" "}
                  <span className="font-semibold">{t("Unlimited")}</span>
                </p>
              ) : (
                <p>
                  <span className="font-semibold">{t("Unlimited")}</span>{" "}
                  {t("courses")}
                </p>
              )}
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              {currentLanguage === "ar" ? (
                <p>
                  {t("students")}{" "}
                  <span className="font-semibold">{t("Unlimited-b")}</span>
                </p>
              ) : (
                <p>
                  <span className="font-semibold">{t("Unlimited-b")}</span>{" "}
                  {t("students")}
                </p>
              )}
              {/* <p>
                <span className="font-semibold">Unlimited</span> students
              </p> */}
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">{t("All")}</span>{" "}
                {t("payment methods")}
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">{t("All")}</span>{" "}
                {t("features")}
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">{t("Renew")}</span>{" "}
                {t("anytime")}
              </p>
            </div>
          </div>
          <Button
            onClick={onClick}
            disabled={disabled}
            className="w-full mt-6 space-x-2"
            // variant="blue"
          >
            {/* if it's loading the show spinner */}
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {/* if it's not loading then show the text */}
            {!loading && ctaText}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default PlanCard;
