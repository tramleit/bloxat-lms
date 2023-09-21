import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

const useUserDeletionStore = create((set) => ({
  isDeleting: false,
  deleteUser: async (userId, courseId) => {
    set({ isDeleting: true });
    try {
      // Send a DELETE request to the API endpoint
      await axios.delete(`${BASE_URL}/unenroll/${userId}/${courseId}`);

      // You may want to refetch the enrollments after deletion
      // Call fetchEnrollments method or update the state as needed

      console.log("Enrollment deleted successfully");
      // Refresh the page after deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      // Handle the error and provide appropriate feedback to the user
    } finally {
      set({ isDeleting: false });
    }
  },
}));

export default useUserDeletionStore;
