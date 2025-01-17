import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserNav } from "./user-nav";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import CourseSwicher from "@/components/course-switcher";
import { MainSearch } from "@/components/main-search";

import useCourseStore from "@/store/courses/courses-store";
import Logo from "@/assets/images/logo/bloxat-colored.webp";
import MobileLogo from "@/assets/images/logo/bloxat-small.webp";
// import { Button } from "@/components/ui/button";
import MobileSideMenu from "@/components/mobile-sidemenu";
import { LanguageToggle } from "@/components/language-toggle";

const Navbar = () => {
  // const param = useParams();
  // const courseId = param.courseId;
  const { course_id } = useParams();

  // get user
  // get user id
  //   get user courses

  const { courses, loading, fetchMinimalCoursesByUserId } = useCourseStore();

  // const router = useRouter();

  useEffect(() => {
    fetchMinimalCoursesByUserId();
  }, []);

  return (
    <div className="border-b shadow-sm z-[99]">
      {/* bg-[#181818] */}
      <div className="flex h-16 items-center px-4 ">
        {/* Menu for mobile */}
        <MobileSideMenu />
        <Link to={`/${course_id}`}>
          <img
            src={Logo}
            className="md:flex hidden w-[80px] h-auto mr-6 mix-blend-difference filter brightness-0 invert cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
            alt="Bloxat"
            draggable={false}
          />
          <img
            src={MobileLogo}
            className="flex md:hidden w-[32px] h-auto mr-3 cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
            alt="Bloxat"
            draggable={false}
          />
        </Link>
        <CourseSwicher loading={loading} items={courses} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <MainSearch />
          <LanguageToggle />
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
