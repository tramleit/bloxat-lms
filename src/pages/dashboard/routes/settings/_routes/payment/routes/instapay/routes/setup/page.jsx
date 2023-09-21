import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard } from "lucide-react";
import React, { useState } from "react";
// import NextButton from "../components/next-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import toast from "react-hot-toast";
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
    console.log("Form submitted with values:", values);

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
    <div className="flex flex-row items-center w-full h-[90%]">
      {/* Left div */}
      {/* Inputs */}
      <div className="flex-1 flex flex-col items-center justify-center h-full ">
        <div className="w-1/2 ">
          <div className="flex flex-row items-center space-x-2 mb-5">
            <img
              src={InstapayLogo}
              alt="Paymob"
              className="w-[135px] h-auto"
              draggable={false}
            />
            <h1 className="font-bold text-2xl "> Setup</h1>
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
                      <FormLabel>Payment Address</FormLabel>
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
                      <FormLabel>Full Name (As shown in the App)</FormLabel>
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
                Done
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Right div */}
      {/* Tutorial */}
      <div className="border border-l border-gray-50 dark:border-[#121212] bg-gradient-to-b from-gray-50 via-transparent to-transparent dark:bg-gradient-to-b dark:from-[#121212] dark:via-transparent dark:to-transparent flex-1 flex items-center justify-center h-full">
        right
      </div>
    </div>
  );
};

export default InstapaySetupPage;
