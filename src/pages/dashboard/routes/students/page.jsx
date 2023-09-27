import React, { useEffect, useState } from "react";
import useStudentsStore from "@/store/students/students-store";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading/loading";
import { useParams } from "react-router-dom";
import { StudentsClient } from "./_components/client";
import { columns } from "./_components/columns";
import { useTranslation } from "react-i18next";
import StudentsSkeleton from "./_components/skeleton";

const StudentsPage = () => {
  const { course_id } = useParams();

  // For Pagination
  const [page, setPage] = useState(0);

  // For Search
  const [search, setSearch] = useState("");

  // Get Students
  const { enrollments, fetchDetailedEnrollments } = useStudentsStore();

  const { t } = useTranslation();

  useEffect(() => {
    // Fetch enrollments when the component mounts
    fetchDetailedEnrollments(course_id, 7, page, search);
  }, [course_id, page, search]);

  // Next page function
  function nextPage() {
    if (page !== enrollments?.count - 1) {
      setPage(page + 1);
      fetchDetailedEnrollments(course_id, page + 1, "");
    }
  }

  // Previous page function
  function previousPage() {
    if (page >= 1) {
      setPage(page - 1);
      fetchDetailedEnrollments(course_id, page - 1, "");
    }
  }

  // console.log("enrollments here", enrollments?.rows);

  // Loading
  if (!enrollments?.rows) {
    return <StudentsSkeleton />;
  }

  return (
    <div className="page-fade flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <StudentsClient />
        {/* Search Input For filtering */}
        <div className="flex items-center">
          <Input
            placeholder={t("Search")}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
              console.log(search);
              // fetchGuide(e.target.value);
            }}
            className="max-w-sm"
          />
        </div>
        {/* Students DataTable */}
        <DataTable
          columns={columns}
          data={enrollments?.rows}
          nextPage={() => {
            nextPage();
          }}
          prevPage={() => {
            previousPage();
          }}
          nextDisabled={enrollments?.rows?.length < 7 ? true : false}
          prevDisabled={page === 0 ? true : false}
        />
      </div>
    </div>
  );
};

export default StudentsPage;
