import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config/api-base-config";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const Actions = ({ disabled, courseId, isPublished }) => {
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
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
};
