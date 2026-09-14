import useModalGuard from '@/hooks/useModalGuard';
import AdminLayout from '@/Layouts/AdminLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	Camera,
	CheckCircle2,
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
	XCircle,
} from 'lucide-react';
import { useRef, useState } from 'react';
import type { PaginatedData } from '@/types';

interface GalleryItem {
	id: number;
	title?: string | null;
	caption?: string | null;
	category?: string;
	category_label?: string;
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
	const [singleImagePreview, setSingleImagePreview] = useState<string | null>(null);
	const [multiImagePreviews, setMultiImagePreviews] = useState<string[]>([]);
	const createFileInputRef = useRef<HTMLInputElement>(null);
	const editFileInputRef = useRef<HTMLInputElement>(null);

	// Create Form (Supports Multiple Images & Description)
	const createForm = useForm<{
		caption: string;
		active: boolean;
		images: File[];
	}>({
		caption: '',
		active: true,
		images: [],
	});

	// Edit Form (Single image replacement & description)
	const editForm = useForm<{
		caption: string;
		active: boolean;
		image: File | null;
		_method: string;
	}>({
		caption: '',
		active: true,
		image: null,
		_method: 'PUT',
	});

	const isCreateDirty = Boolean(createForm.data.caption.trim() || createForm.data.images.length > 0);
	const isEditDirty = editForm.isDirty;

	const createGuard = useModalGuard({
		isDirty: isCreateDirty,
		onClose: () => {
			setCreateModalOpen(false);
			createForm.reset();
			setMultiImagePreviews([]);
		},
	});

