import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import AppContextProvider from "@/components/providers/app-context-provider";
import TanStackProvider from "@/components/providers/tan-stack-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Header } from "@/components/shared-layout/header";

import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VNRelief - Nền tảng cứu trợ thiên tai Việt Nam",
  description: "VNRelief - Nền tảng cứu trợ thiên tai Việt Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,  maximum-scale=1"
        />
      </head>
      <body className={roboto.className}>
        <TanStackProvider>
          <SidebarProvider>
            <AppContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <AppSidebar />
                <SidebarInset>
                  <Header />
                  <div className="pt-4">{children}</div>
                </SidebarInset>
              </ThemeProvider>
            </AppContextProvider>
          </SidebarProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
