import useModalGuard from '@/hooks/useModalGuard';
import AdminLayout from '@/Layouts/AdminLayout';
import { cn, formatMoney, slugify } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	CheckCircle2,
	Eye,
	Image as ImageIcon,
	Images,
	Layers,
	Loader2,
	Lock,
	Package,
	Pencil,
	Plus,
	RotateCcw,
	Search,
	Star,
	Trash2,
	Upload,
	X,
	XCircle
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Category, PaginatedData, Product, Variant } from '@/types';

/** Helper: Format number to Rp string with dot separators */
const formatRp = (value: number): string => {
	if (!value && value !== 0) return '';
	return 'Rp ' + value.toLocaleString('id-ID');
};

/** Helper: Character counter color based on threshold */
const charCountColor = (len: number, warn: number, max: number): string => {
	if (len > max) return 'text-red-600 font-bold';
	if (len > warn) return 'text-amber-600 font-semibold';
	return 'text-muted-foreground';
};

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

interface ImageItem {
	type: 'url' | 'file';
	url: string;
	file?: File;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
	const [search, setSearch] = useState(filters.search || '');
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<ProductWithMeta | null>(null);

	// Image previews state
	const [createImages, setCreateImages] = useState<ImageItem[]>([]);
	const [editImages, setEditImages] = useState<ImageItem[]>([]);
	const [createUrlInput, setCreateUrlInput] = useState('');
	const [editUrlInput, setEditUrlInput] = useState('');

