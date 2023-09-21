import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

const useCreateUserStore = create((set) => ({
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Throw the error for higher-level handling
    }
  },
}));

export default useCreateUserStore;
