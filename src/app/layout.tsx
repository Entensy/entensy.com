import { Montserrat, Noto_Sans_Arabic } from "next/font/google";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('entensy-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var nav=performance.getEntriesByType('navigation')[0];var isReload=nav&&nav.type==='reload';var hasLoaded=!!sessionStorage.getItem('entensy:loaded-locale');if(isReload||!hasLoaded){document.documentElement.style.overflow='hidden';document.documentElement.style.pointerEvents='none';}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
