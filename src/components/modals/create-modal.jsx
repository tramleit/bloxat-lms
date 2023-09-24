import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateModal } from "@/hooks/use-create-modal";
import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCourseStore from "@/store/courses/courses-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { generateRandomSlug } from "@/lib/generate-random-slug";
import toast from "react-hot-toast";

// Form validation
const formSchema = z.object({
  name: z.string().min(1),
});

const CreateModal = () => {
  const createModal = useCreateModal();

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

      // Transform name to lowercase and replace spaces with hyphens
      // const formattedNameToSlug = values.name
      //   .toLowerCase()
      //   .replace(/[^a-z0-9\s]/g, "") // Remove all non-alphanumeric characters
      //   .replace(/\s+/g, "-"); // Replace spaces with hyphens

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

      console.log(currentUser?.user_id);

      // If the API request is successful, navigate to another route
      // router.push("/success-route"); // Replace 'success-route' with your desired route
    } catch (error) {
      console.error("Error adding course:", error);
      // Handle errors here, e.g., show an error message
      toast.error("Course name already exists. Enter a new name");
    } finally {
      // Set loading to false after the request is complete
      // form.setIsSubmitting(false);
      toast.error("Course name already exists. Enter a new name");
    }
  };

  return (
    <div>
      <Modal
        title="Create course 🧩"
        description="Add a new course and start getting paid."
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      >
        {/* Content */}
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="eg: Stock Market Course"
                          {...field}
                        />
                      </FormControl>
                      {/* To show for validation if there's a problem */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={createModal.onClose}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit" variant="blue">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateModal;
