import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "CareerLaunch - Your Gateway to Success",
  description: "CareerLaunch is your ultimate job portal, connecting talented individuals with their dream careers. Explore thousands of job opportunities, create a standout resume, and receive personalized career guidance. Join CareerLaunch today and take the first step towards a brighter future!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <AppProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}