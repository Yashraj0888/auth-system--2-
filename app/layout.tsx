import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AGANITHA AUTH',
  description: 'Created by Yashraj',
  generator: 'Yashraj',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
