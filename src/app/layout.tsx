import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/comon/Header";
import Footer from "@/components/comon/Footer";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "লাল খবর",
  description:
    "সময়ের প্রতিধ্বনি, নির্ভীক কণ্ঠস্বর। প্রতিদিনের ব্রেকিং নিউজ এবং গভীর বিশ্লেষণের নির্ভরযোগ্য ঠিকানা লাল খবর।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gray-50">
        <Header />

        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#ffffff",
              color: "#1f2937",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "14px",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f3f4f6",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
