/** Canonical waitlist host — override with NEXT_PUBLIC_SITE_URL in env */
export const DEFAULT_SITE_URL = 'https://waitlist.fashnect.com';

/** Open Graph / Twitter card — file in `public/` (1200×630 recommended) */
export const OG_SHARE_IMAGE_PATH = '/fashnect_image_vendor.png';
/** Matches `public/fashnect_image_vendor.png` (≈1.91:1 — good for OG cards) */
export const OG_SHARE_IMAGE_WIDTH = 1376;
export const OG_SHARE_IMAGE_HEIGHT = 768;

/** Site URL with no trailing slash — use for metadata, sitemap, robots, JSON-LD */
export function getSiteUrl(): string {
	const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
	return raw.replace(/\/+$/, '');
}

/** Absolute URL to the default social preview image */
export function getOgShareImageUrl(): string {
	return `${getSiteUrl()}${OG_SHARE_IMAGE_PATH}`;
}

export const BRAND = 'Fashnect';

/** Primary &lt;title&gt; — concise for tabs; descriptive for SERPs (~50–60 chars) */
export const SEO_TITLE_DEFAULT =
	'Fashnect waitlist — early access to social fashion commerce';

/** Subpages: "Something · Fashnect waitlist" */
export const SEO_TITLE_TEMPLATE = '%s · Fashnect waitlist';

/** Meta description — unique value prop; target ~150–165 characters */
export const SEO_DESCRIPTION =
	'Reserve your spot for Fashnect: a fashion marketplace that works like social media. Early access for independent sellers and buyers—launch news, zero inbox clutter.';

/** Alt text for Open Graph / Twitter preview image */
export const SEO_OG_IMAGE_ALT =
	'Fashnect waitlist — early access to social fashion commerce for sellers and buyers';

export const SEO_KEYWORDS = [
	BRAND,
	`${BRAND} waitlist`,
	'fashion waitlist',
	'social commerce',
	'social shopping',
	'fashion marketplace',
	'independent designer marketplace',
	'online boutique',
	'sell fashion online',
	'buy fashion online',
	'fashion discovery',
	'early access',
	'clothing marketplace',
	'Ghana fashion',
	'West Africa fashion',
] as const;

export const FASHNECT_INSTAGRAM_URL = 'https://www.instagram.com/fashnect/';
export const FASHNECT_LINKEDIN_URL = 'https://www.linkedin.com/company/fashnect/';

/** PNG on Supabase public storage — use in emails (SVG/site-relative assets often break in inboxes). */
export const FASHNECT_EMAIL_LOGO_URL =
	'https://ebzpkkgbkxaixjjjjlkl.supabase.co/storage/v1/object/public/FASHNECT/Fashnect.PNG';

export function getMetadataJsonLd() {
	const base = getSiteUrl();
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${base}/#organization`,
				name: BRAND,
				url: base,
				logo: {
					'@type': 'ImageObject',
					url: `${base}/fashnect.svg`,
				},
				description: SEO_DESCRIPTION,
				sameAs: [FASHNECT_INSTAGRAM_URL, FASHNECT_LINKEDIN_URL],
			},
			{
				'@type': 'WebSite',
				'@id': `${base}/#website`,
				name: `${BRAND} waitlist`,
				url: base,
				description: SEO_DESCRIPTION,
				inLanguage: 'en-US',
				publisher: { '@id': `${base}/#organization` },
			},
			{
				'@type': 'WebPage',
				'@id': `${base}/#webpage`,
				name: SEO_TITLE_DEFAULT,
				url: base,
				description: SEO_DESCRIPTION,
				isPartOf: { '@id': `${base}/#website` },
				about: { '@id': `${base}/#organization` },
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: `${base}${OG_SHARE_IMAGE_PATH}`,
					width: OG_SHARE_IMAGE_WIDTH,
					height: OG_SHARE_IMAGE_HEIGHT,
				},
			},
		],
	} as const;
}
