import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MinimalModal } from "@/components/ui/minimal-modal";
import { Copy, Eye } from "lucide-react";
import { PORTAL_URL } from "@/config/url-config";
import { useCurrentUser } from "@/hooks/use-current-user";
import { copyText } from "@/lib/copy-text";
import useGetCourseStore from "@/store/courses/get-course-store";
import Loading from "@/components/loading/loading";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ViewPortalModal = ({ isOpen, onClose, brandSlug }) => {
  const { t } = useTranslation();
  const { course_id } = useParams();
  const [isMounted, setIsMounted] = useState(false);

  const currentUser = useCurrentUser();

  const { courseSlug, fetchCourseSlug, loading } = useGetCourseStore();

  useEffect(() => {
    fetchCourseSlug(course_id);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (loading || !courseSlug || !currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <MinimalModal isOpen={isOpen} onClose={onClose}>
      <div className="flex md:flex-row flex-col items-center justify-between md:space-x-5 space-x-0 md:space-y-0 space-y-5 py-10 px-3 text-center">
        {/* VIEW */}
        <div
          onClick={() => {
            // Open portal of the brand in a new tab
            window.open(`${PORTAL_URL}/${brandSlug}`, "_blank");
            onClose();
          }}
          className="flex flex-col md:w-[200px] md:h-[180px] w-full space-y-2 bg-blueBloxLight text-white hover:bg-[#5890ff] cursor-pointer transition items-center justify-center border p-10 rounded-lg "
        >
          <Eye className="h-6 w-6" />
          <h2 className="font-semibold">{t("View your portal")}</h2>
        </div>
        {/* COPY */}
        <div
          onClick={() => {
            copyText(
              `${PORTAL_URL}/${currentUser?.brand_slug}/${courseSlug?.course_slug}/checkout`
            );
            onClose();
          }}
          className="flex flex-col md:w-[200px] md:h-[180px] w-full space-y-2 bg-lemonBlox text-black hover:bg-lemonBloxLight cursor-pointer transition items-center justify-center border p-10 rounded-lg"
        >
          <Copy className="h-6 w-6" />
          <h2 className="font-semibold">{t("Copy course payment link")}</h2>
        </div>
      </div>

      {/* <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div> */}
    </MinimalModal>
  );
};

export default ViewPortalModal;
