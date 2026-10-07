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
        <Toaster />
      </body>
    </html>
  );
}
