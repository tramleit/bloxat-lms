import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { useCurrentUser } from "@/hooks/use-current-user";
// import useCourseStore from "@/store/courses/courses-store";
import useGetCourseStore from "@/store/courses/get-course-store";
import Loading from "@/components/loading/loading";
import { useNavigate, useParams } from "react-router-dom";
// import { useAlreadyHasCourse } from "@/hooks/use-already-has-course";

export default function DashboardLayout({ children }) {
  const { course_id } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  // console.log("PROPS", params.courseId);

  // Fetch the course by its courseId
  const fetchCourseById = useGetCourseStore((state) => state.fetchCourseById);
  const course = useGetCourseStore((state) => state.course);

  // const [isLoading, setIsLoading] = useState(true);

  // Check if there's no token then redirect to sign up
  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem("bxAuthToken");

    // If a token exists and is not undefined, redirect to the desired page (e.g., '/')
    if (token == undefined || token == null) {
      navigate("/login");
      return;
    }

    // Fetch the course by its courseId
    fetchCourseById(course_id, 1); // Fetch the course by ID
  }, [course_id, fetchCourseById, currentUser]);

  // Loading state
  if (!course || !currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // TRIAL
  // Check if free trial ended
  // If Today's date > trial_end .. then we exceeded the trial periond and redirect to the purchase page
  // Check if free trial has ended and redirect to purchase if true .. and check if there's no subscription
  if (
    currentUser?.trial_end &&
    new Date() > new Date(currentUser.trial_end) &&
    !currentUser?.subscription_end
  ) {
    // console.log("today", new Date());

    // console.log("trial_end", new Date(currentUser.trial_end));
    // console.log(new Date() > new Date(currentUser.trial_end));
    window.location.replace("/trial-ended");
    return;
  }

  // SUBSCRIPTION
  // If Today's date > subscription_end .. then we exceeded the subscription_end periond and redirect to the purchase page
  if (
    currentUser?.subscription_end &&
    new Date() > new Date(currentUser.subscription_end)
  ) {
    // console.log("today", new Date());

    // console.log("trial_end", new Date(currentUser.trial_end));
    // console.log(new Date() > new Date(currentUser.trial_end));
    window.location.replace("/subscription-ended");
    return;
  }

  // Check if user has a course already under them ... that means they're not new
  // Check if the currentUser has a course under them
  // If no courses redirect to / .. which is the setup
  if (currentUser?.courses?.length == 0) {
    navigate("/setup");
    return;
  }

  // Check if the course doesn't belong to the currentUser
  const courseBelongsToCurrentUser = course.user_id === currentUser?.user_id;

  // Redirect only when necessary
  if (!courseBelongsToCurrentUser) {
    const lastCourseId = currentUser.courses[0].course_id;
    if (lastCourseId) {
      // console.log("no");
      window.location.replace(`/${lastCourseId}`);
      return;
    }
  }

  // Show days remaining for (if there's 2 days remaining)
  // SUBSCRIPTION
  // SHOW REMAINING DAYS FOR SUBSCRIPTION
  // Assuming currentUser.subscription_end is a string in ISO format, like "2024-09-16T08:05:53.000Z"
  // const subscriptionEndDate = new Date(currentUser?.subscription_end);
  // const currentDate = new Date();

  // // Calculate the time difference in milliseconds
  // const timeDifference = subscriptionEndDate - currentDate;

  // // Calculate the remaining days
  // const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // console.log("Remaining days until subscription ends:", remainingDays);

  // ////////////////////////////////////////
  // // SHOW REMAINING DAYS FOR TRIAL
  // const trialEndDate = new Date(currentUser?.trial_end);
  // // const currentDate = new Date();

  // // Calculate the time difference in milliseconds
  // const trialTimeDifference = trialEndDate - currentDate;

  // // Calculate the remaining days
  // const trialRemainingDays = Math.ceil(
  //   trialTimeDifference / (1000 * 60 * 60 * 24)
  // );

  return (
    <>
      {/* {remainingDays <= 2 && <></>} */}
      {/* {trialRemainingDays <= 2 && <></>} */}
      <Navbar />
      {children}
    </>
  );
}
