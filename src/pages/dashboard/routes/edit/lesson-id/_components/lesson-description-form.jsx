import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Edit, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
// import useCourseContentStore from "@/store/courses/course-content";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { BASE_URL } from "@/config/api-base-config";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Editor from "@/components/editor";
import { Preview } from "@/components/preview";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const LessonDescriptionForm = ({ initialData, lessonId }) => {
  const { t } = useTranslation();
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
    <div className="mt-6 border bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {t("Lesson Description")}
        {!data?.description && !isEditing && (
          <Button
            onClick={toggleEdit}
            className="bg-blueBlox hover:bg-blueBloxLight text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("Add")}
          </Button>
        )}
        {isEditing && (
          <Button onClick={toggleEdit} variant="ghost">
            {t("Cancel")}
          </Button>
        )}
        {!isEditing && data?.description && (
          <Button onClick={toggleEdit} variant="ghost">
            <Edit className="h-4 w-4 mr-2" />
            {t("Edit")}
          </Button>
        )}
        {/*  */}
        {/* <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button> */}
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !data?.description && "text-slate-500 italic"
          )}
        >
          {!data?.description && t("No description")}
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
                {t("Save")}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
