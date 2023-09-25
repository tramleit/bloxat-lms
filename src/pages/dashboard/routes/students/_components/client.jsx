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
// import { columns } from "./columns";

export const StudentsClient = () => {
  const { course_id } = useParams();

  const [open, setOpen] = useState(false);

  // Get course
  const { course, fetchCourseById } = useGetCourseStore();
  const currentUser = useCurrentUser();

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
        <Heading title="Students" description="View your students details." />
        <div className="md:flex hidden flex-row space-x-2">
          <Button
            variant="outline"
            onClick={() =>
              copyText(
                `${PORTAL_URL}/${currentUser?.brand_slug}/${course?.course_slug}/checkout`
              )
            }
          >
            <Copy className="mr-2 h-4 w-4" />
            Payment link
          </Button>
          <Button variant="blue" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add student
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
};
