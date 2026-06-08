import { Montserrat, Noto_Sans_Arabic } from "next/font/google";
import { cookies } from "next/headers";
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
  const [{ locale }, cookieStore] = await Promise.all([params, cookies()]);

  const resolvedLocale = routing.locales.includes(
    locale as (typeof routing.locales)[number],
  )
    ? locale
    : "en";
  const dir = resolvedLocale === "en" ? "ltr" : "rtl";
  // Default to dark; switch to light only when the user has explicitly chosen it.
  // Reading the cookie server-side means the correct class is in the HTML from the
  // very first byte — no script, no flash, no React 19 inline-script warning.
  const isDark = cookieStore.get("entensy-theme")?.value !== "light";

  return (
    <html
      lang={resolvedLocale}
      dir={dir}
      className={`${montserrat.variable} ${notoSansArabic.variable} scroll-smooth ${isDark ? "dark" : ""}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
