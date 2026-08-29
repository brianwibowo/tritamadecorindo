import AdminLayout from '@/Layouts/AdminLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	CheckCircle2,
	Clock,
	Eye,
	Pencil,
	ShoppingBag,
	X,
	XCircle
} from 'lucide-react';
import { useState } from 'react';
import type { Order, PaginatedData, User } from '@/types';

interface OrderItemFormatted {
	id: string;
	variant_name: string;
	price: number;
	quantity: number;
	price_formatted: string;
	subtotal_formatted: string;
}

interface OrderWithDetails extends Omit<Order, 'buyer' | 'items'> {
	total_amount_formatted?: string;
	items?: OrderItemFormatted[];
	buyer?: {
		id?: number;
		name: string;
		email: string;
		phone?: string;
	} | null;
}

interface Props {
	orders: PaginatedData<OrderWithDetails>;
}

export default function OrdersIndex({ orders }: Props) {
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [statusModalOpen, setStatusModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);

	const statusForm = useForm({
		payment_status: 'pending',
		_method: 'PUT',
	});

	const openViewModal = (order: OrderWithDetails) => {
		setSelectedOrder(order);
		setViewModalOpen(true);
	};

	const openStatusModal = (order: OrderWithDetails) => {
		setSelectedOrder(order);
		statusForm.setData({
			payment_status: order.payment_status || 'pending',
			_method: 'PUT',
		});
		setStatusModalOpen(true);
	};

	const handleStatusSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedOrder) return;
		statusForm.post(route('admin.orders.update', selectedOrder.id), {
			onSuccess: () => {
				setStatusModalOpen(false);
			},
		});
	};

	const getStatusBadge = (status: string) => {
		if (status === 'paid' || status === 'completed') {
			return (
				<span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 ring-1 ring-emerald-500/20">
					<CheckCircle2 className="h-3 w-3" />
					Lunas / Selesai
				</span>
			);
		}
		if (status === 'pending') {
			return (
				<span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 ring-1 ring-amber-500/20">
					<Clock className="h-3 w-3" />
					Menunggu Konfirmasi
				</span>
			);
		}
		return (
			<span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-bold text-red-800 ring-1 ring-red-500/20">
				<XCircle className="h-3 w-3" />
				Dibatalkan
			</span>
		);
	};

	return (
		<AdminLayout header="Pesanan & Purchase Order">
			<Head title="Pesanan & PO — Panel Admin LFM" />

			<div className="space-y-6">
				{/* Top Controls Toolbar */}
				<div className="bg-white p-5 rounded-3xl border border-border/60 shadow-sm flex items-center justify-between">
					<div>
						<h2 className="font-display text-lg font-bold text-foreground">Daftar Pesanan Ekspor</h2>
						<p className="text-xs text-muted-foreground">Kelola purchase order dan status pesanan komoditas rempah.</p>
					</div>
				</div>

				{/* Orders Table Card */}
				<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-6 py-4">No. Order</th>
									<th className="px-6 py-4">Pembeli / Klien</th>
									<th className="px-6 py-4">Total Tagihan</th>
									<th className="px-6 py-4">Status Pembayaran</th>
									<th className="px-6 py-4">Tanggal Pesan</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{orders.data.length === 0 ? (
									<tr>
										<td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
											Belum ada data pesanan masuk.
										</td>
									</tr>
								) : (
									orders.data.map((order) => (
										<tr key={order.id} className="hover:bg-secondary/30 transition-colors">
											<td className="px-6 py-4 font-mono font-bold text-foreground">
												<div className="flex items-center gap-2.5">
													<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#80070A]/10 text-[#80070A]">
														<ShoppingBag className="h-4 w-4" />
													</div>
													<span>#{order.id.slice(-8).toUpperCase()}</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<p className="font-bold text-foreground">{order.buyer?.name || 'Klien Langsung'}</p>
												<p className="text-[11px] text-muted-foreground">{order.buyer?.email || '-'}</p>
											</td>
											<td className="px-6 py-4 font-bold text-[#80070A]">
												{order.total_amount_formatted}
											</td>
											<td className="px-6 py-4">
												{getStatusBadge(order.payment_status)}
											</td>
											<td className="px-6 py-4 text-muted-foreground">
												{new Date(order.created_at).toLocaleDateString('id-ID', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												})}
											</td>
											<td className="px-6 py-4 text-right">
												<div className="inline-flex items-center gap-1.5">
													<button
														type="button"
														onClick={() => openViewModal(order)}
														className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
														title="Lihat Detail Pesanan"
													>
														<Eye className="h-4 w-4" />
													</button>
													<button
														type="button"
														onClick={() => openStatusModal(order)}
														className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
														title="Ubah Status"
													>
														<Pencil className="h-4 w-4" />
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination Footer - Always Visible */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 px-6 py-4 bg-[#FAF7F5]/50">
						<p className="text-xs text-muted-foreground">
							Menampilkan <strong className="text-foreground">{orders.from || 0}</strong>–<strong className="text-foreground">{orders.to || 0}</strong> dari <strong className="text-foreground">{orders.total}</strong> pesanan
						</p>
						<div className="flex items-center gap-1.5">
							{orders.links.map((link, idx) => (
								<Link
									key={idx}
									href={link.url || '#'}
									preserveScroll
									className={cn(
										'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
										link.active
											? 'bg-[#80070A] text-white shadow-sm'
											: link.url
											? 'bg-white text-foreground border border-border hover:bg-secondary'
											: 'text-muted-foreground/40 cursor-not-allowed bg-transparent'
									)}
									dangerouslySetInnerHTML={{ __html: link.label }}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* 1. Modal Detail Pesanan */}
			{viewModalOpen && selectedOrder && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 space-y-6">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex items-center justify-between border-b border-border/60 pb-4">
							<div>
								<h3 className="font-display text-lg font-bold text-foreground">
									Detail Pesanan #{selectedOrder.id.slice(-8).toUpperCase()}
								</h3>
								<p className="text-xs text-muted-foreground">
									{new Date(selectedOrder.created_at).toLocaleString('id-ID')}
								</p>
							</div>
							<div>{getStatusBadge(selectedOrder.payment_status)}</div>
						</div>

						{/* Buyer info */}
						<div className="bg-secondary/40 p-3.5 rounded-2xl space-y-1 text-xs">
							<p className="font-bold text-foreground">{selectedOrder.buyer?.name || 'Klien Langsung'}</p>
							<p className="text-muted-foreground">{selectedOrder.buyer?.email || '-'}</p>
							{selectedOrder.buyer?.phone && (
								<p className="text-muted-foreground">{selectedOrder.buyer.phone}</p>
							)}
						</div>

						{/* Items list */}
						<div>
							<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-2">
								Item Rempah Dipesan
							</h5>
							<div className="divide-y divide-border/40 border border-border/60 rounded-2xl overflow-hidden text-xs">
								{selectedOrder.items?.map((item) => (
									<div key={item.id} className="p-3 flex justify-between items-center bg-white">
										<div>
											<p className="font-bold text-foreground">{item.variant_name}</p>
											<p className="text-[11px] text-muted-foreground">
												{item.quantity} x {item.price_formatted}
											</p>
										</div>
										<p className="font-bold text-[#80070A]">{item.subtotal_formatted}</p>
									</div>
								))}
							</div>
						</div>

						{/* Total */}
						<div className="flex justify-between items-center bg-secondary/60 p-4 rounded-2xl text-xs">
							<span className="font-bold uppercase tracking-wider text-foreground">Total Tagihan</span>
							<span className="font-display text-base font-bold text-[#80070A]">
								{selectedOrder.total_amount_formatted}
							</span>
						</div>

						<div className="flex justify-end pt-2">
							<button
								type="button"
								onClick={() => setViewModalOpen(false)}
								className="rounded-full bg-secondary px-6 py-2 text-xs font-bold text-foreground hover:bg-border"
							>
								Tutup
							</button>
						</div>
					</div>
				</div>
			)}

			{/* 2. Modal Ubah Status Pesanan */}
			{statusModalOpen && selectedOrder && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-5">
						<button
							onClick={() => setStatusModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div>
							<h3 className="font-display text-xl font-bold text-foreground">
								Ubah Status Pembayaran
							</h3>
							<p className="text-xs text-muted-foreground mt-0.5">
								Pesanan #{selectedOrder.id.slice(-8).toUpperCase()} ({selectedOrder.total_amount_formatted})
							</p>
						</div>

						<form onSubmit={handleStatusSubmit} className="space-y-4">
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Status Pembayaran</label>
								<select
									value={statusForm.data.payment_status}
									onChange={(e) => statusForm.setData('payment_status', e.target.value)}
									className="w-full h-11 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#80070A]"
								>
									<option value="pending">Menunggu Konfirmasi (Pending)</option>
									<option value="paid">Lunas (Paid)</option>
									<option value="failed">Gagal (Failed)</option>
									<option value="refunded">Dikembalikan (Refunded)</option>
									<option value="cancelled">Dibatalkan (Cancelled)</option>
								</select>
							</div>

							<div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
								<button
									type="button"
									onClick={() => setStatusModalOpen(false)}
									className="rounded-full border border-border px-5 py-2 text-xs font-bold hover:bg-secondary"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={statusForm.processing}
									className="rounded-full bg-[#80070A] px-6 py-2 text-xs font-bold text-white hover:brightness-110 disabled:opacity-60 shadow-md"
								>
									{statusForm.processing ? 'Menyimpan...' : 'Perbarui Status'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</AdminLayout>
	);
}
