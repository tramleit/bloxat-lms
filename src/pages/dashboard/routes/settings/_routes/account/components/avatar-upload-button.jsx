import { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cloudName, uploadPreset } from "@/config/cloudinary-config";

const AvatarUpload = ({
  disabled,
  onChange,
  // onSave,
  value,
  currentUser,
  folder,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const { t } = useTranslation();

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
          // console.log("Upload successful:", result.info.secure_url);

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

  // console.log("value", value?.length);

  return (
    <div className="flex flex-row items-center space-x-5">
      <div className="mb-4 flex items-center gap-4">
        {value?.length == 0 && (
          <Avatar className="flex h-20 w-20 items-center justify-center space-y-0 border">
            <AvatarImage
              src={
                currentUser?.avatar_url == null
                  ? `https://avatar.vercel.sh/${currentUser?.first_name}.png`
                  : currentUser?.avatar_url
              }
              alt={currentUser?.first_name}
            />
            <AvatarFallback>{currentUser?.first_name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}

        {value.map((url) => (
          <div
            key={url}
            className="relative h-20 w-20 rounded-full overflow-hidden border"
          >
            {/* <div className="z-10 absolute top-[-2px] right-[-2px]">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div> */}
            <img className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <Button
          type="button"
          className="w-fit"
          disabled={disabled}
          variant="secondary"
          onClick={() => widgetRef.current.open()}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          {t("Upload an Image")}
        </Button>
        <p className="text-muted-foreground text-sm">400x400 px recommended.</p>
      </div>

      {/* <CldUploadWidget onUpload={onUpload} uploadPreset="hoepl74m">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
           
          );
        }}
      </CldUploadWidget> */}
    </div>
  );
};

export default AvatarUpload;
