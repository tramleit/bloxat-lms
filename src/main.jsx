import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-phone-input-2/lib/material.css";
import { ThemeProvider } from "@/providers/theme-provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>
);

//  <React.StrictMode></React.StrictMode>
