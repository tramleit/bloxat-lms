import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import useLessonsStore from "@/store/lessons/lessons-store";
import { Icons } from "@/components/icons";
import { BASE_URL } from "@/config/api-base-config";
// import useGlobalStore from "@/store/global-state";

export const AddLessonModal = ({
  isOpen,
  onClose,
  courseId,
  moduleId,
  moduleOrder,
  lessonOrder,
  // updateState,
  addLesson, // Add this prop
}) => {
  const [isMounted, setIsMounted] = useState(false);
  // const { lessonAdded, reset } = useGlobalStore();
  // const set = useGlobalStore.getState().set;

  // const lessonStore = useLessonsStore();

  // Loading state
  const [isLoading, setLoading] = useState(false);
  // For input
  const [title, setTitle] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  // const [description, setDescription] = useState("");

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const handleCreateLesson = async () => {
    // Validate inputs
    if (!title || !lessonVideoUrl) {
      //   setTitleError("Title is required");
      setLoading(false);
      toast.error("Fill in all fields!");
      return;
    }

    const lessonData = {
      course_id: courseId, // Replace with the appropriate course ID
      module_id: moduleId, // Replace with the appropriate module ID
      module_order: moduleOrder, // Replace with the appropriate module order
      title: title,
      lesson_order: lessonOrder,
      lesson_video_url: lessonVideoUrl,
      description: "",
    };

    // console.log("lessonData", lessonData);

    try {
      setLoading(true);

      const response = await axios.post(`${BASE_URL}/lessons`, lessonData);

      if (response.status === 200) {
        // Optionally, you can handle the created lesson or trigger other actions
        // console.log("Lesson created successfully:", response.data);

        // window.location.reload();

        setLoading(false);

        // Update the state
        addLesson(response.data);
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
      title="Add lesson 🧠"
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
            autoCapitalize="none"
            placeholder="Example: How to setup your application"
            autoCorrect="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {/* Video link */}
        <div className="grid gap-1 w-full">
          <Label htmlFor="video" className="mb-1">
            {/* Video link (Youtube/ Vimeo/ Loom) */}
            Video link (Youtube/ Vimeo)
          </Label>
          <Input
            id="video"
            placeholder="https://player.vimeo.com/video/VIDEO_ID"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            value={lessonVideoUrl}
            onChange={(e) => setLessonVideoUrl(e.target.value)}
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
          onClick={handleCreateLesson}
          className="bg-blueBlox hover:bg-blueBloxLight text-white space-x-2"
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Add</span>
        </Button>
      </div>
    </Modal>
  );
};
