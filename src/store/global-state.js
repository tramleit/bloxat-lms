// globalState.js

import { create } from "zustand";

// Create a Zustand store
const useGlobalStore = create((set) => ({
  //   In edit course page track if a lesson was added in order to be able to publish the course
  lessonAdded: null,
  reset: () => set({ lessonAdded: null }),
}));

export default useGlobalStore;
