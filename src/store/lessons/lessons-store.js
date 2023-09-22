import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

const useLessonsStore = create((set) => ({
  lessonData: null, // State to store the fetched lesson data
  loading: false, // Initialize loading state as false

  // Fetch lesson by lesson_order, module_order, and course_id
  fetchLessonById: async (courseId, lessonId) => {
    try {
      set({ loading: true }); // Set loading to true while fetching data

      const response = await axios.get(
        `${BASE_URL}/lessons/${courseId}/edit/${lessonId}`
      );

      if (response.status === 200) {
        // Store the fetched lesson data in state
        set({ lessonData: response.data, loading: false });

        // console.log(response.data);

        return response.data; // Return the fetched data if needed
      } else {
        // Handle errors if the request was not successful
        console.error("Failed to fetch lesson:", response.status);
        set({ loading: false }); // Set loading to false on error
        return null; // Return null or handle the error as needed
      }
    } catch (error) {
      console.error("Error while fetching lesson:", error);
      set({ loading: false }); // Set loading to false on error
      throw new Error("Failed to fetch lesson"); // Throw an error for component error handling
    }
  },
  //   Add lesson
  // addLesson: async (lessonData) => {
  //   try {
  //     set({ loading: true }); // Set loading to true when creating a lesson

  //     const response = await axios.post(`${BASE_URL}/lessons`, lessonData);

  //     if (response.status === 200) {
  //       // Optionally, you can handle the created lesson or trigger other actions
  //       console.log("Lesson created successfully:", response.data);

  //       // window.location.reload();

  //       set({ loading: false }); // Set loading to false on success
  //     }
  //   } catch (error) {
  //     console.error("Error creating lesson:", error);

  //     // Handle errors as needed, e.g., show an error message
  //     throw new Error("Failed to create lesson");
  //   }
  // },
  // Function to delete a lesson by lesson_id
  deleteLesson: async (lessonId) => {
    try {
      // Send a DELETE request to the API endpoint using Axios
      const response = await axios.delete(`${BASE_URL}/lessons/${lessonId}`, {
        headers: {
          // Include any headers you need, e.g., authentication headers
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Lesson deleted successfully
        // You can update state or trigger other actions if needed
        window.location.reload();
        console.log(`Lesson with ID ${lessonId} deleted.`);
      } else {
        // Handle errors if the deletion was not successful
        console.error("Failed to delete lesson:", response.status);
      }
    } catch (error) {
      console.error("Error while deleting lesson:", error);
    }
  },
  // Update lesson function
  updateLesson: async (lessonId, updatedLessonData) => {
    try {
      set({ loading: true }); // Set loading to true when updating the lesson

      const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.put(
        `${BASE_URL}/lessons/${lessonId}`,
        updatedLessonData
      );

      if (response.status === 200) {
        // Optionally, you can handle the updated lesson or trigger other actions
        console.log("Lesson updated successfully:", response.data);

        // Refresh the lesson data after updating
        // await fetchLessonByOrder(
        //   updatedLessonData.lesson_order,
        //   moduleOrder,
        //   params.courseId
        // );

        window.location.reload();

        set({ loading: false }); // Set loading to false on success
      }
    } catch (error) {
      console.error("Error updating lesson:", error);

      // Handle errors as needed, e.g., show an error message
      throw new Error("Failed to update lesson");
    }
  },
}));

export default useLessonsStore;
