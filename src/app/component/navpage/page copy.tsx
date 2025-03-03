"use client";
import { usePathname } from "next/navigation"; // To get the current pathname

export default function Navpage() {
  const pathname = usePathname(); // Get the current path

  // Remove the leading slash
  const formattedPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  return <div>{formattedPath}</div>;
}
