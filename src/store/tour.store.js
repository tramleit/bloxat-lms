// tourStore.js
import { create } from "zustand";

const useTourStore = create((set) => ({
  isTourOpen: false, // Initialize with the tour closed
  showStartTourModal: false, // Initialize with the tour closed

  // Function to open the tour
  openTour: () => set({ isTourOpen: true }),

  // Function to close the tour
  closeTour: () => set({ isTourOpen: false }),

  // Tour MODAL
  enableShowStartTourModal: () => set({ showStartTourModal: true }),
  disableShowStartTourModal: () => set({ showStartTourModal: false }),
}));

export default useTourStore;
