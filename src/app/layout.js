// 

import "../app/style/public.css";
import { Outfit, Prompt } from 'next/font/google';
import "./globals.css";

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-outfit',
});

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500'],
  variable: '--font-prompt',
});

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`${outfit.variable} ${prompt.variable}`}>
        {children}
      </body>
    </html>
  );
}
