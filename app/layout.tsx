import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react"
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';
import Chat from "@/components/layout/Chat";

export const metadata: Metadata = {
  title: "Compontae Website",
  description: "Compontae adalah sebuah product compos dari limbah rumah tangga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <SessionProvider> 
          <Navbar />
          <main className="w-full">
            {children}
            <Chat />
          </main>
          <Toaster position="bottom-right" reverseOrder={false} />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
