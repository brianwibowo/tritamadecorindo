import AdminLayout from '@/Layouts/AdminLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	Camera,
	CheckCircle2,
	Eye,
	Image as ImageIcon,
	Pencil,
	Plus,
	RotateCcw,
	Search,
	Trash2,
	X,
	XCircle
} from 'lucide-react';
import { useRef, useState } from 'react';
import type { PaginatedData } from '@/types';

interface GalleryItem {
	id: number;
	title: string;
	caption?: string | null;
	category: string;
	category_label: string;
	image: string;
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
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Create Form
	const createForm = useForm<{
		title: string;
		caption: string;
		category: string;
		active: boolean;
		image: File | null;
		image_url: string;
	}>({
		title: '',
		caption: '',
		category: 'fasilitas',
		active: true,
		image: null,
		image_url: '/images/products/cengkeh-maluku.webp',
	});

	// Edit Form
	const editForm = useForm<{
		title: string;
		caption: string;
		category: string;
		active: boolean;
		image: File | null;
		_method: string;
	}>({
		title: '',
		caption: '',
		category: 'fasilitas',
		active: true,
		image: null,
		_method: 'PUT',
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
		setImagePreview(item.image);
		editForm.setData({
			title: item.title,
			caption: item.caption || '',
			category: item.category,
			active: Boolean(item.active),
			image: null,
			_method: 'PUT',
		});
		setEditModalOpen(true);
	};

	const openViewModal = (item: GalleryItem) => {
		setSelectedGallery(item);
		setViewModalOpen(true);
	};

	const openDeleteModal = (item: GalleryItem) => {
		setSelectedGallery(item);
		setDeleteModalOpen(true);
	};

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
		const file = e.target.files?.[0];
		if (file) {
			if (isEdit) {
				editForm.setData('image', file);
			} else {
				createForm.setData('image', file);
			}
			const reader = new FileReader();
			reader.onload = () => setImagePreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleCreateSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createForm.post(route('admin.galleries.store'), {
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
				setImagePreview(null);
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
				setImagePreview(null);
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

	const getCategoryBadge = (category: string) => {
		const styles: Record<string, { bg: string; text: string; ring: string }> = {
			fasilitas: { bg: 'bg-blue-500/10', text: 'text-blue-800', ring: 'ring-blue-500/20' },
			laboratorium: { bg: 'bg-purple-500/10', text: 'text-purple-800', ring: 'ring-purple-500/20' },
			perkebunan: { bg: 'bg-emerald-500/10', text: 'text-emerald-800', ring: 'ring-emerald-500/20' },
			ekspor: { bg: 'bg-amber-500/10', text: 'text-amber-800', ring: 'ring-amber-500/20' },
		};

		const meta = styles[category] || { bg: 'bg-gray-100', text: 'text-gray-800', ring: 'ring-gray-200' };
		const labels: Record<string, string> = {
			fasilitas: 'Fasilitas & QC',
			laboratorium: 'Uji Laboratorium',
			perkebunan: 'Sentra Perkebunan',
			ekspor: 'Logistik & Ekspor',
		};

		return (
			<span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1', meta.bg, meta.text, meta.ring)}>
				{labels[category] || category}
			</span>
		);
	};

	return (
		<AdminLayout header="Galeri Fasilitas & Ekspor">
			<Head title="Manajemen Galeri — Panel Admin LFM" />

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
								placeholder="Cari judul, caption galeri..."
								className="w-full h-10 rounded-xl border border-border bg-[#FDFBF9] pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-[#80070A]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</form>

						<select
							value={filters.category || ''}
							onChange={(e) => handleFilterChange({ category: e.target.value })}
							className="h-10 rounded-xl border border-border bg-[#FDFBF9] px-3 text-xs font-semibold text-foreground focus:border-[#80070A]"
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
								onClick={() => router.get(route('admin.galleries.index'))}
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
							setImagePreview('/images/products/cengkeh-maluku.webp');
							setCreateModalOpen(true);
						}}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#80070A] px-5 py-2.5 text-xs font-bold text-white hover:brightness-110 transition-all shadow-md active:scale-95 whitespace-nowrap"
					>
						<Plus className="h-4 w-4" />
						<span>Tambah Foto Galeri</span>
					</button>
				</div>

				{/* Galleries Table Card */}
				<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-6 py-4">Foto & Judul Galeri</th>
									<th className="px-6 py-4">Kategori</th>
									<th className="px-6 py-4">Caption / Penjelasan</th>
									<th className="px-6 py-4">Status & Slide Switch</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{galleries.data.length === 0 ? (
									<tr>
										<td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
											Belum ada foto galeri yang ditambahkan.
										</td>
									</tr>
								) : (
									galleries.data.map((item) => (
										<tr key={item.id} className="hover:bg-secondary/30 transition-colors">
											{/* Photo & Title */}
											<td className="px-6 py-4">
												<div className="flex items-center gap-3.5">
													<div className="h-14 w-14 overflow-hidden rounded-2xl bg-secondary shrink-0 border border-border/60 shadow-sm">
														<img
															src={item.image}
															alt={item.title}
															className="h-full w-full object-cover"
														/>
													</div>
													<div>
														<p className="font-bold text-foreground line-clamp-1 max-w-xs">{item.title}</p>
														<p className="text-[11px] text-muted-foreground mt-0.5">
															{new Date(item.created_at).toLocaleDateString('id-ID', {
																day: 'numeric',
																month: 'short',
																year: 'numeric',
															})}
														</p>
													</div>
												</div>
											</td>

											{/* Category */}
											<td className="px-6 py-4">{getCategoryBadge(item.category)}</td>

											{/* Caption */}
											<td className="px-6 py-4 max-w-sm">
												<p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed font-normal">
													{item.caption || '-'}
												</p>
											</td>

											{/* Status Slide Switch */}
											<td className="px-6 py-4">
												<div className="flex items-center gap-2.5">
													<button
														type="button"
														onClick={() => handleToggleStatus(item)}
														className={cn(
															'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner',
															item.active ? 'bg-[#80070A]' : 'bg-gray-300'
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
														title="Lihat Detail & Caption"
													>
														<Eye className="h-4 w-4" />
													</button>
													<button
														type="button"
														onClick={() => openEditModal(item)}
														className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
														title="Edit Galeri"
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
									))
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination Footer - Always Visible */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 px-6 py-4 bg-[#FAF7F5]/50">
						<p className="text-xs text-muted-foreground">
							Menampilkan <strong className="text-foreground">{galleries.from || 0}</strong>–<strong className="text-foreground">{galleries.to || 0}</strong> dari <strong className="text-foreground">{galleries.total}</strong> foto galeri
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

			{/* 1. Modal Tambah Foto Galeri */}
			{createModalOpen && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8">
						<button
							onClick={() => setCreateModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="font-display text-xl font-bold text-foreground">Tambah Foto Galeri Baru</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Unggah dokumentasi fasilitas, uji laboratorium, atau ekspor.</p>
						</div>

						<form onSubmit={handleCreateSubmit} className="mt-5 space-y-4">
							{/* Image preview & upload */}
							<div className="flex flex-col items-center justify-center gap-2.5">
								<div className="relative h-44 w-full overflow-hidden rounded-2xl bg-secondary border border-border group">
									{imagePreview ? (
										<img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
									) : (
										<div className="flex h-full w-full items-center justify-center text-muted-foreground">
											<ImageIcon className="h-10 w-10" />
										</div>
									)}
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="absolute bottom-3 right-3 rounded-full bg-[#80070A] text-white p-2 shadow-lg hover:brightness-110 flex items-center gap-1.5 text-xs font-semibold px-3"
									>
										<Camera className="h-3.5 w-3.5" />
										<span>Pilih Foto</span>
									</button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*,.heic,.heif"
									onChange={(e) => handleImageSelect(e, false)}
									className="hidden"
								/>
								<span className="text-[10px] text-muted-foreground">Mendukung format JPG, PNG, WEBP, HEIC (Maks. 5MB)</span>
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Judul Dokumentasi</label>
								<input
									type="text"
									value={createForm.data.title}
									onChange={(e) => createForm.setData('title', e.target.value)}
									required
									placeholder="Contoh: Sortasi & Pembersihan Cengkeh Maluku Standar Ekspor"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#80070A]"
								/>
								{createForm.errors.title && <p className="mt-1 text-xs text-red-600">{createForm.errors.title}</p>}
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Kategori Galeri</label>
								<select
									value={createForm.data.category}
									onChange={(e) => createForm.setData('category', e.target.value)}
									className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#80070A]"
								>
									{categories.map((c) => (
										<option key={c.value} value={c.value}>
											{c.label}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Caption / Deskripsi Lengkap</label>
								<textarea
									value={createForm.data.caption}
									onChange={(e) => createForm.setData('caption', e.target.value)}
									rows={3}
									placeholder="Penjelasan detail proses sortasi, pengujian laboratorium, atau sertifikasi mutu..."
									className="w-full rounded-xl border border-border bg-white p-3 text-xs text-foreground focus:border-[#80070A]"
								/>
							</div>

							<div>
								<label className="flex items-center gap-2.5 cursor-pointer">
									<input
										type="checkbox"
										checked={createForm.data.active}
										onChange={(e) => createForm.setData('active', e.target.checked)}
										className="h-4 w-4 rounded text-[#80070A] focus:ring-[#80070A]"
									/>
									<span className="text-xs font-semibold text-foreground">Tampilkan foto ini di halaman galeri publik</span>
								</label>
							</div>

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
									{createForm.processing ? 'Menyimpan...' : 'Simpan Galeri'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 2. Modal Edit Foto Galeri */}
			{editModalOpen && selectedGallery && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8">
						<button
							onClick={() => setEditModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="font-display text-xl font-bold text-foreground">Edit Foto Galeri</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Perbarui judul, kategori, caption, atau foto dokumentasi.</p>
						</div>

						<form onSubmit={handleEditSubmit} className="mt-5 space-y-4">
							{/* Image preview & upload */}
							<div className="flex flex-col items-center justify-center gap-2.5">
								<div className="relative h-44 w-full overflow-hidden rounded-2xl bg-secondary border border-border group">
									{imagePreview ? (
										<img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
									) : (
										<div className="flex h-full w-full items-center justify-center text-muted-foreground">
											<ImageIcon className="h-10 w-10" />
										</div>
									)}
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="absolute bottom-3 right-3 rounded-full bg-[#80070A] text-white p-2 shadow-lg hover:brightness-110 flex items-center gap-1.5 text-xs font-semibold px-3"
									>
										<Camera className="h-3.5 w-3.5" />
										<span>Ganti Foto</span>
									</button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*,.heic,.heif"
									onChange={(e) => handleImageSelect(e, true)}
									className="hidden"
								/>
								<span className="text-[10px] text-muted-foreground">Mendukung format JPG, PNG, WEBP, HEIC (Maks. 5MB)</span>
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Judul Dokumentasi</label>
								<input
									type="text"
									value={editForm.data.title}
									onChange={(e) => editForm.setData('title', e.target.value)}
									required
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#80070A]"
								/>
								{editForm.errors.title && <p className="mt-1 text-xs text-red-600">{editForm.errors.title}</p>}
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Kategori Galeri</label>
								<select
									value={editForm.data.category}
									onChange={(e) => editForm.setData('category', e.target.value)}
									className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#80070A]"
								>
									{categories.map((c) => (
										<option key={c.value} value={c.value}>
											{c.label}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Caption / Deskripsi Lengkap</label>
								<textarea
									value={editForm.data.caption}
									onChange={(e) => editForm.setData('caption', e.target.value)}
									rows={3}
									className="w-full rounded-xl border border-border bg-white p-3 text-xs text-foreground focus:border-[#80070A]"
								/>
							</div>

							<div>
								<label className="flex items-center gap-2.5 cursor-pointer">
									<input
										type="checkbox"
										checked={editForm.data.active}
										onChange={(e) => editForm.setData('active', e.target.checked)}
										className="h-4 w-4 rounded text-[#80070A] focus:ring-[#80070A]"
									/>
									<span className="text-xs font-semibold text-foreground">Tampilkan foto ini di halaman galeri publik</span>
								</label>
							</div>

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

			{/* 3. Modal Lihat Detail Foto & Caption */}
			{viewModalOpen && selectedGallery && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 space-y-5">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="overflow-hidden rounded-2xl border border-border max-h-72 w-full bg-secondary">
							<img
								src={selectedGallery.image}
								alt={selectedGallery.title}
								className="h-full w-full object-cover"
							/>
						</div>

						<div className="space-y-3 text-xs">
							<div className="flex items-center justify-between">
								{getCategoryBadge(selectedGallery.category)}
								<span className="text-muted-foreground text-[11px]">
									{new Date(selectedGallery.created_at).toLocaleDateString('id-ID', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</span>
							</div>

							<h3 className="font-display text-lg font-bold text-foreground leading-snug">
								{selectedGallery.title}
							</h3>

							{selectedGallery.caption && (
								<div className="bg-secondary/40 p-4 rounded-2xl">
									<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-1">
										Caption & Penjelasan
									</h5>
									<p className="text-foreground leading-relaxed">
										{selectedGallery.caption}
									</p>
								</div>
							)}
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

			{/* 4. Modal Konfirmasi Hapus Foto Galeri */}
			{deleteModalOpen && selectedGallery && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-5">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
							<Trash2 className="h-6 w-6" />
						</div>

						<div>
							<h3 className="font-display text-xl font-bold text-foreground">
								Hapus Foto Galeri
							</h3>
							<p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
								Apakah Anda yakin ingin menghapus dokumentasi galeri <strong className="text-foreground">{selectedGallery.title}</strong>?
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
