import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";
import { DndContext, closestCenter } from "@dnd-kit/core";
// import { Grid, GripVertical } from "lucide-react";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SectionTile from "./tiles/section-tile";

export const ContentList = ({ items, onReorder, updateUI }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [modules, setModules] = useState(items);

  //   console.log("modules", items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //   rehydrate our items
  useEffect(() => {
    setModules(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        const { active, over } = e;

        if (active.id !== over?.id) {
          setModules((items) => {
            const activeIndex = items.findIndex(
              (item) => item.id === active.id
            );
            const overIndex = items.findIndex((item) => item.id === over?.id);

            const updatedModules = arrayMove(items, activeIndex, overIndex);
            onReorder(
              updatedModules.map((module, index) => ({
                module_id: module.id,
                module_order: index,
              }))
            );

            return updatedModules;
          });
        }
      }}
    >
      <div className="flex flex-col space-y-3">
        <SortableContext
          // items={preview.links}
          items={modules}
          strategy={verticalListSortingStrategy}
        >
          {modules.map((module) => (
            <SectionTile
              key={module?.id}
              moduleId={module?.id}
              moduleOrder={module?.module_order}
              title={module?.title}
              lessons={module?.lessons || []}
              updateUI={updateUI}
              // onLessonsReorder={onLessonsReorder}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

//  <DragDropContext onDragEnd={() => {}}>
//    <Droppable droppableId="modules">
//      {(provided) => (
//        <div
//          {...provided.droppableProps}
//          ref={provided.innerRef}
//          className="flex flex-col space-y-3"
//        >
//          {modules.map((module, index) => (
//            <Draggable key={module?.id} draggableId={module?.id} index={index}>
//              {(provided) => (
//                <div
//                  ref={provided.innerRef}
//                  {...provided.draggableProps}
//                  className="flex flex-row items-start justify-center space-x-1"
//                >
//                  {/* Drag Handle */}
//                  <div
//                    className="flex items-center justify-center w-[50px] h-auto p-3 rounded-full hover:bg-[#e3e3e3] dark:hover:bg-[#262626]  transition"
//                    {...provided.dragHandleProps}
//                  >
//                    <GripVertical />
//                  </div>
//                  <SectionTile
//                    moduleOrder={module?.module_order}
//                    title={module?.title}
//                    lessons={module?.lessons}
//                  />
//                </div>
//              )}
//            </Draggable>
//          ))}
//        </div>
//      )}
//    </Droppable>
//  </DragDropContext>;
