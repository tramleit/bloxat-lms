import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import { Icons } from "@/components/icons";

// Form validation
const formSchema = z.object({
  apiKey: z.string().min(1),
  iframeID: z.string().min(1),
});

export const EditConnectionModal = ({
  isOpen,
  onClose,
  initialApiKey,
  initialIframeId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: initialApiKey,
      iframeID: initialIframeId?.toString(),
    },
  });

  const paymentMethodsStore = usePaymentMethodsStore();

  //   Submit function
  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);

    // Check if the value is the same
    if (values.apiKey == initialApiKey && values.iframeID == initialIframeId) {
      toast.success("Saved");
      onClose();
      return;
    }

    try {
      setLoading(true);

      // Call the updatePaymobIntegration function with the updated fields
      const result = await paymentMethodsStore.updatePaymobIntegration({
        api_key: values.apiKey,
        iframe_id: values.iframeID,
      });

      setLoading(false);

      if (result.success) {
        toast.success("Updated!");
        window.location.reload();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={"Edit Paymob Connection"}
      description="Change your Paymob account details"
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Content */}
      <div>
        <div className="  pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAYMOB API Key</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="ZXlKaGJHY2lPaUpJVXpVe..."
                        {...field}
                      />
                    </FormControl>
                    {/* To show for validation if there's a problem */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="iframeID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFRAME ID</FormLabel>
                    <FormControl>
                      <Input
                        // disable={loading}
                        placeholder="369791"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};