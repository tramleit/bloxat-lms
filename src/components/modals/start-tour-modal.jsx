import useTourStore from "@/store/tour.store";
import { useTour } from "@reactour/tour";
import { ArrowRight, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/images/logo/bloxat-black.webp";
import { Button } from "@/components/ui/button";
import useIsMobile from "@/hooks/use-is-mobile";

const StartTourModal = () => {
  // const {
  //   // showStartTourModal,
  //   setShowStartTourModal,
  //   // tourStarted,
  //   setTourStarted,
  // } = useStateContext();

  const openTour = useTourStore((state) => state.openTour);
  // const enableShowStartTourModal = useTourStore(
  //   (state) => state.enableShowStartTourModal
  // );
  const disableShowStartTourModal = useTourStore(
    (state) => state.disableShowStartTourModal
  );

  // For the tour to start
  const { setIsOpen } = useTour();

  // const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem("tourModalPopped", "true");
  }, []);

  // useEffect(() => play(), [play]);

  return (
    <>
      <div className="bg-black/80  w-screen fixed nav-item top-0 right-0 z-50 overflow-y-hidden ">
        <div className="flex h-screen  dark:text-gray-200 bg-half-transparent dark:[#484B52] w-full  p-5   overflow-y-hidden	items-center justify-center content-center ">
          <div className="fade-up">
            <div className="flex items-center justify-center content-center bg-white rounded-lg md:h-[400px] md:w-[500px] h-[400px]">
              <XIcon
                onClick={() => {
                  // setShowStartTourModal(false);
                  disableShowStartTourModal();
                }}
                className="absolute z-50 right-0 top-0 m-5 cursor-pointer text-[#696969] text-[18px]"
              />

              <div className="flex h-full w-full ">
                <div className="absolute z-50 bottom-0 m-6">
                  <div className="flex flex-col z-50">
                    <span className="font-bold text-xl tracking-tight mb-1.5 text-black">
                      New to Bloxat?
                    </span>
                    <span className="text-muted-foreground  mb-4">
                      {isMobile
                        ? " Open it on your computer for a quick walkthrough! 😄"
                        : ' Click on "Start Tour" for a quick walkthrough! 😄'}{" "}
                    </span>

                    {isMobile ? (
                      <Button
                        onClick={() => {
                          // setShowStartTourModal(false);
                          disableShowStartTourModal();

                          // setTourStarted(true);
                          // openTour();
                          // setIsOpen(true);
                        }}
                        className="w-fit bg-black text-white hover:bg-[#242424] hover:text-white"
                      >
                        <span className="text-[14px] select-none">Okay</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          // setShowStartTourModal(false);
                          disableShowStartTourModal();

                          // setTourStarted(true);
                          openTour();
                          setIsOpen(true);
                        }}
                        className="w-fit bg-black text-white hover:bg-[#242424] hover:text-white"
                      >
                        <span className="text-[14px] select-none">
                          Start Tour
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    // setShowStartTourModal(false);
                    disableShowStartTourModal();
                  }}
                  className="absolute right-7 bottom-8 z-50 text-muted-foreground"
                >
                  Skip
                </button>

                <img
                  className="absolute h-[40px] right-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[100px] z-50 w-auto items-center justify-center content-center"
                  src={Logo}
                  alt="Bloxat"
                  draggable={false}
                />
                <img
                  className="object-cover w-full rounded-lg fade-in-tour"
                  src="https://media.publit.io/file/StockPics/gradient-bg-2.webp"
                  alt="Gradient"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartTourModal;
