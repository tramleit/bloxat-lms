// import * as React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import PhoneInputComponent from "./phone-input";
import { BASE_URL } from "@/config/api-base-config";
import useAuthStore from "@/store/auth/auth-store";

export function SignupForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  //   For phone input
  const [phoneNumber, setPhoneNumber] = useState("");
  const { login } = useAuthStore(); // Access the login action from Zustand

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract user input from the form fields
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Check if any of the fields are empty
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      toast.error("Please fill in all fields.");
      return; // Prevent form submission
    }

    // Create a user object to send to the server
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      hash: password,
      phone_number: phoneNumber, // Include the phone number if needed
    };

    try {
      setIsLoading(true);

      // Send a POST request to your API to create the user
      const response = await axios.post(`${BASE_URL}/users`, user);

      if (response.status === 200) {
        // Registration successful
        // toast.success("Registration successful!");
        // window.location.href = "/";
        // Optionally, you can automatically log in the user here
        // Perform login logic using Zustand or any other method
        try {
          // Call the login action from Zustand
          await login(email, password);
        } catch (error) {
          toast.success("Now Login.");
          window.location.href = "/login";
        } finally {
          setIsLoading(false);
        }
      } else {
        // Registration failed, handle the error
        toast.error("An error occurred. Please try again later.");
        // console.log(error);
      }
    } catch (error) {
      // Handle network or other errors
      toast.error("Email already exists.");
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <div className="flex flex-row items-center space-x-5">
            {/* First Name */}
            <div className="grid gap-1">
              <Label htmlFor="firstName" className="mb-1">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Seif"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            {/* Last Name */}
            <div className="grid gap-1">
              <Label htmlFor="lastName" className="mb-1">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Radwane"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {/* Phone Input */}
          <PhoneInputComponent
            phoneNumber={phoneNumber}
            onChange={(e) => setPhoneNumber(e)}
            disabled={isLoading}
          />

          <div className="grid gap-1">
            <Label htmlFor="password" className="mb-1">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {/* Forgot Password */}

          {/* Button */}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
