import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/auth/auth-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import useBillingStore from "@/store/billing/billing-store";

export function UserNav() {
  // const router = useRouter();
  // const params = useParams();
  const { course_id } = useParams();
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  // get current user
  const currentUser = useCurrentUser();

  // to get the billing data ..
  const { billingData, loading, fetchBillingData } = useBillingStore();

  const { t } = useTranslation();

  const handleLogout = () => {
    // Call the logout function when the button is clicked
    logout();
  };

  // FETCH BILLING DATA
  useEffect(() => {
    // Replace 'userId' with the actual user ID you want to fetch data for
    fetchBillingData(currentUser?.user_id, 0, 1);
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              className="object-cover"
              src={
                currentUser?.avatar_url == null
                  ? `https://avatar.vercel.sh/${currentUser?.first_name}.png`
                  : currentUser?.avatar_url
              }
              alt={currentUser?.first_name}
            />
            <AvatarFallback>{currentUser?.first_name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser?.first_name} {currentUser?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex flex-row items-center justify-between"
            onClick={() => {
              navigate(`/${course_id}/settings/plan`);
            }}
          >
            <span>{t("Plan")}</span>

            {/* if there's no billing yet that means he's in the free trial */}
            {billingData?.length == 0 && (
              <span className="bg-sky text-black px-1 font-semibold rounded-md text-[12px]">
                {t("Free Trial")}
              </span>
            )}
            {/* IF THERE'S A BILLING THEN GET THE LAST ONE AND DISPLAY THE PLAN */}
            {billingData?.length !== 0 && (
              <span className="bg-purple text-black px-1 font-semibold rounded-md text-[12px]">
                {t("Active")}
              </span>
            )}

            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate(`/${course_id}/settings/account`);
            }}
          >
            {t("Account")}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem
            onClick={() => navigate(`/${course_id}/settings/payment`)}
          >
            Payment
          </DropdownMenuItem> */}

          <DropdownMenuItem
            onClick={() => navigate(`/${course_id}/settings/branding`)}
          >
            {t("Branding")}
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {t("Log out")}
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
