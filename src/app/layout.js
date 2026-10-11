import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const hindSiligiri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "Real-time market price tracking app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${hindSiligiri.className} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
      
        <Toaster position="top-center" reverseOrder={false} />
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
