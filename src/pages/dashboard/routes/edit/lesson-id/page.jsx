import { Link, useNavigate, useParams } from "react-router-dom";
import useLessonsStore from "@/store/lessons/lessons-store";
import Loading from "@/components/loading/loading";
import { useState } from "react";
import { useEffect } from "react";
import {
  ArrowLeft,
  Files,
  LayoutDashboard,
  LayoutDashboardIcon,
  Video,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LessonTitleForm } from "./_components/lesson-title-form";
import { LessonDescriptionForm } from "./_components/lesson-description-form";
import { VideoForm } from "./_components/video-form";
import { ResourcesForm } from "./_components/resources-form";
import { LessonActions } from "./_components/lesson-actions";
import { BackButton } from "@/components/back-button";

const EditLessonIdPage = () => {
  const { course_id, lesson_id } = useParams();

  const navigate = useNavigate();

  const { lessonData, loading, fetchLessonById } = useLessonsStore();

  //   state real time updates
  const [lessonState, setLessonState] = useState(lessonData);

  useEffect(() => {
    fetchLessonById(course_id, lesson_id);
  }, [lesson_id]);

  //   rehydrate our items
  useEffect(() => {
    setLessonState(lessonData);
  }, [lessonData]);

  console.log("lessonState", lessonState);

  // const requiredFields = [lessonData?.title, lessonData?.lesson_video_url];

  // const totalFields = requiredFields.length;
  // const completedFields = requiredFields.filter(Boolean).length;

  // const completionText = `(${completedFields}/${totalFields})`;

  //   loading
  if (loading || !lessonData) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          {/* <Link
            to={`/${course_id}/edit`}
            className="flex items-center text-sm  hover:bg-slate-100 dark:hover:bg-[#2d2d2d] w-fit px-2 py-1 rounded-md transition mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to course edit
          </Link> */}

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-row items-center space-x-4">
              <BackButton
                onClick={() => {
                  navigate(`/${course_id}/edit`);
                }}
              />
              <div className="flex flex-col gap-y-2">
                <h1 className="text-3xl font-bold tracking-tight line-clamp-1">
                  {lessonState?.title}
                </h1>
                <span></span>
                {/* <span className="text-sm text-muted-foreground">
                Complete all fields {completionText}
              </span> */}
              </div>
            </div>
            <LessonActions courseId={course_id} lessonId={lesson_id} />
          </div>
          <Separator className="mt-4" />
        </div>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge Icon={LayoutDashboardIcon} /> */}
              <h2 className="text-xl font-semibold">🧠 Lesson information</h2>
            </div>
            {/* Title form */}
            <LessonTitleForm
              initialData={lessonData}
              lessonId={lesson_id}
              updateUI={(newState) => {
                // Update the ui with the new title
                setLessonState(newState);
              }}
            />
            <LessonDescriptionForm
              initialData={lessonData}
              lessonId={lesson_id}
            />
            <div>
              <div className="flex items-center gap-x-2 mt-6">
                {/* <IconBadge Icon={Files} /> */}
                <h2 className="text-xl">🔗 Resources</h2>
              </div>
              <ResourcesForm
                initialData={lessonData?.resources}
                lessonId={lesson_id}
              />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div>
          <div className="flex items-center gap-x-2">
            {/* <IconBadge Icon={Video} /> */}
            <h2 className="text-xl font-semibold">👨‍💻 Lesson video</h2>
          </div>
          {/* Video Form */}
          <VideoForm initialData={lessonData} lessonId={lesson_id} />
        </div>
      </div>
    </div>
  );
};

export default EditLessonIdPage;
