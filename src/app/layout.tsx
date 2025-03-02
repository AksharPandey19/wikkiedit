import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WikiEdit",
  description: " You can edit Articals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script>

        console.log(`%c                                             ___   
    _____                                   /\\  \\  
   /::\\  \\                     ___         /::\\  \\ 
  /:/\\:\\  \\                   /\\__\\       /:/\\:\\__\\
 /:/ /::\\__\\   ___     ___   /:/__/      /:/ /:/  /
/:/_/:/\\:|__| /\\  \\   /\\__\\ /::\\  \\     /:/_/:/  / 
\\:\\/:/ /:/  / \\:\\  \\ /:/  / \\/\\:\\  \\__  \\:\\/:/  /  
 \\::/_/:/  /   \\:\\  /:/  /   ~~\\:\\/\\__\\  \\::/__/   
  \\:\\/:/  /     \\:\\/:/  /       \\::/  /   \\:\\  \\   
   \\::/  /       \\::/  /        /:/  /     \\:\\__\\  
    \\/__/         \\/__/         \\/__/       \\/__/`, "color: #4962ee; font-family: monospace; font-size: 12px; font-weight: bold; text-shadow: 2px 2px rgba(0,0,0,0.2);"),
        console.log("%c Welcome to WikiEdit! DO NOT FUCKING PASTE ANYTHING IN THE CONSOLE UNLESS YOU KNOW WHAT YOU ARE DOING.", "color: #4962ee; font-family: monospace; font-size: 12px; font-weight: bold; text-shadow: 2px 2px rgba(0,0,0,0.2);"),
</script>      </body>
    </html>
  );
}
