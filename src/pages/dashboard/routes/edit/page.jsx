import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCourseContentStore from "@/store/courses/course-content";
import Loading from "@/components/loading/loading";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { Separator } from "@/components/ui/separator";
import { ImageForm } from "./_components/image-form";
import { BackButton } from "@/components/back-button";
import { PriceForm } from "./_components/price-form";
import { ContentForm } from "./_components/content-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
import { cn } from "@/lib/utils";
// import useGlobalStore from "@/store/global-state";

const EditCoursePage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();
  // const { lessonAdded, reset } = useGlobalStore();

  const { courseContent, loading, fetchCourseContent } =
    useCourseContentStore();

  const [courseState, setCourseState] = useState(courseContent);
  const [descriptionState, setDescriptionState] = useState(
    courseContent?.description
  );
  const [thumbnailState, setThumbnailState] = useState(
    courseContent?.thumbnail
  );
  const [priceState, setPriceState] = useState(courseContent?.price);
  const [lessonsState, setLessonsState] = useState(
    courseContent?.modules.some((module) => module.lessons.length > 0)
  );

  useEffect(() => {
    fetchCourseContent(course_id);
  }, []);

  useEffect(() => {
    setCourseState(courseContent);
    setDescriptionState(courseContent?.description);
    setThumbnailState(courseContent?.thumbnail);
    setPriceState(courseContent?.price);
    setLessonsState(
      courseContent?.modules.some((module) => module.lessons.length > 0)
    );
  }, [courseContent]);

  const requiredFields = [
    courseState?.title,
    descriptionState,
    thumbnailState,
    priceState,
    lessonsState,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  console.log(courseContent);

  // check if it's complete so we can publish the course
  const isComplete = requiredFields.every(Boolean);

  if (loading || !courseContent) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      {!courseContent?.published && isComplete && (
        <Banner
          variant="warning"
          label="This course is not published. It will not be visible to your students."
        />
      )}
      {!isComplete && (
        <Banner
          variant="warning"
          label={`Add a title, description, thumbnail, price, and a section with a lesson in it to publish. Completed 👉 ${completionText}`}
        />
      )}
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
                {courseContent?.title}
              </h1>
              <span></span>
              {/* <span
                className={cn(
                  "text-sm text-slate-700 dark:text-[#929292]",
                  !isComplete && "text-red dark:text-red"
                )}
              >
                Complete all fields {completionText}
              </span> */}
            </div>
            {/* Add Actions */}
            <Actions
              disabled={!isComplete}
              copyDisabled={!isComplete || !courseState?.published}
              courseId={course_id}
              isPublished={courseState?.published}
              brandSlug={courseContent?.user?.brand_slug}
              courseSlug={courseContent?.course_slug}
              // updateUI={(newState) => {
              //   // Update the ui with the new title
              //   setCour(newState);
              // }}
            />
          </div>

          <Separator className="mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge Icon={LayoutDashboard} /> */}

              <h2 className="text-xl font-semibold">✨ Information</h2>
            </div>
            <TitleForm
              initialData={courseContent}
              courseId={courseContent?.course_id}
            />
            <DescriptionForm
              initialData={courseContent}
              courseId={courseContent?.course_id}
              // updateUI={(newState) => {
              //   // Update the ui with the new title
              //   setDescriptionState(newState);
              //   console.log("newState", newState);
              // }}
            />
            <div className="flex flex-row items-start space-x-4 ">
              <ImageForm
                initialData={courseContent}
                courseId={courseContent?.course_id}
                updateUI={(newState) => {
                  // Update the ui with the new title
                  setThumbnailState(newState);
                  console.log("newState", newState);
                }}
              />
              <PriceForm
                initialData={courseContent}
                courseId={courseContent?.course_id}
                updateUI={(newState) => {
                  // Update the ui with the new title
                  setPriceState(newState);
                  console.log("newState", newState);
                }}
              />
            </div>
          </div>
          {/* Right side */}
          <div className="space-y-6">
            {/* Content */}
            <div>
              <div className="flex items-center gap-x-2">
                {/* <IconBadge Icon={ListChecks} /> */}
                <h2 className="text-xl font-semibold">🚀 Course content</h2>

                {/* <h2 className="text-xl">Course content</h2> */}
              </div>
              <ContentForm
                initialData={courseContent}
                courseId={courseContent?.course_id}
                updateUI={(newState) => {
                  // Update the ui with the new title
                  setLessonsState(newState);
                  console.log("newState", newState);
                }}
              />
            </div>
            {/* Price */}
            <div>
              {/* <div className="flex items-center gap-x-2">
                <IconBadge Icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCoursePage;
