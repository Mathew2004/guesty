import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'LuxuryStay - Premium Hotel Booking',
  description: 'Book luxury hotels and resorts worldwide with LuxuryStay. Experience the finest accommodations with our premium booking service.',
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