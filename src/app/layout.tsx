import '../styles/globals.css';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { fontMono, fontSans, outFit } from '@/lib/fonts';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Dev Space Blog',
  description: 'A blog about Dev things',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          outFit.className,
          fontSans.className,
          fontMono.className
        )}
      >
        <Providers attribute='class' defaultTheme='dark' enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  );
}
