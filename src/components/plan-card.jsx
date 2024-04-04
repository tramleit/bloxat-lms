import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
// import React from "react";
import { Icons } from "@/components/icons";
import { premium_features_list } from "@/config/subscription-config";
import { cn } from "@/lib/utils";
import {
  basic_features_list,
  basic_missing_list,
} from "../config/subscription-config";

const PlanCard = ({
  plan,
  // color,
  price,
  anchorPrice,
  onClick,
  ctaText,
  disabled,
  loading,
  extraText,
}) => {
  const { t } = useTranslation();

  // To check the current language
  // const currentLanguage = i18n.language;

  return (
    <>
      <Card
        className={cn(
          "w-[340px] dark:bg-white dark:text-black hover:shadow-md transition-all duration-150 ease-in-out",
          plan === "Premium ⚡" && "bg-[#F4F5FF] dark:bg-[#F4F5FF]"
        )}
      >
        <CardHeader className="flex flex-col space-y-3">
          <div className="flex flex-row items-center ">
            <h2
              className={`text-sm py-0.5 rounded-md font-semibold text-black`}
            >
              {plan}
            </h2>
            {extraText && (
              <span className="ml-2 font-semibold">{extraText}</span>
            )}

            {/* <span>eh</span> */}
          </div>
          <div className="flex flex-row items-end space-x-2">
            <CardTitle className="font-bold text-3xl">
              <span>$</span>
              <span>{price}</span>
            </CardTitle>
            <p className=" line-through text-black/60">${anchorPrice}</p>
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-3 ">
            {plan === "Premium ⚡" ? (
              <>
                {premium_features_list.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center space-x-2"
                  >
                    <Check className="h-4 w-4 text-[#01D95A]" />{" "}
                    <p>{t(item)}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                {basic_features_list.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center space-x-2"
                  >
                    <Check className="h-4 w-4 text-[#01D95A]" />{" "}
                    <p>{t(item)}</p>
                  </div>
                ))}
                {basic_missing_list.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center space-x-2"
                  >
                    <X className="h-4 w-4 text-black/60" />{" "}
                    <p className="text-black/60">{t(item)}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <Button
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "w-full mt-6 space-x-2 dark:bg-black dark:text-white",
              plan === "Premium ⚡" &&
                "bg-[#8473FF] hover:bg-[#9283ff] dark:bg-[#8473FF] dark:hover:bg-[#9283ff] dark:text-white"
            )}

            // #8473FF
            // variant="blue"
          >
            {/* if it's loading the show spinner */}
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {/* if it's not loading then show the text */}
            {!loading && ctaText}
          </Button>
          <p className="mt-3 text-sm flex items-center justify-center">
            {t("One-time payment, then")}{" "}
            <span className="underline ml-1">{t("it's yours forever.")}</span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default PlanCard;
