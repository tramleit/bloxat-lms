import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./use-current-user";
// import { redirect } from "next/navigation";

// to get the current user
export const useAlreadyHasCourse = () => {
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  // Check if user has a course already under them ... that means they're not new
  // Check if the currentUser has a course under them
  if (currentUser?.courses.length !== 0) {
    const lastCourseId = currentUser?.courses[0]?.course_id;

    // console.log("LAST COURSE HERE", lastCourseId);

    if (lastCourseId) {
      // window.location.href = `/${lastCourseId}`;

      navigate(`/${lastCourseId}`);
      // return;
      // redirect(`?courseId=${lastCourseId}`);
    }
  }

  // return null;
};
