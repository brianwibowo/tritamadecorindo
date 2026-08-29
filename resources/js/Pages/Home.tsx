import AboutSection from '@/Components/Storefront/AboutSection';
import CategoryCards from '@/Components/Storefront/CategoryCards';
import FeaturedCollection from '@/Components/Storefront/FeaturedCollection';
import HeroSection from '@/Components/Storefront/HeroSection';
import JournalSection from '@/Components/Storefront/JournalSection';
import NewsletterSection from '@/Components/Storefront/NewsletterSection';
import ProductGrid from '@/Components/Storefront/ProductGrid';
import SustainableBanner from '@/Components/Storefront/SustainableBanner';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import type { Category, Product } from '@/types';

interface HomeProps {
	categories: Category[];
	featuredProducts: (Product & { lowest_price_formatted?: string })[];
}

export default function Home({ categories, featuredProducts }: HomeProps) {
	return (
		<StorefrontLayout>
			<Head>
				<title>Tritama Decorindo Stiker — Kaca Film, Sandblast, Wallpaper & Interior Sejak 2009</title>
				<meta
					name="description"
					content="Tritama Decorindo Stiker menyediakan material & jasa pemasangan Kaca Film Riben/Sparta/One Way, Sandblast Cutting Logo, Wallpaper 3D, Roller Blinds, Huruf Timbul LED, dan Gorden di Jabodetabek."
				/>
				<meta
					name="keywords"
					content="kaca film bekasi, kaca film jakarta, sandblast cutting logo kantor, pasang wallpaper 3d, roller blinds blackout, huruf timbul akrilik, vertical blinds, tritama decorindo stiker"
				/>
				<meta property="og:title" content="Tritama Decorindo Stiker — Ahli Kaca Film & Dekorasi Interior" />
				<meta
					property="og:description"
					content="Solusi dekorasi, branding visual, interior dan eksterior terpercaya sejak 2009. Pemasangan rapi, presisi, harga kompetitif, dan konsultasi gratis."
				/>
				<meta property="og:image" content="/images/products/kaca-film-sparta.webp" />
				<meta name="twitter:title" content="Tritama Decorindo Stiker — Kaca Film & Interior" />
				<meta
					name="twitter:description"
					content="Penyedia material dan jasa pasang Kaca Film, Sandblast, Wallpaper, Blinds, dan Signage di Jabodetabek."
				/>
				<meta name="twitter:image" content="/images/products/kaca-film-sparta.webp" />
			</Head>

			<main className="pb-16">
				{/* 1. Hero */}
				<HeroSection />

				{/* 2. Kategori Produk */}
				<CategoryCards categories={categories} />

				{/* 3. Featured Showcase */}
				<FeaturedCollection products={featuredProducts} />

				{/* 4. Product & Price Grid */}
				<ProductGrid products={featuredProducts} limit={8} />

				{/* 5. 7 Keunggulan Layanan */}
				<SustainableBanner />

				{/* 6. Profil Perusahaan & Sektor Layanan */}
				<AboutSection />

				{/* 7. Area Layanan & Tips Edukasi */}
				<JournalSection />

				{/* 8. Form Konsultasi & Survey Lokasi Gratis */}
				<NewsletterSection />
			</main>
		</StorefrontLayout>
	);
}
