import "./globals.css"
import { Inter } from "next/font/google"
import NextAuthProvider from "@/lib/nextauth"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Teddy Bear",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest/manifest.json" />
        <link rel="apple-touch-icon" href="/manifest/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </head>
      <body className={ inter.className }>
        <NextAuthProvider>
          { children }
        </NextAuthProvider>
      </body>
    </html>
  )
}
