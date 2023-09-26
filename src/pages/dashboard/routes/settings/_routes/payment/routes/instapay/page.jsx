import * as z from "zod";
import { useForm } from "react-hook-form";
import { BackButton } from "@/components/back-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import Loading from "@/components/loading/loading";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Form validator
const formSchema = z.object({
  paymentAddress: z.string().min(1),
  fullName: z.string().min(1), // "iframeID" is required and should be a number
});

const InstapayPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const { instapayIntegration, loading, fetchInstapayIntegration } =
    usePaymentMethodsStore();

  // Declare the form object
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentAddress: "",
      fullName: "",
    },
  });

  useEffect(() => {
    fetchInstapayIntegration();
  }, []);

  useEffect(() => {
    if (
      instapayIntegration &&
      instapayIntegration.instapay_integrations.length > 0
    ) {
      const { instapay_address, instapay_fullname } =
        instapayIntegration.instapay_integrations[0];
      // Update the form values directly in the defaultValues
      form.setValue(
        "paymentAddress",
        instapay_address.replace("@instapay", "") || ""
      );
      form.setValue("fullName", instapay_fullname || "");
    }
  }, [instapayIntegration, form]);

  // form
  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   // TODO: Uncomment this
  //   defaultValues: {
  //     paymentAddress: instapayIntegration?.instapay_integrations[0]
  //       ?.instapay_address
  //       ? instapayIntegration?.instapay_integrations[0]?.instapay_address
  //       : "",
  //     fullName: instapayIntegration?.instapay_integrations[0]?.instapay_fullname
  //       ? instapayIntegration?.instapay_integrations[0]?.instapay_fullname
  //       : "",
  //   },
  // });

  // console.log(
  //   "dfdfdfdf",
  //   instapayIntegration?.instapay_integrations[0]?.instapay_address
  // );

  // Loading state
  const [loadingForm, setLoadingForm] = useState();
  const paymentMethodsStore = usePaymentMethodsStore(); // Initialize the Zustand store

  //   Submit function
  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);

    // check if the values are the same as the current
    if (
      instapayIntegration?.instapay_integrations[0]?.instapay_address.replace(
        "@instapay",
        ""
      ) == values?.paymentAddress &&
      instapayIntegration?.instapay_integrations[0]?.instapay_fullname ==
        values?.fullName
    ) {
      toast.success("Saved!");
      return;
    }

    try {
      setLoadingForm(true);

      // Call the updatePaymobIntegration function with the updated fields
      const result = await paymentMethodsStore.updateInstapayIntegration({
        instapay_address:
          values.paymentAddress.replace("@instapay", "").toLowerCase() +
          "@instapay",
        instapay_fullname: values.fullName,
        instapay_enabled: true,
      });

      setLoadingForm(false);

      if (result.success) {
        toast.success("Updated!");
        window.location.reload();
        // router.push(`/${params.courseId}/settings/payment/instapay`);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setLoadingForm(false);
    }
  };

  const { t } = useTranslation();

  // loading
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
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
              title="Instapay"
              description={t("Connect your Instapay account with Bloxat.")}
            />
          </div>
          <div className="flex flex-row items-center">
            {/* <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Edit Connection
            </Button> */}
          </div>
        </div>
        <Separator />
        {/* Content */}
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8"
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
                            disable={loadingForm}
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
                          disable={loadingForm}
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
              <div className="w-fit">
                <Button
                  onClick={() => {}}
                  disabled={loadingForm}
                  loading={loadingForm}
                >
                  {t("Save changes")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {/* <PaymobSettingsForm /> */}

        {/* <Separator /> */}

        {/* <PaymentSettingsForm initialData={course} /> */}
      </div>
    </div>
  );
};

export default InstapayPage;
