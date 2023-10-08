import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Outfit as OutFit,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

export const outFit = OutFit({
  subsets: ['latin'],
  weight: ['400', '500', '200', '700'],
  variable: '--font-outfit',
});
