import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "@/config/api-base-config";
import { DAYS_FOR_TRIAL } from "@/config/subscription-config";
import SetupHeader from "../_components/setup-header";
import Bottom from "../_components/Bottom";

const SetupPage = () => {
  const currentUser = useCurrentUser();
  // const onOpen = useCreateModal((state) => state.onOpen);
  // const isOpen = useCreateModal((state) => state.isOpen);

  // const param = useParams();

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen, onOpen]);

  const [loading, setLoading] = useState(false);

  const [brandName, setBrandName] = useState("");

  // console.log(currentUser);

  // Update Brand Name
  const updateBrandName = async () => {
    // event.preventDefault();

    // Extract user input from the form fields
    // const brandName = event.target.brandName.value;

    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Check if any of the fields are empty
    if (!brandName) {
      toast.error("Please type your brand name.");
      return; // Prevent form submission
    }

    // Transform name to lowercase and replace spaces with hyphens
    const formattedNameToSlug = brandName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove all non-alphanumeric characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens

    const currentDate = new Date(); // Get the current date and time
    const futureDate = new Date(currentDate); // Create a copy of the current date
    // YOU CAN CHANGE THE TRIAL DURATION HERE
    // 21 DAYS
    futureDate.setDate(currentDate.getDate() + DAYS_FOR_TRIAL); // Add 21 days to the copy

    // Format the future date as a string in "YYYY-MM-DDTHH:mm:ss.sssZ" format
    const formattedFutureDate = futureDate.toISOString();

    // Ensure that a token exists before making the request
    if (token) {
      var decoded = jwt_decode(token);

      try {
        setLoading(true);

        const response = await axios.put(
          `${BASE_URL}/branding/${decoded.id}`,
          // Body
          {
            brand_name: brandName,
            brand_slug: formattedNameToSlug,
            brand_logo_light: currentUser?.brand_logo_light,
            brand_logo_dark: currentUser?.brand_logo_dark,
            trial_end: formattedFutureDate,
          },
          // Headers
          {
            Authorization: `Bearer ${token}`,
          }
        );

        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);

        if (response.status === 200) {
          toast.success("Set!");
          window.location.href = "/branding"; // Replace with your desired URL
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error) {
        toast.error("Something went wrong.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <SetupHeader />
        {/* End Header */}
        {/* Content */}
        <div className="flex flex-row items-center h-full">
          {/* Left Side */}
          <div className="flex flex-col flex-1 items-center justify-center h-full space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to your portal <span className="wave">👋</span>
            </h1>
            <p className="text-muted-foreground">
              Your Bloxat portal is the main hub from which you can manage and
              sell your courses.
            </p>
            <div className="h-4"></div>
            {/* Brand Name Input */}

            <div className="grid gap-1 w-1/4">
              <Label htmlFor="brandName" className="mb-1">
                Type your brand name
              </Label>
              <Input
                id="brandName"
                placeholder="Seif's School"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={loading}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-gray-50 dark:bg-[#121212] flex flex-col flex-1 items-center justify-center h-full">
            right [place graphic]
          </div>
        </div>
        {/* End Content */}
        {/* Bottom Part */}
        <Bottom
          onClick={() => {
            updateBrandName();
          }}
          disabled={loading}
        />
        {/* End Bottom */}
      </div>
    </>
  );
};

export default SetupPage;
