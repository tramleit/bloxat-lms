import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  // const router = useRouter();

  // Checking if there's a token then that means they're logged in so redirect to /

  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem("bxAuthToken");

    // If a token exists and is not undefined, redirect to the desired page (e.g., '/')
    if (token !== "undefined" && token !== null) {
      navigate("/");
      return;
    }
  }, []); // The empty dependency array ensures this effect runs only once

  return <div>{children}</div>;
};

export default AuthLayout;
