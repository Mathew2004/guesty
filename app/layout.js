import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Guest Equity, Inc. - Vacation Rentals',
  description: 'Explore California vacation rentals. Rest, Reconnect, and Make Core Memories with Guest Equity, Inc.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}