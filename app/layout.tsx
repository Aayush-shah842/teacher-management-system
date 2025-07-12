import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { TeacherProvider } from "@/contexts/TeacherContext"
import { PaymentProvider } from "@/contexts/PaymentContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TeacherHub - Modern Teacher Management System",
  description: "A comprehensive teacher management interface built with Next.js, TypeScript, and Tailwind CSS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PaymentProvider>
          <TeacherProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <main className="flex-1 overflow-auto">
                <div className="p-6 lg:p-8">{children}</div>
              </main>
            </div>
          </TeacherProvider>
        </PaymentProvider>
      </body>
    </html>
  )
}
