/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useResourcesStore from "@/store/resources/resources-store";
import { GripVertical, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ResourceTile = ({ title, icon, color, link, resourceId }) => {
  //   const { title } = props;
  //   const { icon } = props;
  //   const { color } = props;
  //   const { link } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: resourceId });

  // To affect the style when we pick up an item and move it around
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // 👇️ open link in new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Alert Modal to delete lesson
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const resourcesStore = useResourcesStore();

  // To delete resource
  const handleDeleteResource = async () => {
    try {
      setDeleteLoading(true); // Set loading state to true

      // Call the deleteSection function from the store, passing the moduleId as an argument
      const deleted = await resourcesStore.deleteResource(resourceId);

      // Optionally, handle the deleted section or trigger other actions
      console.log("Deleted lesson:", deleted);

      toast.success("Deleted!");

      // Close the delete confirmation modal or perform other actions as needed
      // setDeleteOpen(false);
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error("Failed to delete section:", error);
    } finally {
      setDeleteLoading(false); // Set loading state back to false when done
    }
  };

  return (
    <>
      <AlertModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteResource}
        loading={deleteLoading}
      />
      <div
        className="flex flex-row items-center space-x-2 w-full"
        ref={setNodeRef}
        style={style}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center cursor-grab w-[50px] h-auto p-3 rounded-full hover:bg-[#e3e3e3] dark:hover:bg-[#262626]  transition "
        >
          <GripVertical />
        </div>
        <Card className="p-3 w-full">
          <div className="flex flex-row items-center justify-between">
            <div
              onClick={() => {
                openInNewTab(link);
              }}
              className="flex flex-row items-center cursor-pointer   w-max"
            >
              {/* Icon */}
              <div
                className={`flex justify-center items-center content-center h-[27px] w-[27px] rounded-md mr-2 ${color}`}
              >
                {icon}
              </div>
              {/* Title */}
              <span className=" text-blue hover:underline text-blue-400">
                {title}
              </span>
            </div>
            {/* Delete button */}
            <Button
              onClick={() => {
                setDeleteOpen(true);
              }}
              size="icon"
              variant="outline"
              className="hover:text-red"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ResourceTile;
