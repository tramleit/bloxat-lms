import { cn } from "@/lib/utils";
// import Link from "next/link";
import { Link, useLocation, useParams } from "react-router-dom";

export function MainNav({ className, ...props }) {
  // Get the pathname
  // const pathname = usePathname();
  // const params = useParams();
  const location = useLocation();
  const { course_id } = useParams();

  const pathname = location.pathname;

  // Routes
  const routes = [
    // {
    //   href: `/${params.courseId}/content`,
    //   label: "Content",
    //   active: pathname === `/${params.courseId}/content`,
    // },
    {
      href: `/${course_id}`,
      label: "Overview",
      active: pathname === `/${course_id}`,
    },
    {
      href: `/${course_id}/students`,
      label: "Students",
      active: pathname === `/${course_id}/students`,
    },
    {
      href: `/${course_id}/settings`,
      label: "Settings",
      active: pathname === `/${course_id}/settings`,
    },
    // {
    //   href: `/${params.courseId}/billing`,
    //   label: "Settings",
    //   active: pathname === `/${params.courseId}/billing`,
    // },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route, i) => (
        <Link
          key={i}
          to={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
