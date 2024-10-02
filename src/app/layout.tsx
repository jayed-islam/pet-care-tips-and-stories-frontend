import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import NextAuthProviders from "@/utils/Nextauth-Providers";
import { Toaster } from "react-hot-toast";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const robotoBold = localFont({
//   src: "./fonts/Roboto-Bold.ttf",
//   variable: "--font-roboto-bold",
//   weight: "700", // Weight for Bold
// });

// const robotoMedium = localFont({
//   src: "./fonts/Roboto-Medium.ttf",
//   variable: "--font-roboto-medium",
//   weight: "500", // Weight for Medium
// });

// const robotoRegular = localFont({
//   src: "./fonts/Roboto-Regular.ttf",
//   variable: "--font-roboto-regular",
//   weight: "400", // Weight for Regular
// });

// const oswaldRegular = localFont({
//   src: "./fonts/Oswald-Bold.ttf",
//   variable: "--font-roboto-regular",
//   weight: "400", // Weight for Regular
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${robotoBold.variable} ${robotoMedium.variable} ${robotoRegular.variable} ${oswaldRegular.variable} antialiased`}
      >
        <NextAuthProviders>
          <ReduxProvider>
            <Toaster />
            {children}
          </ReduxProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
