import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
// import useCourseStore from "@/store/courses/courses-store";
import useGetCourseStore from "@/store/courses/get-course-store";
import Loading from "@/components/loading/loading";
import { useNavigate, useParams } from "react-router-dom";
// import { useAlreadyHasCourse } from "@/hooks/use-already-has-course";

const RootPage = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  // const [isLoading, setIsLoading] = useState(true);

  // Loading state
  if (!currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // Check if user has a course already under them ... that means they're not new
  // Check if the currentUser has a course under them
  // If no courses redirect to / .. which is the setup
  if (currentUser?.courses?.length == 0) {
    navigate("/setup");
    return;
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <span>Root</span>
      <p>Preparing your Bloxat experience ...</p>
    </div>
  );
};

export default RootPage;
