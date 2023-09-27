import { useState } from "react";
import * as z from "zod";
// import { useRef } from "react";
// import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  // ImageIcon,
  Pencil,
  // PlusIcon,
  // UploadCloud,
  // Youtube,
} from "lucide-react";
import axios from "axios";
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
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/config/api-base-config";
import VideoPlayer from "./video-player";
import { Icons } from "@/components/icons";
import YoutubeIcon from "@/assets/images/icons/youtube.webp";
import VimeoIcon from "@/assets/images/icons/vimeo.webp";

const formSchema = z.object({
  lesson_video_url: z.string().min(1, {
    message: "Video URL is required",
  }),
});

export const VideoForm = ({ initialData, lessonId }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const [data, setData] = useState(initialData);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lesson_video_url: initialData?.lesson_video_url || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    // if the data is the same as the previous then no need to hit the server
    if (values.lesson_video_url == initialData?.lesson_video_url) {
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
      <div className="font-medium flex items-center justify-between mb-2">
        {t("Video URL")}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>{t("Cancel")}</>}
          {!isEditing && data?.lesson_video_url && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {t("Edit")}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {/* // Video player */}
          <div className="relative  mt-2">
            <VideoPlayer url={data?.lesson_video_url} />
          </div>
        </>
      )}
      {isEditing && (
        <div>
          <div className="flex flex-col items-center justify-center h-[340px] border border-dashed border-[#b2b2b2] dark:border-[#424242] rounded-lg space-y-3">
            <div className="flex flex-row items-center justify-center space-x-4 mb-2">
              <img
                src={YoutubeIcon}
                alt="Youtube"
                className="w-[50px] h-auto"
                draggable={false}
              />
              <span>{t("or")}</span>
              <img
                src={VimeoIcon}
                alt="Vimeo"
                className="w-[40px] h-auto"
                draggable={false}
              />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center "
              >
                <FormField
                  control={form.control}
                  name="lesson_video_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-[300px]"
                          disabled={isSubmitting}
                          placeholder="https://www.youtube.com/watch?v=aqncZ2yKMnw"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center mt-3">
                  <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    variant="yellow"
                  >
                    {isSubmitting && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("Update URL")}
                  </Button>
                </div>
              </form>
            </Form>
            <span className="text-sm text-muted-foreground">
              {t("💡 Add a Video URL from Youtube/ Vimeo")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
