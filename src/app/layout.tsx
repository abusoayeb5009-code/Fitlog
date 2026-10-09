import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { PlanProvider } from "@/context/PlanContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description:
    "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>

          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#151818",
                color: "#fff",
                border:
                  "1px solid #2a2e2e",
              },
            }}
          />

        </PlanProvider>
      </body>
    </html>
  );
}