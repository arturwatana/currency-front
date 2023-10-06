import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "./Context/global.context";
import { Providers } from "./GlobalRedux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
