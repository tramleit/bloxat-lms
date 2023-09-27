import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/config/api-base-config";
import { Icons } from "@/components/icons";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const LessonTitleForm = ({
  initialData,

  lessonId,
  updateUI, // Add this prop
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const [data, setData] = useState(initialData);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    // if the data is the same as the previous then no need to hit the server
    if (values.title == initialData?.title) {
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

      // Update the state
      updateUI(response.data);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {t("Lesson title")}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>{t("Cancel")}</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {t("Edit")}
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2">{data?.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={t("Example: How to setup your project ...")}
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
                {t("Save")}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
