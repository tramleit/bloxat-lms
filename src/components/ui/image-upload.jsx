// import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { cloudName, uploadPreset } from "@/config/cloudinary-config";

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
  className,
  folder,
}) => {
  const [isMounted, setIsMounted] = useState(false);

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
        folder: folder,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // Handle the successful upload here
          console.log("Upload successful:", result.info.secure_url);

          onUpload(result);
          // You can perform additional actions here, such as updating the UI
          // or sending the URL to a server.
        }
      }
    );
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            // className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            className={cn(
              "relative w-[200px] h-[200px] flex items-center justify-center p-4 overflow-hidden",
              className
            )}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img className="object-contain" alt="Image" src={url} />
          </div>
        ))}
      </div>

      <Button
        type="button"
        disabled={disabled}
        variant="secondary"
        onClick={() => widgetRef.current.open()}
      >
        <ImagePlus className="h-4 w-4 mr-2" />
        Upload an Image
      </Button>

      {/* <CldUploadWidget onUpload={onUpload} uploadPreset="hoepl74m">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget> */}
    </div>
  );
};

export default ImageUpload;
