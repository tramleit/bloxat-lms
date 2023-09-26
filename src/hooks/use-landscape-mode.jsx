// useLandscapeMode.js
import { useState, useEffect } from "react";

const useLandscapeMode = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Add an event listener for orientation change
    window.addEventListener("resize", handleOrientationChange);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return isPortrait;
};

export default useLandscapeMode;
