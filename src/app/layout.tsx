import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google'; // Залишили тільки Comfortaa
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/auth/AuthProvider/AuthProvider';
import QueryProvider from '@/components/QueryProvider/QueryProvider';
import ThemeInitializer from '@/components/theme/ThemeInitializer/ThemeInitializer';
import './globals.css';

const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Leleka',
  description: 'Pregnancy tracker app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Передаємо ТІЛЬКИ змінну Comfortaa
    <html lang="uk" suppressHydrationWarning={true} className={comfortaa.variable}>
      <body>
        <ThemeInitializer />
        
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        
        <Toaster position="top-right" />
      </body>
    </html>
  );
}