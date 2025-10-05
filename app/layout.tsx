import type { Metadata } from 'next';
import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Simple note-taking app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />

          {/* Контейнер для модальних порталів */}
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}
