import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { BASE_URL } from "@/config/api-base-config";
// import useGlobalStore from "@/store/global-state";

export const EditSectionModal = ({
  isOpen,
  onClose,
  moduleId,
  initialTitle,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  // const { lessonAdded, reset } = useGlobalStore();
  // const set = useGlobalStore.getState().set;

  // const lessonStore = useLessonsStore();

  // Loading state
  const [isLoading, setLoading] = useState(false);
  // For input
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const handleUpdateSection = async () => {
    // Validate inputs
    if (!title) {
      //   setTitleError("Title is required");
      setLoading(false);
      toast.error("Fill in all fields!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(`${BASE_URL}/module/${moduleId}`, {
        title: title,
      });

      if (response.status === 200) {
        // Optionally, you can handle the created lesson or trigger other actions
        // console.log("Lesson created successfully:", response.data);

        setLoading(false);

        window.location.reload();

        // Update the state
        // addLesson(response.data);
        // Function to update the lessonAdded state
        //  Global state to keep track of the first lesson added in the edit page to be 5/5 fields
        // set({ lessonAdded: response.data });

        onClose();
      }
    } catch (error) {
      console.error("Error creating lesson:", error);

      // Handle errors as needed, e.g., show an error message
      throw new Error("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Edit ${initialTitle}`}
      //   description="A section is what contains many lessons."
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Content */}
      <div className="flex flex-col space-y-6 my-4">
        {/* Section title */}
        <div className="grid gap-1 w-full">
          <Label htmlFor="title" className="mb-1">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder={initialTitle}
            autoCapitalize="none"
            autoCorrect="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* <div className="grid gap-1 w-full">
          <Label htmlFor="desc" className="mb-1">
            Description (Optional)
          </Label>

          <Textarea
            id="desc"
            placeholder="In this lesson we will learn ..."
            className="resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
        </div> */}
      </div>

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleUpdateSection}
          className="space-x-2"
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Save changes</span>
        </Button>
      </div>
    </Modal>
  );
};
