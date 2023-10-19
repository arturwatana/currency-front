import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "./context/api/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-primaryGreen flex flex-col`}
      >
          <GlobalContextProvider>
          <ToastContainer />
          {children}
          </GlobalContextProvider>
      </body>
    </html>
  );
}
