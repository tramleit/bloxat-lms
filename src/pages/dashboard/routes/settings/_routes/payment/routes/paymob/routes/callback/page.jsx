import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CreditCard } from "lucide-react";
import React, { useState } from "react";
import { ApiAlert } from "@/components/ui/api-alert";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import toast from "react-hot-toast";
import { Icons } from "@/components/icons";
import PaymobLogo from "@/assets/images/icons/paymob.webp";

const PaymobCallbackPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState();
  const paymentMethodsStore = usePaymentMethodsStore(); // Initialize the Zustand store

  //   Submit function
  const onDone = async () => {
    try {
      setLoading(true);

      // Call the updatePaymobIntegration function with the updated fields
      const result = await paymentMethodsStore.updatePaymobIntegration({
        paymob_enabled: true,
      });

      setLoading(false);

      if (result.success) {
        toast.success("Done!");
        navigate(`/${course_id}/settings/payment/paymob`);
        // Here we set that the payment method is set in the account completion ..
        // so we're updating the first number to 1 .. and leaving the rest of the numbers as they are
        // Get the existing array from local storage
        const completionData = JSON.parse(localStorage.getItem("bxCompletion"));
        // Check if completionData is an array
        if (Array.isArray(completionData)) {
          // Set the first element to 1 and leave the rest as they are
          completionData[0] = true;

          // Save the modified array back to local storage
          localStorage.setItem("bxCompletion", JSON.stringify(completionData));
        }
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center md:px-0 px-10 w-full h-[90%]">
      {/* Left div */}
      {/* Inputs */}
      <div className="flex-1 flex flex-col items-center justify-center h-full ">
        <div className=" ">
          <div className="flex flex-row items-center space-x-2 mb-5">
            <img
              src={PaymobLogo}
              alt="Paymob"
              className="w-[135px] h-auto"
              draggable={false}
            />
            <h1 className="font-bold text-2xl "> Setup</h1>
            {/* <CreditCard className="h-6 w-6" /> */}
          </div>
          {/* Content */}
          <div className="space-y-8 w-full">
            <ApiAlert
              title="Transaction Processed Callback"
              description="https://octopus-app-fypbq.ondigitalocean.app/api/v1/subscriptions"
              variant="public"
            />
            <ApiAlert
              title="Transaction Response Callback"
              description="https://bloxat.app/payment-redirect"
              variant="public"
            />
            <Button
              onClick={() => {
                onDone();
              }}
              className="space-x-1.5"
              disabled={loading}
            >
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Done</span>
              <Check className="h-4 w-4" />
            </Button>{" "}
          </div>
        </div>
      </div>

      {/* Right div */}
      {/* Tutorial */}
      <div className="border border-l border-gray-50 dark:border-[#121212] bg-gradient-to-b from-gray-50 via-transparent to-transparent dark:bg-gradient-to-b dark:from-[#121212] dark:via-transparent dark:to-transparent flex-1 md:flex hidden items-center justify-center h-full">
        right
      </div>
    </div>
  );
};

export default PaymobCallbackPage;
