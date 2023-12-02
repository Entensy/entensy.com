import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './css/globals.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: '200' });

export const metadata: Metadata = {
  title: 'Entensy',
  description: 'Software Development and Consulting Company',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
