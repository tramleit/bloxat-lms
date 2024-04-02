import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditCard, Eye, Pencil, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCreateModal } from "@/hooks/use-create-modal";
import WarningsBanners from "../_components/warnings-banners";
import { useWarnings } from "@/hooks/use-warnings";
// import Loading from "@/components/loading/loading";
// import { PORTAL_URL } from "@/config/url-config";
import { useCourseTitle } from "@/queries/courses/course-queries";
import useTourStore from "@/store/tour.store";
import StartTourModal from "@/components/modals/start-tour-modal";
import ViewPortalModal from "@/components/modals/view-portal-modal";
import QuickSkeleton from "../_components/skeleton";
import ArrowCourseSwicher from "@/components/arrow-course-switcher";
import useCourseStore from "@/store/courses/courses-store";
import { PORTAL_URL } from "@/config/url-config";

const QuickPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const createModal = useCreateModal();

  // get the current course title and slug
  const { data: course, isLoading: courseLoading } = useCourseTitle(course_id);

  // Use the custom hook to fetch warnings
  const { data: warnings, isLoading } = useWarnings(course_id);

  const { courses, loading, fetchMinimalCoursesByUserId } = useCourseStore();

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

  useEffect(() => {
    fetchMinimalCoursesByUserId();
  }, []);

  // to show the tour modal if first time visit
  useEffect(() => {
    if (tourModalPopped !== "true") {
      enableShowStartTourModal();
    }
  }, []);

  if (!currentUser || isLoading || courseLoading) {
    return <QuickSkeleton />;
  }

  // console.log("course", course);

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
      <div className="page-fade flex flex-col relative items-center justify-center lg:h-[80vh] h-[80vh] md:h-screen text-center md:px-0 px-5">
        {/* <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {currentUser?.first_name}!{" "}
          <span className="wave">👋</span>
        </h1> */}
        <h2 className="text-xl font-normal mb-1.5 tracking-tight">
          {t("Ahlan,")} {currentUser?.first_name}!{" "}
          <span className="wave">👋</span>
        </h2>
        <div className="flex flex-row justify-center items-center space-x-0 md:w-[550px]">
          <h1 className="text-4xl font-bold tracking-tight">{course?.title}</h1>
          <ArrowCourseSwicher loading={loading} items={courses} />

          {/* <Button
            size={"icon"}
            className="mt-2 w-[40px] h-[40px] rounded-full bg-transparent hover:bg-white/80 dark:hover:bg-black/80"
          >
            <ChevronDown className="w-[16px] text-black dark:text-white" />
          </Button> */}
        </div>
        {/* <p className="text-muted-foreground mt-3">
          Quickly access what you need
        </p> */}
        <div className="flex flex-col space-y-5 mt-10 w-[350px]">
          <Button
            // variant="blue"
            // variant="yellow"

            size="xl"
            className="w-full bg-newPurpleLight text-black hover:bg-newPurpleLight/80"
            onClick={() => {
              createModal.onOpen();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("Create a new course")}
          </Button>
          <Button
            // variant="lemon"
            // variant="blueLight"
            size="xl"
            className="w-full bg-newLemonLight text-black hover:bg-newLemonLight/80"
            onClick={() => {
              navigate(`/${course_id}/edit`);
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            {t("Manage content")}
          </Button>
          <Button
            // variant="yellow"
            // variant="sky"
            size="xl"
            className="w-full bg-newBlue text-black hover:bg-newBlue/80"
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
              // onClick={() => setOpenViewModal(true)}
              // onClick={() => {
              //   // Open portal of the brand in a new tab
              //   window.open(`${PORTAL_URL}/${warnings?.brandSlug}`, "_blank");
              // }}
              onClick={() => {
                // Open portal of the brand in a new tab
                window.open(
                  `${PORTAL_URL}/${currentUser?.brand_slug}`,
                  "_blank"
                );
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              {t("View Portal")}
            </Button>
          </div>
        </div>
      </div>
      {/* Grid items */}
      {/* <div className="grid absolute h-20 mt-[24vh] inset-0 grid-cols-3 md:grid-cols-8 gap-0 pointer-events-none z-[1]">
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="border border-gray-100 dark:border-gray-900 h-32 flex justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>

        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>

        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>

        <div className="md:flex hidden border border-gray-100 dark:border-gray-900 h-32 justify-center items-center"></div>
      </div> */}
    </>
  );
};

export default QuickPage;
