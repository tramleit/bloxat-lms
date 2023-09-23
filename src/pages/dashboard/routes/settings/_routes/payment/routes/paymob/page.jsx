import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "@/components/back-button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import MethodCard from "./components/method_card";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import Loading from "@/components/loading/loading";
import toast from "react-hot-toast";
import { EditConnectionModal } from "@/components/modals/paymob-integration/edit-connection";
import CardsIcon from "@/assets/images/icons/all-cards.webp";
import WalletsIcon from "@/assets/images/icons/wallets.webp";

const PaymobPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const {
    paymobIntegration,
    loading,
    updatePaymobIntegration,
    fetchPaymobIntegration,
  } = usePaymentMethodsStore();

  // Loading state
  const [switching, setSwitching] = useState(false);

  // SWITCH METHOD FUNCTION
  const switchMethod = async (data) => {
    try {
      setSwitching(true);
      toast.loading("Loading");

      // Call the updatePaymobIntegration function with the updated fields
      const result = await updatePaymobIntegration(data);

      setSwitching(false);
      toast.dismiss();

      if (result.success) {
        toast.success("Done!");
        // router.push(`/${params.courseId}/settings/payment/paymob`);
        window.location.reload();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setSwitching(false);
      toast.dismiss();
    }
  };

  // EDIT CONNECTION MODAL
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPaymobIntegration();
  }, []);

  // console.log("paymob integration", paymobIntegration);

  // loading
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <EditConnectionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialApiKey={paymobIntegration?.paymob_integrations[0].api_key}
        // initialIframeId={paymobIntegration?.paymob_integrations[0].iframe_id}
        // idName={switchId}
        // initialIDValue={integrationID}
        // onConfirm={onDisconnect}
        // loading={loading}
      />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-row space-x-4 items-center">
              <BackButton
                onClick={() => {
                  navigate(`/${course_id}/settings/payment`);
                }}
              />
              <Heading
                title="Paymob Accept"
                description="Connect your Paymob account with Bloxat."
              />
            </div>
            <div className="flex flex-row items-center">
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Edit Connection
              </Button>
            </div>
          </div>
          <Separator />
          {/* Content */}
          {/* <PaymobSettingsForm /> */}
          <div className="grid grid-cols-3 gap-5">
            {/* Payment methods */}
            {/* Credit and Debit Cards */}
            <MethodCard
              title="Credit and Debit Cards"
              icon={CardsIcon}
              width="w-[140px]"
              enabled={
                paymobIntegration?.paymob_integrations[0]
                  ?.online_card_enabled == true
                  ? true
                  : false
              }
              integrationID={
                paymobIntegration?.paymob_integrations[0]?.online_card_id
              }
              switchMethod={() => {
                switchMethod({
                  online_card_enabled:
                    !paymobIntegration?.paymob_integrations[0]
                      ?.online_card_enabled,
                });
              }}
              disabledInputs={switching}
              switchId="online_card_id"
              enabledName="online_card_enabled"
              iframeRequired={true}
              initialIFrameID={
                paymobIntegration?.paymob_integrations[0]?.online_card_iframe_id
              }
            />
            {/* Mobile Wallets */}
            <MethodCard
              title="Mobile Wallets"
              icon={WalletsIcon}
              width="w-[280px]"
              enabled={
                paymobIntegration?.paymob_integrations[0]?.wallet_enabled ==
                true
                  ? true
                  : false
              }
              integrationID={
                paymobIntegration?.paymob_integrations[0]?.wallet_id
              }
              switchMethod={() => {
                switchMethod({
                  wallet_enabled:
                    !paymobIntegration?.paymob_integrations[0]?.wallet_enabled,
                });
              }}
              disabledInputs={switching}
              switchId="wallet_id"
              enabledName="wallet_enabled"
              iframeRequired={false}
            />
            {/* Installments */}
            {/* <MethodCard
              title="Installments"
              icon="/images/icons/installments.webp"
              width="w-[280px]"
              enabled={
                paymobIntegration?.paymob_integrations[0]
                  ?.installment_enabled == true
                  ? true
                  : false
              }
              integrationID={
                paymobIntegration?.paymob_integrations[0]?.installment_id
              }
              switchMethod={() => {
                switchMethod({
                  installment_enabled:
                    !paymobIntegration?.paymob_integrations[0]
                      ?.installment_enabled,
                });
              }}
              disabledInputs={switching}
              switchId="installment_id"
              enabledName="installment_enabled"
            /> */}
          </div>
          <div className="h-1"></div>
          {/* <Separator /> */}
          <h2 className="text-xl font-semibold">Integration Callbacks</h2>
          <ApiAlert
            title="Transaction Processed Callback"
            description="https://octopus-app-fypbq.ondigitalocean.app/api/v1/paymob/enroll"
            variant="public"
          />
          <ApiAlert
            title="Transaction Response Callback"
            description="https://bloxat.app/payment-redirect"
            variant="public"
          />
          {/* <PaymentSettingsForm initialData={course} /> */}
        </div>
      </div>
    </>
  );
};

export default PaymobPage;
