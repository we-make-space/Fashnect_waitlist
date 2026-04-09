import type { Metadata } from 'next';

/** Waitlist admin is not for public search — block indexing and polite robots disallow. */
export const metadata: Metadata = {
	title: { absolute: 'Waitlist admin · Fashnect' },
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: { index: false, follow: false, noimageindex: true },
	},
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return children;
}
