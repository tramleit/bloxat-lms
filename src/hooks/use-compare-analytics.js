// useCourseAnalytics.js
import { useQuery } from "react-query";
import { BASE_URL } from "@/config/api-base-config";
import jwt_decode from "jwt-decode";

async function fetchCompareAnalytics() {
  const token = JSON.parse(localStorage.getItem("bxAuthToken"));

  const decodedToken = jwt_decode(token); // Decode the JWT token
  const userId = decodedToken.id; // Extract the user ID from the decoded token

  const response = await fetch(
    `${BASE_URL}/analytics/compare-courses/${userId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useCompareAnalytics() {
  return useQuery(["compareAnalytics"], () => fetchCompareAnalytics());
}
