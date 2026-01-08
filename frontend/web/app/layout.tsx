import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'E-Tagmat | Smart Logistics Platform',
    description: 'Premium Logistics & Groupage Solution',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="app-container">
                    {children}
                </div>
            </body>
        </html>
    );
}
