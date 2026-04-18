import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Providers from "@/components/layout/Providers";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: t("title_template"),
    },
    icons: {
      icon: "/images/logo.png",
      apple: "/images/logo.png",
    },
    description: t("description"),
    keywords: [
      "software development",
      "tech consulting",
      "web development",
      "mobile apps",
      "UI/UX design",
      "ENTENSY",
    ],
    openGraph: {
      title: t("title"),
      description: t("og_description"),
      type: "website",
      locale,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "ENTENSY",
      description: t("og_description"),
    },
    metadataBase: new URL("https://entensy.com"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <Providers>
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
        // Smooth handoff: slightly extend transition timing so the page
        // content fades in after locale data is ready rather than
        // snapping to the new locale abruptly.
      >
        {children}
      </NextIntlClientProvider>
    </Providers>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
