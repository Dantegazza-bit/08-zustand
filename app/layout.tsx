// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Simple note management app built with Next.js",
};

export default function RootLayout({
  children,
  modal, // ✅ додаємо слот для модалки
}: {
  children: ReactNode;
  modal: ReactNode; // ✅ і тут теж
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {/* ✅ модалка РЕАЛЬНО рендериться тут */}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
