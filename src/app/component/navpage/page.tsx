"use client";
import { usePathname } from "next/navigation"; // To get the current pathname

export default function Navpage() {
  const pathname = usePathname(); // Get the current path

  // Ensure pathname is defined before proceeding
  if (!pathname) {
    return null; // Optionally, return a fallback UI if pathname is undefined
  }

  const formattedPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  // Split the pathname by '/' and take the last part, then capitalize the first letter
  const formattedMain = pathname
    .split("/")
    .filter(Boolean) // Remove empty strings
    .pop() // Get the last part
    ?.replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter

  return (
    <div>
      <span>{formattedPath}</span>

      <div className="text-3xl">{formattedMain}</div>
    </div>
  );
}
