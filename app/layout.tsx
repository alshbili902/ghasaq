import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Cormorant_Garamond,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ParticleUniverse } from "@/components/background/ParticleUniverse";
import { MusicInvitationProvider } from "@/components/music/MusicInvitation";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-arabic",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-literary-arabic",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-english-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  ...(siteConfig.siteUrl ? { metadataBase: new URL(siteConfig.siteUrl) } : {}),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexSansArabic.variable} ${amiri.variable} ${cormorantGaramond.variable} dark`}
    >
      <body className="relative min-h-[100dvh] w-full max-w-full overflow-x-clip bg-[#240914] text-[#FFF5ED] antialiased">
        <ParticleUniverse />
        <MusicInvitationProvider>
          <div className="relative z-10 flex min-h-[100dvh] w-full max-w-full flex-col overflow-x-clip">
            {children}
          </div>
        </MusicInvitationProvider>
      </body>
    </html>
  );
}
