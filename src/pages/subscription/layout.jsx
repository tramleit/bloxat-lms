import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/use-current-user";
import Loading from "@/components/loading/loading";
import LanguageInitializer from "@/hooks/language-init";
// import { useAlreadyHasCourse } from "@/hooks/use-already-has-course";

export default function SubscriptionLayout({ children }) {
  const navigate = useNavigate();

  // const params = useParams();
  // const courseId = params.courseId;
  const currentUser = useCurrentUser();

  // console.log("PROPS", params.courseId);

  // Fetch the course by its courseId
  // const fetchCourseById = useGetCourseStore((state) => state.fetchCourseById);
  // const course = useGetCourseStore((state) => state.course);

  // const [isLoading, setIsLoading] = useState(true);

  // Check if there's no token then redirect to sign up
  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem("bxAuthToken");

    // If a token exists and is not undefined, redirect to the desired page (e.g., '/')
    if (token == "undefined" || token == null) {
      navigate("/login");
      return;
    }

    // // Fetch the course by its courseId
    // fetchCourseById(courseId, 1); // Fetch the course by ID
  }, []);

  // Loading state
  if (!currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      {/* LanguageInitializer runs early in the rendering process */}
      <LanguageInitializer />
      {children}
    </>
  );
}
