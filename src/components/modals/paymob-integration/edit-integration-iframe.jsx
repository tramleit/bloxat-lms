import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
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
import usePaymentMethodsStore from "@/store/payment-methods/payment-methods-store";
import { Icons } from "@/components/icons";

// Form validation
const formSchema = z.object({
  liveID: z.string().min(1),
  iframeID: z.string().min(1),
});

export const EditIntegrationIFrameModal = ({
  isOpen,
  onClose,
  title,
  //   idName, // Field name to update // online_card_id
  initialIDValue, // null
  initialIFrameID,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      liveID:
        initialIDValue?.toString() == null ? "" : initialIDValue?.toString(),
      iframeID:
        initialIFrameID?.toString() == null ? "" : initialIFrameID?.toString(),
    },
  });

  const paymentMethodsStore = usePaymentMethodsStore();

  const onSubmit = async (values) => {
    // Check if the value is the same
    if (values.liveID == initialIDValue && values.iframeID == initialIFrameID) {
      toast.success("Saved");
      onClose();
      return;
    }

    try {
      setLoading(true);

      // Construct the update object
      const dataToUpdate = {
        online_card_id: values.liveID,
        online_card_iframe_id: values.iframeID,
      };

      // Call the updatePaymobIntegration function with the updated fields
      const result = await paymentMethodsStore.updatePaymobIntegration(
        dataToUpdate
      );

      if (result.success) {
        toast.success("Added!");
        // router.push(`/${params.courseId}/settings/payment/paymob`);
        window.location.reload();
      } else {
        toast.error("Something went wrong.");
      }

      setLoading(false);
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
      title={title}
      description="Find it in your Paymob under Developers -> Payment Integrations."
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Content */}
      <div>
        <div className="pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4  "
            >
              <FormField
                control={form.control}
                name="liveID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="1996183"
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
