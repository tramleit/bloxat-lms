import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCourseContentStore from "@/store/courses/course-content";
import Loading from "@/components/loading/loading";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { Separator } from "@/components/ui/separator";
import { ImageForm } from "./_components/image-form";
import { BackButton } from "@/components/back-button";
import { PriceForm } from "./_components/price-form";
import { ContentForm } from "./_components/content-form";

const EditCoursePage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const { courseContent, loading, fetchCourseContent } =
    useCourseContentStore();

  useEffect(() => {
    fetchCourseContent(course_id);
  }, []);

  const requiredFields = [
    courseContent?.title,
    courseContent?.description,
    courseContent?.thumbnail,
    courseContent?.price,
    courseContent?.modules.some((module) => module.lessons.length > 0),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  console.log(courseContent);

  if (loading || !courseContent) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="p-8 pt-6">
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-4">
          <BackButton
            onClick={() => {
              navigate(`/${course_id}`);
            }}
          />
          <div className="flex flex-col gap-y-2 w-full">
            <h1 className="text-3xl font-bold tracking-tight line-clamp-1">
              Edit Course
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#929292]">
              Complete all fields {completionText}
            </span>
          </div>
        </div>

        <Separator className="mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge Icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm
            initialData={courseContent}
            courseId={courseContent?.course_id}
          />
          <DescriptionForm
            initialData={courseContent}
            courseId={courseContent?.course_id}
          />
          <ImageForm
            initialData={courseContent}
            courseId={courseContent?.course_id}
          />
        </div>
        {/* Right side */}
        <div className="space-y-6">
          {/* Content */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge Icon={ListChecks} />
              <h2 className="text-xl">Course content</h2>
            </div>
            <ContentForm
              initialData={courseContent}
              courseId={courseContent?.course_id}
            />
          </div>
          {/* Price */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge Icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm
              initialData={courseContent}
              courseId={courseContent?.course_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
