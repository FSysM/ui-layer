import "./globals.css";
import { ReactNode } from "react";
import { JetBrains_Mono as Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryProvider } from '@/providers/query-provider'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "FSysM",
  description: "File System Manager",
  icons: {
    icon: '/book.svg',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs" suppressHydrationWarning className={cn("h-full", "font-sans", geist.variable)}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`h-full bg-background font-sans antialiased ${geist.variable}`}
      >
        <main className="h-full overflow-y-auto">
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>
      </body>
      </html>
  );
}