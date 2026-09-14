import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
	products: (Product & { lowest_price_formatted?: string })[];
	limit?: number;
}

export default function ProductGrid({ products, limit = 8 }: ProductGridProps) {
	const displayProducts = products.slice(0, limit);

	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
				<div>
					<span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#111FA2]/15 bg-[#111FA2]/5 px-3.5 py-1 text-[11px] sm:text-xs font-extrabold tracking-[0.15em] uppercase text-[#111FA2] mb-3 shadow-xs">
						— Katalog Material & Jasa
					</span>
					<h2 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight">
						Daftar Produk & Biaya
					</h2>
				</div>
				<Link
					href={route('products.index')}
					className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111FA2] hover:text-[#5478FF] hover:underline"
				>
					<span>Lihat Semua Produk</span>
					<ArrowUpRight className="h-4 w-4" />
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{displayProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}
