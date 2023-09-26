import { useEffect, useState } from "react";
import { Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { AddStudentModal } from "@/components/modals/add-student-modal";
import useGetCourseStore from "@/store/courses/get-course-store";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "@/hooks/use-current-user";
import Loading from "@/components/loading/loading";
import { copyText } from "@/lib/copy-text";
import { PORTAL_URL } from "@/config/url-config";
import useIsMobile from "@/hooks/use-is-mobile";
import { useTranslation } from "react-i18next";
// import { columns } from "./columns";

export const StudentsClient = () => {
  const { course_id } = useParams();

  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  // Get course
  const { course, fetchCourseById } = useGetCourseStore();
  const currentUser = useCurrentUser();

  const { t } = useTranslation();

  useEffect(() => {
    fetchCourseById(course_id, 0);
  }, []);

  if (!course) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <AddStudentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        coursePrice={course?.price}
        currency={currentUser?.brand_currency}
        // onConfirm={onConfirm}
        // loading={userDeletionStore.isDeleting}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={t("Students")}
          description={t("View your students details.")}
        />
        <div className="flex flex-row space-x-2 ">
          <Button
            variant="outline"
            size="default"
            onClick={() =>
              copyText(
                `${PORTAL_URL}/${currentUser?.brand_slug}/${course?.course_slug}/checkout`
              )
            }
          >
            <Copy className="mr-2 h-4 w-4" />
            {isMobile ? <>Pay</> : <span>{t("Payment link")}</span>}
          </Button>
          <Button
            variant="blue"
            size={isMobile ? "icon" : "default"}
            onClick={() => setOpen(true)}
          >
            <Plus className="md:mr-2 mr-0 h-4 w-4" />
            {isMobile ? <></> : <span>{t("Add student")}</span>}
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
};
