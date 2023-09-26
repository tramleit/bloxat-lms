import { useAlreadyHasCourse } from "@/hooks/use-already-has-course";
import LanguageInitializer from "@/hooks/language-init";
// import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupLayout({ children }) {
  const navigate = useNavigate();
  const checkIfAlreadyHasCourse = useAlreadyHasCourse();

  // Check if there's no token then redirect to sign up
  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem("bxAuthToken");

    // If a token exists and is not undefined, redirect to the desired page (e.g., '/')
    if (token == "undefined" || token == null) {
      navigate("/login");
      return;
    }

    // Check if user has a course already under them ... that means they're not new
    // const hasCourse = checkIfAlreadyHasCourse();

    // if (hasCourse) {
    //   navigate("/courseId"); // Redirect to the desired route if a course is already set up
    // }

    // Invoke the function to check if the user has a course already
    // checkIfAlreadyHasCourse();
  }, []); // The empty dependency array ensures this effect runs only once

  // Here i also want to check if there's a course set up already ... that way I'll redirect to /courseId
  // Check if user has a course already under them ... that means they're not new
  // const checkIfAlreadyHasCourse = useAlreadyHasCourse();

  useEffect(() => {
    checkIfAlreadyHasCourse;
  }, []);

  return (
    <>
      {/* LanguageInitializer runs early in the rendering process */}
      <LanguageInitializer />
      {children}
    </>
  );
}
