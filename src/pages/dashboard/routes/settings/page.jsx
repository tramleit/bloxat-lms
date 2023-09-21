import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CreditCard, PencilRuler, Rocket, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SettingsCard from "./components/settings-card";

const SettingsPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title="Settings"
              description="Set up payment methods, branding, and more."
            />
          </div>
          <Separator />
          {/* Content */}
          <div className="grid grid-cols-2 gap-5">
            {/* Account Card */}
            <SettingsCard
              title="Account"
              description="View and update your profile"
              icon={<User />}
              color="bg-[#FFF387]"
              onClick={() => {
                navigate(`/${course_id}/settings/account`);
              }}
            />

            {/* End Card */}
            {/* Plan Card */}
            <SettingsCard
              title="Plan"
              description="View your current plan"
              icon={<Rocket />}
              color="bg-[#E7FD90]"
              onClick={() => {
                navigate(`/${course_id}/settings/plan`);
              }}
            />

            {/* End Card */}
            {/* Branding Card */}
            <SettingsCard
              title="Branding"
              description={"Customize your portal"}
              icon={<PencilRuler />}
              color="bg-[#CCFCFF]"
              onClick={() => {
                navigate(`/${course_id}/settings/branding`);
              }}
            />
            {/* End Card */}
            {/* Payment Methods */}
            <SettingsCard
              title="Payment Methods"
              description="Enable payment methods on your portal"
              icon={<CreditCard />}
              color="bg-[#A38FFF]"
              onClick={() => {
                navigate(`/${course_id}/settings/payment`);
              }}
            />
          </div>
          {/* Theme */}
          {/* <div className="space-y-6">
            <AppearanceForm />
          </div> */}
          {/* End of theme */}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
