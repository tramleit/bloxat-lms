import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";

// Fetch function to get warnings by course ID
async function fetchWarningsByCourseId(courseId) {
  const response = await axios.get(`${BASE_URL}/warnings/course/${courseId}`);
  return response.data;
}

// Custom hook to fetch warnings
export function useWarnings(courseId) {
  return useQuery(["warnings", courseId], () =>
    fetchWarningsByCourseId(courseId)
  );
}
