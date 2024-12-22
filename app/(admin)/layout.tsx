import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "../globals.css";
import TanStackProvider from "@/providers/tan-stack-provider";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VNRelief - Tình nguyện viên",
  description: "VNRelief - Tình nguyện viên",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo/logo-vnrelief.png",
        href: "/logo/logo-vnrelief.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo/logo-vnrelief.png",
        href: "/logo/logo-vnrelief.png",
      },
    ],
  },
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
      <body className={roboto.className} id="admin">
        <TanStackProvider>
          <Header />
          <Sidebar />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
