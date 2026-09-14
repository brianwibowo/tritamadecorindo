import useModalGuard from '@/hooks/useModalGuard';
import AdminLayout from '@/Layouts/AdminLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	Camera,
	ChevronLeft,
	ChevronRight,
	Eye,
	Image as ImageIcon,
	Images,
	Pencil,
	Plus,
	RotateCcw,
	Search,
	Trash2,
	UploadCloud,
	X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import type { PaginatedData } from '@/types';

interface GalleryItem {
	id: number;
	title: string;
	caption?: string | null;
	category?: string;
	category_label?: string;
	image: string;
	images?: string[] | null;
	all_images?: string[];
	active: boolean;
	sort_order: number;
	created_at: string;
}

interface Props {
	galleries: PaginatedData<GalleryItem>;
	filters: {
		search?: string;
		category?: string;
	};
	categories: Array<{ value: string; label: string }>;
}

export default function GalleriesIndex({ galleries, filters, categories }: Props) {
	const [search, setSearch] = useState(filters.search || '');
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
	const [currentViewImageIdx, setCurrentViewImageIdx] = useState(0);

	const [createImagePreviews, setCreateImagePreviews] = useState<string[]>([]);
	const [editNewImagePreviews, setEditNewImagePreviews] = useState<string[]>([]);
	const [editExistingImages, setEditExistingImages] = useState<string[]>([]);

	const createFileInputRef = useRef<HTMLInputElement>(null);
	const editFileInputRef = useRef<HTMLInputElement>(null);

	// Create Form (Kategori + Judul + Multi Photos)
	const createForm = useForm<{
		title: string;
		category: string;
		active: boolean;
		images: File[];
	}>({
		title: '',
		category: 'kaca_film',
		active: true,
		images: [],
	});

	// Edit Form (Kategori + Judul + Manage Existing Photos + Append New Photos)
	const editForm = useForm<{
		title: string;
		category: string;
		active: boolean;
		images: File[];
		existing_images: string[];
		_method: string;
	}>({
		title: '',
		category: 'kaca_film',
		active: true,
		images: [],
		existing_images: [],
		_method: 'PUT',
	});

	const isCreateDirty = Boolean(createForm.data.title.trim() || createForm.data.images.length > 0);
	const isEditDirty = editForm.isDirty;

	const createGuard = useModalGuard({
		isDirty: isCreateDirty,
		onClose: () => {
			setCreateModalOpen(false);
			createForm.reset();
			setCreateImagePreviews([]);
		},
	});

	const editGuard = useModalGuard({
		isDirty: isEditDirty,
		onClose: () => {
			setEditModalOpen(false);
			editForm.reset();
			setEditNewImagePreviews([]);
			setEditExistingImages([]);
		},
	});

	const handleFilterChange = (params: Record<string, string>) => {
		router.get(
			route('admin.galleries.index'),
			{
				...filters,
				...params,
			},
			{ preserveState: true }
		);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleFilterChange({ search });
	};

	const handleToggleStatus = (item: GalleryItem) => {
		router.patch(
			route('admin.galleries.toggle', item.id),
			{},
			{ preserveScroll: true }
		);
	};

	const openEditModal = (item: GalleryItem) => {
		setSelectedGallery(item);
		const existing = item.all_images && item.all_images.length > 0 ? item.all_images : [item.image];
		setEditExistingImages(existing);
		setEditNewImagePreviews([]);
		editForm.setData({
			title: item.title,
			category: item.category || 'kaca_film',
			active: Boolean(item.active),
			images: [],
			existing_images: existing,
			_method: 'PUT',
		});
		setEditModalOpen(true);
	};

	const openViewModal = (item: GalleryItem) => {
		setSelectedGallery(item);
		setCurrentViewImageIdx(0);
		setViewModalOpen(true);
	};

	const openDeleteModal = (item: GalleryItem) => {
		setSelectedGallery(item);
		setDeleteModalOpen(true);
	};

	const handleCreateImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			const updatedFiles = [...createForm.data.images, ...files];
			createForm.setData('images', updatedFiles);

			const previews: string[] = [];
			let loaded = 0;
			files.forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					previews.push(reader.result as string);
					loaded++;
					if (loaded === files.length) {
						setCreateImagePreviews((prev) => [...prev, ...previews]);
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeCreateImage = (index: number) => {
		const updatedFiles = createForm.data.images.filter((_, idx) => idx !== index);
		createForm.setData('images', updatedFiles);
		setCreateImagePreviews((prev) => prev.filter((_, idx) => idx !== index));
	};

	const handleEditImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			const updatedFiles = [...editForm.data.images, ...files];
			editForm.setData('images', updatedFiles);

			const previews: string[] = [];
			let loaded = 0;
			files.forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					previews.push(reader.result as string);
					loaded++;
					if (loaded === files.length) {
						setEditNewImagePreviews((prev) => [...prev, ...previews]);
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeEditExistingImage = (index: number) => {
		const updated = editExistingImages.filter((_, idx) => idx !== index);
		setEditExistingImages(updated);
		editForm.setData('existing_images', updated);
	};

	const removeEditNewImage = (index: number) => {
		const updatedFiles = editForm.data.images.filter((_, idx) => idx !== index);
		editForm.setData('images', updatedFiles);
		setEditNewImagePreviews((prev) => prev.filter((_, idx) => idx !== index));
	};

	const handleCreateSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createForm.post(route('admin.galleries.store'), {
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
				setCreateImagePreviews([]);
			},
		});
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedGallery) return;
		editForm.post(route('admin.galleries.update', selectedGallery.id), {
			onSuccess: () => {
				setEditModalOpen(false);
				editForm.reset();
				setEditNewImagePreviews([]);
				setEditExistingImages([]);
			},
		});
	};

	const handleDeleteSubmit = () => {
		if (!selectedGallery) return;
		router.delete(route('admin.galleries.destroy', selectedGallery.id), {
			onSuccess: () => {
				setDeleteModalOpen(false);
				setSelectedGallery(null);
			},
		});
	};

	return (
		<AdminLayout header="Galeri & Dokumentasi Proyek">
			<Head title="Manajemen Galeri — Panel Admin Tritama Decorindo" />

			<div className="space-y-6">
				{/* Top Controls Toolbar */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border/60 shadow-sm">
					{/* Search & Category Filter */}
					<div className="flex flex-wrap items-center gap-3 flex-1">
						<form onSubmit={handleSearchSubmit} className="relative flex-1 sm:max-w-xs">
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari judul galeri..."
								className="w-full h-10 rounded-xl border border-border bg-[#FDFBF9] pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-[#5478FF]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</form>

						<select
							value={filters.category || ''}
							onChange={(e) => handleFilterChange({ category: e.target.value })}
							className="h-10 rounded-xl border border-border bg-[#FDFBF9] px-3 text-xs text-foreground focus:border-[#5478FF]"
						>
							<option value="">Semua Kategori</option>
							{categories.map((c) => (
								<option key={c.value} value={c.value}>
									{c.label}
								</option>
							))}
						</select>

						{(filters.search || filters.category) && (
							<button
								onClick={() => {
									setSearch('');
									router.get(route('admin.galleries.index'));
								}}
								className="inline-flex items-center gap-1 text-xs text-[#5478FF] hover:underline"
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
							setCreateImagePreviews([]);
							setCreateModalOpen(true);
						}}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5478FF] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#4064EB] transition-all shadow-md active:scale-95 whitespace-nowrap"
					>
						<Plus className="h-4 w-4" />
						<span>Tambah Galeri Baru</span>
					</button>
				</div>

				{/* Galleries Table Card */}
				<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-6 py-4">Foto Cover & Jumlah</th>
									<th className="px-6 py-4">Kategori Layanan</th>
									<th className="px-6 py-4">Judul Galeri Proyek</th>
									<th className="px-6 py-4">Tanggal Unggah</th>
									<th className="px-6 py-4">Status Publik</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{galleries.data.length === 0 ? (
									<tr>
										<td colSpan={6} className="px-6 py-16 text-center">
											<div className="flex flex-col items-center gap-3">
												<div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
													<ImageIcon className="h-8 w-8 text-slate-400" />
												</div>
												<p className="text-sm font-bold text-foreground">Belum ada galeri proyek</p>
												<p className="text-xs text-muted-foreground max-w-xs">Tambahkan judul, pilih kategori, dan unggah foto dokumentasi proyek pertama Anda.</p>
												<button
													type="button"
													onClick={() => {
														createForm.reset();
														setCreateImagePreviews([]);
														setCreateModalOpen(true);
													}}
													className="inline-flex items-center gap-1.5 rounded-xl bg-[#5478FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#4064EB] shadow-sm"
												>
													<Plus className="h-3.5 w-3.5" />
													Tambah Galeri Pertama
												</button>
											</div>
										</td>
									</tr>
								) : (
									galleries.data.map((item) => {
										const imageCount = (item.all_images && item.all_images.length > 0) ? item.all_images.length : 1;
										return (
											<tr key={item.id} className="hover:bg-secondary/30 transition-colors">
												{/* Photo Cover & Count */}
												<td className="px-6 py-4">
													<div className="relative h-16 w-20 overflow-hidden rounded-xl bg-secondary shrink-0 border border-border/60 shadow-xs group">
														<img
															src={item.image}
															alt={item.title}
															className="h-full w-full object-cover"
														/>
														{imageCount > 1 && (
															<span className="absolute bottom-1 right-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-xs flex items-center gap-0.5">
																<Images className="h-2.5 w-2.5" />
																{imageCount}
															</span>
														)}
													</div>
												</td>

												{/* Category Badge */}
												<td className="px-6 py-4 whitespace-nowrap">
													<span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#111FA2] border border-blue-100">
														{item.category_label || 'Kaca Film'}
													</span>
												</td>

												{/* Title */}
												<td className="px-6 py-4 max-w-md">
													<p className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
														{item.title}
													</p>
												</td>

												{/* Date */}
												<td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
													{new Date(item.created_at).toLocaleDateString('id-ID', {
														day: 'numeric',
														month: 'short',
														year: 'numeric',
													})}
												</td>

												{/* Status Slide Switch */}
												<td className="px-6 py-4">
													<div className="flex items-center gap-2.5">
														<button
															type="button"
															onClick={() => handleToggleStatus(item)}
															className={cn(
																'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner',
																item.active ? 'bg-[#5478FF]' : 'bg-gray-300'
															)}
															title={item.active ? 'Klik untuk Sembunyikan' : 'Klik untuk Tampilkan'}
														>
															<span
																className={cn(
																	'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
																	item.active ? 'translate-x-5' : 'translate-x-0'
																)}
															/>
														</button>
														<span
															className={cn(
																'text-[11px] font-bold',
																item.active ? 'text-emerald-700' : 'text-gray-500'
															)}
														>
															{item.active ? 'Tampil' : 'Disembunyikan'}
														</span>
													</div>
												</td>

												{/* Actions */}
												<td className="px-6 py-4 text-right">
													<div className="inline-flex items-center gap-1.5">
														<button
															type="button"
															onClick={() => openViewModal(item)}
															className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
															title="Lihat Foto Galeri"
														>
															<Eye className="h-4 w-4" />
														</button>
														<button
															type="button"
															onClick={() => openEditModal(item)}
															className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
															title="Edit Judul & Foto"
														>
															<Pencil className="h-4 w-4" />
														</button>
														<button
															type="button"
															onClick={() => openDeleteModal(item)}
															className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors"
															title="Hapus Galeri"
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

					{/* Pagination Footer */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 px-6 py-4 bg-[#FAF7F5]/50">
						<p className="text-xs text-muted-foreground">
							Menampilkan <strong className="text-foreground">{galleries.from || 0}</strong>–<strong className="text-foreground">{galleries.to || 0}</strong> dari <strong className="text-foreground">{galleries.total}</strong> galeri
						</p>
						<div className="flex items-center gap-1.5">
							{galleries.links.map((link, idx) => (
								<Link
									key={idx}
									href={link.url || '#'}
									preserveScroll
									className={cn(
										'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
										link.active
											? 'bg-[#5478FF] text-white shadow-sm'
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

			{/* 1. Modal Tambah Galeri Baru (Kategori + Judul + Multi-Foto) */}
			{createModalOpen && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto"
					onClick={createGuard.handleBackdropClick}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className={cn(
							'relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 transition-transform',
							createGuard.isShaking && 'animate-modal-shake'
						)}
					>
						<button
							onClick={createGuard.handleClose}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="text-xl font-bold text-foreground">Tambah Galeri Proyek</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Pilih kategori, masukkan judul, dan unggah foto-foto dokumentasi.</p>
						</div>

						<form onSubmit={handleCreateSubmit} className="mt-5 space-y-5">
							{/* Kategori Layanan */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
									Kategori Layanan <span className="text-red-500">*</span>
								</label>
								<select
									value={createForm.data.category}
									onChange={(e) => createForm.setData('category', e.target.value)}
									className="w-full h-11 rounded-xl border border-border bg-white px-3.5 text-xs font-semibold text-foreground focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								>
									{categories.map((c) => (
										<option key={c.value} value={c.value}>
											{c.label}
										</option>
									))}
								</select>
							</div>

							{/* Judul Galeri */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
									Judul Galeri / Proyek <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									value={createForm.data.title}
									onChange={(e) => createForm.setData('title', e.target.value)}
									required
									placeholder="Contoh: Pemasangan Kaca Film Gedung & Rumah Penolak Panas"
									className="w-full h-11 rounded-xl border border-border bg-white px-3.5 text-xs font-semibold text-foreground focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
								{createForm.errors.title && (
									<p className="mt-1 text-xs text-red-600">{createForm.errors.title}</p>
								)}
							</div>

							{/* Upload Foto (Multi-Upload) */}
							<div>
								<div className="flex items-center justify-between mb-2">
									<label className="block text-xs font-bold uppercase tracking-wider">
										Foto Dokumentasi <span className="text-red-500">*</span>
									</label>
									<span className="text-[11px] text-[#5478FF] font-semibold">
										Bisa upload &gt; 1 foto
									</span>
								</div>

								<div
									onClick={() => createFileInputRef.current?.click()}
									className="border-2 border-dashed border-slate-200 hover:border-[#5478FF] rounded-2xl p-5 text-center cursor-pointer bg-slate-50/60 hover:bg-blue-50/20 transition-all group"
								>
									<div className="flex flex-col items-center justify-center gap-1.5">
										<div className="h-11 w-11 rounded-2xl bg-blue-50 text-[#5478FF] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
											<UploadCloud className="h-6 w-6" />
										</div>
										<p className="text-xs font-bold text-slate-800">
											Klik untuk pilih foto dari komputer / HP
										</p>
										<p className="text-[10px] text-slate-400">
											Mendukung JPG, PNG, WEBP (Bisa pilih beberapa foto sekaligus)
										</p>
									</div>
								</div>

								<input
									ref={createFileInputRef}
									type="file"
									multiple
									accept="image/*,.heic,.heif"
									onChange={handleCreateImagesSelect}
									className="hidden"
								/>

								{/* Image Previews */}
								{createImagePreviews.length > 0 && (
									<div className="mt-3">
										<p className="text-[11px] font-bold text-slate-700 mb-2">
											{createImagePreviews.length} foto siap diunggah:
										</p>
										<div className="grid grid-cols-4 gap-2.5 max-h-40 overflow-y-auto p-1.5 bg-slate-100/60 rounded-xl">
											{createImagePreviews.map((src, i) => (
												<div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-white group shadow-xs">
													<img src={src} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
													<button
														type="button"
														onClick={() => removeCreateImage(i)}
														className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
														title="Hapus foto ini"
													>
														<X className="h-3 w-3" />
													</button>
												</div>
											))}
										</div>
									</div>
								)}
							</div>

							<div>
								<label className="flex items-center gap-2.5 cursor-pointer">
									<input
										type="checkbox"
										checked={createForm.data.active}
										onChange={(e) => createForm.setData('active', e.target.checked)}
										className="h-4 w-4 rounded text-[#5478FF] focus:ring-[#5478FF]"
									/>
									<span className="text-xs font-semibold text-foreground">Tampilkan galeri ini di halaman publik</span>
								</label>
							</div>

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
									disabled={createForm.processing || createForm.data.images.length === 0}
									className="rounded-full bg-[#5478FF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#4064EB] disabled:opacity-50 shadow-md"
								>
									{createForm.processing ? 'Menyimpan...' : `Simpan Galeri (${createForm.data.images.length} Foto)`}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 2. Modal Edit Galeri (Kategori + Judul + Manage Foto) */}
			{editModalOpen && selectedGallery && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto"
					onClick={editGuard.handleBackdropClick}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className={cn(
							'relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 transition-transform',
							editGuard.isShaking && 'animate-modal-shake'
						)}
					>
						<button
							onClick={editGuard.handleClose}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="text-xl font-bold text-foreground">Edit Galeri Proyek</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Perbarui kategori, judul, atau kelola foto-foto di galeri ini.</p>
						</div>

						<form onSubmit={handleEditSubmit} className="mt-5 space-y-5">
							{/* Kategori Layanan */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
									Kategori Layanan <span className="text-red-500">*</span>
								</label>
								<select
									value={editForm.data.category}
									onChange={(e) => editForm.setData('category', e.target.value)}
									className="w-full h-11 rounded-xl border border-border bg-white px-3.5 text-xs font-semibold text-foreground focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								>
									{categories.map((c) => (
										<option key={c.value} value={c.value}>
											{c.label}
										</option>
									))}
								</select>
							</div>

							{/* Judul Galeri */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
									Judul Galeri / Proyek <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									value={editForm.data.title}
									onChange={(e) => editForm.setData('title', e.target.value)}
									required
									className="w-full h-11 rounded-xl border border-border bg-white px-3.5 text-xs font-semibold text-foreground focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							{/* Existing & New Images */}
							<div>
								<div className="flex items-center justify-between mb-2">
									<label className="block text-xs font-bold uppercase tracking-wider">
										Foto dalam Galeri Ini ({editExistingImages.length + editNewImagePreviews.length} Foto)
									</label>
									<button
										type="button"
										onClick={() => editFileInputRef.current?.click()}
										className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5478FF] hover:underline"
									>
										<Plus className="h-3.5 w-3.5" />
										<span>Tambah Foto Lagi</span>
									</button>
								</div>

								<div className="grid grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-2 bg-slate-100/60 rounded-xl border border-slate-200">
									{/* Existing photos */}
									{editExistingImages.map((src, i) => (
										<div key={`existing-${i}`} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-white group shadow-xs">
											<img src={src} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
											{editExistingImages.length + editNewImagePreviews.length > 1 && (
												<button
													type="button"
													onClick={() => removeEditExistingImage(i)}
													className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
													title="Hapus foto ini"
												>
													<X className="h-3 w-3" />
												</button>
											)}
										</div>
									))}

									{/* Newly selected photos */}
									{editNewImagePreviews.map((src, i) => (
										<div key={`new-${i}`} className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-[#5478FF] bg-white group shadow-xs">
											<img src={src} alt={`New ${i + 1}`} className="h-full w-full object-cover" />
											<span className="absolute bottom-1 left-1 bg-[#5478FF] text-white text-[8px] font-bold px-1 rounded">Baru</span>
											<button
												type="button"
												onClick={() => removeEditNewImage(i)}
												className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
												title="Batal tambah foto ini"
											>
												<X className="h-3 w-3" />
											</button>
										</div>
									))}
								</div>

								<input
									ref={editFileInputRef}
									type="file"
									multiple
									accept="image/*,.heic,.heif"
									onChange={handleEditImagesSelect}
									className="hidden"
								/>
							</div>

							<div>
								<label className="flex items-center gap-2.5 cursor-pointer">
									<input
										type="checkbox"
										checked={editForm.data.active}
										onChange={(e) => editForm.setData('active', e.target.checked)}
										className="h-4 w-4 rounded text-[#5478FF] focus:ring-[#5478FF]"
									/>
									<span className="text-xs font-semibold text-foreground">Tampilkan galeri ini di publik</span>
								</label>
							</div>

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
									disabled={editForm.processing || (editExistingImages.length === 0 && editForm.data.images.length === 0)}
									className="rounded-full bg-[#5478FF] px-6 py-2 text-xs font-bold text-white hover:bg-[#4064EB] disabled:opacity-60 shadow-md"
								>
									{editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 3. Modal Lihat Foto Galeri (>1 Foto Slider Viewer) */}
			{viewModalOpen && selectedGallery && (() => {
				const photos = selectedGallery.all_images && selectedGallery.all_images.length > 0
					? selectedGallery.all_images
					: [selectedGallery.image];
				const currentPhoto = photos[currentViewImageIdx] || photos[0];

				return (
					<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
						<div className="relative max-w-2xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 space-y-4">
							<button
								onClick={() => setViewModalOpen(false)}
								className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
							>
								<X className="h-5 w-5" />
							</button>

							<div>
								<h3 className="font-display text-lg sm:text-xl font-bold text-foreground leading-snug pr-8">
									{selectedGallery.title}
								</h3>
								<p className="text-[11px] text-muted-foreground mt-1">
									Total {photos.length} Foto &bull; Diunggah pada {new Date(selectedGallery.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
								</p>
							</div>

							{/* Photo Viewer with Prev / Next */}
							<div className="relative overflow-hidden rounded-2xl border border-border aspect-[16/10] w-full bg-slate-950 flex items-center justify-center">
								<img
									src={currentPhoto}
									alt={`${selectedGallery.title} - ${currentViewImageIdx + 1}`}
									className="h-full w-full object-contain"
								/>

								{photos.length > 1 && (
									<>
										<button
											type="button"
											onClick={() => setCurrentViewImageIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
											className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all shadow-md"
										>
											<ChevronLeft className="h-5 w-5" />
										</button>
										<button
											type="button"
											onClick={() => setCurrentViewImageIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
											className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all shadow-md"
										>
											<ChevronRight className="h-5 w-5" />
										</button>

										<span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
											{currentViewImageIdx + 1} / {photos.length}
										</span>
									</>
								)}
							</div>

							{/* Thumbnail Strip */}
							{photos.length > 1 && (
								<div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-50 rounded-xl">
									{photos.map((img, idx) => (
										<button
											key={idx}
											type="button"
											onClick={() => setCurrentViewImageIdx(idx)}
											className={cn(
												'relative h-14 w-18 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
												idx === currentViewImageIdx ? 'border-[#5478FF] ring-2 ring-[#5478FF]/30' : 'border-transparent opacity-60 hover:opacity-100'
											)}
										>
											<img src={img} alt="Thumb" className="h-full w-full object-cover" />
										</button>
									))}
								</div>
							)}

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
				);
			})()}

			{/* 4. Modal Konfirmasi Hapus Galeri */}
			{deleteModalOpen && selectedGallery && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-5">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
							<Trash2 className="h-6 w-6" />
						</div>

						<div>
							<h3 className="font-display text-xl font-bold text-foreground">
								Hapus Galeri Proyek
							</h3>
							<p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
								Apakah Anda yakin ingin menghapus galeri <strong className="text-foreground">{selectedGallery.title}</strong> beserta seluruh foto di dalamnya?
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


