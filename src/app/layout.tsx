import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Rishi Kumar Yadav | Frontend Developer Portfolio",
  description:
    "Rishi Kumar Yadav is a frontend developer specializing in Next.js, React, React Native, TypeScript, and Tailwind CSS. Explore projects, experiences, and skills.",
  keywords: [
    "Rishi Kumar Yadav",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "AUM TASK",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Rishi Kumar Yadav" }],
  creator: "Rishi Kumar Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-rishiyadav.vercel.app",
    title: "Rishi Kumar Yadav | Frontend Developer Portfolio",
    description:
      "Frontend Developer specializing in building high-performance, responsive cross-platform web & mobile applications.",
    siteName: "Rishi Kumar Yadav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishi Kumar Yadav | Frontend Developer Portfolio",
    description:
      "Frontend Developer specializing in building high-performance, responsive cross-platform web & mobile applications.",
  },
  icons: {
    icon: [
      { url: "/logo_light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/logo_dark.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo_light.ico",
    apple: [
      { url: "/logo_light.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo_dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo_light.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logo_dark.ico" media="(prefers-color-scheme: dark)" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo_light.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=MonteCarlo&family=Hedvig+Letters+Serif:opsz@12..24&family=Geist:wght@400;500&display=swap"
          rel="stylesheet"
        />
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
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
