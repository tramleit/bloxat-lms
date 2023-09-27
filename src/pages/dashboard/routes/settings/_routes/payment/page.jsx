import React, { useEffect, useState } from "react";
import { BackButton } from "@/components/back-button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ProviderCard from "./components/provider_card";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import Loading from "@/components/loading/loading";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PaymobLogo from "@/assets/images/icons/paymob.webp";
import InstapayLogo from "@/assets/images/icons/instapay.webp";
import { CurrencySwitch } from "./components/currency-switch";
import { useTranslation } from "react-i18next";
import PaymentSkeleton from "./components/skeleton";

const PaymentPage = () => {
  const { course_id } = useParams();

  const navigate = useNavigate();

  // Get the paymentMethods under the user
  // Add paymob methods if there's none
  const {
    paymentMethods,
    loading,
    addingPaymobIntegration,
    fetchPaymentMethods,
    addPaymobIntegration,
    updatePaymobIntegration,
    addInstapayIntegration,
    updateInstapayIntegration,
  } = usePaymentMethodsStore();

  // paymob loading
  const [paymobDisconnecting, setPaymobDisconnecting] = useState(false);
  // instapay loading
  const [instapayDisconnecting, setInstapayDisconnecting] = useState(false);

  // DISCONNECT FUNCTION
  // PAYMOB
  const paymobDisconnect = async () => {
    try {
      setPaymobDisconnecting(true);

      // Call the updatePaymobIntegration function with the updated fields
      const result = await updatePaymobIntegration({
        paymob_enabled: false,
      });

      setPaymobDisconnecting(false);

      if (result.success) {
        toast.success("Disconnected!");
        window.location.reload();
        // router.push(`/${params.courseId}/settings/payment/paymob`);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setPaymobDisconnecting(false);
    }
  };

  // DISCONNECT FUNCTION
  // INSTAPAY
  const instapayDisconnect = async () => {
    try {
      setInstapayDisconnecting(true);

      // Call the updatePaymobIntegration function with the updated fields
      const result = await updateInstapayIntegration({
        instapay_enabled: false,
      });

      setInstapayDisconnecting(false);

      if (result.success) {
        toast.success("Disconnected!");
        window.location.reload();
        // router.push(`/${params.courseId}/settings/payment/paymob`);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setInstapayDisconnecting(false);
    }
  };

  const { t } = useTranslation();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  if (loading) {
    return <PaymentSkeleton />;
  }

  // console.log(
  //   "paymentMethods",
  //   paymentMethods?.paymob_integrations?.length !== 0 &&
  //     paymentMethods?.paymob_integrations[0]?.paymob_enabled === true
  // );

  return (
    <div className="page-fade flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <BackButton
              onClick={() => {
                navigate(`/${course_id}/settings`);
              }}
            />
            <Heading
              title={t("Payment")}
              description={t("Set up payment on your portal.")}
            />
          </div>
          <CurrencySwitch />
        </div>
        <Separator />
        {/* Content */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          {/* Paymob */}
          <ProviderCard
            title="Paymob Accept"
            description={t(
              "Enable all card payments, mobile wallets, and installments."
            )}
            logo={PaymobLogo}
            connected={
              paymentMethods?.paymob_integrations?.[0] &&
              paymentMethods?.paymob_integrations[0]?.paymob_enabled === true
                ? true
                : false
            }
            onConnect={() => {
              // If there's already a paymob_methods object then just go to the setup
              if (paymentMethods?.paymob_integrations?.length !== 0) {
                navigate(`/${course_id}/settings/payment/paymob/setup`);
              } else {
                // if there's none then create the object and redirect to the setup page
                addPaymobIntegration(
                  `/${course_id}/settings/payment/paymob/setup`
                );
              }
            }}
            onEdit={() => {
              navigate(`/${course_id}/settings/payment/paymob`);
            }}
            onDisconnect={() => {
              paymobDisconnect();
            }}
            loading={addingPaymobIntegration || paymobDisconnecting}
          />
          {/* Instapay */}
          <ProviderCard
            title="Instapay"
            description={t("Accept payment on your Instapay address.")}
            logo={InstapayLogo}
            connected={
              paymentMethods?.instapay_integrations?.[0] &&
              paymentMethods?.instapay_integrations[0]?.instapay_enabled ===
                true
                ? true
                : false
            }
            onConnect={() => {
              // If there's already a paymob_methods object then just go to the setup
              if (paymentMethods?.instapay_integrations?.length !== 0) {
                navigate(`/${course_id}/settings/payment/instapay/setup`);
              } else {
                // if there's none then create the object and redirect to the setup page
                addInstapayIntegration(
                  `/${course_id}/settings/payment/instapay/setup`
                );
              }
            }}
            onEdit={() => {
              navigate(`/${course_id}/settings/payment/instapay`);
            }}
            onDisconnect={() => {
              instapayDisconnect();
            }}
          />
          {/* <ProviderCard /> */}
          {/* <ProviderCard /> */}
        </div>
        {/* <PaymentSettingsForm initialData={course} /> */}
      </div>
    </div>
  );
};

export default PaymentPage;
