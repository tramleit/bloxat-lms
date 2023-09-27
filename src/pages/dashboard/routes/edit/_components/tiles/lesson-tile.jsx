import { useNavigate, useParams } from "react-router-dom";
import { GripVertical,} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LessonTile = ({ lesson }) => {
  const { t } = useTranslation();
  const { course_id } = useParams();
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson?.id });

  // To affect the style when we pick up an item and move it around
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className="flex flex-row items-center space-x-2 w-full "
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
        <Card className="ml-10 w-full">
          <div className="flex flex-row items-center p-3 justify-between">
            <div className="flex flex-row items-center space-x-2">
              {/* <span className="flex items-center justify-center bg-gray-100 text-gray-500 dark:bg-[#2f2f2f] dark:text-[#616161] w-6 h-6 text-sm text-center rounded-full">
                {lesson?.lesson_order}
              </span> */}
              <p className="font-medium">{lesson?.title}</p>
            </div>

            <div className="flex flex-row items-center space-x-4">
              {/* Edit button */}
              <div>
                <Button
                  variant="yellow"
                  size="sm"
                  onClick={() => {
                    navigate(`/${course_id}/edit/${lesson?.lesson_id}`);
                  }}
                  // className="w-fit h-fit"
                  // size="icon"
                >
                  {t("Edit Lesson")}
                </Button>
              </div>

              {/* Delete Button */}
              {/* <div>
                <Button
                  variant="outline"
                  // className="w-fit h-fit"
                  // size="icon"
                  onClick={() => {
                    // setDeleteOpen(true);
                  }}
                >
                  Delete
                </Button>
              </div> */}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LessonTile;
