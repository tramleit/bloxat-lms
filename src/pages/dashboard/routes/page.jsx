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
import { useEffect, useState } from "react";
import ViewPortalModal from "@/components/modals/view-portal-modal";
import { useTranslation } from "react-i18next";
import QuickSkeleton from "../_components/skeleton";

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

  // View portal modal state
  const [openViewModal, setOpenViewModal] = useState(false);

  const { t } = useTranslation();

  // to show the tour modal if first time visit
  useEffect(() => {
    if (tourModalPopped !== "true") {
      enableShowStartTourModal();
    }
  }, []);

  if (!currentUser || isLoading || courseLoading) {
    return <QuickSkeleton />;
  }

  console.log("course", course);

  return (
    <>
      {/* Tour Modal if the user got here for the first time .. or manually toggled it from the support hover */}
      {showStartTourModal && <StartTourModal />}
      {/* Warning banners if something is missing */}
      <WarningsBanners warnings={warnings} courseId={course_id} />

      {/* That's a modal that opens when we click View your portal ... */}
      {/* to let them choose if they want to see the entire portal or just copy their payment link? */}
      {openViewModal && (
        <ViewPortalModal
          isOpen={openViewModal}
          onClose={() => setOpenViewModal(false)}
          brandSlug={warnings?.brandSlug}
          // onConfirm={onConfirm}
        />
      )}
      <div className="page-fade flex flex-col items-center justify-center lg:h-[80vh] h-[80vh] md:h-screen text-center md:px-0 px-5">
        {/* <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {currentUser?.first_name}!{" "}
          <span className="wave">👋</span>
        </h1> */}
        <h2 className="text-xl font-normal mb-1.5 tracking-tight">
          {t("Ahlan,")} {currentUser?.first_name}!{" "}
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
            // variant="blue"
            // variant="yellow"

            size="xl"
            className="w-full"
            onClick={() => {
              createModal.onOpen();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("Create a new course")}
          </Button>
          <Button
            // variant="lemon"
            variant="blueLight"
            size="xl"
            className="w-full"
            onClick={() => {
              navigate(`/${course_id}/edit`);
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            {t("Add & Edit course content")}
          </Button>
          <Button
            variant="yellow"
            // variant="sky"
            size="xl"
            className="w-full"
            onClick={() => {
              navigate(`/${course_id}/settings/payment`);
            }}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {t("Payment method")}
          </Button>
          <div className="flex flex-row items-center space-x-5">
            <Button
              variant="outline"
              size="xl"
              className="w-full"
              onClick={() => setOpenViewModal(true)}

              // onClick={() => {
              //   // Open portal of the brand in a new tab
              //   window.open(`${PORTAL_URL}/${warnings?.brandSlug}`, "_blank");
              // }}
            >
              <Eye className="h-4 w-4 mr-2" />
              {t("View Portal & Get Link")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickPage;
