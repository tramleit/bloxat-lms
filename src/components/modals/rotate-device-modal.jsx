import Lottie from "lottie-react-web";
import React from "react";
import turnLandscape from "@/assets/lotties/turn-landscape.json";

const RotateDeviceModal = () => {
  return (
    <div className="bg-black/80  w-screen fixed nav-item top-0 right-0 z-50 overflow-y-hidden ">
      <div className="flex h-screen  dark:text-gray-200 bg-half-transparent dark:[#484B52] w-full  p-5   overflow-y-hidden	items-center justify-center content-center ">
        <div className="fade-up">
          <div className="flex flex-col items-center justify-center content-center bg-white rounded-lg h-[280px] w-[280px]">
            <div className="relative flex w-[200px]">
              <div className="">
                <Lottie
                  //   className="lottie"
                  options={{
                    animationData: turnLandscape,
                    loop: true,
                  }}
                />
              </div>
            </div>
            <p className="font-medium">Rotate your phone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotateDeviceModal;
