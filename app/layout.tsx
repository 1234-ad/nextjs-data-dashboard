import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Employee Dashboard',
  description: 'A comprehensive employee management dashboard built with Next.js, TypeScript, and TailwindCSS',
  keywords: ['employee', 'dashboard', 'management', 'nextjs', 'typescript', 'tailwindcss'],
  authors: [{ name: 'Developer' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}