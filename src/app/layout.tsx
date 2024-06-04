import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TailwindIndicator from "@/components/TailwindIndicator";
import Toaster from "@/components/Toaster";
import { TooltipProvider } from "@/components/Tooltip";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: "AI Chatbot",
    template: `AI Chatbot`,
  },
  description: "AI CHat bot",
  icons: {
    // icon: "https://chatstream.ing/assets/images/logo.png",
    // shortcut: "/favicon-16x16.png",
    // apple: "https://chatstream.ing/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <Provider>
          <Header />
          <TooltipProvider>
            <div className="w-full flex h-[calc(100vh_-_64px)]">
              <Sidebar />
              <div className="w-full bg-gray-100">{children}</div>
            </div>
            <TailwindIndicator />
          </TooltipProvider>
        </Provider>
      </body>
    </html>
  );
}
