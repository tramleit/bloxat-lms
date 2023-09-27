import { AlignJustify, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/assets/images/logo/bloxat-blue.webp";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileSideMenu = () => {
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
      label: "✨ Quick",
      active: pathname === `/${course_id}`,
    },
    {
      href: `/${course_id}/sales`,
      label: "💸 Sales",
      active: pathname === `/${course_id}/sales`,
    },
    {
      href: `/${course_id}/students`,
      label: "👨‍💻 Students",
      active: pathname === `/${course_id}/students`,
    },
    {
      href: `/${course_id}/settings`,
      label: "⚙️ Settings",
      active: pathname === `/${course_id}/settings`,
    },
    // {
    //   href: `/${params.courseId}/billing`,
    //   label: "Settings",
    //   active: pathname === `/${params.courseId}/billing`,
    // },
  ];

  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-3 hover:opacity-75 transition">
        <Menu className="h-5 w-5 flex md:hidden items-center justify-center rounded-full" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white dark:bg-black w-72">
        {/* Side menu content */}
        <div className="p-5">
          <Link to={`/${course_id}`}>
            <img
              src={Logo}
              className="w-[80px] h-auto mr-6  cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
              //    mix-blend-difference filter brightness-0 invert
              alt="Bloxat"
              draggable={false}
            />
          </Link>
          <Separator className="mt-4" />
          {routes.map((route, i) => (
            <div
              key={i}
              // for tour
              data-tour={i === 0 ? "2" : i === 1 ? "3" : i === 2 ? "4" : "5"}
              className="flex flex-col items-center justify-center w-full"
            >
              <Link
                to={route.href}
                className={cn(
                  "flex flex-row items-center justify-between text-sm font-medium transition-colors hover:text-primary py-4 px-3 w-full",
                  route.active
                    ? "text-black dark:text-white bg-[#fafafa] dark:bg-[#141414]"
                    : "text-muted-foreground"
                )}
              >
                <span> {route.label}</span>
                {route.active && (
                  <div
                    className={cn(
                      "bg-blueBlox h-[35px] w-[3px] absolute right-0"
                    )}
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideMenu;
