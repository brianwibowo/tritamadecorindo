import AdminLayout from '@/Layouts/AdminLayout';
import { cn, slugify } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	CheckCircle2,
	Eye,
	Lock,
	Pencil,
	Plus,
	Tag,
	Trash2,
	X,
	XCircle
} from 'lucide-react';
import { useState } from 'react';
import type { Category, PaginatedData } from '@/types';

interface CategoryWithCount extends Category {
	products_count?: number;
}

interface Props {
	categories: PaginatedData<CategoryWithCount>;
}

export default function CategoriesIndex({ categories }: Props) {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<CategoryWithCount | null>(null);

	// Create Form
	const createForm = useForm({
		name: '',
		slug: '',
		description: '',
		image: '',
		active: true,
	});

	// Edit Form
	const editForm = useForm({
		name: '',
		slug: '',
		description: '',
		image: '',
		active: true,
		_method: 'PUT',
	});

	// Auto generate slug from name
	const handleNameChange = (name: string, isEdit = false) => {
		const generatedSlug = slugify(name);

		if (isEdit) {
			editForm.setData((prev) => ({ ...prev, name, slug: generatedSlug }));
		} else {
			createForm.setData((prev) => ({ ...prev, name, slug: generatedSlug }));
		}
	};

	const handleToggleStatus = (category: CategoryWithCount) => {
		router.patch(
			route('admin.categories.toggle', category.id),
			{},
			{ preserveScroll: true }
		);
	};

	const openEditModal = (cat: CategoryWithCount) => {
		setSelectedCategory(cat);
		editForm.setData({
			name: cat.name,
			slug: cat.slug,
			description: cat.description || '',
			image: cat.image || '',
			active: Boolean(cat.active),
			_method: 'PUT',
		});
		setEditModalOpen(true);
	};

	const openViewModal = (cat: CategoryWithCount) => {
		setSelectedCategory(cat);
		setViewModalOpen(true);
	};

	const openDeleteModal = (cat: CategoryWithCount) => {
		setSelectedCategory(cat);
		setDeleteModalOpen(true);
	};

	const handleCreateSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createForm.post(route('admin.categories.store'), {
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
			},
		});
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedCategory) return;
		editForm.post(route('admin.categories.update', selectedCategory.id), {
			onSuccess: () => {
				setEditModalOpen(false);
				editForm.reset();
			},
		});
	};

	const handleDeleteSubmit = () => {
		if (!selectedCategory) return;
		router.delete(route('admin.categories.destroy', selectedCategory.id), {
			onSuccess: () => {
				setDeleteModalOpen(false);
				setSelectedCategory(null);
			},
		});
	};

	return (
		<AdminLayout header="Kategori Komoditas">
			<Head title="Kategori Komoditas — Panel Admin LFM" />

			<div className="space-y-6">
				{/* Top Controls Toolbar */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border/60 shadow-sm">
					<div>
						<h2 className="font-display text-lg font-bold text-foreground">Daftar Kategori Rempah</h2>
						<p className="text-xs text-muted-foreground">Kelola kategori dan klasifikasi komoditas ekspor.</p>
					</div>

					<button
						type="button"
						onClick={() => {
							createForm.reset();
							setCreateModalOpen(true);
						}}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#80070A] px-5 py-2.5 text-xs font-bold text-white hover:brightness-110 transition-all shadow-md active:scale-95 whitespace-nowrap"
					>
						<Plus className="h-4 w-4" />
						<span>Tambah Kategori</span>
					</button>
				</div>

				{/* Categories Table Card */}
				<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-6 py-4">Nama Kategori</th>
									<th className="px-6 py-4">Slug URL</th>
									<th className="px-6 py-4">Jumlah Produk</th>
									<th className="px-6 py-4">Status & Slide Switch</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{categories.data.length === 0 ? (
									<tr>
										<td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
											Belum ada kategori yang ditambahkan.
										</td>
									</tr>
								) : (
									categories.data.map((category) => (
										<tr key={category.id} className="hover:bg-secondary/30 transition-colors">
											<td className="px-6 py-4 font-bold text-foreground">
												<div className="flex items-center gap-3">
													<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#80070A]/10 text-[#80070A]">
														<Tag className="h-4 w-4" />
													</div>
													<div>
														<p className="font-bold text-foreground">{category.name}</p>
														{category.description && (
															<p className="text-[11px] text-muted-foreground line-clamp-1 max-w-xs font-normal">
																{category.description}
															</p>
														)}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 font-mono text-[11px] text-muted-foreground">/{category.slug}</td>
											<td className="px-6 py-4 font-semibold text-foreground">
												<span className="rounded-full bg-secondary px-2.5 py-1 text-xs">
													{category.products_count ?? 0} Produk
												</span>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2.5">
													<button
														type="button"
														onClick={() => handleToggleStatus(category)}
														className={cn(
															'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner',
															category.active ? 'bg-[#80070A]' : 'bg-gray-300'
														)}
														title={category.active ? 'Klik untuk Nonaktifkan' : 'Klik untuk Aktifkan'}
													>
														<span
															className={cn(
																'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
																category.active ? 'translate-x-5' : 'translate-x-0'
															)}
														/>
													</button>
													<span
														className={cn(
															'text-[11px] font-bold',
															category.active ? 'text-emerald-700' : 'text-gray-500'
														)}
													>
														{category.active ? 'Aktif' : 'Nonaktif'}
													</span>
												</div>
											</td>
											<td className="px-6 py-4 text-right">
												<div className="inline-flex items-center gap-1.5">
													<button
														type="button"
														onClick={() => openViewModal(category)}
														className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
														title="Lihat Detail"
													>
														<Eye className="h-4 w-4" />
													</button>
													<button
														type="button"
														onClick={() => openEditModal(category)}
														className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
														title="Edit Kategori"
													>
														<Pencil className="h-4 w-4" />
													</button>
													<button
														type="button"
														onClick={() => openDeleteModal(category)}
														className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors"
														title="Hapus Kategori"
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
							Menampilkan <strong className="text-foreground">{categories.from || 0}</strong>–<strong className="text-foreground">{categories.to || 0}</strong> dari <strong className="text-foreground">{categories.total}</strong> kategori
						</p>
						<div className="flex items-center gap-1.5">
							{categories.links.map((link, idx) => (
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

			{/* 1. Modal Tambah Kategori */}
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
							<h3 className="font-display text-xl font-bold text-foreground">Tambah Kategori Baru</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Buat kategori klasifikasi komoditas rempah.</p>
						</div>

						<form onSubmit={handleCreateSubmit} className="mt-5 space-y-4">
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">
									Nama Kategori <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									value={createForm.data.name}
									onChange={(e) => handleNameChange(e.target.value, false)}
									required
									placeholder="Contoh: Rempah Kering & Biji"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#80070A]"
								/>
								{createForm.errors.name && <p className="mt-1 text-xs text-red-600">{createForm.errors.name}</p>}
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">
									Slug URL <span className="text-muted-foreground font-normal">(Otomatis)</span>
								</label>
								<div className="relative">
									<input
										type="text"
										value={createForm.data.slug}
										readOnly
										tabIndex={-1}
										placeholder="otomatis-mengikuti-nama-kategori"
										className="w-full h-10 rounded-xl border border-border/80 bg-[#F4EFEA]/80 pl-8 pr-3 text-xs font-mono text-muted-foreground cursor-not-allowed select-none"
									/>
									<Lock className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground/70" />
								</div>
								{createForm.errors.slug && <p className="mt-1 text-xs text-red-600">{createForm.errors.slug}</p>}
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Deskripsi Kategori</label>
								<textarea
									value={createForm.data.description}
									onChange={(e) => createForm.setData('description', e.target.value)}
									rows={3}
									placeholder="Penjelasan ringkas tentang komoditas dalam kategori ini..."
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
									<span className="text-xs font-semibold text-foreground">Aktifkan kategori ini di etalase publik</span>
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
									{createForm.processing ? 'Menyimpan...' : 'Simpan Kategori'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 2. Modal Edit Kategori */}
			{editModalOpen && selectedCategory && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
					<div className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8">
						<button
							onClick={() => setEditModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<h3 className="font-display text-xl font-bold text-foreground">Edit Kategori</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Perbarui nama, slug, atau status kategori.</p>
						</div>

						<form onSubmit={handleEditSubmit} className="mt-5 space-y-4">
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">
									Nama Kategori <span className="text-red-500">*</span>
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

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">
									Slug URL <span className="text-muted-foreground font-normal">(Otomatis)</span>
								</label>
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

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Deskripsi</label>
								<textarea
									value={editForm.data.description}
									onChange={(e) => editForm.setData('description', e.target.value)}
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
									<span className="text-xs font-semibold text-foreground">Aktifkan kategori ini di etalase publik</span>
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

			{/* 3. Modal Lihat Detail Kategori */}
			{viewModalOpen && selectedCategory && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-6">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex items-center gap-3 border-b border-border/60 pb-5">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#80070A] text-[#F8C300]">
								<Tag className="h-6 w-6" />
							</div>
							<div>
								<h3 className="font-display text-xl font-bold text-foreground">{selectedCategory.name}</h3>
								<p className="font-mono text-xs text-muted-foreground">slug: /{selectedCategory.slug}</p>
							</div>
						</div>

						<dl className="space-y-3 text-xs">
							<div>
								<dt className="text-muted-foreground mb-1">Deskripsi</dt>
								<dd className="font-medium text-foreground bg-secondary/40 p-3 rounded-xl leading-relaxed">
									{selectedCategory.description || 'Tidak ada deskripsi.'}
								</dd>
							</div>
							<div className="flex justify-between py-1 border-b border-border/40">
								<dt className="text-muted-foreground">Total Produk Terdaftar</dt>
								<dd className="font-bold text-foreground">{selectedCategory.products_count ?? 0} Produk</dd>
							</div>
							<div className="flex justify-between py-1">
								<dt className="text-muted-foreground">Status Publik</dt>
								<dd className="font-bold text-foreground">{selectedCategory.active ? 'Aktif' : 'Nonaktif'}</dd>
							</div>
						</dl>

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

			{/* 4. Modal Konfirmasi Hapus Kategori */}
			{deleteModalOpen && selectedCategory && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-5">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
							<Trash2 className="h-6 w-6" />
						</div>

						<div>
							<h3 className="font-display text-xl font-bold text-foreground">
								Hapus Kategori
							</h3>
							<p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
								Apakah Anda yakin ingin menghapus kategori <strong className="text-foreground">{selectedCategory.name}</strong>?
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
