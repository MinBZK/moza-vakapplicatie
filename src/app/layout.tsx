import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/layouts/header";
import Breadcrumb from "@/layouts/breadcrumb";
import Providers from "./providers";

import { Suspense } from "react";
export const metadata: Metadata = {
  title: "UWV mock voorkant",
  description: "UWV mock voorkant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <Providers>
        <body>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />

            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-5">
              <Breadcrumb />
            </div>

            <main className="mx-auto max-w-screen-xl space-y-6 rounded-2xl bg-white p-6 px-4 shadow-lg">
              {children}
            </main>
          </Suspense>
        </body>
      </Providers>
    </html>
  );
}
