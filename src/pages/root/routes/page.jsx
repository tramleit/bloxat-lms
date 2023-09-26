import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
// import useCourseStore from "@/store/courses/courses-store";
import useGetCourseStore from "@/store/courses/get-course-store";
import Loading from "@/components/loading/loading";
import { useNavigate, useParams } from "react-router-dom";
// import { useAlreadyHasCourse } from "@/hooks/use-already-has-course";
import Logo from "@/assets/images/logo/bloxat-blue.webp";
import Lottie from "lottie-react-web";
import loading from "@/assets/lotties/loading.json";

const RootPage = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  // const [isLoading, setIsLoading] = useState(true);

  // Loading state
  if (!currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // Check if user has a course already under them ... that means they're not new
  // Check if the currentUser has a course under them
  // If no courses redirect to / .. which is the setup
  if (currentUser?.courses?.length == 0) {
    navigate("/lang-setup");
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <img
        src={Logo}
        className="w-[110px] h-auto"
        alt="Bloxat"
        draggable={false}
      />
      <div className="relative flex w-[230px]">
        <div className="">
          <Lottie
            //   className="lottie"
            options={{
              animationData: loading,
              loop: true,
            }}
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default RootPage;
