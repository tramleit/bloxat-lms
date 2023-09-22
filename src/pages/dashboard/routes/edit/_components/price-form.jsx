import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import useCourseContentStore from "@/store/courses/course-content";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config/api-base-config";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/format-price";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({ initialData, courseId, updateUI }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const [data, setData] = useState(initialData);
  const [currency, setCurrency] = useState(initialData?.currency);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // SELECT
  // FOR THE CURRENCY
  const handleSelectCurrency = (value) => {
    // const { value } = event.target;
    setCurrency(value); // Convert the string value to a boolean
  };

  const onSubmit = async (values) => {
    if (!values.price) {
      toast.error("Set a price");
      return;
    }

    // if the data is the same as the previous then no need to hit the server
    if (
      values.price == initialData?.price &&
      currency == initialData?.currency
    ) {
      toast.success("Course updated!");
      toggleEdit();
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("bxAuthToken"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.patch(
        `${BASE_URL}/courses/details/${courseId}`,
        {
          price: values.price,
          currency: currency,
        }
      );
      toast.success("Course updated!");
      toggleEdit();
      console.log(response.data);
      // fetch the new data after success
      setData(response.data);
      updateUI(response.data.price);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-[#1a1a1a] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !data?.price && "text-slate-500 italic"
          )}
        >
          {data?.price ? formatPrice(data?.price, data?.currency) : "No price"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <div className="flex flex-row items-center space-x-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        // className="w-fit"
                        disabled={isSubmitting}
                        placeholder="Set a price for your course"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2">
                {/* SELECT CURRENCY */}
                <Select
                  defaultValue={currency} // Convert the boolean to a string for the select value
                  value={currency}
                  onValueChange={handleSelectCurrency}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EGP">
                      <div className="flex flex-row items-center space-x-2 pr-2">
                        <span>EGP</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="SAR">
                      <div className="flex flex-row items-center space-x-2 pr-2">
                        <span>SAR</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="AED">
                      <div className="flex flex-row items-center space-x-2 pr-2">
                        <span>AED</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="KWD">
                      <div className="flex flex-row items-center space-x-2 pr-2">
                        <span>KWD</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="OMR">
                      <div className="flex flex-row items-center space-x-2 pr-2">
                        <span>OMR</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="QAR">
                      <div className="flex flex-row items-center space-x-2 pr-2">
                        <span>QAR</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
