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
import Editor from "@/components/editor";
import { Preview } from "@/components/preview";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const LessonDescriptionForm = ({ initialData,  lessonId }) => {
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
      toast.success("Lesson updated!");
      toggleEdit();
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("bxAuthToken"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.patch(
        `${BASE_URL}/lesson/details/${lessonId}`,
        values
      );
      toast.success("Lesson updated!");
      toggleEdit();
      // fetch the new data after success
      setData(response.data);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-[#1a1a1a] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Description
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
        <div
          className={cn(
            "text-sm mt-2",
            !data?.description && "text-slate-500 italic"
          )}
        >
          {!data?.description && "No description"}
          {data?.description && <Preview value={data?.description} />}
        </div>
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
                    <Editor {...field} />
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
