import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Edit, Pencil, Plus } from "lucide-react";
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

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const [data, setData] = useState(initialData);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    // if the data is the same as the previous then no need to hit the server
    if (values.description == initialData?.description) {
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
          description: values.description,
        }
      );
      toast.success("Course updated!");
      toggleEdit();
      // fetch the new data after success
      setData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Description
        {!data?.description && !isEditing && (
          <Button onClick={toggleEdit} variant="yellow">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        )}
        {isEditing && (
          <Button onClick={toggleEdit} variant="ghost">
            Cancel
          </Button>
        )}
        {!isEditing && data?.description && (
          <Button onClick={toggleEdit} variant="ghost">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
      {!isEditing && (
        <p
          className={cn(
            "mt-2",
            !data?.description && "text-slate-500 italic"
          )}
        >
          {data?.description || "No description"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="eg: This course is designed to ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
