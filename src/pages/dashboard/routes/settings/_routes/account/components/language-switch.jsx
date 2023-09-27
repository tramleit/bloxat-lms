import * as z from "zod";
import { useForm } from "react-hook-form";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { changeLanguage } from "@/config/i18n";

const languages = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];

const accountFormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

// This can come from your database or API.
const defaultValues = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

const LanguageSwitch = () => {
  const form = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data) {
    changeLanguage(data.language);
    // console.log(data.language);
  }

  const { t } = useTranslation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              {/* <FormLabel>Language</FormLabel> */}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[150px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("language", language.value);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                        This is the language that will be used in the dashboard.
                      </FormDescription> */}
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <div className="absolute right-[-5px] md:bottom-[-20px] bottom-[-10px]">
          <Button type="submit">{t("Save changes")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default LanguageSwitch;
