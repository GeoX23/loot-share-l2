import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Loot Share L2 App",
  description: "For FrozenThrone, best clan in MithrilMines.eu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="https://mithrilmines.eu/css/animate.css?version=1"
      ></link>
      <body className={"bg-slate-800 h-[100vh] " + inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
