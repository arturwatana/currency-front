import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./GlobalRedux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  gap-5 bg-primaryGreen py-[4em] flex flex-col items-center`}
      >
        <Providers>
          <NavBar />
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
