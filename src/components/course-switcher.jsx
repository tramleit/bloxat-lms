import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCreateModal } from "@/hooks/use-create-modal";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

export default function CourseSwicher({ className, loading, items = [] }) {
  const createModal = useCreateModal();
  const { course_id } = useParams();
  // const navigate = useNavigate();
  // const params = useParams();
  // const router = useRouter();

  //   Format the courses items
  const formattedItems = items?.rows?.map((item) => ({
    label: item.title,
    id: item.course_id,
    published: item.published,
  }));

  //   Which course is currently selected
  const currentCourse = formattedItems?.find((item) => item.id == course_id);

  console.log(currentCourse);

  //   Function to select a course and switch
  const [open, setOpen] = useState(false);

  const onCourseSelect = (course) => {
    setOpen(false);
    window.location.replace(`/${course.id}`);
    return;
  };

  console.log("formattedItems", formattedItems);

  // loading state
  if (loading) {
    return <></>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a course"
          className={cn("md:w-[250px] w-1/2 justify-between", className)}
          // for tour
          data-tour="1"
        >
          {/* it was 200px */}
          {/* <Box className="mr-2 h-4 w-4 " /> */}
          <div className="flex items-center justify-center">
            <div
              className={cn(
                "w-3 h-3 rounded-full mr-2",
                currentCourse?.published
                  ? "bg-lemonBloxDark "
                  : "bg-yellowBloxDark "
              )}
            />
          </div>
          <span className="line-clamp-1 text-start w-full">
            {" "}
            {currentCourse?.label}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search course..." />
            <CommandEmpty> No course found.</CommandEmpty>
            <CommandGroup heading="Courses">
              {formattedItems?.map((course) => (
                <CommandItem
                  key={course.id}
                  onSelect={() => {
                    onCourseSelect(course);
                  }}
                  className="text-sm py-2"
                >
                  <div
                    className={cn(
                      "w-3 h-3 flex p-1 rounded-full mr-2",
                      course?.published
                        ? "bg-lemonBloxDark "
                        : "bg-yellowBloxDark "
                    )}
                  />
                  {/* <Box className="mr-2 h-4 w-4" /> */}
                  <span className="line-clamp-1 text-start w-full">
                    {course.label}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 ",
                      currentCourse?.id === course.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {/* Seperator */}
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="font-semibold"
                onSelect={() => {
                  setOpen(false);
                  createModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create course
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
