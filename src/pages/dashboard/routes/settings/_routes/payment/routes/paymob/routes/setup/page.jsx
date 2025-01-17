import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
  apiKey: z.string().min(1),
  // iframeID: z.string().min(1), // "iframeID" is required and should be a number
});

const PaymobSetupPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // form
  const form = useForm({
    resolver: zodResolver(formSchema),
    // TODO: Uncomment this
    defaultValues: {
      apiKey: "",
      // iframeID: "", // Set it to undefined initially
    },
  });

  // Loading state
  const [loading, setLoading] = useState();
  const paymentMethodsStore = usePaymentMethodsStore(); // Initialize the Zustand store

  //   Submit function
  const onSubmit = async (values) => {
    // console.log("Form submitted with values:", values);

    try {
      setLoading(true);

      // Call the updatePaymobIntegration function with the updated fields
      const result = await paymentMethodsStore.updatePaymobIntegration({
        api_key: values.apiKey,
        // iframe_id: values.iframeID,
      });

      setLoading(false);

      if (result.success) {
        toast.success("Updated!");
        navigate(`/${course_id}/settings/payment/paymob/iframe`);
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
    <div className="flex flex-row items-center w-full h-[90%] overflow-y-clip">
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
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAYMOB API Key</FormLabel>
                      <FormControl>
                        <Input
                          disable={loading}
                          placeholder="ZXlKaGJHY2lPaUpJVXpVe..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="iframeID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFRAME ID</FormLabel>
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
                disabled={loading}
                loading={loading}
              />
            </form>
          </Form>
        </div>
      </div>

      {/* Right div */}
      {/* Tutorial */}
      {/* Right Side */}
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

export default PaymobSetupPage;
