import { useEffect } from "react";
import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cloudName, uploadPreset } from "@/config/cloudinary-config";

const FileUpload = ({ courseId, updateUI }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  //   Upload function
  const onUpload = (result) => {
    onChange(result.info.secure_url);
  };

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

          onUpload(result);
          // You can perform additional actions here, such as updating the UI

          // or sending the URL to a server.
        }
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[220px] border border-dashed border-[#b2b2b2] dark:border-[#424242] rounded-lg space-y-3">
      <UploadCloud className="h-12 w-12 text-[#b2b2b2] dark:text-[#424242] " />
      <Button onClick={() => widgetRef.current.open()}>Upload Image</Button>
      <span className="text-sm text-muted-foreground">Image (4MB)</span>
    </div>
  );
};

export default FileUpload;
