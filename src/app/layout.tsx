import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // This line is crucial
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ApexxTech - AI Agent Marketplace',
  description: 'The Kayak of AI Agents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}


