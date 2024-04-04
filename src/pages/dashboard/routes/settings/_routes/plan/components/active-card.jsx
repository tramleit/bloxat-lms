import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  basic_features_list,
  basic_missing_list,
  premium_features_list,
} from "@/config/subscription-config";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { startPaymentProcess } from "@/hooks/use-paymob";
import { UPGRADE_PRICE_EGP } from "@/config/subscription-config";
import { Icons } from "@/components/icons";

const ActiveCard = ({
  currentUser,
  planName,
  daysRemaining,
  showRemaining,
  title,
  color,
  textColor,
}) => {
  const { t } = useTranslation();

  // To check the current language
  // const currentLanguage = i18n.language;

  // console.log("currentLanguage", planName);

  const [loading, setLoading] = useState(false);

  // FOR YEARLY
  const currentDate = new Date(); // Get the current date and time
  // const currentDate = new Date(); // Get the current date and time
  const afterYearDate = new Date(currentDate); // Create a copy of the current date
  // Set the date to be one year from the current date
  afterYearDate.setFullYear(currentDate.getFullYear() + 1);

  // Format the future date as a string in "YYYY-MM-DDTHH:mm:ss.sssZ" format
  const formattedAfterYearDate = afterYearDate.toISOString();

  return (
    <>
      <Card className="w-[300px] hover:shadow-md transition-all duration-150 ease-in-out dark:bg-[#141414]">
        <CardHeader className="flex flex-col space-y-3">
          <div className="flex flex-row items-center justify-between">
            <h2
              className={`text-sm ${color} px-2 py-0.5 rounded-md font-semibold ${textColor}`}
            >
              {planName}
            </h2>
            {/* <span>eh</span> */}
          </div>
          <CardTitle className="flex flex-row items-center space-x-2 font-bold text-3xl">
            <span>{title}</span> <Check className="h-6 w-6 text-[#01D95A]" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-3 ">
            {planName === "PREMIUM subscription" ? (
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
                    <X className="h-4 w-4 text-foreground/60" />{" "}
                    <p className="text-foreground/60">{t(item)}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* if showRemaining is true then show them the remaining days */}
          {showRemaining && (
            <div className="mt-5 w-full bg-gray-50 flex items-center justify-center p-3 font-semibold rounded-md text-gray-500">
              {daysRemaining} days remaining
            </div>
          )}
          {planName !== "PREMIUM subscription" && (
            <Button
              variant="blue"
              className="w-full mt-6"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                startPaymentProcess(
                  UPGRADE_PRICE_EGP,
                  "EGP",
                  "premium",
                  formattedAfterYearDate,
                  currentUser?.first_name,
                  currentUser?.last_name,
                  currentUser?.email,
                  currentUser?.phone_number,
                  currentUser?.user_id,
                  currentDate,
                  "card"
                );
              }}
            >
              {/* if it's loading the show spinner */}
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Upgrade to premium
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ActiveCard;
