import "./globals.css"
import { Inter } from "next/font/google"
import Adsense from "@/lib/adsense"
import NextAuthProvider from "@/lib/nextauth"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Teddy Bear",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <NextAuthProvider>
          { children }
        </NextAuthProvider>
        {/* <Adsense/> */}
      </body>
    </html>
  )
}
