import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, GripVertical, Loader2, Plus, Trash } from "lucide-react";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { AddLessonModal } from "../modals/add-lesson-modal";
import LessonTile from "./lesson-tile";
import { DndContext, closestCenter } from "@dnd-kit/core";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { EditSectionModal } from "../modals/edit-section-modal";

const SectionTile = ({ moduleId, moduleOrder, title, lessons, updateUI }) => {
  const { course_id } = useParams();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: moduleId });

  // To affect the style when we pick up an item and move it around
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // lessons state
  const [lessonsState, setLessonsState] = useState(lessons);

  // Modal to add a lesson
  const [addLessonOpen, setAddLessonOpen] = useState(false);
  // Modal to add a lesson
  const [deleteSectionOpen, setDeleteSectionOpen] = useState(false);
  // Section editing title state
  const [editSection, setEditSection] = useState(false);

  console.log(lessons);

  const [isUpdating, setIsUpdating] = useState(false);

  // reorder lessons
  const onLessonsReorder = async (updateData) => {
    console.log("updateData", updateData);

    try {
      setIsUpdating(true);

      const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.put(
        `${BASE_URL}/reorder/modules/${moduleId}/lessons`,
        {
          list: updateData,
        }
      );

      toast.success("Lessons reordered");

      // update the state instead of fetching the data
      // setLessonsState(res.data);

      console.log("LESSON STATE", res.data);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  // DELETE MODULE
  const deleteModule = async () => {
    try {
      if (lessonsState?.length != 0) {
        toast.error("Delete the lessons in the section first!");
        console.log("sdfsdfsdfsd");
      } else {
        setIsUpdating(true);

        const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const res = await axios.delete(`${BASE_URL}/modules/${moduleId}`);

        toast.success("Section deleted");

        // update the state instead of fetching the data
        // setLessonsState(res.data);
        window.location.reload();

        console.log("LESSON STATE", res.data);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  //   rehydrate our items
  useEffect(() => {
    setLessonsState(lessons);
  }, [lessons]);

  return (
    <>
      {/* add lesson */}
      <AddLessonModal
        isOpen={addLessonOpen}
        onClose={() => setAddLessonOpen(false)}
        courseId={course_id}
        moduleId={moduleId}
        moduleOrder={moduleOrder}
        lessonOrder={
          lessonsState?.length != 0
            ? lessonsState[lessonsState.length - 1]?.lesson_order + 1
            : 0
        }
        addLesson={(newLesson) => {
          // Add the new lesson to the lessonsState
          setLessonsState((prevLessons) => [...prevLessons, newLesson]);
          // TO UPDATE THE PARENT PAGE TO SEE THAT (5/5)
          updateUI(lessonsState);
        }}
      />
      {/* delete section modal */}
      <AlertModal
        isOpen={deleteSectionOpen} // Ensure this prop is set correctly
        onClose={() => setDeleteSectionOpen(false)} // Close the modal
        onConfirm={deleteModule} // Handle confirmation action
        loading={isUpdating}
      />
      {/* Edit section */}
      <EditSectionModal
        isOpen={editSection} // Ensure this prop is set correctly
        onClose={() => setEditSection(false)} // Close the modal
        initialTitle={title}
        moduleId={moduleId}
        // onConfirm={deleteModule} // Handle confirmation action
      />

      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      )}
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
                {/* DRAG AND DROP FOR THE LESSONS */}
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={(e) => {
                    const { active, over } = e;

                    if (active.id !== over?.id) {
                      setLessonsState((items) => {
                        const activeIndex = items.findIndex(
                          (item) => item.id === active.id
                        );
                        const overIndex = items.findIndex(
                          (item) => item.id === over?.id
                        );

                        const updatedLessons = arrayMove(
                          items,
                          activeIndex,
                          overIndex
                        );
                        onLessonsReorder(
                          updatedLessons.map((lesson, index) => ({
                            lesson_id: lesson.id,
                            lesson_order: index,
                          }))
                        );

                        return updatedLessons;
                      });
                    }
                  }}
                >
                  <div className="space-y-4">
                    <SortableContext
                      // items={preview.links}
                      items={lessonsState}
                      strategy={verticalListSortingStrategy}
                    >
                      {/* Lesson Tiles */}
                      {lessonsState?.map((item, i) => (
                        <LessonTile key={item?.id} lesson={item} />
                      ))}
                    </SortableContext>
                  </div>
                </DndContext>
                {/* Add lesson section */}
                <div className="mt-6">
                  <Button
                    onClick={() => setAddLessonOpen(true)}
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
              setEditSection(true);
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
              setDeleteSectionOpen(true);
            }}
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SectionTile;
