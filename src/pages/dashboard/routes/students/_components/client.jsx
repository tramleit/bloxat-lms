import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { AddStudentModal } from "@/components/modals/add-student-modal";
import useGetCourseStore from "@/store/courses/get-course-store";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { columns } from "./columns";

export const StudentsClient = ({ data }) => {
  const { course_id } = useParams();

  const [open, setOpen] = useState(false);

  // Get course
  const { course, fetchCourseById } = useGetCourseStore();
  const currentUser = useCurrentUser();

  useEffect(() => {
    fetchCourseById(course_id, 0);
  }, []);

  if (!course) {
    return <>loading</>;
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
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
    </>
  );
};
