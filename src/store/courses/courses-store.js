import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";
import jwt_decode from "jwt-decode";

const useCourseStore = create((set) => ({
  courses: [],
  loading: false, // Add a loading state
  // Add Course Function
  addCourse: async (course) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    set({ loading: true }); // Set loading to true before making the request
    try {
      const response = await axios.post(
        `${BASE_URL}/courses`,
        course,
        // Headers
        {
          Authorization: `Bearer ${token}`,
        }
      );
      set({ loading: false }); // Set loading to true before making the request
      // set((state) => ({
      //   // courses: [...state.courses, response.data],
      //   loading: false, // Set loading to false after the request is complete
      // }));
      if (response.status === 200) {
        window.location.href = `/${response?.data.course_id}`; // Replace with your desired URL
      }
    } catch (error) {
      console.error("Error adding course:", error);
      set({ loading: false }); // Handle errors and set loading to false
    }
  },
  // Fetch courses for a user by userId
  fetchCoursesByUserId: async () => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    set({ loading: true });
    try {
      const response = await axios.get(
        `${BASE_URL}/courses/${userId}`,
        // Headers
        {
          Authorization: `Bearer ${token}`,
        }
      );

      set({
        courses: response.data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      set({ loading: false });
    }
  },
  // GET COURSES BY USER ID BUT MINIMAL RESPONSE
  fetchMinimalCoursesByUserId: async () => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    set({ loading: true });
    try {
      const response = await axios.get(
        `${BASE_URL}/courses/minimal/${userId}`,
        // Headers
        {
          Authorization: `Bearer ${token}`,
        }
      );

      set({
        courses: response.data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      set({ loading: false });
    }
  },

  // updateCourseData: async (courseId, updatedData) => {
  //   const token = JSON.parse(localStorage.getItem("bxAuthToken"));

  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //   set({ loading: true });

  //   try {
  //     const response = await axios.put(
  //       `${BASE_URL}/courses/details/${courseId}`,
  //       updatedData,
  //       // Headers
  //       {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     );

  //     set({ loading: false });

  //     // Handle the response as needed
  //     if (response.status === 200) {
  //       // You can update the course data in your state here if needed
  //       // For example:
  //       // set((state) => ({
  //       //   courses: state.courses.map((course) =>
  //       //     course.course_id === courseId
  //       //       ? { ...course, ...updatedData }
  //       //       : course
  //       //   ),
  //       //   loading: false,
  //       // }));

  //       // Optionally trigger a success toast or navigation
  //       window.location.reload(); // Reload the page or perform other actions
  //     }
  //   } catch (error) {
  //     console.error("Error updating course data:", error);
  //     set({ loading: false });
  //     // Handle errors as needed
  //   }
  // },

  // Update Course Thumbnail Function
  updateCourseThumbnail: async (courseId, newThumbnail) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    set({ loading: true });

    try {
      const response = await axios.put(
        `${BASE_URL}/courses/thumbnail/${courseId}`,
        { thumbnail: newThumbnail },
        // Headers
        {
          Authorization: `Bearer ${token}`,
        }
      );

      set({ loading: false });

      if (response.status === 200) {
        // Optionally, you can update the course data in your state here if needed
        // For example, if you have a course object in your state, you can update its thumbnail property.
        // set((state) => ({
        //   courses: state.courses.map((course) =>
        //     course.course_id === courseId
        //       ? { ...course, thumbnail: newThumbnail }
        //       : course
        //   ),
        //   loading: false,
        // }));

        // Optionally, trigger a success toast or perform other actions
        window.location.reload(); // Reload the page or perform other actions
      }
    } catch (error) {
      console.error("Error updating course thumbnail:", error);
      set({ loading: false });
      // Handle errors as needed
    }
  },
}));

export default useCourseStore;
