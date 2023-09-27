import { useEffect } from "react";
import useUserStore from "@/store/user/user-store";
import jwt_decode from "jwt-decode";

// to get the current user
export const useCurrentUser = () => {
  const { user, fetchUser } = useUserStore(); // Use the Zustand store
  useEffect(() => {
    const jwtToken = localStorage.getItem("bxAuthToken"); // Get JWT token from local storage

    // console.log("token", jwtToken);

    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken); // Decode the JWT token
      const userId = decodedToken.id; // Extract the user ID from the decoded token
      fetchUser(userId, jwtToken); // Call the fetchUser function with user ID and token
    }
  }, [fetchUser]);

  return user;
};
