import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import "./globals.css";

import clsx from "clsx";

import { Providers } from "./providers";

import { fontHeading, fontMono } from "@/config/fonts";
import {
	BRAND,
	OG_SHARE_IMAGE_HEIGHT,
	OG_SHARE_IMAGE_WIDTH,
	SEO_DESCRIPTION,
	SEO_KEYWORDS,
	SEO_OG_DESCRIPTION,
	SEO_OG_IMAGE_ALT,
	SEO_TITLE_DEFAULT,
	SEO_TITLE_TEMPLATE,
	getMetadataJsonLd,
	getOgShareImageUrl,
	getSiteUrl,
} from "@/config/seo";

const SITE_URL = getSiteUrl();

/** Absolute `og:image` / `twitter:image` URL — required for WhatsApp / Meta crawlers */
const OG_SHARE_IMAGE = {
	url: getOgShareImageUrl(),
	width: OG_SHARE_IMAGE_WIDTH,
	height: OG_SHARE_IMAGE_HEIGHT,
	alt: SEO_OG_IMAGE_ALT,
	type: "image/png",
} as const;

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SEO_TITLE_DEFAULT,
		template: SEO_TITLE_TEMPLATE,
	},
	description: SEO_DESCRIPTION,
	applicationName: BRAND,
	authors: [{ name: BRAND, url: SITE_URL }],
	creator: BRAND,
	publisher: BRAND,
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	keywords: [...SEO_KEYWORDS],
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/',
		},
	},
	category: 'fashion',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		alternateLocale: ['en_GH'],
		url: SITE_URL,
		siteName: `${BRAND} waitlist`,
		title: SEO_TITLE_DEFAULT,
		description: SEO_OG_DESCRIPTION,
		images: [OG_SHARE_IMAGE],
	},
	twitter: {
		card: 'summary_large_image',
		title: SEO_TITLE_DEFAULT,
		description: SEO_OG_DESCRIPTION,
		images: [OG_SHARE_IMAGE],
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/fashnect.svg', type: 'image/svg+xml' },
		],
		shortcut: '/favicon.ico',
		apple: '/fashnect.svg',
	},
	appleWebApp: {
		capable: true,
		title: BRAND,
		statusBarStyle: 'black-translucent',
	},
	verification: {
		google: 'cx1bSzglD8CWkrHDoqGkzdOuDSWqJGlwed4Sih447CM',
	},
	other: {
		'msapplication-TileColor': '#000000',
	},
	manifest: '/manifest.json',
};

const jsonLd = getMetadataJsonLd();

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/satoshi" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			{/* Some extensions inject body attrs (e.g. cz-shortcut-listen); avoids false hydration warnings. */}
			<body
				className={clsx(
					'text-foreground font-sans antialiased',
					fontHeading.variable,
					fontMono.variable,
				)}
				suppressHydrationWarning
			>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>{children}</Providers>
			</body>
		</html>
	);
}
