import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { Button } from "@/components/ui/button";
import { supportedCurrencies } from "@/lib/currencies-supported-list";
import { BASE_URL } from "@/config/api-base-config";
import { Icons } from "@/components/icons";

export const CurrencySwitch = () => {
  const currentUser = useCurrentUser();

  const [currency, setCurrency] = useState(currentUser?.brand_currency);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  // SELECT
  // FOR THE CURRENCY
  const handleSelectCurrency = async (value) => {
    // const { value } = event.target;
    setCurrency(value); // Convert the string value to a boolean

    // Update
    if (value == currentUser?.brand_currency) {
      toast.success("Currency updated!");

      return;
    }

    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("bxAuthToken"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // const response = await axios.put(
      //   `${BASE_URL}/users/brand/currency/${currentUser?.user_id}`,
      //   {
      //     brand_currency: value,
      //   }
      // );

      await axios.put(
        `${BASE_URL}/users/brand/currency/${currentUser?.user_id}`,
        {
          brand_currency: value,
        }
      );

      toast.success("Currency updated!");
      setLoading(false);

      // console.log(response.data);
    } catch {
      toast.error("Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center space-x-3">
      <span className="text-sm font-semibold">{t("Currency")} </span>
      <div className="grid gap-2">
        {/* SELECT CURRENCY */}
        <Select
          defaultValue={currency} // Convert the boolean to a string for the select value
          value={currency}
          onValueChange={handleSelectCurrency}
          disabled={loading}
        >
          <SelectTrigger id="currency">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {supportedCurrencies?.map((currency) => (
              <SelectItem value={currency} key={currency}>
                <div className="flex flex-row items-center space-x-2 pr-2">
                  <span>{currency}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
    </div>
  );
};
