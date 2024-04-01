// import { Languages } from "lucide-react";
// import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { changeLanguage } from "@/config/i18n";
// import { useEffect } from "react";
import { useState } from "react";

export function LanguageToggle() {
  const currentLanguage = localStorage.getItem("bxSelectedLanguage") || "en";

  const [langState, setLangState] = useState(currentLanguage);

  // useEffect(() => {}, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#181818] border-[#181818] text-white hover:bg-[#232323] hover:text-white"
        >
          {langState === "en" ? <span>EN</span> : <span>AR</span>}

          {/* <Languages className="h-[1.2rem] w-[1.2rem] " /> */}
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
          {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            changeLanguage("en");
            setLangState("en");
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            changeLanguage("ar");
            setLangState("ar");
          }}
        >
          العربية
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