	const editGuard = useModalGuard({
		isDirty: isEditDirty,
		onClose: () => {
			setEditModalOpen(false);
			editForm.reset();
			setSingleImagePreview(null);
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
		setSingleImagePreview(item.image);
		editForm.setData({
			caption: item.caption || '',
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

	const handleMultipleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			createForm.setData('images', files);
			const previews: string[] = [];
			let loaded = 0;
			files.forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					previews.push(reader.result as string);
					loaded++;
					if (loaded === files.length) {
						setMultiImagePreviews([...previews]);
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const handleSingleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			editForm.setData('image', file);
			const reader = new FileReader();
			reader.onload = () => setSingleImagePreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleCreateSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createForm.post(route('admin.galleries.store'), {
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
				setMultiImagePreviews([]);
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
				setSingleImagePreview(null);
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
					{/* Search Filter */}
					<div className="flex flex-wrap items-center gap-3 flex-1">
						<form onSubmit={handleSearchSubmit} className="relative flex-1 sm:max-w-md">
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari deskripsi foto galeri..."
								className="w-full h-10 rounded-xl border border-border bg-[#FDFBF9] pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-[#5478FF]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</form>

						{filters.search && (
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
							setMultiImagePreviews([]);
							setCreateModalOpen(true);
						}}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5478FF] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#4064EB] transition-all shadow-md active:scale-95 whitespace-nowrap"
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
									<th className="px-6 py-4">Foto Dokumentasi</th>
									<th className="px-6 py-4">Deskripsi / Keterangan</th>
									<th className="px-6 py-4">Tanggal Unggah</th>
									<th className="px-6 py-4">Status Publik</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{galleries.data.length === 0 ? (
									<tr>
										<td colSpan={5} className="px-6 py-16 text-center">
											<div className="flex flex-col items-center gap-3">
												<div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
													<ImageIcon className="h-8 w-8 text-slate-400" />
												</div>
												<p className="text-sm font-bold text-foreground">Belum ada foto galeri</p>
												<p className="text-xs text-muted-foreground max-w-xs">Unggah foto dokumentasi hasil pengerjaan proyek Anda (bisa banyak foto sekaligus).</p>
												<button
													type="button"
													onClick={() => {
														createForm.reset();
														setMultiImagePreviews([]);
														setCreateModalOpen(true);
													}}
													className="inline-flex items-center gap-1.5 rounded-xl bg-[#5478FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#4064EB] shadow-sm"
												>
													<Plus className="h-3.5 w-3.5" />
													Tambah Foto Galeri Pertama
												</button>
											</div>
										</td>
									</tr>
								) : (
									galleries.data.map((item) => (
										<tr key={item.id} className="hover:bg-secondary/30 transition-colors">
											{/* Photo */}
											<td className="px-6 py-4">
												<div className="h-16 w-20 overflow-hidden rounded-xl bg-secondary shrink-0 border border-border/60 shadow-xs">
													<img
														src={item.image}
														alt={item.caption || 'Foto Galeri'}
														className="h-full w-full object-cover"
													/>
												</div>
											</td>

											{/* Description / Caption */}
											<td className="px-6 py-4 max-w-md">
												<p className="text-xs text-slate-800 font-medium line-clamp-2 leading-relaxed">
													{item.caption || item.title || <span className="text-muted-foreground italic">Tanpa deskripsi</span>}
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
														title="Lihat Detail Foto"
													>
														<Eye className="h-4 w-4" />
													</button>
													<button
														type="button"
														onClick={() => openEditModal(item)}
														className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
														title="Edit Foto & Deskripsi"
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

					{/* Pagination Footer */}
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

			{/* 1. Modal Tambah Foto Galeri (Bisa Upload > 1 Foto) */}
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
							<h3 className="text-xl font-bold text-foreground">Tambah Foto Galeri</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Unggah satu atau beberapa foto dokumentasi proyek sekaligus.</p>
						</div>

						<form onSubmit={handleCreateSubmit} className="mt-5 space-y-5">
							{/* Multi Image Upload Box */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-2">
									Pilih Foto Proyek <span className="text-red-500">*</span>
									<span className="ml-1 text-[11px] font-normal text-muted-foreground">(Bisa pilih lebih dari 1 foto)</span>
								</label>

								<div
									onClick={() => createFileInputRef.current?.click()}
									className="border-2 border-dashed border-slate-200 hover:border-[#5478FF] rounded-2xl p-6 text-center cursor-pointer bg-slate-50/60 hover:bg-blue-50/20 transition-all group"
								>
									<div className="flex flex-col items-center justify-center gap-2">
										<div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#5478FF] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
											<UploadCloud className="h-6 w-6" />
										</div>
										<p className="text-xs font-bold text-slate-800">
											Klik untuk pilih foto dari perangkat
										</p>
										<p className="text-[11px] text-slate-400">
											Mendukung JPG, PNG, WEBP (Bisa pilih multiple file)
										</p>
									</div>
								</div>

								<input
									ref={createFileInputRef}
									type="file"
									multiple
									accept="image/*,.heic,.heif"
									onChange={handleMultipleImageSelect}
									className="hidden"
								/>

								{/* Selected Images Previews */}
								{multiImagePreviews.length > 0 && (
									<div className="mt-3">
										<p className="text-[11px] font-bold text-[#5478FF] mb-2">
											{multiImagePreviews.length} foto dipilih:
										</p>
										<div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1 bg-slate-100/60 rounded-xl">
											{multiImagePreviews.map((src, i) => (
												<div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-white shadow-xs">
													<img src={src} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
												</div>
											))}
										</div>
									</div>
								)}
							</div>

							{/* Description Field */}
							<div>
								<div className="flex items-center justify-between mb-1.5">
									<label className="block text-xs font-bold uppercase tracking-wider">
										Deskripsi / Keterangan Proyek
									</label>
									<span className="text-[10px] text-muted-foreground">
										{createForm.data.caption.length}/500
									</span>
								</div>
								<textarea
									value={createForm.data.caption}
									onChange={(e) => createForm.setData('caption', e.target.value)}
									rows={3}
									maxLength={500}
									placeholder="Contoh: Pemasangan kaca film riben tolak panas 80% pada ruko 3 lantai di Cikarang."
									className="w-full rounded-xl border border-border bg-white p-3 text-xs text-foreground focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
								<p className="mt-1 text-[10px] text-muted-foreground">Deskripsi ini akan tampil pada foto saat dilihat oleh pengunjung.</p>
							</div>

							<div>
								<label className="flex items-center gap-2.5 cursor-pointer">
									<input
										type="checkbox"
										checked={createForm.data.active}
										onChange={(e) => createForm.setData('active', e.target.checked)}
										className="h-4 w-4 rounded text-[#5478FF] focus:ring-[#5478FF]"
									/>
									<span className="text-xs font-semibold text-foreground">Tampilkan langsung di halaman galeri publik</span>
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
									{createForm.processing ? 'Mengunggah...' : `Simpan ${createForm.data.images.length > 0 ? `(${createForm.data.images.length} Foto)` : ''}`}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 2. Modal Edit Foto Galeri */}
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
							<h3 className="text-xl font-bold text-foreground">Edit Foto Galeri</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Perbarui foto atau deskripsi dokumentasi proyek.</p>
						</div>

						<form onSubmit={handleEditSubmit} className="mt-5 space-y-4">
							{/* Image preview & upload */}
							<div className="flex flex-col items-center justify-center gap-2.5">
								<div className="relative h-48 w-full overflow-hidden rounded-2xl bg-secondary border border-border group">
									{singleImagePreview ? (
										<img src={singleImagePreview} alt="Preview" className="h-full w-full object-cover" />
									) : (
										<div className="flex h-full w-full items-center justify-center text-muted-foreground">
											<ImageIcon className="h-10 w-10" />
										</div>
									)}
									<button
										type="button"
										onClick={() => editFileInputRef.current?.click()}
										className="absolute bottom-3 right-3 rounded-full bg-[#5478FF] text-white p-2 shadow-lg hover:bg-[#4064EB] flex items-center gap-1.5 text-xs font-semibold px-3"
									>
										<Camera className="h-3.5 w-3.5" />
										<span>Ganti Foto</span>
									</button>
								</div>
								<input
									ref={editFileInputRef}
									type="file"
									accept="image/*,.heic,.heif"
									onChange={handleSingleImageSelect}
									className="hidden"
								/>
								<span className="text-[10px] text-muted-foreground">Mendukung format JPG, PNG, WEBP</span>
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">
									Deskripsi / Keterangan Proyek
								</label>
								<textarea
									value={editForm.data.caption}
									onChange={(e) => editForm.setData('caption', e.target.value)}
									rows={3}
									placeholder="Tuliskan keterangan detail hasil pengerjaan..."
									className="w-full rounded-xl border border-border bg-white p-3 text-xs text-foreground focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
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
									<span className="text-xs font-semibold text-foreground">Tampilkan foto ini di galeri publik</span>
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

			{/* 3. Modal Lihat Detail Foto & Deskripsi */}
			{viewModalOpen && selectedGallery && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 space-y-5">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="overflow-hidden rounded-2xl border border-border max-h-80 w-full bg-secondary">
							<img
								src={selectedGallery.image}
								alt="Foto Dokumentasi"
								className="h-full w-full object-cover"
							/>
						</div>

						<div className="space-y-3 text-xs">
							<div className="flex items-center justify-between text-muted-foreground text-[11px]">
								<span>Tanggal Unggah</span>
								<span>
									{new Date(selectedGallery.created_at).toLocaleDateString('id-ID', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</span>
							</div>

							{selectedGallery.caption ? (
								<div className="bg-secondary/40 p-4 rounded-2xl">
									<h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] mb-1">
										Deskripsi Proyek
									</h5>
									<p className="text-foreground leading-relaxed text-xs sm:text-sm font-medium">
										{selectedGallery.caption}
									</p>
								</div>
							) : (
								<p className="text-muted-foreground italic text-center py-2">Tidak ada keterangan tertulis.</p>
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
								Apakah Anda yakin ingin menghapus foto dokumentasi galeri ini? Tindakan ini tidak dapat dibatalkan.
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

