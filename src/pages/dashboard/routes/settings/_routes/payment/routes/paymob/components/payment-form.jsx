import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form validator
const formSchema = z.object({
  apiKey: z.string().min(1),
});

export const PaymobSettingsForm = ({ initialData }) => {
  // const { course_id } = useParams();
  // const navigate = useNavigate();

  //   const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  //   Submit function
  const onSubmit = async () => {
    // console.log(data);

    try {
      setLoading(true);
      //   await axios.patch("/api/stores/${params.courseId}", data);
      // router.refresh();
      toast.success("Payment Updated");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className="flex items-center justify-between">
        <div className="flex flex-row space-x-4 items-center">
          <BackButton
            onClick={() => {
              router.back();
            }}
          />

          <Heading
            title="Payment"
            description="Set up payment on your portal."
          />
        </div>
      </div>
      <Separator /> */}
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
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFRAME ID</FormLabel>
                  <FormControl>
                    <Input disable={loading} placeholder="369791" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      {/* <ApiAlert
        title="Transaction Processed Callback"
        description="https://octopus-app-fypbq.ondigitalocean.app/api/v1/subscriptions"
        variant="public"
      />
      <ApiAlert
        title="Transaction Response Callback"
        description="https://bloxat.app/payment-redirect"
        variant="public"
      /> */}
    </>
  );
};
