// globalStore.js

import { create } from "zustand";

const useGlobalStore = create((set) => ({
  currentCourseState: null, // Initialize with null or any default value
  setCurrentCourseState: (course) => set({ currentCourse: course }),
  // ... other states and actions in your global store
}));

export default useGlobalStore;
