// src/queries/courseQueries.js
import { useQuery } from "react-query";
import { BASE_URL } from "@/config/api-base-config";

function fetchCourseDetails(courseId) {
  return fetch(`${BASE_URL}/courses/title/id/${courseId}`)
    .then((response) => response.json())
    .then((data) => data);
}

export function useCourseTitle(courseId) {
  return useQuery(["courseTitle", courseId], () =>
    fetchCourseDetails(courseId)
  );
}
