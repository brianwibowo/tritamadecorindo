import AdminLayout from '@/Layouts/AdminLayout';
import { cn, formatMoney, slugify } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	CheckCircle2,
	Eye,
	Layers,
	Loader2,
	Lock,
	Package,
	Pencil,
	Plus,
	RotateCcw,
	Search,
	Trash2,
	X,
	XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Category, PaginatedData, Product, Variant } from '@/types';

interface ProductWithMeta extends Product {
	lowest_price_formatted?: string;
	total_stock?: number;
}

interface Props {
	products: PaginatedData<ProductWithMeta>;
	categories: Array<{ id: string; name: string }>;
	filters: {
		search?: string;
		category?: string;
	};
}

export default function ProductsIndex({ products, categories, filters }: Props) {
	const [search, setSearch] = useState(filters.search || '');
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<ProductWithMeta | null>(null);

	// Slug availability state
	const [slugStatus, setSlugStatus] = useState<{
		loading: boolean;
		checked: boolean;
		available: boolean;
		slug: string;
	}>({
		loading: false,
		checked: false,
		available: true,
		slug: '',
	});

	// Create Form
	const createForm = useForm<{
		name: string;
		category_id: string;
		slug: string;
		summary: string;
		description: string;
		active: boolean;
		show_price: boolean;
		images: string[];
		variants: Array<{ name: string; price: number; stock: number }>;
	}>({
		name: '',
		category_id: categories[0]?.id || '',
		slug: '',
		summary: '',
		description: '',
		active: true,
		show_price: true,
		images: ['/images/products/cengkeh-maluku.webp'],
		variants: [
			{ name: 'Kemasan Karung 25 Kg', price: 2500000, stock: 50 },
			{ name: 'Kemasan Sampel 1 Kg', price: 120000, stock: 100 },
		],
	});

	// Edit Form
	const editForm = useForm<{
		name: string;
		category_id: string;
		slug: string;
		summary: string;
		description: string;
		active: boolean;
		show_price: boolean;
		images: string[];
		variants: Array<{ name: string; price: number; stock: number }>;
		_method: string;
	}>({
		name: '',
		category_id: '',
		slug: '',
		summary: '',
		description: '',
		active: true,
		show_price: true,
		images: [],
		variants: [],
		_method: 'PUT',
	});

	// Check slug availability via API
	const checkSlugAvailability = async (slugToCheck: string, productId?: string) => {
		if (!slugToCheck) {
			setSlugStatus({ loading: false, checked: false, available: true, slug: '' });
			return;
		}

		setSlugStatus((prev) => ({ ...prev, loading: true, slug: slugToCheck }));

		try {
			const query = new URLSearchParams({ slug: slugToCheck });
			if (productId) query.append('id', productId);

			const res = await fetch(`${route('admin.products.check-slug')}?${query.toString()}`);
			const data = await res.json();

			setSlugStatus({
				loading: false,
				checked: true,
				available: Boolean(data.available),
				slug: slugToCheck,
			});
		} catch (e) {
			setSlugStatus({
				loading: false,
				checked: true,
				available: true,
				slug: slugToCheck,
			});
		}
	};

	// Auto-generate slug when name changes & verify availability
	const handleNameChange = (name: string, isEdit = false) => {
		const generatedSlug = slugify(name);

		if (isEdit) {
			editForm.setData((prev) => ({ ...prev, name, slug: generatedSlug }));
			checkSlugAvailability(generatedSlug, selectedProduct?.id);
		} else {
			createForm.setData((prev) => ({ ...prev, name, slug: generatedSlug }));
			checkSlugAvailability(generatedSlug);
		}
	};

	const openEditModal = (prod: ProductWithMeta) => {
		setSelectedProduct(prod);
		editForm.setData({
			name: prod.name,
			category_id: prod.category_id,
			slug: prod.slug,
			summary: prod.summary || '',
			description: prod.description || '',
			active: Boolean(prod.active),
			show_price: prod.show_price !== false,
			images: prod.images || [],
			variants: prod.variants?.map((v) => ({
				name: v.name || 'Kemasan Standar',
				price: v.price,
				stock: v.stock,
			})) || [{ name: 'Kemasan Standar', price: 100000, stock: 10 }],
			_method: 'PUT',
		});
		setSlugStatus({ loading: false, checked: true, available: true, slug: prod.slug });
		setEditModalOpen(true);
	};

	const openViewModal = (prod: ProductWithMeta) => {
		setSelectedProduct(prod);
		setViewModalOpen(true);
	};

	const openDeleteModal = (prod: ProductWithMeta) => {
		setSelectedProduct(prod);
		setDeleteModalOpen(true);
	};

	// Quick Toggle Price Display
	const handleTogglePrice = (product: ProductWithMeta) => {
		router.patch(
			route('admin.products.toggle-price', product.id),
			{},
			{ preserveScroll: true }
		);
	};

	const handleCreateSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createForm.post(route('admin.products.store'), {
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
			},
		});
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedProduct) return;
		editForm.post(route('admin.products.update', selectedProduct.id), {
			onSuccess: () => {
				setEditModalOpen(false);
				editForm.reset();
			},
		});
	};

	const handleDeleteSubmit = () => {
		if (!selectedProduct) return;
		router.delete(route('admin.products.destroy', selectedProduct.id), {
			onSuccess: () => {
				setDeleteModalOpen(false);
				setSelectedProduct(null);
			},
		});
	};

	// Variant helpers for create form
	const addCreateVariant = () => {
		createForm.setData('variants', [
			...createForm.data.variants,
			{ name: 'Varian Baru', price: 100000, stock: 10 },
		]);
	};

	const removeCreateVariant = (index: number) => {
		createForm.setData(
			'variants',
			createForm.data.variants.filter((_, idx) => idx !== index)
		);
	};

	// Variant helpers for edit form
	const addEditVariant = () => {
		editForm.setData('variants', [
			...editForm.data.variants,
			{ name: 'Varian Baru', price: 100000, stock: 10 },
		]);
	};

	const removeEditVariant = (index: number) => {
		editForm.setData(
			'variants',
			editForm.data.variants.filter((_, idx) => idx !== index)
		);
	};

	return (
		<AdminLayout header="Katalog Produk Rempah">
			<Head title="Katalog Produk — Panel Admin LFM" />

			<div className="space-y-6">
				{/* Top Toolbar */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border/60 shadow-sm">
					{/* Search & Category Filter */}
					<div className="flex flex-wrap items-center gap-3 flex-1">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								router.get(route('admin.products.index'), { ...filters, search }, { preserveState: true });
							}}
							className="relative flex-1 sm:max-w-xs"
						>
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari nama produk..."
								className="w-full h-10 rounded-xl border border-border bg-[#FDFBF9] pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-[#80070A]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</form>

						<select
							value={filters.category || ''}
							onChange={(e) =>
								router.get(
									route('admin.products.index'),
									{ ...filters, category: e.target.value },
									{ preserveState: true }
								)
							}
							className="h-10 rounded-xl border border-border bg-[#FDFBF9] px-3 text-xs font-semibold text-foreground focus:border-[#80070A]"
						>
							<option value="">Semua Kategori</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>

						{(filters.search || filters.category) && (
							<button
								onClick={() => router.get(route('admin.products.index'))}
								className="inline-flex items-center gap-1 text-xs text-[#80070A] hover:underline"
							>
								<RotateCcw className="h-3 w-3" />
								Reset
							</button>
						)}
					</div>

					<button
						type="button"
						onClick={() => {
							createForm.reset();
							setSlugStatus({ loading: false, checked: false, available: true, slug: '' });
							setCreateModalOpen(true);
						}}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#80070A] px-5 py-2.5 text-xs font-bold text-white hover:brightness-110 transition-all shadow-md active:scale-95 whitespace-nowrap"
					>
						<Plus className="h-4 w-4" />
						<span>Tambah Komoditas</span>
					</button>
				</div>

				{/* Products Table Card */}
				<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-6 py-4">Komoditas & Foto</th>
									<th className="px-6 py-4">Kategori</th>
									<th className="px-6 py-4">Harga Mulai (Rp)</th>
									<th className="px-6 py-4">Tampilan Harga & Slide Switch</th>
									<th className="px-6 py-4">Stok Lot</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{products.data.length === 0 ? (
									<tr>
										<td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
											Tidak ada komoditas rempah yang ditemukan.
										</td>
									</tr>
								) : (
									products.data.map((product) => {
										const isPriceActive = product.show_price !== false;
										return (
											<tr key={product.id} className="hover:bg-secondary/30 transition-colors">
												{/* Photo & Name */}
												<td className="px-6 py-4">
													<div className="flex items-center gap-3.5">
														<div className="h-12 w-12 overflow-hidden rounded-xl bg-secondary shrink-0 border border-border/60 shadow-sm">
															<img
																src={product.images?.[0] || '/images/products/cengkeh-maluku.webp'}
																alt={product.name}
																className="h-full w-full object-cover"
															/>
														</div>
														<div>
															<p className="font-bold text-foreground line-clamp-1">{product.name}</p>
															<p className="text-[11px] text-muted-foreground font-mono">
																/{product.slug}
															</p>
														</div>
													</div>
												</td>

												{/* Category */}
												<td className="px-6 py-4 font-semibold text-foreground">
													{product.category?.name || '-'}
												</td>

												{/* Lowest Price */}
												<td className="px-6 py-4 font-bold text-[#80070A]">
													{product.lowest_price_formatted || '-'}
												</td>

												{/* Tampilan Harga (Slide Switch) */}
												<td className="px-6 py-4">
													<div className="flex items-center gap-2.5">
														<button
															type="button"
															onClick={() => handleTogglePrice(product)}
															className={cn(
																'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner',
																isPriceActive ? 'bg-[#80070A]' : 'bg-gray-300'
															)}
															title={isPriceActive ? 'Klik untuk Sembunyikan Harga (Mode Negosiasi/RFQ)' : 'Klik untuk Tampilkan Harga Resmi'}
														>
															<span
																className={cn(
																	'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
																	isPriceActive ? 'translate-x-5' : 'translate-x-0'
																)}
															/>
														</button>
														<span
															className={cn(
																'text-[11px] font-bold',
																isPriceActive ? 'text-emerald-700' : 'text-amber-800'
															)}
														>
															{isPriceActive ? 'Harga Tampil (Rp)' : 'Sembunyi / Nego'}
														</span>
													</div>
												</td>

												{/* Stock */}
												<td className="px-6 py-4 font-medium text-foreground">
													{product.total_stock ?? 0} Lot
												</td>

												{/* Actions */}
												<td className="px-6 py-4 text-right">
													<div className="inline-flex items-center gap-1.5">
														<button
															type="button"
															onClick={() => openViewModal(product)}
															className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
															title="Lihat Detail"
														>
															<Eye className="h-4 w-4" />
														</button>
														<button
															type="button"
															onClick={() => openEditModal(product)}
															className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
															title="Edit Produk"
														>
															<Pencil className="h-4 w-4" />
														</button>
														<button
															type="button"
															onClick={() => openDeleteModal(product)}
															className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors"
															title="Hapus Produk"
														>
															<Trash2 className="h-4 w-4" />
														</button>
													</div>
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination Footer - Always Visible */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 px-6 py-4 bg-[#FAF7F5]/50">
						<p className="text-xs text-muted-foreground">
							Menampilkan <strong className="text-foreground">{products.from || 0}</strong>–<strong className="text-foreground">{products.to || 0}</strong> dari <strong className="text-foreground">{products.total}</strong> komoditas produk
						</p>
						<div className="flex items-center gap-1.5">
							{products.links.map((link, idx) => (
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

			{/* 1. Modal Tambah Komoditas Produk */}
			{createModalOpen && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-2xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 max-h-[90vh] overflow-y-auto">
						<button
							onClick={() => setCreateModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="font-display text-xl font-bold text-foreground">Tambah Komoditas Rempah Baru</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Lengkapi data komoditas, URL slug otomatis, dan spesifikasi kemasan.</p>
						</div>

						<form onSubmit={handleCreateSubmit} className="mt-5 space-y-4">
							{/* Name & Auto-Generated Read-Only Slug */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Nama Komoditas <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										value={createForm.data.name}
										onChange={(e) => handleNameChange(e.target.value, false)}
										required
										placeholder="Contoh: Cengkeh Maluku Super"
										className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#80070A]"
									/>
									{createForm.errors.name && <p className="mt-1 text-xs text-red-600">{createForm.errors.name}</p>}
								</div>

								{/* Read-Only Slug URL with Live Availability Checker */}
								<div>
									<div className="flex items-center justify-between mb-1">
										<label className="block text-xs font-bold uppercase tracking-wider">
											Slug URL <span className="text-muted-foreground font-normal">(Otomatis)</span>
										</label>
										{createForm.data.slug && (
											<div className="flex items-center gap-1">
												{slugStatus.loading ? (
													<span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
														<Loader2 className="h-3 w-3 animate-spin" /> Memeriksa...
													</span>
												) : slugStatus.checked && slugStatus.available ? (
													<span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
														<CheckCircle2 className="h-3 w-3" /> Tersedia
													</span>
												) : slugStatus.checked && !slugStatus.available ? (
													<span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
														<XCircle className="h-3 w-3" /> Sudah Ada
													</span>
												) : null}
											</div>
										)}
									</div>
									<div className="relative">
										<input
											type="text"
											value={createForm.data.slug}
											readOnly
											tabIndex={-1}
											placeholder="otomatis-mengikuti-nama-produk"
											className="w-full h-10 rounded-xl border border-border/80 bg-[#F4EFEA]/80 pl-8 pr-3 text-xs font-mono text-muted-foreground cursor-not-allowed select-none"
										/>
										<Lock className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground/70" />
									</div>
									<p className="mt-1 text-[10px] text-muted-foreground">
										Slug URL dibuat otomatis dari nama produk dan dilindungi dari perubahan manual agar tautan etalase selalu valid.
									</p>
									{createForm.errors.slug && <p className="mt-1 text-xs text-red-600">{createForm.errors.slug}</p>}
								</div>
							</div>

							{/* Category & Status */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Kategori Komoditas <span className="text-red-500">*</span>
									</label>
									<select
										value={createForm.data.category_id}
										onChange={(e) => createForm.setData('category_id', e.target.value)}
										required
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#80070A]"
									>
										{categories.map((c) => (
											<option key={c.id} value={c.id}>
												{c.name}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Tampilan Harga di Toko
									</label>
									<div className="flex items-center gap-2 h-10 px-3 bg-[#FDFBF9] border border-border rounded-xl">
										<input
											type="checkbox"
											id="create_show_price"
											checked={createForm.data.show_price}
											onChange={(e) => createForm.setData('show_price', e.target.checked)}
											className="h-4 w-4 rounded text-[#80070A] focus:ring-[#80070A]"
										/>
										<label htmlFor="create_show_price" className="text-xs font-semibold text-foreground cursor-pointer">
											Tampilkan Nominal Harga (Aktif)
										</label>
									</div>
								</div>
							</div>

							{/* Summary */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Ringkasan Singkat</label>
								<input
									type="text"
									value={createForm.data.summary}
									onChange={(e) => createForm.setData('summary', e.target.value)}
									placeholder="Contoh: Cengkeh kualitas ekspor grade AB6 dari kepulauan Maluku dengan kadar air < 12%."
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#80070A]"
								/>
							</div>

							{/* Description */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Deskripsi Lengkap & Spesifikasi</label>
								<textarea
									value={createForm.data.description}
									onChange={(e) => createForm.setData('description', e.target.value)}
									rows={3}
									placeholder="Tuliskan spesifikasi teknis, kadar minyak atsiri, standar kemasan, dan dokumen mutu..."
									className="w-full rounded-xl border border-border bg-white p-3 text-xs text-foreground focus:border-[#80070A]"
								/>
							</div>

							{/* Variants */}
							<div className="space-y-3 pt-2 border-t border-border/60">
								<div className="flex items-center justify-between">
									<label className="block text-xs font-bold uppercase tracking-wider">
										Varian Kemasan & Harga
									</label>
									<button
										type="button"
										onClick={addCreateVariant}
										className="inline-flex items-center gap-1 text-xs font-bold text-[#80070A] hover:underline"
									>
										<Plus className="h-3.5 w-3.5" />
										Tambah Varian
									</button>
								</div>

								{createForm.data.variants.map((v, idx) => (
									<div key={idx} className="flex items-center gap-3 bg-[#FAF7F5] p-3 rounded-2xl border border-border/60">
										<div className="flex-1">
											<input
												type="text"
												value={v.name}
												onChange={(e) => {
													const newVariants = [...createForm.data.variants];
													newVariants[idx].name = e.target.value;
													createForm.setData('variants', newVariants);
												}}
												placeholder="Nama Kemasan (mis: Karung 25 Kg)"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
											/>
										</div>
										<div className="w-36">
											<input
												type="number"
												value={v.price}
												onChange={(e) => {
													const newVariants = [...createForm.data.variants];
													newVariants[idx].price = parseInt(e.target.value) || 0;
													createForm.setData('variants', newVariants);
												}}
												placeholder="Harga (Rp)"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground font-semibold"
											/>
										</div>
										<div className="w-24">
											<input
												type="number"
												value={v.stock}
												onChange={(e) => {
													const newVariants = [...createForm.data.variants];
													newVariants[idx].stock = parseInt(e.target.value) || 0;
													createForm.setData('variants', newVariants);
												}}
												placeholder="Stok Lot"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
											/>
										</div>
										{createForm.data.variants.length > 1 && (
											<button
												type="button"
												onClick={() => removeCreateVariant(idx)}
												className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										)}
									</div>
								))}
							</div>

							{/* Actions */}
							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
								<button
									type="button"
									onClick={() => setCreateModalOpen(false)}
									className="rounded-full border border-border px-5 py-2 text-xs font-bold hover:bg-secondary"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={createForm.processing}
									className="rounded-full bg-[#80070A] px-6 py-2 text-xs font-bold text-white hover:brightness-110 disabled:opacity-60 shadow-md"
								>
									{createForm.processing ? 'Menyimpan...' : 'Simpan Komoditas'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 2. Modal Edit Komoditas Produk */}
			{editModalOpen && selectedProduct && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-2xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 max-h-[90vh] overflow-y-auto">
						<button
							onClick={() => setEditModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="font-display text-xl font-bold text-foreground">Edit Komoditas Rempah</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Perbarui informasi komoditas, slug URL otomatis, atau varian kemasan.</p>
						</div>

						<form onSubmit={handleEditSubmit} className="mt-5 space-y-4">
							{/* Name & Auto-Generated Read-Only Slug */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Nama Komoditas <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										value={editForm.data.name}
										onChange={(e) => handleNameChange(e.target.value, true)}
										required
										className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#80070A]"
									/>
									{editForm.errors.name && <p className="mt-1 text-xs text-red-600">{editForm.errors.name}</p>}
								</div>

								{/* Read-Only Slug URL with Live Availability Checker */}
								<div>
									<div className="flex items-center justify-between mb-1">
										<label className="block text-xs font-bold uppercase tracking-wider">
											Slug URL <span className="text-muted-foreground font-normal">(Otomatis)</span>
										</label>
										{editForm.data.slug && (
											<div className="flex items-center gap-1">
												{slugStatus.loading ? (
													<span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
														<Loader2 className="h-3 w-3 animate-spin" /> Memeriksa...
													</span>
												) : slugStatus.checked && slugStatus.available ? (
													<span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
														<CheckCircle2 className="h-3 w-3" /> Tersedia
													</span>
												) : slugStatus.checked && !slugStatus.available ? (
													<span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
														<XCircle className="h-3 w-3" /> Sudah Ada
													</span>
												) : null}
											</div>
										)}
									</div>
									<div className="relative">
										<input
											type="text"
											value={editForm.data.slug}
											readOnly
											tabIndex={-1}
											className="w-full h-10 rounded-xl border border-border/80 bg-[#F4EFEA]/80 pl-8 pr-3 text-xs font-mono text-muted-foreground cursor-not-allowed select-none"
										/>
										<Lock className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground/70" />
									</div>
									<p className="mt-1 text-[10px] text-muted-foreground">
										Slug URL dibuat otomatis dari nama produk dan dilindungi dari perubahan manual agar tautan etalase selalu valid.
									</p>
									{editForm.errors.slug && <p className="mt-1 text-xs text-red-600">{editForm.errors.slug}</p>}
								</div>
							</div>

							{/* Category & Status */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Kategori Komoditas <span className="text-red-500">*</span>
									</label>
									<select
										value={editForm.data.category_id}
										onChange={(e) => editForm.setData('category_id', e.target.value)}
										required
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#80070A]"
									>
										{categories.map((c) => (
											<option key={c.id} value={c.id}>
												{c.name}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Tampilan Harga di Toko
									</label>
									<div className="flex items-center gap-2 h-10 px-3 bg-[#FDFBF9] border border-border rounded-xl">
										<input
											type="checkbox"
											id="edit_show_price"
											checked={editForm.data.show_price}
											onChange={(e) => editForm.setData('show_price', e.target.checked)}
											className="h-4 w-4 rounded text-[#80070A] focus:ring-[#80070A]"
										/>
										<label htmlFor="edit_show_price" className="text-xs font-semibold text-foreground cursor-pointer">
											Tampilkan Nominal Harga (Aktif)
										</label>
									</div>
								</div>
							</div>

							{/* Summary */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Ringkasan Singkat</label>
								<input
									type="text"
									value={editForm.data.summary}
									onChange={(e) => editForm.setData('summary', e.target.value)}
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#80070A]"
								/>
							</div>

							{/* Description */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Deskripsi Lengkap & Spesifikasi</label>
								<textarea
									value={editForm.data.description}
									onChange={(e) => editForm.setData('description', e.target.value)}
									rows={3}
									className="w-full rounded-xl border border-border bg-white p-3 text-xs text-foreground focus:border-[#80070A]"
								/>
							</div>

							{/* Variants */}
							<div className="space-y-3 pt-2 border-t border-border/60">
								<div className="flex items-center justify-between">
									<label className="block text-xs font-bold uppercase tracking-wider">
										Varian Kemasan & Harga
									</label>
									<button
										type="button"
										onClick={addEditVariant}
										className="inline-flex items-center gap-1 text-xs font-bold text-[#80070A] hover:underline"
									>
										<Plus className="h-3.5 w-3.5" />
										Tambah Varian
									</button>
								</div>

								{editForm.data.variants.map((v, idx) => (
									<div key={idx} className="flex items-center gap-3 bg-[#FAF7F5] p-3 rounded-2xl border border-border/60">
										<div className="flex-1">
											<input
												type="text"
												value={v.name}
												onChange={(e) => {
													const newVariants = [...editForm.data.variants];
													newVariants[idx].name = e.target.value;
													editForm.setData('variants', newVariants);
												}}
												placeholder="Nama Kemasan"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
											/>
										</div>
										<div className="w-36">
											<input
												type="number"
												value={v.price}
												onChange={(e) => {
													const newVariants = [...editForm.data.variants];
													newVariants[idx].price = parseInt(e.target.value) || 0;
													editForm.setData('variants', newVariants);
												}}
												placeholder="Harga (Rp)"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground font-semibold"
											/>
										</div>
										<div className="w-24">
											<input
												type="number"
												value={v.stock}
												onChange={(e) => {
													const newVariants = [...editForm.data.variants];
													newVariants[idx].stock = parseInt(e.target.value) || 0;
													editForm.setData('variants', newVariants);
												}}
												placeholder="Stok Lot"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
											/>
										</div>
										{editForm.data.variants.length > 1 && (
											<button
												type="button"
												onClick={() => removeEditVariant(idx)}
												className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										)}
									</div>
								))}
							</div>

							{/* Actions */}
							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
								<button
									type="button"
									onClick={() => setEditModalOpen(false)}
									className="rounded-full border border-border px-5 py-2 text-xs font-bold hover:bg-secondary"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={editForm.processing}
									className="rounded-full bg-[#80070A] px-6 py-2 text-xs font-bold text-white hover:brightness-110 disabled:opacity-60 shadow-md"
								>
									{editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 3. Modal Lihat Detail Komoditas */}
			{viewModalOpen && selectedProduct && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 space-y-5">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex items-center gap-4 border-b border-border/60 pb-5">
							<div className="h-20 w-20 overflow-hidden rounded-2xl bg-secondary shrink-0 border border-border shadow-sm">
								<img
									src={selectedProduct.images?.[0] || '/images/products/cengkeh-maluku.webp'}
									alt={selectedProduct.name}
									className="h-full w-full object-cover"
								/>
							</div>
							<div>
								<span className="text-[10px] font-bold uppercase tracking-widest text-[#80070A]">
									{selectedProduct.category?.name || 'Komoditas Rempah'}
								</span>
								<h3 className="font-display text-xl font-bold text-foreground leading-tight">
									{selectedProduct.name}
								</h3>
								<p className="text-xs font-bold text-[#80070A] mt-1">{selectedProduct.lowest_price_formatted}</p>
								<span
									className={cn(
										'inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mt-1',
										selectedProduct.show_price !== false
											? 'bg-emerald-100 text-emerald-800'
											: 'bg-amber-100 text-amber-800'
									)}
								>
									{selectedProduct.show_price !== false ? 'Harga Tampil di Toko' : 'Harga Mode Negosiasi / RFQ'}
								</span>
							</div>
						</div>

						<div className="space-y-3 text-xs">
							<div>
								<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-1">
									Slug URL Etalase
								</h5>
								<p className="font-mono bg-secondary/50 p-2.5 rounded-xl text-foreground select-all">
									/product/{selectedProduct.slug}
								</p>
							</div>

							<div>
								<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-1">
									Deskripsi Komoditas
								</h5>
								<p className="bg-secondary/40 p-3 rounded-xl leading-relaxed whitespace-pre-line text-foreground">
									{selectedProduct.description || 'Tidak ada deskripsi.'}
								</p>
							</div>

							<div>
								<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-1.5">
									Daftar Varian Kemasan
								</h5>
								<div className="divide-y divide-border/60 rounded-xl border border-border overflow-hidden">
									{selectedProduct.variants?.map((v) => (
										<div key={v.id} className="flex items-center justify-between p-3 bg-white">
											<span className="font-medium text-foreground">{v.name}</span>
											<div className="flex items-center gap-3">
												<span className="font-bold text-[#80070A]">{formatMoney(v.price)}</span>
												<span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold">
													Stok: {v.stock}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="flex justify-end pt-2 border-t border-border/60">
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

			{/* 4. Modal Konfirmasi Hapus Produk */}
			{deleteModalOpen && selectedProduct && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-5">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
							<Trash2 className="h-6 w-6" />
						</div>

						<div>
							<h3 className="font-display text-xl font-bold text-foreground">
								Hapus Komoditas Produk
							</h3>
							<p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
								Apakah Anda yakin ingin menghapus komoditas <strong className="text-foreground">{selectedProduct.name}</strong>? Tindakan ini akan menghapus semua data varian terkait.
							</p>
						</div>

						<div className="flex items-center justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => setDeleteModalOpen(false)}
								className="rounded-full border border-border px-5 py-2.5 text-xs font-bold text-foreground hover:bg-secondary"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteSubmit}
								className="rounded-full bg-red-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-red-700 shadow-md active:scale-95"
							>
								Ya, Hapus
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
}
