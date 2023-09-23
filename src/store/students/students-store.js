import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config"; // Update the path accordingly

const useStudentsStore = create((set) => ({
  enrollments: [],
  // Fetch Enrollments Method
  fetchEnrollments: async (courseId, perPage, page, search) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/enrollment/${courseId}?per_page=${perPage}&page=${page}&search=${search}`
      );
      set({ enrollments: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  // Fetch Enrollments with students details
  fetchDetailedEnrollments: async (courseId, perPage, page, search) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/students-details/enrollment/${courseId}?per_page=${perPage}&page=${page}&search=${search}`
      );
      set({ enrollments: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  // Fetch User by ID Method
  // fetchUserById: async (userId, enrolledCourseId) => {
  //   try {
  //     const response = await axios.get(
  //       `${BASE_URL}/users/${userId}?per_page=1&searchEnrollments=${enrolledCourseId}`
  //     );
  //     return response.data; // Return the user data
  //   } catch (error) {
  //     console.error(error);
  //     return null; // Handle the error and return null or an appropriate value
  //   }
  // },
  // Get Enrollment details by user id and course id
  fetchEnrollmentById: async (userId, enrolledCourseId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/enrollment/${userId}/${enrolledCourseId}`
      );
      return response.data; // Return the user data
    } catch (error) {
      console.error(error);
      return null; // Handle the error and return null or an appropriate value
    }
  },
  // Create enrollment
  enrollUser: async (userId, courseId, price, currency) => {
    try {
      const enrollmentData = {
        user_id: userId,
        course_id: courseId,
        price: price,
        currency: currency,
        enrolled_through: "manual",
      };

      const response = await axios.post(`${BASE_URL}/enroll`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error("Error enrolling user:", error);
      throw error; // Throw the error for higher-level handling
    }
  },
}));

export default useStudentsStore;
