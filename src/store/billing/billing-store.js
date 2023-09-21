import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

const useBillingStore = create((set) => ({
  billingData: [],
  loading: false,

  fetchBillingData: async (userId, page, perPage) => {
    try {
      set({ loading: true });

      // Replace with your actual API endpoint
      const response = await axios.get(
        `${BASE_URL}/subscriptions/${userId}?per_page=${perPage}&page=${page}`
      );

      set({ billingData: response.data.rows, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));

export default useBillingStore;
