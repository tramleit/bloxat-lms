import { useNavigate, useParams } from "react-router-dom";
import { CreditCard, PencilRuler, Rocket, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import SettingsCard from "./components/settings-card";
import { AppearanceForm } from "./components/appearance-form";
import useIsMobile from "@/hooks/use-is-mobile";
import ViewPortalButton from "@/components/view-portal-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const { t } = useTranslation();
  const { course_id } = useParams();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const isMobile = useIsMobile();

  return (
    <>
      <div className="page-fade flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title={t("Settings")}
              description={t("Set up payment methods, branding, and more.")}
            />
            <ViewPortalButton brandSlug={currentUser?.brand_slug} />
          </div>
          <Separator />
          {/* Content */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            {/* Account Card */}
            <SettingsCard
              title={t("Account")}
              description={t("View and update your profile")}
              icon={<User />}
              color="bg-[#FFF387]"
              onClick={() => {
                navigate(`/${course_id}/settings/account`);
              }}
            />

            {/* End Card */}
            {/* Plan Card */}
            <SettingsCard
              title={t("Plan")}
              description={t("View your current plan")}
              icon={<Rocket />}
              color="bg-[#E7FD90]"
              onClick={() => {
                navigate(`/${course_id}/settings/plan`);
              }}
            />

            {/* End Card */}
            {/* Branding Card */}
            <SettingsCard
              title={t("Branding")}
              description={t("Customize your portal")}
              icon={<PencilRuler />}
              color="bg-[#CCFCFF]"
              onClick={() => {
                navigate(`/${course_id}/settings/branding`);
              }}
            />
            {/* End Card */}
            {/* Payment Methods */}
            <SettingsCard
              title={t("Payment Methods")}
              description={t("Enable payment methods on your portal")}
              icon={<CreditCard />}
              color="bg-[#A38FFF]"
              onClick={() => {
                navigate(`/${course_id}/settings/payment`);
              }}
            />
          </div>
          {/* Theme */}
          {isMobile && <AppearanceForm />}

          {/* End of theme */}
          {/* <span>hey</span> */}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
