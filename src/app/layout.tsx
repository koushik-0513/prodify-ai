import { FloatingActionButton } from "@/components/chat-bot";
import { MobileTopNavigation } from "@/components/mobile-top-navigation";
import { Sidebar } from "@/components/side-navigation-bar";

import "./globals.css";

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
        <div className="lg:ml-66">{children}</div>
        <FloatingActionButton />
      </body>
    </html>
  );
}
