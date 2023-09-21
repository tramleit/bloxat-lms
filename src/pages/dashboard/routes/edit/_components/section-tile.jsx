import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, GripVertical, Plus, Trash } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SectionTile = ({ moduleId, moduleOrder, title, lessons }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: moduleId });

  // To affect the style when we pick up an item and move it around
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex flex-row items-start space-x-2 w-full"
      ref={setNodeRef}
      style={style}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-center cursor-grab w-[50px] h-auto p-3 rounded-full hover:bg-[#e3e3e3] dark:hover:bg-[#262626]  transition"
      >
        <GripVertical />
      </div>
      <Card className="w-full px-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex flex-row items-center space-x-3">
                {/* <span className="flex items-center justify-center bg-blue-500 text-white dark:text-black w-6 h-6 text-sm rounded-full">
                  {moduleOrder + 1}
                </span> */}
                <span className="font-semibold">{title}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-4">
                {/* Lesson Tiles */}
                {lessons?.map((item, i) => (
                  //   <LessonTile key={i} lesson={item} />
                  <span>{item?.title}</span>
                ))}
              </div>
              {/* Add lesson section */}
              <div className="mt-6">
                <Button
                  onClick={() => {
                    // setAddLessonOpen(true);
                  }}
                  className="space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Lesson</span>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      {/* Edit button */}
      <div>
        <Button
          variant="outline"
          // className="w-fit h-fit"
          // size="icon"
          size="icon"
          onClick={() => {
            // setEditOpen(true);
          }}
        >
          <Edit className="text-muted-foreground w-5 h-5" />
        </Button>
      </div>
      {/* Delete Button */}
      <div>
        <Button
          variant="destructive"
          // className="w-fit h-fit"
          // size="icon"
          size="icon"
          onClick={() => {
            // setDeleteOpen(true);
          }}
        >
          <Trash className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default SectionTile;
