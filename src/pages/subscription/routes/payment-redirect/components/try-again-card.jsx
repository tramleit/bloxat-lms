import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Lottie from "lottie-react-web";
import { useNavigate } from "react-router-dom";
import alert from "@/assets/lotties/alert.json";

const TryAgainCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center justify-center p-10 shadow-md">
      <div className="flex w-[50px] ">
        <Lottie
          //   className="lottie"
          options={{
            animationData: alert,
            loop: false,
          }}
        />
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center text-center mt-[20px]">
        <h1 className="text-xl font-bold">حاول مرة أخرى</h1>
        <p>لم يتم الدفع بنجاح</p>
        <Button
          onClick={() => {
            // router.push("/");
            navigate("/subscription-ended");
          }}
        >
          Try Again
        </Button>
      </div>
    </Card>
  );
};

export default TryAgainCard;
