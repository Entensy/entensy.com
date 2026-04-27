import { Montserrat, Noto_Sans_Arabic } from "next/font/google";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// Arabic / Kurdish Sorani use the same Unicode Arabic block
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-notoSans",
  display: "swap",
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>;

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  const resolvedLocale = routing.locales.includes(
    locale as (typeof routing.locales)[number],
  )
    ? locale
    : "en";
  const dir = resolvedLocale === "en" ? "ltr" : "rtl";

  return (
    <html
      lang={resolvedLocale}
      dir={dir}
      className={`${montserrat.variable} ${notoSansArabic.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('entensy-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
