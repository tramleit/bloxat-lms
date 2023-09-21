import { useAlreadyHasCourse } from "@/hooks/use-already-has-course";
// import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupLayout({ children }) {
  const navigate = useNavigate();

  // Check if there's no token then redirect to sign up
  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem("bxAuthToken");

    // If a token exists and is not undefined, redirect to the desired page (e.g., '/')
    if (token == "undefined" || token == null) {
      navigate("/login");
      return;
    }
  }, []); // The empty dependency array ensures this effect runs only once

  // Here i also want to check if there's a course set up already ... that way I'll redirect to /courseId
  // Check if user has a course already under them ... that means they're not new
  const checkIfAlreadyHasCourse = useAlreadyHasCourse();

  useEffect(() => {
    checkIfAlreadyHasCourse;
  }, []);

  return <>{children}</>;
}
