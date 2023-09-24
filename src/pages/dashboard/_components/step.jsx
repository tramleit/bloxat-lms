import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ArrowRight, Eye } from "lucide-react";
import { PORTAL_URL } from "@/config/url-config";

const Step = ({
  stepNumber,
  label,
  description,
  onClick,
  completed,
  enableButton,
  viewButton,
  courseId,
}) => {
  const currentUser = useCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center ml-10">
      <span
        className={cn(
          "flex items-center justify-center border border-gray-400 p-2 h-[35px] w-[35px] rounded-full font-semibold text-gray-400",
          completed && "bg-green text-white border-none"
        )}
      >
        {stepNumber}
      </span>
      <h2 className="mt-2 font-bold tracking-tight ">{label}</h2>
      <p className=" mb-3">{description}</p>
      {enableButton && (
        <Button
          size="sm"
          //   variant="blue"
          onClick={onClick}
        >
          Go
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      )}
      {!enableButton && <div></div>}
      {viewButton && (
        <Button
          size="sm"
          //   variant="blue"
          onClick={() => {
            window.open(`${PORTAL_URL}/${currentUser?.brand_slug}`, "_blank");
            // Here we set that the view is set in the account completion ..
            // so we're updating the third number to 1 .. and leaving the rest of the numbers as they are
            // Get the existing array from local storage
            const completionData = JSON.parse(
              localStorage.getItem("bxCompletion")
            );
            // Check if completionData is an array
            if (Array.isArray(completionData)) {
              // Set the first element to 1 and leave the rest as they are
              completionData[2] = true;

              // Save the modified array back to local storage
              localStorage.setItem(
                "bxCompletion",
                JSON.stringify(completionData)
              );
            }

            window.location.href = `/${courseId}`;
          }}
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      )}
    </div>
  );
};

export default Step;
