/* eslint-disable react/prop-types */
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ResourceTile from "./tiles/resource-tile";
import { Link } from "lucide-react";

// Separate component for displaying a list of resources
export const ResourceList = ({ resources }) => {
  return (
    <SortableContext items={resources} strategy={verticalListSortingStrategy}>
      {resources?.map((item) => (
        <ResourceTile
          key={item?.id}
          title={item?.resource_title}
          resourceId={item?.id}
          lessonId={item?.lesson_id}
          icon={getResourceIcon(item?.resource_type)}
          color={getResourceColor(item?.resource_type)}
          link={item?.resource_link}
        />
      ))}
    </SortableContext>
  );
};

// Define a function to get the icon based on the resource type
const getResourceIcon = (resourceType) => {
  switch (resourceType) {
    case "pdf":
      return <span className="text-white font-medium text-[10px]">PDF</span>;
    case "xls":
      return <span className="text-white font-medium text-[10px]">XLS</span>;
    default:
      return <Link className="w-3 h-3 text-white" />;
  }
};

// Define a function to get the color based on the resource type
const getResourceColor = (resourceType) => {
  switch (resourceType) {
    case "pdf":
      return "bg-red";
    case "xls":
      return "bg-green";
    default:
      return "bg-blue-500";
  }
};
