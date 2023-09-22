import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Plus, PlusIcon } from "lucide-react";
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
import { ContentList } from "./content-list";
import Loading from "@/components/loading/loading";

const formSchema = z.object({
  title: z.string().min(1),
});

export const ContentForm = ({ initialData, courseId, updateUI }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

      const response = await axios.post(`${BASE_URL}/modules`, {
        course_id: courseId,
        title: values.title,
        module_order:
          initialData?.modules?.length != 0
            ? initialData?.modules[initialData?.modules.length - 1]
                ?.module_order + 1
            : 0,
      });

      console.log();

      // const response = await axios.patch(
      //   `${BASE_URL}/courses/details/${courseId}`,
      //   values
      // );
      toast.success("Module Added!");
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
    console.log("updateData", updateData);

    try {
      setIsUpdating(true);

      const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.put(`${BASE_URL}/reorder/modules`, {
        list: updateData,
      });

      toast.success("Modules reordered");

      // update the state instead of fetching the data
      setCourseState(res.data);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  // loading
  if (loading || !courseContent) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="relative mt-6 border bg-slate-100 dark:bg-[#1a1a1a] rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      )}

      <div className="font-medium flex items-center justify-between mb-5">
        Course content
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add a section
            </>
          )}
        </Button>
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
                      placeholder="eg: Introduction"
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
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.modules?.length && "text-muted-foregound italic"
          )}
        >
          {!initialData?.modules?.length && "No sections"}
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
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the lessons
        </p>
      )}
    </div>
  );
};
