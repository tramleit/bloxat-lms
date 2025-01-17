import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
// import { useEffect } from "react";
// import Link from "next/link";
import { Link, useLocation, useParams } from "react-router-dom";

export function MainNav({ className }) {
  // Get the pathname
  // const pathname = usePathname();
  // const params = useParams();
  const location = useLocation();
  const { course_id } = useParams();

  const pathname = location.pathname;

  const { t } = useTranslation();

  // Routes
  const routes = [
    // {
    //   href: `/${params.courseId}/content`,
    //   label: "Content",
    //   active: pathname === `/${params.courseId}/content`,
    // },
    {
      href: `/${course_id}`,
      label: t("Course"),
      active: pathname === `/${course_id}`,
    },
    {
      href: `/${course_id}/sales`,
      label: t("Sales"),
      active: pathname === `/${course_id}/sales`,
    },
    {
      href: `/${course_id}/students`,
      label: t("Students"),
      active: pathname === `/${course_id}/students`,
    },
    {
      href: `/${course_id}/settings`,
      label: t("Settings"),
      active: pathname === `/${course_id}/settings`,
    },
    // {
    //   href: `/${params.courseId}/billing`,
    //   label: "Settings",
    //   active: pathname === `/${params.courseId}/billing`,
    // },
  ];

  // console.log("routes[0].href", routes[1].active);
  // console.log("pathname:", pathname);

  // useEffect(() => {}, []);

  return (
    <nav
      className={cn(
        "relative md:flex hidden h-full first-letter:flex  flex-row items-center space-x-4 lg:space-x-6 ",
        className
      )}
    >
      {routes.map((route, i) => (
        <div
          key={i}
          // for tour
          data-tour={i === 0 ? "2" : i === 1 ? "3" : i === 2 ? "4" : "5"}
          className="flex w-fit flex-col items-center justify-center"
        >
          <Link
            to={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-blueBlox",
              route.active ? "text-blueBlox" : "text-foreground/60"
            )}
          >
            <span> {route.label}</span>
            {route.active && (
              <div
                className={cn(
                  "bg-blueBlox w-[38px] h-[3px] absolute bottom-0",
                  route.label === "Students"
                    ? "w-[60px]"
                    : route.label === "Course"
                    ? "w-[48px]"
                    : route.label === "Settings" && "w-[55px]"
                )}
              />
            )}
          </Link>
        </div>
      ))}
    </nav>
  );
}
