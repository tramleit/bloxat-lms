import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCourseStore from "@/store/courses/courses-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Icons } from "@/components/icons";
import SetupHeader from "../../_components/setup-header";
import { generateRandomSlug } from "@/lib/generate-random-slug";

// Form validation
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Your course name is required!",
  }),
});

const CreateFirstCourse = () => {
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { addCourse, loading } = useCourseStore();

  const onSubmit = async (values) => {
    try {
      // Set loading to true before making the API request
      // form.setIsSubmitting(true);

      // Check if the course name contains Arabic characters
      const hasArabicCharacters = /[؀-ۿ]/.test(values.name);

      // Transform name to lowercase and replace spaces with hyphens
      // Generate a random slug if the course name is in Arabic
      const courseSlug = hasArabicCharacters
        ? generateRandomSlug(10) // Adjust the length as needed
        : values.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "") // Remove all non-alphanumeric characters
            .replace(/\s+/g, "-"); // Replace spaces with hyphens

      // Make the API request using the addCourse function from the Zustand store
      await addCourse({
        user_id: currentUser?.user_id,
        title: values.name,
        course_slug: courseSlug,
      });

      // console.log(currentUser?.user_id);

      //   set in local storage that we started with completing the account so we can show the bottom overlay of account completion
      // Each zero represents a step .. so payment method, course content, share
      // localStorage.setItem("bxCompletion", JSON.stringify([0, 0, 0]));

      // If the API request is successful, navigate to another route
      // router.push("/success-route"); // Replace 'success-route' with your desired route
    } catch (error) {
      toast.error("Course name already exists. Enter a new name");
      // console.error("Error adding course:", error);
      // Handle errors here, e.g., show an error message
    } finally {
      toast.error("Course name already exists. Enter a new name");
      // Set loading to false after the request is complete
      // form.setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <SetupHeader />
        {/* End Header */}
        {/* Content */}
        <div className="flex flex-row items-center h-full">
          {/* Left Side */}
          <div className="flex flex-col flex-1 items-center justify-center h-full space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              {t("Create Your First Course")}
            </h1>
            <p className="text-muted-foreground">
              {t("Add a new course and start getting paid!")}
            </p>
            <div className="h-4"></div>
            {/* Content */}
            <div>
              <div className="space-y-4 pb-4 w-[300px]">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-start">
                            {t("Course Title")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder={t("Example: Stock Market Course")}
                              {...field}
                            />
                          </FormControl>
                          {/* To show for validation if there's a problem */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-center w-full">
                      <Button disabled={loading} type="submit" variant="blue">
                        {loading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {t("Create")}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="bg-[#fdfdfd] dark:bg-[#121212] md:flex hidden flex-col flex-1 items-center justify-center h-full ">
            {/* bg-gray-50 */}
            {/* right [place graphic] */}
            <div className="flex items-center justify-center h-full">
              <LazyLoadImage
                className="object-cover h-full"
                src="https://media.publit.io/file/rubikscube-3.gif"
                effect="blur"
                placeholderSrc="https://media.publit.io/file/rubikscube-3.gif"
                draggable={false}
              />
            </div>
          </div>
        </div>
        {/* End Content */}
        {/* Bottom Part */}
        {/* <Bottom
          onClick={() => {
            onSubmit();
          }}
          enableSkip={true}
          onSkip={() => {
            router.push("/create-first-course");
          }}
          disabled={loading}
        /> */}
        {/* End Bottom */}
      </div>
    </>
  );
};

export default CreateFirstCourse;
