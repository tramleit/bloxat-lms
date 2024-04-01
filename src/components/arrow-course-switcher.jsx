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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateModal } from "@/hooks/use-create-modal";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function ArrowCourseSwicher({ loading, items = [] }) {
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

  // console.log(currentCourse);

  //   Function to select a course and switch
  const [open, setOpen] = useState(false);

  const onCourseSelect = (course) => {
    setOpen(false);
    window.location.replace(`/${course.id}`);
    return;
  };

  const { t } = useTranslation();

  // console.log("formattedItems", formattedItems);

  // loading state
  if (loading) {
    return (
      <Button
        size={"icon"}
        className="mt-2 w-[40px] h-[40px] rounded-full bg-transparent hover:bg-white/80 dark:hover:bg-black/80"
      >
        <ChevronDown className="w-[16px] text-black dark:text-white" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          className="mt-2 w-[40px] h-[40px] rounded-full bg-transparent hover:bg-white/80 dark:hover:bg-black/80"
        >
          <ChevronDown className="w-[16px] text-black dark:text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder={t("Search course...")} />
            <CommandEmpty> {t("No course found.")}</CommandEmpty>
            <CommandGroup heading={t("Switch course")}>
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
                {t("Create course")}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
