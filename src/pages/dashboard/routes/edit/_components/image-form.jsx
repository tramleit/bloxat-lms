import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import * as z from "zod";
import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Edit,
  ImageIcon,
  // Pencil,
  Plus,
  // PlusIcon,
  UploadCloud,
} from "lucide-react";
import { useTranslation } from "react-i18next";
// import useCourseContentStore from "@/store/courses/course-content";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config/api-base-config";
// import { Icons } from "@/components/icons";
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";
// import FileUpload from "./file-upload";
import { cloudName, uploadPreset } from "@/config/cloudinary-config";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId, updateUI }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  const [data, setData] = useState(initialData);

  // UPLOAD FUNCTION
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  //   Upload function
  // const onUpload = (result) => {
  //   onChange(result.info.secure_url);
  // };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        folder: `/thumbnails/${courseId}_course_id`,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // Handle the successful upload here
          // console.log("Upload successful:", result.info.secure_url);

          // onUpload(result);
          // You can perform additional actions here, such as updating the UI
          updateThumbnail(result.info.secure_url);

          // console.log(result.info.secure_url);

          // or sending the URL to a server.
        }
      }
    );
  }, []);

  const updateThumbnail = async (value) => {
    try {
      const token = JSON.parse(localStorage.getItem("bxAuthToken"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.patch(
        `${BASE_URL}/courses/details/${courseId}`,
        {
          thumbnail: value,
        }
      );
      toast.success("Course updated!");
      toggleEdit();
      // fetch the new data after success
      setData(response.data);
      updateUI(response.data.thumbnail);
      // console.log("RESPONSE", value);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-md p-4 w-full">
      <div className="font-medium flex items-center justify-between mb-2">
        {t("Thumbnail")}
        {!data?.thumbnail && !isEditing && (
          <Button onClick={toggleEdit} variant="yellow">
            <Plus className="h-4 w-4 mr-2" />
            {t("Add")}
          </Button>
        )}
        {isEditing && (
          <Button onClick={toggleEdit} variant="ghost">
            {t("Cancel")}
          </Button>
        )}
        {!isEditing && data?.thumbnail && (
          <Button onClick={toggleEdit} variant="ghost">
            <Edit className="h-4 w-4 mr-2" />
            {t("Edit")}
          </Button>
        )}
        {/* <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !data?.thumbnail && (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add
            </>
          )}
          {!isEditing && data?.thumbnail && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button> */}
      </div>
      {!isEditing &&
        (!data?.thumbnail ? (
          <div className="flex items-center justify-center h-[220px] bg-[#edeef1] border dark:bg-[#292929] rounded-md">
            <ImageIcon className="h-10 w-10 text-[#aaaaaa] dark:text-[#4d4d4d] " />
          </div>
        ) : (
          <div className="relative  mt-2">
            <img
              src={data?.thumbnail}
              alt="Upload"
              className="object-cover rounded-md h-[220px] w-full"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <div className="flex flex-col items-center justify-center h-[220px] border border-dashed border-[#b2b2b2] dark:border-[#424242] rounded-lg space-y-3">
            <UploadCloud className="h-12 w-12 text-[#c0c0c0] dark:text-[#424242] " />
            <Button onClick={() => widgetRef.current.open()} variant="yellow">
              {t("Upload Image")}
            </Button>
            <span className="text-sm text-muted-foreground">Image (4MB)</span>
          </div>
          <div className="text-xs text-muted-foreground mt-4">
            💡 16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
