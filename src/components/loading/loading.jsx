import Lottie from "lottie-react-web";
import loading from "@/assets/lotties/loading.json";

const Loading = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="relative flex md:w-[330px]">
        <div className="">
          <Lottie
            //   className="lottie"
            options={{
              animationData: loading,
              loop: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
