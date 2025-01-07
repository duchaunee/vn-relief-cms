import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "../globals.css";
import TanStackProvider from "@/providers/tan-stack-provider";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./components/sidebar"), { ssr: false });
const Header = dynamic(() => import("./components/header"), { ssr: false });

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VNRelief - Quản lý",
  description: "VNRelief - Quản lý",
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
          <div id="main-content" className="mt-[64px] p-10 ml-[60px]">
            {children}
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
