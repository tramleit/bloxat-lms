import React, { useEffect } from "react";
import { UserNav } from "./user-nav";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import CourseSwicher from "@/components/course-switcher";
import { MainSearch } from "@/components/main-search";

import useCourseStore from "@/store/courses/courses-store";
import { Link, useParams } from "react-router-dom";
import Logo from "@/assets/images/logo/bloxat-colored.webp";

const Navbar = () => {
  // const param = useParams();
  // const courseId = param.courseId;
  const { course_id } = useParams();

  // get user
  // get user id
  //   get user courses

  const { courses, loading, fetchCoursesByUserId } = useCourseStore();

  // const router = useRouter();

  useEffect(() => {
    fetchCoursesByUserId();
  }, []);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link to={`/${course_id}`}>
          {/* <img
            src="/images/logo/bloxat-logo.webp"
            className="w-[26px] h-auto mr-6 mix-blend-difference filter brightness-0 invert cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
            alt="Bloxat"
            draggable={false}
          /> */}

          <img
            src={Logo}
            className="w-[80px] h-auto mr-6 cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
            alt="Bloxat"
            draggable={false}
          />
        </Link>
        <CourseSwicher loading={loading} items={courses} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <MainSearch />
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
