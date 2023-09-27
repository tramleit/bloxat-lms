import { BASE_URL } from "@/config/api-base-config";
import { create } from "zustand";
import axios from "axios"; // Make sure to import Axios

const useResourcesStore = create((set) => ({
  // ADD
  addResource: async (resourceData) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      // Make a POST request to the API using Axios
      // const response = await axios.post(`${BASE_URL}/resources`, resourceData);

      await axios.post(`${BASE_URL}/resources`, resourceData);

      window.location.reload();

      // You can choose to handle the response data here if needed
      // console.log("Resource added:", response.data);

      // You don't need to update the state if you've removed the 'resources' array
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  },
  // DELETE
  deleteResource: async (resourceId) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      // Make a DELETE request to the API using Axios
      await axios.delete(`${BASE_URL}/resources/${resourceId}`);

      window.location.reload();

      // You can choose to handle the success or any necessary updates here
      // console.log(`Resource with ID ${resourceId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting resource with ID ${resourceId}:`, error);
    }
  },
}));

export default useResourcesStore;
