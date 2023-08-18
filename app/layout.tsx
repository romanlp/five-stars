import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import React from "react";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Five stars",
};

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html
      style={{ scrollBehavior: "smooth" }}
      className="overflow-x-hidden"
      lang="en"
    >
    <body className={ibmPlexMono.className + "  overflow-x-hidden"}>
    {children}
    </body>
    </html>
  );
}
