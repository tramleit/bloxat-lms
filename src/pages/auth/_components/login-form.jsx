import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import useAuthStore from "@/store/auth/auth-store";
import { toast } from "react-hot-toast";

export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore(); // Access the login action from Zustand

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      // If either field is empty, do not proceed with login
      toast.error("Please fill in all fields!");
      return;
    }

    setIsLoading(true);

    try {
      // Call the login action from Zustand
      await login(email, password);
    } catch (error) {
      toast.error("Incorrect Email or Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
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
          <div className="grid gap-1">
            <Label htmlFor="password" className="mb-1">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*********"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {/* Forgot Password */}
          <a
            href="/forgot-password"
            className="text-sm hover:underline text-blue-500"
          >
            Forgot password?
          </a>
          {/* Button */}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}