import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import React from "react";
import { Icons } from "@/components/icons";

const PlanCard = ({
  duration,
  color,
  price,
  onClick,
  ctaText,
  disabled,
  loading,
  extraText,
}) => {
  return (
    <>
      <Card className="w-[300px] hover:shadow-md transition-all duration-150 ease-in-out">
        <CardHeader className="flex flex-col space-y-3">
          <div className="flex flex-row items-center ">
            <h2
              className={`text-sm ${color} px-2 py-0.5 rounded-md font-semibold text-black`}
            >
              {duration}
            </h2>
            {extraText && (
              <span className="ml-2 font-semibold">{extraText}</span>
            )}

            {/* <span>eh</span> */}
          </div>
          <CardTitle className="font-bold text-3xl">{price} EGP</CardTitle>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-3">
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check color="#01D95A" className="h-4 w-4" />
              <p>
                <span className="font-semibold">Unlimited</span> courses
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check color="#01D95A" className="h-4 w-4" />
              <p>
                <span className="font-semibold">Unlimited</span> students
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check color="#01D95A" className="h-4 w-4" />
              <p>
                <span className="font-semibold">All</span> payment methods
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check color="#01D95A" className="h-4 w-4" />
              <p>
                <span className="font-semibold">All</span> features
              </p>
            </div>
            {/* Feature tile */}
            <div className="flex flex-row items-center space-x-2">
              <Check color="#01D95A" className="h-4 w-4" />
              <p>
                <span className="font-semibold">Renew</span> anytime
              </p>
            </div>
          </div>
          <Button
            onClick={onClick}
            disabled={disabled}
            className="w-full mt-6 space-x-2"
            // variant="blue"
          >
            {/* if it's loading the show spinner */}
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {/* if it's not loading then show the text */}
            {!loading && ctaText}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default PlanCard;
