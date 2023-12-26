import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '../public/styles/fonts.css';
import { Toaster } from 'sonner';
import '../styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: '200' });

export const metadata: Metadata = {
  title: 'Entensy',
  description: 'Software Development and Consulting Company',
  icons: {
    icon: './favicon.ico',
    other: {
      rel: 'icon',
      url: './favicon.ico',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
