import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

const ActiveCard = ({
  planName,
  daysRemaining,
  showRemaining,
  title,
  color,
  textColor
}) => {
  return (
    <>
      <Card className="w-[300px] hover:shadow-md transition-all duration-150 ease-in-out dark:bg-[#141414]">
        <CardHeader className="flex flex-col space-y-3">
          <div className="flex flex-row items-center justify-between">
            <h2
              className={`text-sm ${color} px-2 py-0.5 rounded-md font-semibold ${textColor}`}
            >
              {planName}
            </h2>
            {/* <span>eh</span> */}
          </div>
          <CardTitle className="flex flex-row items-center space-x-2 font-bold text-3xl">
            <span>{title}</span> <Check className="h-6 w-6 text-[#01D95A]" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-3">
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">Unlimited</span> courses
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">Unlimited</span> students
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">All</span> payment methods
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">All</span> features
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check className="h-4 w-4 text-[#01D95A]" />
              <p>
                <span className="font-semibold">Renew</span> anytime
              </p>
            </div>
          </div>
          {/* if showRemaining is true then show them the remaining days */}
          {showRemaining && (
            <div className="mt-5 w-full bg-gray-50 flex items-center justify-center p-3 font-semibold rounded-md text-gray-500">
              {daysRemaining} days remaining
            </div>
          )}

          {/* <Button className="w-full mt-6">Get this plan</Button> */}
        </CardContent>
      </Card>
    </>
  );
};

export default ActiveCard;
