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
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
				<div>
					<p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-3">— Koleksi Kami</p>
					<h2 className="yns-display text-4xl sm:text-5xl text-foreground leading-[1.02]">
						Pilihan Terkini
					</h2>
				</div>
				<Link
					href={route('products.index')}
					className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
				>
					Lihat semua produk
					<ArrowUpRight className="h-4 w-4" />
				</Link>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
				{displayProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}
