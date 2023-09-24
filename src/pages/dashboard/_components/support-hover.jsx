import useTourStore from "@/store/tour.store";
import { useTour } from "@reactour/tour";
import { HelpCircle } from "lucide-react";

const SupportHover = () => {
  //   const isTourOpen = useTourStore((state) => state.isTourOpen);
  //   const openTour = useTourStore((state) => state.openTour);
  const enableShowStartTourModal = useTourStore(
    (state) => state.enableShowStartTourModal
  );

  // For the tour to start
  //   const { setIsOpen } = useTour();

  return (
    <div className="absolute right-10 bottom-10">
      <span
        className="bg-black w-10 h-10  flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition"
        onClick={() => {
          enableShowStartTourModal();
        }}
      >
        <HelpCircle className="text-white" />
      </span>
    </div>
  );
};

export default SupportHover;
