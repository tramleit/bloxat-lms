import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCreateModal } from "@/hooks/use-create-modal";
import { CreditCard, Eye, Pencil, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import WarningsBanners from "../_components/warnings-banners";
import { useWarnings } from "@/hooks/use-warnings";
import Loading from "@/components/loading/loading";
import { PORTAL_URL } from "@/config/url-config";
import { useCourseTitle } from "@/queries/courses/course-queries";
import useTourStore from "@/store/tour.store";
import StartTourModal from "@/components/modals/start-tour-modal";
import { useEffect } from "react";

const QuickPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const createModal = useCreateModal();

  // get the current course title and slug
  const { data: course, isLoading: courseLoading } = useCourseTitle(course_id);

  // Use the custom hook to fetch warnings
  const { data: warnings, isLoading } = useWarnings(course_id);

  //Start tour modal state check if it's enabled or not
  const showStartTourModal = useTourStore((state) => state.showStartTourModal);
  const enableShowStartTourModal = useTourStore(
    (state) => state.enableShowStartTourModal
  );

  // Get local storage data
  // If start tour modal has been shown
  const tourModalPopped = localStorage.getItem("tourModalPopped");

  // to show the tour modal if first time visit
  useEffect(() => {
    if (tourModalPopped !== "true") {
      enableShowStartTourModal();
    }
  }, []);

  if (!currentUser || isLoading || courseLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  console.log("course", course);

  return (
    <>
      {/* Tour Modal if the user got here for the first time .. or manually toggled it from the support hover */}
      {showStartTourModal && <StartTourModal />}
      {/* Warning banners if something is missing */}
      <WarningsBanners warnings={warnings} courseId={course_id} />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        {/* <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {currentUser?.first_name}!{" "}
          <span className="wave">👋</span>
        </h1> */}
        <h2 className="text-xl font-normal mb-1.5 tracking-tight">
          Welcome back, {currentUser?.first_name}!{" "}
          <span className="wave">👋</span>
        </h2>
        <h1 className="text-4xl font-bold tracking-tight md:w-[550px] ">
          {course?.title}
        </h1>
        {/* <p className="text-muted-foreground mt-3">
          Quickly access what you need
        </p> */}
        <div className="flex flex-col space-y-5 mt-10 w-[350px]">
          <Button
            variant="blue"
            size="lg"
            className="w-full"
            onClick={() => {
              createModal.onOpen();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create course
          </Button>
          <Button
            variant="lemon"
            size="lg"
            className="w-full"
            onClick={() => {
              navigate(`/${course_id}/edit`);
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Course content
          </Button>
          <Button
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => {
              navigate(`/${course_id}/settings/payment`);
            }}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payment method
          </Button>
          <div className="flex flex-row items-center space-x-5">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                // Open portal of the brand in a new tab
                window.open(`${PORTAL_URL}/${warnings?.brandSlug}`, "_blank");
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View my portal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickPage;
