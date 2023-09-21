import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

const useContentStore = create((set) => ({
  content: null,
  loading: false, // Initialize loading state as false

  fetchContent: async (courseId) => {
    try {
      set({ loading: true }); // Set loading to true when fetching starts

      const response = await axios.get(
        `${BASE_URL}/courses/id/content/${courseId}`
      );

      if (response.status === 200) {
        set({ content: response.data, loading: false }); // Update content and set loading to false on success
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      set({ loading: false }); // Set loading to false on error
    }
  },
  // Add a new function to update the introduction video
  updateIntroductionVideo: async (courseId, introductionVideo) => {
    try {
      set({ loading: true }); // Set loading to true when updating starts

      const response = await axios.put(
        `${BASE_URL}/courses/intro/${courseId}`,
        { introduction_video: introductionVideo }
      );

      if (response.status === 200) {
        set({ loading: false }); // Set loading to false on success
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating introduction video:", error);
      set({ loading: false }); // Set loading to false on error
    }
  },
}));

export default useContentStore;
