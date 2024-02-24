import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header/Header";
import { RedirectController } from "../components/RedirectController";

import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main
        // className={`m-auto mt-12 grid min-h-screen max-w-xl items-start justify-items-center ${inter.className}`}
        className={`m-auto mt-12 grid min-h-screen max-w-5xl items-start justify-items-center ${inter.className}`}
      >
        {children}
      </main>
      <Toaster />
    </>
  );
  // return (
  //   <RedirectController>
  //     <Header />
  //     <main
  //       // className={`m-auto mt-12 grid min-h-screen max-w-xl items-start justify-items-center ${inter.className}`}
  //       className={`m-auto mt-12 grid min-h-screen max-w-5xl items-start justify-items-center ${inter.className}`}
  //     >
  //       {children}
  //     </main>
  //     <Toaster />
  //   </RedirectController>
  // );
}
