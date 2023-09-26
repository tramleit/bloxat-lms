import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/store/user/user-store";
import toast from "react-hot-toast";
import { Icons } from "@/components/icons";
import { KeyRound } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import useAuthStore from "@/store/auth/auth-store";
import { useNavigate } from "react-router-dom";
import useIsMobile from "@/hooks/use-is-mobile";
import { useTranslation } from "react-i18next";

const EditAccountForm = ({ currentUser }) => {
  // Edit Inputs
  const [firstName, setFirstName] = useState(currentUser?.first_name || "");
  const [lastName, setLastName] = useState(currentUser?.last_name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phone_number || ""
  );

  // for loading
  const [loading, setLoading] = useState(false);

  // Get the updateUser function from the user store
  const updateUser = useUserStore((state) => state.updateUser);

  // for alert of change password that we'll log out
  const [open, setOpen] = useState(false);
  const { logoutAndChangePassword } = useAuthStore();

  const { t } = useTranslation();

  // Function to handle the "Update" button click
  const handleUpdateUser = async () => {
    // Prepare the user data to update
    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };

    // VALIDATE INPUTS
    if (!firstName || !lastName || !phoneNumber) {
      toast.error("Fill in all fields!");
      return;
    } else if (
      firstName == currentUser?.first_name &&
      lastName == currentUser?.last_name &&
      phoneNumber == currentUser?.phone_number
    ) {
      toast.success("Saved!");
      return;
    }

    try {
      setLoading(true);
      // Call the updateUser function to send a PUT request
      await updateUser(currentUser?.id, userData);

      toast.success("Saved");

      console.log("Updated", userData);

      // Refresh the page once the update is completed
      window.location.reload();
    } catch (error) {
      setLoading(false);

      // Handle errors here, e.g., show an error message to the user
      toast.error("Something went wrong");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const isMobile = useIsMobile();

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          logoutAndChangePassword();
        }}
        loading={false}
      />
      <Card>
        <CardContent className="grid grid-cols-1 md:p-8 p-5 gap-5">
          <div className="flex flex-row items-center space-x-5">
            {/* First Name */}
            <div className="grid gap-1">
              <Label htmlFor="firstName" className="mb-1 text-muted-foreground">
                {t("First Name")}
              </Label>
              <Input
                id="firstName"
                // placeholder="Seif"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={loading}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            {/* Last Name */}
            <div className="grid gap-1">
              <Label htmlFor="lastName" className="mb-1 text-muted-foreground">
                {t("Last Name")}
              </Label>
              <Input
                id="lastName"
                // placeholder="Seif"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={loading}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-row items-center space-x-5">
            <div className="grid gap-1 w-fit">
              <Label
                htmlFor="phoneNumber"
                className="mb-1 text-muted-foreground"
              >
                {t("Phone")}
              </Label>
              <Input
                id="phoneNumber"
                // placeholder="Seif"
                type="tel"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={loading}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-1 w-fit">
              <Label htmlFor="email" className="mb-1 text-muted-foreground">
                {t("Email (Used for login)")}
              </Label>
              <Input
                id="email"
                // placeholder="Seif"
                type="email"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={true}
                value={currentUser?.email}
                // value={phoneNumber}
                // onChange={(e) => {
                //   setPhoneNumber(e.target.value);
                // }}
              />
            </div>
          </div>
          {/* <div className="grid gap-1">
                <Label className="mb-1 text-muted-foreground">Phone</Label>
                <p className="font-semibold">{currentUser?.phone_number}</p>
              </div> */}
        </CardContent>
        <CardFooter className="flex flex-row space-x-4">
          <Button onClick={handleUpdateUser} disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {isMobile ? t("Save") : t("Save changes")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <KeyRound className="h-4 w-4 mr-2" />
            {t("Change password")}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EditAccountForm;
