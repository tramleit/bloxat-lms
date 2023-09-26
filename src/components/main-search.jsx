import * as React from "react";
import {
  BoxIcon,
  CreditCard,
  DollarSign,
  Edit2,
  Languages,
  Pencil,
  PencilRuler,
  Plus,
  Rocket,
  User,
  Users,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useCreateModal } from "@/hooks/use-create-modal";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function MainSearch() {
  // const params = useParams();
  // const router = useRouter();
  const { course_id } = useParams();
  const navigate = useNavigate();

  // To open the create course modal
  const createModal = useCreateModal();

  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Search Bar */}
      <div onClick={setOpen} className="relative lg:flex hidden">
        {/* <p className="text-sm text-muted-foreground absolute top-[-30px] left-0 right-0 ml-auto mr-auto text-center">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p> */}
        <Input
          type="search"
          placeholder={t("Search")}
          className="md:w-[250px] lg:w-[250px]"
        />
      </div>
      {/* End Search */}
      {/* The Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* <CommandInput placeholder="Type a command or search..." /> */}
        <CommandInput placeholder={t("Search")} />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={t("Suggestions")}>
            <div
              onClick={() => {
                // open create course modal
                createModal.onOpen();
                // close search
                setOpen(false);
              }}
            >
              <CommandItem
              // onClick={() => {
              //   router.push(`/${params.courseId}/settings/plan`);
              // }}
              >
                <Plus className="mr-2 h-4 w-4" />
                <span>{t("Add course")}</span>
              </CommandItem>
            </div>

            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/edit`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>{t("Edit course")}</span>
              </CommandItem>
            </div>

            {/* <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/builder/content`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <Edit2 className="mr-2 h-4 w-4" />
                <span>Edit content</span>
              </CommandItem>
            </div> */}

            {/* <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Content</span>
            </CommandItem> */}
            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/sales`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <DollarSign className="mr-2 h-4 w-4" />
                <span>{t("Sales")}</span>
              </CommandItem>
            </div>
            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/students`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <Users className="mr-2 h-4 w-4" />
                <span>{t("Students")}</span>
              </CommandItem>
            </div>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/settings/account`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t("Account")}</span>
                {/* <CommandShortcut>⌘P</CommandShortcut> */}
              </CommandItem>
            </div>
            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/settings/account`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <Languages className="mr-2 h-4 w-4" />
                <span>{t("Language")}</span>
                {/* <CommandShortcut>⌘P</CommandShortcut> */}
              </CommandItem>
            </div>
            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/settings/plan`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <Rocket className="mr-2 h-4 w-4" />
                <span>{t("Plan")}</span>

                {/* <CommandShortcut>⌘B</CommandShortcut> */}
              </CommandItem>
            </div>

            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/settings/payment`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>{t("Payment")}</span>

                {/* <CommandShortcut>⌘B</CommandShortcut> */}
              </CommandItem>
            </div>

            <div
              onClick={() => {
                // console.log("Clicked");
                navigate(`/${course_id}/settings/branding`);
                setOpen(false);
              }}
            >
              <CommandItem>
                <PencilRuler className="mr-2 h-4 w-4" />
                <span>{t("Branding")}</span>
                {/* <CommandShortcut>⌘S</CommandShortcut> */}
              </CommandItem>
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
