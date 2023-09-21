import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";
import jwt_decode from "jwt-decode";

const useCourseContentStore = create((set) => ({
  courseContent: null, // Store a single course object
  loading: false,

  // Fetch a course by course ID
  fetchCourseContent: async (courseId) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    set({ loading: true });
    try {
      const response = await axios.get(
        `${BASE_URL}/courses/id/content/${courseId}`,
        // Headers
        {
          Authorization: `Bearer ${token}`,
        }
      );

      set({
        courseContent: response.data, // Store the fetched course data
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      set({ loading: false });
    }
  },
}));

export default useCourseContentStore;
