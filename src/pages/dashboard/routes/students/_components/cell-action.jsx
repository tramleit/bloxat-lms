import { useState } from "react";
import toast from "react-hot-toast";
import {
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Trash,
  Unlock,
  User,
} from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { StudentDetailsModal } from "@/components/modals/student-details-modal";
import useUserDeletionStore from "@/store/students/student-delete-store";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CellAction = ({ userId }) => {
  const { course_id } = useParams();

  // For Delete Alert Modal
  const [open, setOpen] = useState(false);
  // For Student Details Modal
  const [detailsOpen, setDetailsOpen] = useState(false);

  // const [loading, setLoading] = useState(false);

  const userDeletionStore = useUserDeletionStore(); // Initialize the user deletion store

  const onConfirm = async () => {
    try {
      // Set the user as "deleting" in the store
      userDeletionStore.deleteUser(userId, course_id);

      // Show a loading indicator or toast message
      toast.promise(userDeletionStore.deleteUser(userId, course_id), {
        loading: "Deleting...",
        success: "User deleted successfully.",
        error: "Failed to delete user.",
      });

      // Optionally, you can refresh the page after deletion
      // router.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setOpen(false);
    }
    // try {
    //   setLoading(true);
    //   //   await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
    //   toast.success("User deleted.");
    //   router.refresh();
    // } catch (error) {
    //   toast.error("Something went wrong.");
    // } finally {
    //   setOpen(false);
    //   setLoading(false);
    // }
  };

  const { t } = useTranslation();

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={userDeletionStore.isDeleting}
      />
      {detailsOpen && (
        <StudentDetailsModal
          userId={userId}
          isOpen={detailsOpen}
          onClose={() => setDetailsOpen(false)}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            {/* sr-only means it's not visible it's just for screen readers for accessibility */}
            {/* <span className="sr-only">Open menu</span> */}
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {/* Drop menu content */}
        <DropdownMenuContent align="end">
          {/* Menu Label */}
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          {/* Menu Items */}
          {/* Item */}
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            {t("See details")}
          </DropdownMenuItem>
          {/* End Item */}
          {/* Item */}
          {/* <DropdownMenuItem>
            <Unlock className="mr-2 h-4 w-4" />
            Enroll
          </DropdownMenuItem> */}
          {/* End Item */}
          <Separator />
          {/* Item */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            {t("Delete")}
          </DropdownMenuItem>
          {/* End Item */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
