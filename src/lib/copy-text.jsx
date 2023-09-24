import toast from "react-hot-toast";

// Function to copy phone number to clipboard
export const copyText = (text) => {
  if (text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Show a success message or handle success as needed
        console.log("Copied to clipboard:", text);
        toast.success("Copied to clipboard");
      })
      .catch((error) => {
        // Handle any errors that may occur while copying
        console.error("Error copying to clipboard", error);
      });
  }
};
