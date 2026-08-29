import AboutSection from '@/Components/Storefront/AboutSection';
import CategoryCards from '@/Components/Storefront/CategoryCards';
import FeaturedCollection from '@/Components/Storefront/FeaturedCollection';
import HeroSection from '@/Components/Storefront/HeroSection';
import HomeGallerySection from '@/Components/Storefront/HomeGallerySection';
import NewsletterSection from '@/Components/Storefront/NewsletterSection';
import ProductGrid from '@/Components/Storefront/ProductGrid';
import SustainableBanner from '@/Components/Storefront/SustainableBanner';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import type { Category, Product } from '@/types';

interface GalleryItem {
	id: number;
	title: string;
	category: string;
	category_label?: string;
	image: string;
	caption?: string;
	description?: string;
}

interface HomeProps {
	categories: Category[];
	featuredProducts: (Product & { lowest_price_formatted?: string })[];
	featuredGalleries?: GalleryItem[];
}

export default function Home({ categories, featuredProducts, featuredGalleries = [] }: HomeProps) {
	return (
		<StorefrontLayout>
			<Head>
				<title>Tritama Decorindo Stiker — Ahli Kaca Film, Sandblast, Wallpaper & Interior Bekasi & Jabodetabek Sejak 2009</title>
				<meta
					name="description"
					content="Penyedia material & jasa pasang Kaca Film Gedung/Rumah (Riben, Sparta, One Way), Sandblast Cutting Logo, Wallpaper 3D, Roller Blinds, Huruf Timbul LED, dan Gorden di Bekasi, Cikarang, Tambun & seluruh Jabodetabek. Pemasangan rapi & bergaransi sejak 2009."
				/>
				<meta
					name="keywords"
					content="kaca film bekasi, pasang kaca film bekasi, kaca film gedung bekasi, kaca film rumah bekasi, sandblast bekasi, sandblast cutting logo bekasi, pasang wallpaper bekasi, wallpaper 3d dinding bekasi, roller blind bekasi, vertical blinds bekasi, huruf timbul akrilik bekasi, gorden bekasi, kaca film cikarang, kaca film tambun, kaca film jakarta, kaca film jabodetabek, tritama decorindo stiker"
				/>
				<meta property="og:title" content="Tritama Decorindo Stiker — Ahli Kaca Film, Sandblast & Interior Bekasi" />
				<meta
					property="og:description"
					content="Solusi dekorasi, kaca film tolak panas, branding visual kantor, interior & eksterior gedung di Bekasi dan Jabodetabek sejak 2009. Pengerjaan rapi, presisi & konsultasi gratis."
				/>
				<meta property="og:image" content="/images/products/kaca-film-sparta.webp" />
				<meta name="twitter:title" content="Tritama Decorindo Stiker — Ahli Kaca Film & Interior Bekasi" />
				<meta
					name="twitter:description"
					content="Spesialis Kaca Film, Sandblast Cutting, Wallpaper 3D, Roller Blinds, dan Huruf Timbul LED di Bekasi & Jabodetabek."
				/>
				<meta name="twitter:image" content="/images/products/kaca-film-sparta.webp" />
			</Head>

			<div className="pb-8">
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

				{/* 7. Area Layanan & Dokumentasi Galeri Proyek */}
				<HomeGallerySection galleries={featuredGalleries} />

				{/* 8. Form Konsultasi & Survey Lokasi Gratis */}
				<NewsletterSection />
			</div>
		</StorefrontLayout>
	);
}
