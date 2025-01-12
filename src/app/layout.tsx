import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import Fabicon from "../../public/image/eyebook-logo.png";
import { GoogleOAuthProvider } from "@react-oauth/google";

const robotoBold = localFont({
  src: "./fonts/Roboto-Bold.ttf",
  variable: "--font-roboto-bold",
  weight: "700", // Weight for Bold
});

const robotoMedium = localFont({
  src: "./fonts/Roboto-Medium.ttf",
  variable: "--font-roboto-medium",
  weight: "500", // Weight for Medium
});

const robotoRegular = localFont({
  src: "./fonts/Roboto-Regular.ttf",
  variable: "--font-roboto-regular",
  weight: "400", // Weight for Regular
});

export const metadata: Metadata = {
  title: "Eyebook",
  description: "Eybook your socila company!!!",
  icons: [{ rel: "icon", url: Fabicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process?.env.NEXT_PUBLIC_CLIENT_ID;
  return (
    <html lang="en">
      <body
        className={`${robotoBold.variable} ${robotoMedium.variable} ${robotoRegular.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={clientId as string}>
          <ReduxProvider>
            <Toaster />
            {children}
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
