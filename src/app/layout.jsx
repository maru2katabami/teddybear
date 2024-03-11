import "./globals.css"
import { Inter } from "next/font/google"
import Adsense from "@/lib/adsense"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Teddy Bear",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        { children }
        <Adsense/>
      </body>
    </html>
  )
}
