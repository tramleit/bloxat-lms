import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import useCourseContentStore from "@/store/courses/course-content";
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
import { cn } from "@/lib/utils";
import { ContentList } from "./content-list";
import Loading from "@/components/loading/loading";
import EmptyLight from "@/assets/images/empty-light.webp";
import EmptyDark from "@/assets/images/empty-dark.webp";

const formSchema = z.object({
  title: z.string().min(1),
});

export const ContentForm = ({ initialData, courseId, updateUI }) => {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { theme } = useTheme();

  const toggleCreating = () => setIsCreating((current) => !current);

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const { courseContent, loading, fetchCourseContent } =
    useCourseContentStore();

  const [courseState, setCourseState] = useState(courseContent);

  // const [data, setData] = useState(initialData);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Create a new module
  const onSubmit = async (values) => {
    try {
      const token = JSON.parse(localStorage.getItem("bxAuthToken"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await axios.post(`${BASE_URL}/modules`, {
        course_id: courseId,
        title: values.title,
        module_order:
          initialData?.modules?.length != 0
            ? initialData?.modules[initialData?.modules.length - 1]
                ?.module_order + 1
            : 0,
      });

      // console.log();

      // const response = await axios.patch(
      //   `${BASE_URL}/courses/details/${courseId}`,
      //   values
      // );
      toast.success("Section Added!");
      toggleCreating();
      // fetch the new data after success
      // setData(response.data);
      // updateUI(response.data);
      fetchCourseContent(courseId);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // on reorder function -> reorder modules
  const onReorder = async (updateData) => {
    // console.log("updateData", updateData);

    try {
      setIsUpdating(true);

      const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.put(`${BASE_URL}/reorder/modules`, {
        list: updateData,
      });

      toast.success("Sections reordered");

      // update the state instead of fetching the data
      setCourseState(res.data);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  // console.log("theme", theme);

  // loading
  if (loading || !courseContent) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="relative mt-6 border bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      )}

      <div className="font-medium flex items-center justify-between mb-5">
        {t("Sections and lessons")}
        <span></span>
        {isCreating ? (
          <Button onClick={toggleCreating} variant="ghost">
            {t("Cancel")}
          </Button>
        ) : (
          <Button
            onClick={toggleCreating}
            variant="ghost"
            size="sm"
            className="border-2  border-blueBloxLight text-blueBloxLight hover:text-white hover:bg-blueBloxLight"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            {t("Add a section")}
          </Button>
        )}
      </div>
      {isCreating && (
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
                      placeholder={t("Example: Introduction Section")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("Create")}
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.modules?.length && "text-muted-foreground italic"
          )}
        >
          {!initialData?.modules?.length && (
            <div className="flex flex-col items-center justify-center">
              <img
                src={theme === "dark" ? EmptyDark : EmptyLight}
                alt="Empty"
                className="w-[200px] h-auto"
                draggable={false}
              />

              <span>{t("No sections yet")}</span>
            </div>
          )}
          {/* TODO: ADD A LIST OF LESSONS AND CONTAIN THE IN SECTIONS */}
          <ContentList
            onEdit={() => {}}
            onReorder={onReorder}
            items={initialData?.modules || []}
            updateUI={updateUI}
          />
        </div>
      )}
      {!isCreating && (
        <div className="flex flex-col ">
          <p className="text-xs text-muted-foreground mt-4">
            {t("💡 Drag and drop to reorder the sections or lessons.")}
          </p>
        </div>
      )}
    </div>
  );
};
