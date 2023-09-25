import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config/api-base-config";
import { cn } from "@/lib/utils";
import { copyText } from "@/lib/copy-text";
import axios from "axios";
import { Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { PORTAL_URL } from "@/config/url-config";

export const Actions = ({
  disabled,
  courseId,
  isPublished,
  brandSlug,
  courseSlug,
  copyDisabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const token = JSON.parse(localStorage.getItem("bxAuthToken"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (isPublished) {
        // const res = await axios.patch(
        //   `${BASE_URL}/courses/details/${courseId}`,
        //   {
        //     published: false,
        //   }
        // );

        await axios.patch(`${BASE_URL}/courses/details/${courseId}`, {
          published: false,
        });
        toast.success("Course unpublished!");

        window.location.reload();

        // updateUI(res.data);
      } else {
        // const res = await axios.patch(
        //   `${BASE_URL}/courses/details/${courseId}`,
        //   {
        //     published: true,
        //   }
        // );

        await axios.patch(`${BASE_URL}/courses/details/${courseId}`, {
          published: true,
        });

        toast.success("Course published!");

        // Here we set that the content is set in the account completion ..
        // so we're updating the second number to 1 .. and leaving the rest of the numbers as they are
        // Get the existing array from local storage
        const completionData = JSON.parse(localStorage.getItem("bxCompletion"));
        // Check if completionData is an array
        if (Array.isArray(completionData)) {
          // Set the first element to 1 and leave the rest as they are
          completionData[1] = true;

          // Save the modified array back to local storage
          localStorage.setItem("bxCompletion", JSON.stringify(completionData));
        }

        // Open a link in a new tab
        window.open(`${PORTAL_URL}/${brandSlug}/${courseSlug}`, "_blank");

        window.location.reload();

        // updateUI(res.data);
      }
      // After a successful request, trigger a Vite HMR refresh
      // if (import.meta.hot) {
      //   import.meta.hot.invalidate();
      // }

      window.location.reload();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:flex hidden flex-row items-center gap-x-2">
      <Button
        variant="outline"
        className="w-[145px]"
        onClick={() =>
          copyText(`${PORTAL_URL}/${brandSlug}/${courseSlug}/checkout`)
        }
        disabled={copyDisabled || isLoading}
      >
        <Copy className="mr-2 h-4 w-4" />
        Payment link
      </Button>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="blue"
        className={cn("", isPublished && "bg-red hover:bg-[#f6695e]")}
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
};
