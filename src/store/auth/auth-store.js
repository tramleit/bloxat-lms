import { create } from "zustand";
import { toast } from "react-hot-toast";
import { BASE_URL } from "@/config/api-base-config";

// Utility function to handle storing and retrieving the token in localStorage
const getTokenFromLocalStorage = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("bxAuthToken")
    : null;
};

const useAuthStore = create((set) => ({
  authToken: getTokenFromLocalStorage(),

  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // console.log(token);
        // console.log(response);

        // Redirect to a different URL upon successful login
        if (token) {
          window.location.href = "/"; // Replace with your desired URL
          // Store the token in Zustand and localStorage
          set({ authToken: token });
          localStorage.setItem("bxAuthToken", JSON.stringify(token));
        } else {
          toast.error("Incorrect Email or Password");
        }
      } else {
        // Handle authentication failure

        toast.error("Incorrect Email or Password");
      }
    } catch (error) {
      // Handle network or other errors
      //   console.error("Error logging in:", error);
      //   toast.error("An error occurred. Please try again later.");

      toast.error("Incorrect Email or Password");
    }
  },

  logout: () => {
    // Remove the token from Zustand and localStorage
    set({ authToken: null });
    localStorage.removeItem("bxAuthToken");

    // Redirect to a different URL after logout (optional)
    window.location.href = "/login"; // Replace with your desired URL
  },
  logoutAndChangePassword: () => {
    // Remove the token from Zustand and localStorage
    set({ authToken: null });
    localStorage.removeItem("bxAuthToken");

    // Redirect to a different URL after logout (optional)
    window.location.href = "/forgot-password"; // Replace with your desired URL
  },
}));

export default useAuthStore;
