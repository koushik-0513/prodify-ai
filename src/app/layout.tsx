import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/side-navigation-bar";
import MobileTopNavigation from "@/components/mobile-top-navigation";
import FloatingActionButton from "@/components/chat-bot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body>
        <MobileTopNavigation />
        <Sidebar />
        <div className="lg:ml-66 pt-16 lg:pt-0 sm:pt-16 md:pt-16">
          {children}
        </div>
        <FloatingActionButton />
      </body>
    </html>
  );
}
