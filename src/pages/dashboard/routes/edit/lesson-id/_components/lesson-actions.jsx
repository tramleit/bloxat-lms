import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";
import { useNavigate } from "react-router-dom";

export const LessonActions = ({ courseId, lessonId }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/lessons/${lessonId}`, {
        headers: {
          // Include any headers you need, e.g., authentication headers
          "Content-Type": "application/json",
        },
      });

      toast.success("Lesson deleted!");
      navigate(`/${courseId}/edit`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => setOpen(true)}
          disabled={isLoading}
          variant="destructive"
          size="sm"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete lesson
        </Button>
      </div>
    </>
  );
};