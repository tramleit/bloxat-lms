import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useTourStore from "@/store/tour.store";
import { useTour } from "@reactour/tour";
import { Box, HelpCircle, MessagesSquare, Video } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SupportHover = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // State to control popover

  const { t } = useTranslation();

  //   const isTourOpen = useTourStore((state) => state.isTourOpen);
  //   const openTour = useTourStore((state) => state.openTour);
  const enableShowStartTourModal = useTourStore(
    (state) => state.enableShowStartTourModal
  );

  const openPopover = () => {
    setIsOpen(true);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed right-10 bottom-10 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <div
            onClick={openPopover} // Toggle the popover
            className="bg-black dark:bg-[#353535] w-10 h-10  flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition"
          >
            <HelpCircle className="text-white md:h-6 md:w-6 h-6 w-6" />
          </div>
        </PopoverTrigger>
        {isOpen && (
          <PopoverContent className="w-[250px] mr-[40px] mb-[10px]">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  {t("Help & Support")}{" "}
                </h4>
                {/* <p className="text-sm text-muted-foreground">
                Choose a way to get help
              </p> */}
              </div>

              <div className="grid gap-2 text-sm">
                {/* Tour */}
                <div
                  className="flex flex-row items-center justify-start hover:bg-[#fafafa] dark:hover:bg-[#1e1e1e] py-2 px-4 rounded-md transition cursor-pointer"
                  onClick={() => {
                    closePopover();
                    navigate(`/${course_id}`);
                    enableShowStartTourModal();
                  }}
                >
                  <Box className="h-4 w-4 mr-2" />
                  {t("Start tour (Setup)")}
                </div>
                {/* Videos */}
                <div
                  className="flex flex-row items-center justify-start hover:bg-[#fafafa] dark:hover:bg-[#1e1e1e] py-2 px-4 rounded-md transition cursor-pointer"
                  onClick={() => {}}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {t("Video tutorials")}
                </div>
                {/* Whatsapp */}
                <div
                  className="flex flex-row items-center justify-start hover:bg-[#fafafa] dark:hover:bg-[#1e1e1e] py-2 px-4 rounded-md transition cursor-pointer"
                  onClick={() => {}}
                >
                  <MessagesSquare className="h-4 w-4 mr-2" />
                  Whatsapp
                </div>
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
      {/* Options */}
    </div>
  );
};

export default SupportHover;
