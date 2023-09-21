// import { useEffect, useState } from "react";

export function formatDate(date) {
  //   if (!(date instanceof Date) || isNaN(date)) {
  //     return "Invalid date"; // Handle invalid dates gracefully
  //   }

  if (!(date instanceof Date)) {
    date = new Date(date); // Convert the input to a Date object if it's not already one
  }

  const options = {
    year: "numeric",
    month: "long", // Full month name
    day: "numeric",
    hour: "2-digit", // 2-digit representation of hours (e.g., 03)
    minute: "2-digit", // 2-digit representation of minutes (e.g., 09)
    hour12: true, // Use 12-hour clock (true) or 24-hour clock (false)
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// // Example usage:
// const inputDate = "2023-04-02T15:30:00.000Z";
// const formattedDate = formatDateWithTime(inputDate);
// console.log(formattedDate); // Output: "2 April 2023, 03:30 PM"
