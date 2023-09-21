// userStore.js
import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  // Get current user
  fetchUser: async (userId, jwtToken) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/${userId}?per_page=1`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      set({ user: response.data }); // Update the user data in the Zustand store
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
  // Update user data
  updateUser: async (userId, userData) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.put(
        `${BASE_URL}/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ user: response.data }); // Update the user data in the Zustand store
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  },
  // Update user avatar URL
  updateAvatarUrl: async (userId, avatarUrl) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.put(
        `${BASE_URL}/users/profile-pic/${userId}`,
        { avatar_url: avatarUrl }, // Set the avatar_url in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update only the avatar_url property of the user in the Zustand store
      set((state) => ({
        user: {
          ...state.user,
          avatar_url: response.data.avatar_url,
        },
      }));
    } catch (error) {
      console.error("Error updating avatar URL:", error);
    }
  },
}));

export default useUserStore;
