import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";
import jwt_decode from "jwt-decode";

const usePaymentMethodsStore = create((set) => ({
  paymentMethods: null,
  paymobIntegration: null,
  instapayIntegration: null,
  loading: false,

  // GET ALL PAYMENT METHODS OF A USER
  fetchPaymentMethods: async () => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    set({ loading: true });

    try {
      const response = await axios.get(
        `${BASE_URL}/users/payment-methods/${userId}`
      );
      const paymentMethods = response.data;

      set({ paymentMethods, loading: false });
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      set({ loading: false });
    }
  },
  // PAYMOB
  // ADD PAYMOB INTEGRATION
  addPaymobIntegration: async (redirect) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    set({ addingPaymobIntegration: true }); // Set addingPaymobMethod to true

    try {
      const response = await axios.post(`${BASE_URL}/paymob-integrations`, {
        user_id: userId,
      });

      // Assuming your API returns the updated payment methods data, you can update the state
      set({ paymentMethods: response.data, addingPaymobIntegration: false }); // Set addingPaymobMethod back to false
      window.location.href = redirect;
    } catch (error) {
      console.error("Error adding paymob method:", error);
      set({ addingPaymobIntegration: false }); // Set addingPaymobMethod to false in case of error
    }
  },
  // UPDATE PAYMOB INEGRATION
  updatePaymobIntegration: async (updatedFields) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    set({ updatingPaymobIntegration: true });

    try {
      const response = await axios.put(
        `${BASE_URL}/paymob-integrations/${userId}`,
        updatedFields
      );

      set({ paymentMethods: response.data, updatingPaymobIntegration: false });
      return { success: true }; // Return a success statu
    } catch (error) {
      console.error("Error updating Paymob integration:", error);
      set({ updatingPaymobIntegration: false });
      return { success: false }; // Return a failure status
    }
  },
  // GET PAYMOB INTEGRATION ONLY
  fetchPaymobIntegration: async () => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    set({ loading: true });

    try {
      const response = await axios.get(
        `${BASE_URL}/users/paymob-integrations/${userId}`
      );
      const paymobIntegration = response.data;

      set({ paymobIntegration, loading: false });
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      set({ loading: false });
    }
  },
  // INSTAPAY
  // ADD INSTAPAY INTEGRATION
  addInstapayIntegration: async (redirect) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    set({ addingInstapayIntegration: true }); // Set addingPaymobMethod to true

    try {
      const response = await axios.post(`${BASE_URL}/instapay-integrations`, {
        user_id: userId,
      });

      // Assuming your API returns the updated payment methods data, you can update the state
      set({ paymentMethods: response.data, addingInstapayIntegration: false }); // Set addingPaymobMethod back to false
      window.location.href = redirect;
    } catch (error) {
      console.error("Error adding paymob method:", error);
      set({ addingInstapayIntegration: false }); // Set addingPaymobMethod to false in case of error
    }
  },
  // UPDATE INSTAPAY INTEGRATION
  updateInstapayIntegration: async (updatedFields) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    set({ updatingInstapayIntegration: true });

    try {
      const response = await axios.put(
        `${BASE_URL}/instapay-integrations/${userId}`,
        updatedFields
      );

      set({
        paymentMethods: response.data,
        updatingInstapayIntegration: false,
      });
      return { success: true }; // Return a success statu
    } catch (error) {
      console.error("Error updating Paymob integration:", error);
      set({ updatingInstapayIntegration: false });
      return { success: false }; // Return a failure status
    }
  },
  // GET INSTAPAY INTEGRATION ONLY
  fetchInstapayIntegration: async () => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    const decodedToken = jwt_decode(token); // Decode the JWT token
    const userId = decodedToken.id; // Extract the user ID from the decoded token

    set({ loading: true });

    try {
      const response = await axios.get(
        `${BASE_URL}/users/instapay-integrations/${userId}`
      );
      const instapayIntegration = response.data;

      set({ instapayIntegration, loading: false });
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      set({ loading: false });
    }
  },
}));

export default usePaymentMethodsStore;
