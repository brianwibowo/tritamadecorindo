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
				<title>PT LFM Global Jayatama — Eksportir Rempah Pilihan Indonesia ke Pasar Global</title>
				<meta
					name="description"
					content="PT LFM Global Jayatama mengekspor komoditas rempah asli Indonesia: Cengkeh Maluku Grade AB6, Biji Pala Banda ABCD, Kayu Manis Kerinci, Vanilla Beans Planifolia, dan Lada Hitam Lampung standar mutu internasional."
				/>
				<meta
					name="keywords"
					content="eksportir rempah indonesia, cengkeh maluku ekspor, biji pala banda abcd, kayu manis kerinci korintje, vanilla beans gourmet planifolia, lada hitam lampung faq, supplier rempah indonesia, pt lfm global jayatama"
				/>
				<meta property="og:title" content="PT LFM Global Jayatama — Eksportir Rempah Pilihan Indonesia" />
				<meta
					property="og:description"
					content="Penyedia dan eksportir resmi komoditas rempah Nusantara standar ekspor global (FOB/CIF). Dapatkan spesifikasi CoA dan penawaran resmi."
				/>
				<meta property="og:image" content="/images/products/cengkeh-maluku.webp" />
				<meta name="twitter:title" content="PT LFM Global Jayatama — Eksportir Rempah Nusantara" />
				<meta
					name="twitter:description"
					content="Penyedia dan eksportir resmi komoditas rempah Nusantara standar ekspor global (FOB/CIF)."
				/>
				<meta name="twitter:image" content="/images/products/cengkeh-maluku.webp" />
			</Head>

			<main className="pb-20">
				{/* 1. Hero */}
				<HeroSection />

				{/* 2. Komoditas Kategori */}
				<CategoryCards categories={categories} />

				{/* 3. Featured Collection */}
				<FeaturedCollection products={featuredProducts} />

				{/* 4. Product Grid */}
				<ProductGrid products={featuredProducts} limit={8} />

				{/* 5. Komitmen Ekspor & Mutu */}
				<SustainableBanner />

				{/* 6. Profil Perusahaan */}
				<AboutSection />

				{/* 7. Artikel & Edukasi Rempah */}
				<JournalSection />

				{/* 8. B2B Inquiry Form */}
				<NewsletterSection />
			</main>
		</StorefrontLayout>
	);
}
