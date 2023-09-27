import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
// import NextButton from "../components/next-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import InstapayLogo from "@/assets/images/icons/instapay.webp";

// Form validator
const formSchema = z.object({
  paymentAddress: z.string().min(1),
  fullName: z.string().min(1), // "iframeID" is required and should be a number
});

const InstapaySetupPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // form
  const form = useForm({
    resolver: zodResolver(formSchema),
    // TODO: Uncomment this
    defaultValues: {
      paymentAddress: "",
      fullName: "", // Set it to undefined initially
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
      const result = await paymentMethodsStore.updateInstapayIntegration({
        instapay_address:
          values.paymentAddress.replace("@instapay", "").toLowerCase() +
          "@instapay",
        instapay_fullname: values.fullName,
        instapay_enabled: true,
      });

      setLoading(false);

      if (result.success) {
        toast.success("Updated!");
        navigate(`/${course_id}/settings/payment/instapay`);
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

  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center w-full h-[90%]">
      {/* Left div */}
      {/* Inputs */}
      <div className="flex-1 flex flex-col items-center justify-center h-full ">
        <div className="md:w-1/2 ">
          <div className="flex flex-row items-center space-x-2 mb-5">
            <img
              src={InstapayLogo}
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
                  name="paymentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Payment Address")}</FormLabel>
                      <FormControl>
                        <div className="flex flex-row items-center space-x-4">
                          <Input
                            disable={loading}
                            placeholder="ahmed"
                            className="w-fit"
                            {...field}
                          />
                          <span className="bg-gray-50 dark:bg-[#292929] py-2.5 px-1.5 rounded-md ">
                            @instapay
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Full Name (As shown in the App)")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disable={loading}
                          placeholder="Ahmed Zein Mahmoud"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <Button disabled={loading} className="ml-auto" type="submit">
              Save changes
            </Button> */}
              <Button onClick={() => {}} disabled={loading} loading={loading}>
                {t("Done")}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Right div */}
      {/* https://media.publit.io/file/instapay-howto.webp */}
      {/* Right Side */}
      <div className="bg-[#fdfdfd] dark:bg-transparent border-l  md:flex hidden flex-col flex-1 items-center justify-center h-full ">
        {/* bg-[#fdfdfd] */}
        {/* bg-gray-50 */}
        {/* right [place graphic] */}
        <div className="flex items-center justify-center h-full">
          <LazyLoadImage
            className="object-cover h-1/2 bg-blend-difference"
            src="https://media.publit.io/file/instapay-howto.webp"
            effect="blur"
            placeholderSrc="https://media.publit.io/file/instapay-howto.webp"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default InstapaySetupPage;
