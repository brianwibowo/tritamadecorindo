import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
	ArrowRight,
	CreditCard,
	Package,
	ShoppingBag,
	Tag,
	TrendingUp
} from 'lucide-react';

interface DashboardStats {
	totalProducts: number;
	totalCategories: number;
	totalOrders: number;
	totalRevenue: number;
	totalRevenueFormatted: string;
}

interface RecentOrder {
	id: string;
	buyer?: { name: string; email: string };
	total_amount: number;
	total_amount_formatted: string;
	payment_status: string;
	created_at: string;
}

interface Props {
	stats: DashboardStats;
	recentOrders: RecentOrder[];
}

const statCards = [
	{
		key: 'totalProducts' as const,
		label: 'Total Produk',
		icon: Package,
		color: 'bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20',
	},
	{
		key: 'totalCategories' as const,
		label: 'Kategori',
		icon: Tag,
		color: 'bg-purple-500/10 text-purple-700 ring-1 ring-purple-500/20',
	},
	{
		key: 'totalOrders' as const,
		label: 'Pesanan',
		icon: ShoppingBag,
		color: 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20',
	},
];

const statusColors: Record<string, { label: string; class: string }> = {
	unpaid: { label: 'Belum Bayar', class: 'bg-gray-100 text-gray-700' },
	pending: { label: 'Menunggu', class: 'bg-yellow-100 text-yellow-800' },
	pending_payment: { label: 'Menunggu Bayar', class: 'bg-yellow-100 text-yellow-800' },
	paid: { label: 'Lunas', class: 'bg-emerald-100 text-emerald-800' },
	processing: { label: 'Diproses', class: 'bg-blue-100 text-blue-800' },
	shipped: { label: 'Dikirim', class: 'bg-indigo-100 text-indigo-800' },
	delivered: { label: 'Terkirim', class: 'bg-teal-100 text-teal-800' },
	completed: { label: 'Selesai', class: 'bg-emerald-100 text-emerald-800' },
	cancelled: { label: 'Dibatalkan', class: 'bg-red-100 text-red-800' },
	refunded: { label: 'Dikembalikan', class: 'bg-orange-100 text-orange-800' },
};

export default function Dashboard({ stats, recentOrders }: Props) {
	return (
		<AdminLayout header="Dashboard Ringkasan">
			<Head title="Admin Dashboard — LFM Global Jayatama" />

			{/* Stats Grid with Sharp Lucide SVG Icons */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{statCards.map((card) => {
					const Icon = card.icon;
					return (
						<div
							key={card.key}
							className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm transition-all hover:shadow-md"
						>
							<div className="flex items-center gap-4">
								<div
									className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.color}`}
								>
									<Icon className="h-6 w-6" />
								</div>
								<div>
									<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
										{card.label}
									</p>
									<p className="font-display text-2xl font-bold text-foreground mt-0.5">
										{stats[card.key]}
									</p>
								</div>
							</div>
						</div>
					);
				})}

				{/* Revenue card */}
				<div className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-800 ring-1 ring-amber-500/20">
							<TrendingUp className="h-6 w-6" />
						</div>
						<div>
							<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Total Revenue
							</p>
							<p className="font-display text-xl font-bold text-[#80070A] mt-0.5">
								{stats.totalRevenueFormatted}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Orders Section */}
			<div className="mt-10">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="font-display text-xl font-bold text-foreground">
							Pesanan Ekspor Terbaru
						</h2>
						<p className="text-xs text-muted-foreground">
							Purchase order komoditas rempah terkini dari buyer dan mitra.
						</p>
					</div>
					<Link
						href="/admin/orders"
						className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-foreground hover:bg-border transition-colors shadow-sm"
					>
						<span>Lihat Semua Pesanan</span>
						<ArrowRight className="h-3.5 w-3.5" />
					</Link>
				</div>

				<div className="mt-5 overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					{recentOrders.length === 0 ? (
						<div className="p-12 text-center text-xs text-muted-foreground">
							Belum ada purchase order atau pesanan masuk.
						</div>
					) : (
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-6 py-4">No. Order</th>
									<th className="px-6 py-4">Pembeli / Klien</th>
									<th className="px-6 py-4">Total Nilai</th>
									<th className="px-6 py-4">Status</th>
									<th className="px-6 py-4 text-right">Tanggal</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{recentOrders.map((order) => {
									const statusMeta = statusColors[order.payment_status] || {
										label: order.payment_status,
										class: 'bg-gray-100 text-gray-700',
									};
									return (
										<tr key={order.id} className="hover:bg-secondary/30 transition-colors">
											<td className="px-6 py-4 font-mono font-bold text-foreground">
												#{order.id.slice(0, 8).toUpperCase()}
											</td>
											<td className="px-6 py-4 font-medium text-foreground">
												{order.buyer?.name ?? 'Klien Langsung'}
											</td>
											<td className="px-6 py-4 font-bold text-[#80070A]">
												{order.total_amount_formatted}
											</td>
											<td className="px-6 py-4">
												<span
													className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusMeta.class}`}
												>
													{statusMeta.label}
												</span>
											</td>
											<td className="px-6 py-4 text-right text-muted-foreground">
												{new Date(order.created_at).toLocaleDateString('id-ID', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												})}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</AdminLayout>
	);
}