	const createFileInputRef = useRef<HTMLInputElement>(null);
	const editFileInputRef = useRef<HTMLInputElement>(null);

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
		image_files: File[];
		variants: Array<{ name: string; price: number; stock: number }>;
	}>({
		name: '',
		category_id: categories[0]?.id || '',
		slug: '',
		summary: '',
		description: '',
		active: true,
		show_price: true,
		images: [],
		image_files: [],
		variants: [
			{ name: 'Ukuran Standar per m²', price: 45000, stock: 500 },
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
		image_files: File[];
		variants: Array<{ id?: string; name: string; price: number; stock: number }>;
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
		image_files: [],
		variants: [],
		_method: 'PUT',
	});

	const isCreateDirty = Boolean(
		createForm.data.name.trim() ||
		createForm.data.summary.trim() ||
		createForm.data.description.trim() ||
		createImages.length > 0
	);
	const isEditDirty = editForm.isDirty || editImages.length > 0;

	const createGuard = useModalGuard({
		isDirty: isCreateDirty,
		onClose: () => {
			setCreateModalOpen(false);
			createForm.reset();
			setCreateImages([]);
			setCreateUrlInput('');
		},
	});

	const editGuard = useModalGuard({
		isDirty: isEditDirty,
		onClose: () => {
			setEditModalOpen(false);
			editForm.reset();
			setEditImages([]);
			setEditUrlInput('');
		},
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
			setSlugStatus({ loading: false, checked: false, available: true, slug: slugToCheck });
		}
	};

	// Debounced slug check
	useEffect(() => {
		const targetSlug = createModalOpen ? createForm.data.slug : editModalOpen ? editForm.data.slug : '';
		const targetId = editModalOpen && selectedProduct ? selectedProduct.id : undefined;

		if (!targetSlug) return;

		const timer = setTimeout(() => {
			checkSlugAvailability(targetSlug, targetId);
		}, 400);

		return () => clearTimeout(timer);
	}, [createForm.data.slug, editForm.data.slug, createModalOpen, editModalOpen]);

	// Auto-generate slug from name
	const handleNameChange = (nameValue: string, isEdit = false) => {
		const generatedSlug = slugify(nameValue);
		if (isEdit) {
			editForm.setData((prev) => ({
				...prev,
				name: nameValue,
				slug: generatedSlug,
			}));
		} else {
			createForm.setData((prev) => ({
				...prev,
				name: nameValue,
				slug: generatedSlug,
			}));
		}
	};

	// Multi-image handlers for Create Modal
	const handleCreateFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;
		const newFiles = Array.from(e.target.files);
		const newItems: ImageItem[] = newFiles.map((f) => ({
			type: 'file',
			url: URL.createObjectURL(f),
			file: f,
		}));
		const updated = [...createImages, ...newItems];
		setCreateImages(updated);
		syncCreateFormImages(updated);
		if (createFileInputRef.current) createFileInputRef.current.value = '';
	};

	const addCreateUrl = () => {
		if (!createUrlInput.trim()) return;
		const updated: ImageItem[] = [...createImages, { type: 'url', url: createUrlInput.trim() }];
		setCreateImages(updated);
		syncCreateFormImages(updated);
		setCreateUrlInput('');
	};

	const removeCreateImage = (index: number) => {
		const updated = createImages.filter((_, i) => i !== index);
		setCreateImages(updated);
		syncCreateFormImages(updated);
	};

	const setCreatePrimary = (index: number) => {
		if (index === 0) return;
		const item = createImages[index];
		const updated = [item, ...createImages.filter((_, i) => i !== index)];
		setCreateImages(updated);
		syncCreateFormImages(updated);
	};

	const syncCreateFormImages = (items: ImageItem[]) => {
		createForm.setData((prev) => ({
			...prev,
			images: items.filter((it) => it.type === 'url').map((it) => it.url),
			image_files: items.filter((it) => it.type === 'file' && it.file).map((it) => it.file as File),
		}));
	};

	// Multi-image handlers for Edit Modal
	const handleEditFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;
		const newFiles = Array.from(e.target.files);
		const newItems: ImageItem[] = newFiles.map((f) => ({
			type: 'file',
			url: URL.createObjectURL(f),
			file: f,
		}));
		const updated = [...editImages, ...newItems];
		setEditImages(updated);
		syncEditFormImages(updated);
		if (editFileInputRef.current) editFileInputRef.current.value = '';
	};

	const addEditUrl = () => {
		if (!editUrlInput.trim()) return;
		const updated: ImageItem[] = [...editImages, { type: 'url', url: editUrlInput.trim() }];
		setEditImages(updated);
		syncEditFormImages(updated);
		setEditUrlInput('');
	};

	const removeEditImage = (index: number) => {
		const updated = editImages.filter((_, i) => i !== index);
		setEditImages(updated);
		syncEditFormImages(updated);
	};

	const setEditPrimary = (index: number) => {
		if (index === 0) return;
		const item = editImages[index];
		const updated = [item, ...editImages.filter((_, i) => i !== index)];
		setEditImages(updated);
		syncEditFormImages(updated);
	};

	const syncEditFormImages = (items: ImageItem[]) => {
		editForm.setData((prev) => ({
			...prev,
			images: items.filter((it) => it.type === 'url').map((it) => it.url),
			image_files: items.filter((it) => it.type === 'file' && it.file).map((it) => it.file as File),
		}));
	};

	const openEditModal = (prod: ProductWithMeta) => {
		setSelectedProduct(prod);
		const initialImages: ImageItem[] = (prod.images || []).map((url) => ({
			type: 'url',
			url,
		}));
		setEditImages(initialImages);
		setEditUrlInput('');

		editForm.setData({
			name: prod.name,
			category_id: prod.category_id,
			slug: prod.slug,
			summary: prod.summary || '',
			description: prod.description || '',
			active: Boolean(prod.active),
			show_price: prod.show_price !== false,
			images: prod.images || [],
			image_files: [],
			variants: prod.variants?.map((v) => ({
				id: v.id,
				name: v.name || 'Ukuran Standar',
				price: v.price,
				stock: v.stock,
			})) || [{ name: 'Ukuran Standar', price: 45000, stock: 100 }],
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
			forceFormData: true,
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
				setCreateImages([]);
				setCreateUrlInput('');
			},
		});
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedProduct) return;
		editForm.post(route('admin.products.update', selectedProduct.id), {
			forceFormData: true,
			onSuccess: () => {
				setEditModalOpen(false);
				editForm.reset();
				setEditImages([]);
				setEditUrlInput('');
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
			{ name: 'Varian Baru', price: 50000, stock: 100 },
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
			{ name: 'Varian Baru', price: 50000, stock: 100 },
		]);
	};

	const [isSearchExpanded, setIsSearchExpanded] = useState(Boolean(filters.search));
	const searchInputRef = useRef<HTMLInputElement>(null);

	const removeEditVariant = (index: number) => {
		editForm.setData(
			'variants',
			editForm.data.variants.filter((_, idx) => idx !== index)
		);
	};

	const handleExpandSearch = () => {
		setIsSearchExpanded(true);
		setTimeout(() => {
			searchInputRef.current?.focus();
		}, 100);
	};

	const handleClearSearch = () => {
		setSearch('');
		setIsSearchExpanded(false);
		router.get(
			route('admin.products.index'),
			{ search: '', category: filters.category },
			{ preserveState: true }
		);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		router.get(
			route('admin.products.index'),
			{ search, category: filters.category },
			{ preserveState: true }
		);
	};

	const handleCategoryFilter = (catId: string) => {
		router.get(
			route('admin.products.index'),
			{ search, category: catId },
			{ preserveState: true }
		);
	};

	return (
		<AdminLayout>
			<Head title="Manajemen Produk & Material — Admin Tritama" />

			<div className="space-y-6">
				{/* Top Header */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold text-foreground">Katalog Produk & Material</h1>
						<p className="text-xs text-muted-foreground mt-1">
							Kelola seluruh material dekorasi, kaca film, wallpaper, blinds, signage, serta multi-foto etalase.
						</p>
					</div>

					<button
						onClick={() => {
							createForm.reset();
							setCreateImages([]);
							setCreateUrlInput('');
							setCreateModalOpen(true);
						}}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5478FF] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4064EB] active:scale-95 transition-all"
					>
						<Plus className="h-4 w-4" />
						<span>Tambah Produk Baru</span>
					</button>
				</div>

				{/* Filter & Expandable Search Bar */}
				<div className="flex items-center gap-2.5 bg-white p-3 sm:p-3.5 rounded-2xl border border-border shadow-xs overflow-hidden">
					{/* Expanding Search Container */}
					<div
						className={cn(
							'relative flex items-center transition-all duration-300 ease-in-out shrink-0',
							isSearchExpanded || search
								? 'w-64 sm:w-80 md:w-96'
								: 'w-10'
						)}
					>
						{isSearchExpanded || search ? (
							<form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
								<input
									ref={searchInputRef}
									type="text"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Escape' && !search) {
											setIsSearchExpanded(false);
										}
									}}
									onBlur={() => {
										if (!search) setIsSearchExpanded(false);
									}}
									placeholder="Ketik nama produk lalu tekan Enter..."
									className="w-full h-10 rounded-xl border border-[#5478FF] bg-[#FDFBF9] pl-9 pr-8 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5478FF]/20 shadow-xs animate-in fade-in duration-200"
								/>
								<Search className="absolute left-3 top-3 h-4 w-4 text-[#5478FF]" />
								{search ? (
									<button
										type="button"
										onClick={handleClearSearch}
										className="absolute right-2.5 top-2.5 rounded-full p-0.5 text-muted-foreground hover:bg-slate-200 hover:text-foreground transition-colors"
										title="Hapus pencarian"
									>
										<X className="h-4 w-4" />
									</button>
								) : (
									<button
										type="button"
										onClick={() => setIsSearchExpanded(false)}
										className="absolute right-2.5 top-2.5 rounded-full p-0.5 text-muted-foreground hover:bg-slate-200 hover:text-foreground transition-colors"
										title="Tutup pencarian (Esc)"
									>
										<X className="h-4 w-4" />
									</button>
								)}
							</form>
						) : (
							<button
								type="button"
								onClick={handleExpandSearch}
								className="h-10 w-10 rounded-xl border border-border bg-[#FDFBF9] hover:bg-blue-50/50 hover:border-[#5478FF] flex items-center justify-center text-muted-foreground hover:text-[#5478FF] transition-all shadow-xs active:scale-95 group"
								title="Buka Pencarian Produk"
							>
								<Search className="h-4 w-4 transition-transform group-hover:scale-110" />
							</button>
						)}
					</div>

					{/* Category Filter Pills (Scrollable horizontal strip) */}
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
						<button
							type="button"
							onClick={() => handleCategoryFilter('')}
							className={cn(
								'px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap',
								!filters.category
									? 'bg-[#111FA2] text-white shadow-xs'
									: 'bg-secondary text-muted-foreground hover:bg-slate-200'
							)}
						>
							Semua Kategori
						</button>
						{categories.map((c) => (
							<button
								key={c.id}
								type="button"
								onClick={() => handleCategoryFilter(c.id)}
								className={cn(
									'px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap',
									filters.category === c.id
										? 'bg-[#111FA2] text-white shadow-xs'
										: 'bg-secondary text-muted-foreground hover:bg-slate-200'
								)}
							>
								{c.name}
							</button>
						))}
					</div>
				</div>

				{/* Products Table */}
				<div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
								<tr>
									<th className="px-6 py-4">Foto & Nama Produk</th>
									<th className="px-6 py-4">Kategori</th>
									<th className="px-6 py-4">Harga Terendah</th>
									<th className="px-6 py-4">Tampilan Harga</th>
									<th className="px-6 py-4">Total Stok</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{products.data.length === 0 ? (
									<tr>
										<td colSpan={6} className="px-6 py-16 text-center">
											<div className="flex flex-col items-center gap-3">
												<div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
													<Package className="h-8 w-8 text-slate-400" />
												</div>
												<p className="text-sm font-bold text-foreground">Belum ada produk</p>
												<p className="text-xs text-muted-foreground max-w-xs">Mulai tambahkan produk material dekorasi pertama Anda ke dalam katalog.</p>
												<button
													type="button"
													onClick={() => { createForm.reset(); setCreateImages([]); setCreateUrlInput(''); setCreateModalOpen(true); }}
													className="inline-flex items-center gap-1.5 rounded-xl bg-[#5478FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#4064EB] shadow-sm"
												>
													<Plus className="h-3.5 w-3.5" />
													Tambah Produk Pertama
												</button>
											</div>
										</td>
									</tr>
								) : (
									products.data.map((product) => {
										const isPriceActive = product.show_price !== false;
										const imageCount = product.images?.length || 1;

										return (
											<tr key={product.id} className="hover:bg-secondary/30 transition-colors">
												{/* Photo & Name */}
												<td className="px-6 py-4">
													<div className="flex items-center gap-3.5">
														<div className="relative h-12 w-12 overflow-hidden rounded-xl bg-secondary shrink-0 border border-border/60 shadow-sm">
															<img
																src={product.images?.[0] || '/images/products/kaca-film-riben.webp'}
																alt={product.name}
																className="h-full w-full object-cover"
															/>
															{imageCount > 1 && (
																<span className="absolute bottom-0.5 right-0.5 rounded-full bg-black/70 px-1 text-[8px] font-bold text-white">
																	{imageCount}
																</span>
															)}
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
												<td className="px-6 py-4 font-bold text-[#5478FF]">
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
																isPriceActive ? 'bg-[#5478FF]' : 'bg-gray-300'
															)}
															title={isPriceActive ? 'Harga Tampil di Etalase' : 'Harga Disembunyikan'}
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
																isPriceActive ? 'text-emerald-700' : 'text-slate-500'
															)}
														>
															{isPriceActive ? 'Harga Tampil (Rp)' : 'Disembunyikan'}
														</span>
													</div>
												</td>

												{/* Stock */}
												<td className="px-6 py-4 font-semibold text-foreground">
													{product.total_stock ?? 0} unit/lot
												</td>

												{/* Actions */}
												<td className="px-6 py-4 text-right">
													<div className="flex items-center justify-end gap-1.5">
														<button
															onClick={() => openViewModal(product)}
															className="rounded-lg p-2 text-slate-500 hover:bg-secondary hover:text-foreground"
															title="Lihat Detail Produk"
														>
															<Eye className="h-4 w-4" />
														</button>
														<button
															onClick={() => openEditModal(product)}
															className="rounded-lg p-2 text-[#5478FF] hover:bg-blue-50"
															title="Edit Produk"
														>
															<Pencil className="h-4 w-4" />
														</button>
														<button
															onClick={() => openDeleteModal(product)}
															className="rounded-lg p-2 text-red-600 hover:bg-red-50"
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

					{/* Pagination */}
					{products.links && products.links.length > 3 && (
						<div className="flex items-center justify-between border-t border-border px-6 py-4">
							<p className="text-xs text-muted-foreground">
								Menampilkan <strong className="text-foreground">{products.from}</strong> -{' '}
								<strong className="text-foreground">{products.to}</strong> dari{' '}
								<strong className="text-foreground">{products.total}</strong> produk
							</p>
							<div className="flex items-center gap-1">
								{products.links.map((link, idx) => (
									<Link
										key={idx}
										href={link.url || '#'}
										className={cn(
											'flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2.5 text-xs font-bold transition-all',
											link.active
												? 'bg-[#5478FF] text-white shadow-sm'
												: link.url
												? 'bg-secondary text-foreground hover:bg-slate-200'
												: 'cursor-not-allowed text-muted-foreground opacity-50'
										)}
										dangerouslySetInnerHTML={{ __html: link.label }}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* ========================================================================= */}
			{/* MODALS SECTION */}
			{/* ========================================================================= */}

			{/* 1. Modal Tambah Produk Baru */}
			{createModalOpen && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div
						className={cn(
							'relative max-w-3xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 max-h-[90vh] overflow-y-auto',
							createGuard.isShaking && 'animate-modal-shake ring-2 ring-amber-400'
						)}
					>
						<button
							onClick={createGuard.handleClose}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="text-xl font-bold text-foreground">Tambah Produk Baru</h3>
							<p className="text-xs text-muted-foreground mt-0.5">
								Lengkapi nama produk, upload beberapa foto galeri, dan atur varian harga.
							</p>
						</div>

						<form onSubmit={handleCreateSubmit} className="mt-5 space-y-5">
							{/* Name & Auto-Generated Read-Only Slug */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Nama Produk <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										value={createForm.data.name}
										onChange={(e) => handleNameChange(e.target.value, false)}
										required
										placeholder="mis: Kaca Film Sparta 80% Tolak Panas"
										className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#5478FF]"
									/>
									<p className="mt-1 text-[10px] text-muted-foreground">Gunakan nama lengkap dengan spesifikasi. Contoh: Kaca Film Sparta 80% Tolak Panas</p>
									{createForm.errors.name && <p className="mt-0.5 text-xs text-red-600">{createForm.errors.name}</p>}
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
									{createForm.errors.slug && <p className="mt-1 text-xs text-red-600">{createForm.errors.slug}</p>}
								</div>
							</div>

							{/* Category & Status */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Kategori Produk <span className="text-red-500">*</span>
									</label>
									<select
										value={createForm.data.category_id}
										onChange={(e) => createForm.setData('category_id', e.target.value)}
										required
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#5478FF]"
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
											className="h-4 w-4 rounded text-[#5478FF] focus:ring-[#5478FF]"
										/>
										<label htmlFor="create_show_price" className="text-xs font-semibold text-foreground cursor-pointer">
											Tampilkan Nominal Harga (Aktif)
										</label>
									</div>
								</div>
							</div>

							{/* MULTI-IMAGE UPLOAD SECTION */}
							<div className="space-y-3 p-4 rounded-2xl bg-[#FAF7F5] border border-border/80">
								<div className="flex items-center justify-between">
									<label className="block text-xs font-bold uppercase tracking-wider text-foreground">
										Foto & Galeri Produk <span className="text-[#5478FF]">(Bisa &gt;1 foto)</span>
									</label>
									<span className="text-[11px] font-semibold text-muted-foreground">
										{createImages.length} Foto Terpilih
									</span>
								</div>

								{/* Upload Buttons & URL Input */}
								<div className="flex flex-col sm:flex-row gap-2">
									<input
										ref={createFileInputRef}
										type="file"
										multiple
										accept="image/*"
										onChange={handleCreateFileSelect}
										className="hidden"
										id="create_file_input"
									/>
									<label
										htmlFor="create_file_input"
										className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5478FF] hover:bg-[#4064EB] text-white px-4 py-2.5 text-xs font-bold cursor-pointer shadow-sm active:scale-95 transition-all"
									>
										<Upload className="h-4 w-4" />
										<span>Pilih Foto dari Komputer (Bisa Banyak)</span>
									</label>

									<div className="flex-1 flex gap-1.5">
										<input
											type="text"
											value={createUrlInput}
											onChange={(e) => setCreateUrlInput(e.target.value)}
											placeholder="Atau tempel URL gambar /images/products/..."
											className="flex-1 h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
										/>
										<button
											type="button"
											onClick={addCreateUrl}
											className="rounded-xl bg-secondary hover:bg-slate-200 px-3 py-2 text-xs font-bold text-foreground shrink-0"
										>
											+ Tambah URL
										</button>
									</div>
								</div>

								{/* Image Preview Grid */}
								{createImages.length > 0 && (
									<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
										{createImages.map((item, idx) => (
											<div
												key={idx}
												className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-border bg-white shadow-sm"
											>
												<img
													src={item.url}
													alt={`Foto ${idx + 1}`}
													className="h-full w-full object-cover"
												/>
												{/* Main image badge */}
												{idx === 0 && (
													<div className="absolute top-2 left-2 z-10">
														<span className="inline-flex items-center gap-1 rounded-full bg-[#FFDE42] px-2 py-0.5 text-[9px] font-extrabold uppercase text-[#111FA2] shadow-sm">
															<Star className="h-2.5 w-2.5 fill-[#111FA2]" /> Utama
														</span>
													</div>
												)}

												{/* Action overlay */}
												<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
													{idx !== 0 && (
														<button
															type="button"
															onClick={() => setCreatePrimary(idx)}
															className="rounded-full bg-[#FFDE42] px-2.5 py-1 text-[10px] font-bold text-[#111FA2] hover:bg-yellow-300"
														>
															Jadikan Utama
														</button>
													)}
													<button
														type="button"
														onClick={() => removeCreateImage(idx)}
														className="rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700"
														title="Hapus foto ini"
													>
														<Trash2 className="h-3.5 w-3.5" />
													</button>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Summary with Character Counter */}
							<div>
								<div className="flex items-center justify-between mb-1">
									<label className="block text-xs font-bold uppercase tracking-wider">Ringkasan Singkat</label>
									<span className={cn('text-[10px]', charCountColor(createForm.data.summary.length, 100, 120))}>
										{createForm.data.summary.length}/120
									</span>
								</div>
								<input
									type="text"
									value={createForm.data.summary}
									onChange={(e) => createForm.setData('summary', e.target.value)}
									maxLength={120}
									placeholder="Contoh: Kaca film tolak panas tingkat kegelapan 80% untuk gedung dan rumah."
									className={cn(
										'w-full h-10 rounded-xl border bg-white px-3.5 text-xs text-foreground focus:border-[#5478FF]',
										createForm.data.summary.length > 120 ? 'border-red-400' : 'border-border'
									)}
								/>
								<p className="mt-1 text-[10px] text-muted-foreground">Ringkasan 1 kalimat untuk tampilan katalog & SEO</p>
							</div>

							{/* Description with Character Counter */}
							<div>
								<div className="flex items-center justify-between mb-1">
									<label className="block text-xs font-bold uppercase tracking-wider">Deskripsi Lengkap & Spesifikasi</label>
									<span className={cn('text-[10px]', charCountColor(createForm.data.description.length, 400, 500))}>
										{createForm.data.description.length}/500
									</span>
								</div>
								<textarea
									value={createForm.data.description}
									onChange={(e) => createForm.setData('description', e.target.value)}
									rows={3}
									maxLength={500}
									placeholder="Tuliskan spesifikasi teknis, ketebalan, daya tolak panas UV/IR, dan garansi..."
									className={cn(
										'w-full rounded-xl border bg-white p-3 text-xs text-foreground focus:border-[#5478FF]',
										createForm.data.description.length > 500 ? 'border-red-400' : 'border-border'
									)}
								/>
								<p className="mt-1 text-[10px] text-muted-foreground">Deskripsi spesifikasi teknis, ketebalan, garansi, dll</p>
							</div>

							{/* Variants */}
							<div className="space-y-3 pt-2 border-t border-border/60">
								<div className="flex items-center justify-between">
									<label className="block text-xs font-bold uppercase tracking-wider">
										Varian Ukuran & Harga
									</label>
									<button
										type="button"
										onClick={addCreateVariant}
										className="inline-flex items-center gap-1 text-xs font-bold text-[#5478FF] hover:underline"
									>
										<Plus className="h-3.5 w-3.5" />
										Tambah Varian
									</button>
								</div>

								{/* Column Headers */}
								{createForm.data.variants.length > 0 && (
									<div className="flex items-center gap-3 px-3 pt-1">
										<span className="w-6 text-[9px] font-bold text-muted-foreground text-center">#</span>
										<span className="flex-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Nama Varian</span>
										<span className="w-36 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Harga (Rp)</span>
										<span className="w-24 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Stok (unit)</span>
										<span className="w-9" />
									</div>
								)}

								{createForm.data.variants.map((v, idx) => (
									<div key={idx} className="flex items-center gap-3 bg-[#FAF7F5] p-3 rounded-2xl border border-border/60">
										<span className="w-6 text-center text-[10px] font-bold text-[#5478FF] bg-[#5478FF]/10 rounded-lg py-1">#{idx + 1}</span>
										<div className="flex-1">
											<input
												type="text"
												value={v.name}
												onChange={(e) => {
													const newVariants = [...createForm.data.variants];
													newVariants[idx].name = e.target.value;
													createForm.setData('variants', newVariants);
												}}
												placeholder="mis: Ukuran 152x50cm"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
											/>
										</div>
										<div className="w-36">
											<div className="relative">
												<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground pointer-events-none">Rp</span>
												<input
													type="number"
													value={v.price}
													onChange={(e) => {
														const newVariants = [...createForm.data.variants];
														newVariants[idx].price = parseInt(e.target.value) || 0;
														createForm.setData('variants', newVariants);
													}}
													placeholder="45000"
													className="w-full h-9 rounded-xl border border-border bg-white pl-8 pr-3 text-xs text-foreground font-semibold"
												/>
											</div>
											{v.price > 0 && <p className="text-[9px] text-[#5478FF] font-semibold mt-0.5 pl-1">= {formatRp(v.price)}</p>}
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
												placeholder="100"
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
									onClick={createGuard.handleClose}
									className="rounded-full border border-border px-5 py-2 text-xs font-bold hover:bg-secondary"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={createForm.processing}
									className="rounded-full bg-[#5478FF] px-6 py-2 text-xs font-bold text-white hover:bg-[#4064EB] disabled:opacity-60 shadow-md"
								>
									{createForm.processing ? 'Menyimpan...' : 'Simpan Produk'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 2. Modal Edit Produk */}
			{editModalOpen && selectedProduct && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div
						className={cn(
							'relative max-w-3xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 max-h-[90vh] overflow-y-auto',
							editGuard.isShaking && 'animate-modal-shake ring-2 ring-amber-400'
						)}
					>
						<button
							onClick={editGuard.handleClose}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="text-xl font-bold text-foreground">Edit Produk</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Perbarui informasi produk, foto galeri, atau varian ukuran & harga.</p>
						</div>

						<form onSubmit={handleEditSubmit} className="mt-5 space-y-5">
							{/* Name & Auto-Generated Read-Only Slug */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Nama Produk <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										value={editForm.data.name}
										onChange={(e) => handleNameChange(e.target.value, true)}
										required
										className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#5478FF]"
									/>
									<p className="mt-1 text-[10px] text-muted-foreground">Gunakan nama lengkap dengan spesifikasi</p>
									{editForm.errors.name && <p className="mt-0.5 text-xs text-red-600">{editForm.errors.name}</p>}
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
									{editForm.errors.slug && <p className="mt-1 text-xs text-red-600">{editForm.errors.slug}</p>}
								</div>
							</div>

							{/* Category & Status */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">
										Kategori Produk <span className="text-red-500">*</span>
									</label>
									<select
										value={editForm.data.category_id}
										onChange={(e) => editForm.setData('category_id', e.target.value)}
										required
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#5478FF]"
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
											className="h-4 w-4 rounded text-[#5478FF] focus:ring-[#5478FF]"
										/>
										<label htmlFor="edit_show_price" className="text-xs font-semibold text-foreground cursor-pointer">
											Tampilkan Nominal Harga (Aktif)
										</label>
									</div>
								</div>
							</div>

							{/* MULTI-IMAGE UPLOAD SECTION (EDIT) */}
							<div className="space-y-3 p-4 rounded-2xl bg-[#FAF7F5] border border-border/80">
								<div className="flex items-center justify-between">
									<label className="block text-xs font-bold uppercase tracking-wider text-foreground">
										Foto & Galeri Produk <span className="text-[#5478FF]">(Bisa &gt;1 foto)</span>
									</label>
									<span className="text-[11px] font-semibold text-muted-foreground">
										{editImages.length} Foto Terpilih
									</span>
								</div>

								{/* Upload Buttons & URL Input */}
								<div className="flex flex-col sm:flex-row gap-2">
									<input
										ref={editFileInputRef}
										type="file"
										multiple
										accept="image/*"
										onChange={handleEditFileSelect}
										className="hidden"
										id="edit_file_input"
									/>
									<label
										htmlFor="edit_file_input"
										className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5478FF] hover:bg-[#4064EB] text-white px-4 py-2.5 text-xs font-bold cursor-pointer shadow-sm active:scale-95 transition-all"
									>
										<Upload className="h-4 w-4" />
										<span>Tambah Foto dari Komputer</span>
									</label>

									<div className="flex-1 flex gap-1.5">
										<input
											type="text"
											value={editUrlInput}
											onChange={(e) => setEditUrlInput(e.target.value)}
											placeholder="Atau tempel URL gambar /images/products/..."
											className="flex-1 h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
										/>
										<button
											type="button"
											onClick={addEditUrl}
											className="rounded-xl bg-secondary hover:bg-slate-200 px-3 py-2 text-xs font-bold text-foreground shrink-0"
										>
											+ Tambah URL
										</button>
									</div>
								</div>

								{/* Image Preview Grid */}
								{editImages.length > 0 && (
									<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
										{editImages.map((item, idx) => (
											<div
												key={idx}
												className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-border bg-white shadow-sm"
											>
												<img
													src={item.url}
													alt={`Foto ${idx + 1}`}
													className="h-full w-full object-cover"
												/>
												{/* Main image badge */}
												{idx === 0 && (
													<div className="absolute top-2 left-2 z-10">
														<span className="inline-flex items-center gap-1 rounded-full bg-[#FFDE42] px-2 py-0.5 text-[9px] font-extrabold uppercase text-[#111FA2] shadow-sm">
															<Star className="h-2.5 w-2.5 fill-[#111FA2]" /> Utama
														</span>
													</div>
												)}

												{/* Action overlay */}
												<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
													{idx !== 0 && (
														<button
															type="button"
															onClick={() => setEditPrimary(idx)}
															className="rounded-full bg-[#FFDE42] px-2.5 py-1 text-[10px] font-bold text-[#111FA2] hover:bg-yellow-300"
														>
															Jadikan Utama
														</button>
													)}
													<button
														type="button"
														onClick={() => removeEditImage(idx)}
														className="rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700"
														title="Hapus foto ini"
													>
														<Trash2 className="h-3.5 w-3.5" />
													</button>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Summary with Character Counter */}
							<div>
								<div className="flex items-center justify-between mb-1">
									<label className="block text-xs font-bold uppercase tracking-wider">Ringkasan Singkat</label>
									<span className={cn('text-[10px]', charCountColor(editForm.data.summary.length, 100, 120))}>
										{editForm.data.summary.length}/120
									</span>
								</div>
								<input
									type="text"
									value={editForm.data.summary}
									onChange={(e) => editForm.setData('summary', e.target.value)}
									maxLength={120}
									className={cn(
										'w-full h-10 rounded-xl border bg-white px-3.5 text-xs text-foreground focus:border-[#5478FF]',
										editForm.data.summary.length > 120 ? 'border-red-400' : 'border-border'
									)}
								/>
								<p className="mt-1 text-[10px] text-muted-foreground">Ringkasan 1 kalimat untuk tampilan katalog & SEO</p>
							</div>

							{/* Description with Character Counter */}
							<div>
								<div className="flex items-center justify-between mb-1">
									<label className="block text-xs font-bold uppercase tracking-wider">Deskripsi Lengkap & Spesifikasi</label>
									<span className={cn('text-[10px]', charCountColor(editForm.data.description.length, 400, 500))}>
										{editForm.data.description.length}/500
									</span>
								</div>
								<textarea
									value={editForm.data.description}
									onChange={(e) => editForm.setData('description', e.target.value)}
									rows={3}
									maxLength={500}
									className={cn(
										'w-full rounded-xl border bg-white p-3 text-xs text-foreground focus:border-[#5478FF]',
										editForm.data.description.length > 500 ? 'border-red-400' : 'border-border'
									)}
								/>
								<p className="mt-1 text-[10px] text-muted-foreground">Deskripsi spesifikasi teknis, ketebalan, garansi, dll</p>
							</div>

							{/* Variants */}
							<div className="space-y-3 pt-2 border-t border-border/60">
								<div className="flex items-center justify-between">
									<label className="block text-xs font-bold uppercase tracking-wider">
										Varian Ukuran & Harga
									</label>
									<button
										type="button"
										onClick={addEditVariant}
										className="inline-flex items-center gap-1 text-xs font-bold text-[#5478FF] hover:underline"
									>
										<Plus className="h-3.5 w-3.5" />
										Tambah Varian
									</button>
								</div>

								{/* Column Headers */}
								{editForm.data.variants.length > 0 && (
									<div className="flex items-center gap-3 px-3 pt-1">
										<span className="w-6 text-[9px] font-bold text-muted-foreground text-center">#</span>
										<span className="flex-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Nama Varian</span>
										<span className="w-36 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Harga (Rp)</span>
										<span className="w-24 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Stok (unit)</span>
										<span className="w-9" />
									</div>
								)}

								{editForm.data.variants.map((v, idx) => (
									<div key={idx} className="flex items-center gap-3 bg-[#FAF7F5] p-3 rounded-2xl border border-border/60">
										<span className="w-6 text-center text-[10px] font-bold text-[#5478FF] bg-[#5478FF]/10 rounded-lg py-1">#{idx + 1}</span>
										<div className="flex-1">
											<input
												type="text"
												value={v.name}
												onChange={(e) => {
													const newVariants = [...editForm.data.variants];
													newVariants[idx].name = e.target.value;
													editForm.setData('variants', newVariants);
												}}
												placeholder="mis: Ukuran 152x50cm"
												className="w-full h-9 rounded-xl border border-border bg-white px-3 text-xs text-foreground"
											/>
										</div>
										<div className="w-36">
											<div className="relative">
												<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground pointer-events-none">Rp</span>
												<input
													type="number"
													value={v.price}
													onChange={(e) => {
														const newVariants = [...editForm.data.variants];
														newVariants[idx].price = parseInt(e.target.value) || 0;
														editForm.setData('variants', newVariants);
													}}
													placeholder="45000"
													className="w-full h-9 rounded-xl border border-border bg-white pl-8 pr-3 text-xs text-foreground font-semibold"
												/>
											</div>
											{v.price > 0 && <p className="text-[9px] text-[#5478FF] font-semibold mt-0.5 pl-1">= {formatRp(v.price)}</p>}
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
												placeholder="100"
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
									onClick={editGuard.handleClose}
									className="rounded-full border border-border px-5 py-2 text-xs font-bold hover:bg-secondary"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={editForm.processing}
									className="rounded-full bg-[#5478FF] px-6 py-2 text-xs font-bold text-white hover:bg-[#4064EB] disabled:opacity-60 shadow-md"
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
					<div className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 space-y-5 max-h-[90vh] overflow-y-auto">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-5">
							<span className="text-[10px] font-bold uppercase tracking-widest text-[#5478FF]">
								{selectedProduct.category?.name || 'Produk Material'}
							</span>
							<h3 className="font-display text-xl font-bold text-foreground leading-tight mt-0.5">
								{selectedProduct.name}
							</h3>
							<p className="text-xs font-bold text-[#5478FF] mt-1">{selectedProduct.lowest_price_formatted}</p>
							<span
								className={cn(
									'inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mt-1.5',
									selectedProduct.show_price !== false
										? 'bg-emerald-100 text-emerald-800'
										: 'bg-slate-100 text-slate-700'
								)}
							>
								{selectedProduct.show_price !== false ? 'Harga Tampil di Toko' : 'Harga Disembunyikan'}
							</span>
						</div>

						{/* Photo Gallery Grid in Detail Modal */}
						<div>
							<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-2 flex items-center gap-1.5">
								<Images className="h-3.5 w-3.5 text-[#5478FF]" />
								<span>Galeri Foto Produk ({selectedProduct.images?.length || 0} Foto)</span>
							</h5>
							{selectedProduct.images && selectedProduct.images.length > 0 ? (
								<div className="grid grid-cols-3 gap-2">
									{selectedProduct.images.map((img, idx) => (
										<div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-secondary">
											<img src={img} alt={`Foto ${idx + 1}`} className="h-full w-full object-cover" />
											{idx === 0 && (
												<span className="absolute top-1 left-1 rounded bg-[#FFDE42] px-1.5 py-0.5 text-[8px] font-bold text-[#111FA2]">
													Utama
												</span>
											)}
										</div>
									))}
								</div>
							) : (
								<p className="text-xs text-muted-foreground italic">Belum ada foto yang diunggah.</p>
							)}
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
									Deskripsi Produk
								</h5>
								<p className="bg-secondary/40 p-3 rounded-xl leading-relaxed whitespace-pre-line text-foreground">
									{selectedProduct.description || 'Tidak ada deskripsi.'}
								</p>
							</div>

							<div>
								<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-1.5">
									Daftar Varian Ukuran & Harga
								</h5>
								<div className="divide-y divide-border/60 rounded-xl border border-border overflow-hidden">
									{selectedProduct.variants?.map((v) => (
										<div key={v.id} className="flex items-center justify-between p-3 bg-white">
											<span className="font-medium text-foreground">{v.name}</span>
											<div className="flex items-center gap-3">
												<span className="font-bold text-[#5478FF]">{formatMoney(v.price)}</span>
												<span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold">
													Stok: {v.stock}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* 4. Modal Hapus Produk */}
			{deleteModalOpen && selectedProduct && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up text-center space-y-4">
						<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
							<Trash2 className="h-7 w-7" />
						</div>

						<div>
							<h3 className="text-lg font-bold text-foreground">Konfirmasi Hapus Produk</h3>
							<p className="text-xs text-muted-foreground mt-1 leading-relaxed">
								Apakah Anda yakin ingin menghapus produk <strong className="text-foreground">{selectedProduct.name}</strong>? Tindakan ini tidak dapat dibatalkan.
							</p>
						</div>

						<div className="flex items-center justify-center gap-3 pt-2">
							<button
								type="button"
								onClick={() => setDeleteModalOpen(false)}
								className="rounded-full border border-border px-5 py-2 text-xs font-bold hover:bg-secondary"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteSubmit}
								className="rounded-full bg-red-600 px-6 py-2 text-xs font-bold text-white hover:bg-red-700 shadow-md"
							>
								Hapus Permanen
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
}
