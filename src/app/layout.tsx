import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rishi Kumar Yadav | Frontend Developer Portfolio",
  description: "Rishi Kumar Yadav is a frontend developer specializing in Next.js, React, React Native, TypeScript, and Tailwind CSS. Explore projects, experiences, and skills.",
  keywords: ["Rishi Kumar Yadav", "Frontend Developer", "React Developer", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "AUM TASK", "Web Developer", "Software Engineer"],
  authors: [{ name: "Rishi Kumar Yadav" }],
  creator: "Rishi Kumar Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-rishiyadav.vercel.app",
    title: "Rishi Kumar Yadav | Frontend Developer Portfolio",
    description: "Frontend Developer specializing in building high-performance, responsive cross-platform web & mobile applications.",
    siteName: "Rishi Kumar Yadav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishi Kumar Yadav | Frontend Developer Portfolio",
    description: "Frontend Developer specializing in building high-performance, responsive cross-platform web & mobile applications.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

