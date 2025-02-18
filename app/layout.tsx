import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import { ToastProvider, ToastViewport } from '../components/ui/toast'; // Import ToastProvider and ToastViewport here
import Header from '../components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyFlowMate - Your Personal Menstrual Care Companion',
  description: 'Track your menstrual cycle, symptoms, and get personalized health insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Wrap the entire layout inside ToastProvider */}
          <ToastProvider>
            <Header />
            <main className="min-h-screen bg-background">{children}</main>
            <ToastViewport /> {/* Add ToastViewport here */}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}