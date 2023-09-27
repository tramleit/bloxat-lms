import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import NextButton from "../components/next-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import PaymobLogo from "@/assets/images/icons/paymob.webp";

// Form validator
const formSchema = z.object({
  onlineCard: z.string().optional(),
  mobileWallet: z.string().optional(),
  // installment: z.string().optional(),
});

const PaymobIntegrationPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // form
  const form = useForm({
    resolver: zodResolver(formSchema),
    // TODO: Uncomment this
    defaultValues: {
      onlineCard: "",
      mobileWallet: "",
      // installment: "",
    },
  });

  //   Submit function
  // Loading state
  const [loading, setLoading] = useState();
  const paymentMethodsStore = usePaymentMethodsStore(); // Initialize the Zustand store

  //   Submit function
  const onSubmit = async (values) => {
    // console.log("Form submitted with values:", values);

    // Check if all fields are empty then show that at least one should be there
    if (values.onlineCard === "" && values.mobileWallet === "") {
      toast.error("Enter at least one ID");
      return;
    }

    try {
      setLoading(true);

      // Call the updatePaymobIntegration function with the updated fields
      const result = await paymentMethodsStore.updatePaymobIntegration({
        online_card_id: values.onlineCard ? values.onlineCard : null,
        online_card_enabled: values.onlineCard ? true : false,
        wallet_id: values.mobileWallet ? values.mobileWallet : null,
        wallet_enabled: values.mobileWallet ? true : false,
        // installment_id: values.installment ? values.installment : null,
        // installment_enabled: values.installment ? true : false,
      });

      setLoading(false);

      if (result.success) {
        toast.success("Updated!");
        navigate(`/${course_id}/settings/payment/paymob/callback`);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center w-full h-[90%]">
      {/* Left div */}
      {/* Inputs */}
      <div className="flex-1 flex flex-col items-center justify-center h-full ">
        <div className="md:w-1/2 ">
          <div className="flex flex-row items-center space-x-2 mb-5">
            <img
              src={PaymobLogo}
              alt="Paymob"
              className="w-[135px] h-auto"
              draggable={false}
            />
            <h1 className="font-bold text-2xl "> {t("Setup")}</h1>
            {/* <CreditCard className="h-6 w-6" /> */}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="grid grid-col-3 gap-8">
                <FormField
                  control={form.control}
                  name="onlineCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Online Card Live ID</FormLabel>
                      <FormControl>
                        <Input
                          disable={loading}
                          placeholder="369791"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileWallet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Wallet Live ID</FormLabel>
                      <FormControl>
                        <Input
                          disable={loading}
                          placeholder="369791"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="installment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instalment Live ID</FormLabel>
                      <FormControl>
                        <Input
                          disable={loading}
                          placeholder="369791"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
              {/* <Button disabled={loading} className="ml-auto" type="submit">
              Save changes
            </Button> */}
              <NextButton
                onClick={() => {}}
                disabled={false}
                loading={loading}
              />
            </form>
          </Form>
        </div>
      </div>

      {/* Right div */}
      {/* Tutorial */}
      <div className="bg-white md:flex hidden flex-col flex-1 items-center justify-center h-full ">
        {/* bg-[#fdfdfd] */}
        {/* bg-gray-50 */}
        {/* right [place graphic] */}
        <div className="flex items-center justify-center h-full">
          <LazyLoadImage
            className="object-cover h-1/2 bg-blend-difference"
            src="https://media.publit.io/file/integration-D.gif"
            effect="blur"
            placeholderSrc="https://media.publit.io/file/integration-D.gif"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymobIntegrationPage;
