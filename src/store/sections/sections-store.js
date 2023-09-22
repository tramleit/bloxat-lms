// sections-store.js
import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

const useSectionsStore = create((set) => ({
  // Add your store state here if needed

  // Function to add a module
  addSection: async (moduleData) => {
    try {
      // Make a POST request to create a new module
      const response = await axios.post(`${BASE_URL}/modules`, moduleData);

      // Handle the response as needed
      if (response.status === 200) {
        // Optionally, update your store state or trigger other actions
        console.log("Module added successfully:", response.data);

        window.location.reload();

        // Return the created module data
        return response.data;
      }
    } catch (error) {
      console.error("Error adding module:", error);

      // Handle errors as needed, e.g., show an error message
      throw new Error("Failed to add module");
    }
  },
  // Function to delete a section by module_id
  // deleteSection: async (module_id) => {
  //   const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //   try {
  //     // Make a DELETE request to delete the section by module_id
  //     const response = await axios.delete(`${BASE_URL}/modules/${module_id}`);

  //     // Handle the response as needed
  //     if (response.status === 200) {
  //       // Optionally, update your store state or trigger other actions
  //       console.log(`Section with module_id ${module_id} deleted successfully`);

  //       window.location.reload();

  //       // Return a success indicator or message
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error(
  //       `Error deleting section with module_id ${module_id}:`,
  //       error
  //     );

  //     // Handle errors as needed, e.g., show an error message
  //     throw new Error(`Failed to delete section with module_id ${module_id}`);
  //   }
  // },
  // Function to update a section
  updateSection: async (moduleId, sectionData) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      // Make a PUT request to update the module
      const response = await axios.put(
        `${BASE_URL}/modules/${moduleId}`,
        sectionData
      );

      // Handle the response as needed
      if (response.status === 200) {
        // Optionally, update your store state or trigger other actions
        console.log("Module updated successfully:", response.data);

        window.location.reload();

        // Return the updated module data
        return response.data;
      }
    } catch (error) {
      console.error("Error updating module:", error);

      // Handle errors as needed, e.g., show an error message
      throw new Error("Failed to update module");
    }
  },
}));

export default useSectionsStore;
