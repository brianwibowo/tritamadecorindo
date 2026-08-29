import useModalGuard from '@/hooks/useModalGuard';
import AdminLayout from '@/Layouts/AdminLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	Camera,
	CheckCircle2,
	Eye,
	MoreVertical,
	Pencil,
	Plus,
	RotateCcw,
	Search,
	Shield,
	Trash2,
	User as UserIcon,
	Users,
	X,
	XCircle
} from 'lucide-react';
import { useRef, useState } from 'react';
import type { PaginatedData, User } from '@/types';

interface UserItem extends User {
	created_at: string;
}

interface UsersIndexProps {
	users: PaginatedData<UserItem>;
	filters: {
		search?: string;
		role?: string;
		status?: string;
	};
	roles: Array<{ value: string; label: string }>;
}

export default function UsersIndex({ users, filters, roles }: UsersIndexProps) {
	const [search, setSearch] = useState(filters.search || '');
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Create Form
	const createForm = useForm<{
		name: string;
		email: string;
		password: string;
		role: string;
		phone: string;
		status: string;
		image: File | null;
	}>({
		name: '',
		email: '',
		password: '',
		role: 'buyer',
		phone: '',
		status: 'active',
		image: null,
	});

	// Edit Form
	const editForm = useForm<{
		name: string;
		email: string;
		password: string;
		role: string;
		phone: string;
		status: string;
		image: File | null;
		_method: string;
	}>({
		name: '',
		email: '',
		password: '',
		role: 'buyer',
		phone: '',
		status: 'active',
		image: null,
		_method: 'PUT',
	});

	const isCreateDirty = Boolean(createForm.data.name.trim() || createForm.data.email.trim() || createForm.data.password.trim() || createForm.data.phone.trim() || createForm.data.image !== null);
	const isEditDirty = editForm.isDirty;

	const createGuard = useModalGuard({
		isDirty: isCreateDirty,
		onClose: () => {
			setCreateModalOpen(false);
			createForm.reset();
			setAvatarPreview(null);
		},
	});

	const editGuard = useModalGuard({
		isDirty: isEditDirty,
		onClose: () => {
			setEditModalOpen(false);
			editForm.reset();
			setAvatarPreview(null);
		},
	});

	const handleFilterChange = (params: Record<string, string>) => {
		router.get(
			route('admin.users.index'),
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

	const handleToggleStatus = (user: UserItem) => {
		router.patch(
			route('admin.users.toggle', user.id),
			{},
			{ preserveScroll: true }
		);
	};

	// Open Edit Modal
	const openEditModal = (user: UserItem) => {
		setSelectedUser(user);
		setAvatarPreview(user.image || null);
		editForm.setData({
			name: user.name,
			email: user.email,
			password: '',
			role: typeof user.role === 'object' ? (user.role as any).value || 'buyer' : user.role || 'buyer',
			phone: user.phone || '',
			status: user.status || 'active',
			image: null,
			_method: 'PUT',
		});
		setEditModalOpen(true);
	};

	// Open View Modal
	const openViewModal = (user: UserItem) => {
		setSelectedUser(user);
		setViewModalOpen(true);
	};

	// Open Delete Modal
	const openDeleteModal = (user: UserItem) => {
		setSelectedUser(user);
		setDeleteModalOpen(true);
	};

	// Submit Create
	const handleCreateSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createForm.post(route('admin.users.store'), {
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
				setAvatarPreview(null);
			},
		});
	};

	// Submit Edit
	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedUser) return;
		editForm.post(route('admin.users.update', selectedUser.id), {
			onSuccess: () => {
				setEditModalOpen(false);
				editForm.reset();
				setAvatarPreview(null);
			},
		});
	};

	// Submit Delete
	const handleDeleteSubmit = () => {
		if (!selectedUser) return;
		router.delete(route('admin.users.destroy', selectedUser.id), {
			onSuccess: () => {
				setDeleteModalOpen(false);
				setSelectedUser(null);
			},
		});
	};

	const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
		const file = e.target.files?.[0];
		if (file) {
			if (isEdit) {
				editForm.setData('image', file);
			} else {
				createForm.setData('image', file);
			}
			const reader = new FileReader();
			reader.onload = () => setAvatarPreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const getRoleBadge = (role: string | any) => {
		const roleVal = typeof role === 'object' ? role.value : role;
		if (roleVal === 'admin') {
			return (
				<span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 ring-1 ring-amber-500/20">
					<Shield className="h-3 w-3" />
					Admin
				</span>
			);
		}
		return (
			<span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-800 ring-1 ring-blue-500/20">
				<UserIcon className="h-3 w-3" />
				Buyer / Klien
			</span>
		);
	};

	return (
		<AdminLayout header="Manajemen Pengguna">
			<Head title="Manajemen Pengguna — Panel Admin Tritama Decorindo" />

			<div className="space-y-6">
				{/* Top Controls Toolbar */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border/60 shadow-sm">
					{/* Search & Filters */}
					<div className="flex flex-wrap items-center gap-3 flex-1">
						{/* Search Bar */}
						<form onSubmit={handleSearchSubmit} className="relative flex-1 sm:max-w-xs">
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari nama, email, telepon..."
								className="w-full h-10 rounded-xl border border-border bg-[#FDFBF9] pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-[#80070A] focus:ring-1 focus:ring-[#80070A]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</form>

						{/* Role Filter */}
						<select
							value={filters.role || ''}
							onChange={(e) => handleFilterChange({ role: e.target.value })}
							className="h-10 rounded-xl border border-border bg-[#FDFBF9] px-3 text-xs font-semibold text-foreground focus:border-[#80070A]"
						>
							<option value="">Semua Peran</option>
							<option value="admin">Administrator</option>
							<option value="buyer">Buyer / Klien</option>
						</select>

						{/* Status Filter */}
						<select
							value={filters.status || ''}
							onChange={(e) => handleFilterChange({ status: e.target.value })}
							className="h-10 rounded-xl border border-border bg-[#FDFBF9] px-3 text-xs font-semibold text-foreground focus:border-[#80070A]"
						>
							<option value="">Semua Status</option>
							<option value="active">Aktif</option>
							<option value="inactive">Nonaktif</option>
						</select>

						{(filters.search || filters.role || filters.status) && (
							<button
								onClick={() => router.get(route('admin.users.index'))}
								className="inline-flex items-center gap-1 text-xs text-[#80070A] hover:underline"
							>
								<RotateCcw className="h-3 w-3" />
								Reset
							</button>
						)}
					</div>

					{/* Add User Button */}
					<button
						type="button"
						onClick={() => {
							createForm.reset();
							setAvatarPreview(null);
							setCreateModalOpen(true);
						}}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#80070A] px-5 py-2.5 text-xs font-bold text-white hover:brightness-110 transition-all shadow-md active:scale-95 whitespace-nowrap"
					>
						<Plus className="h-4 w-4" />
						<span>Tambah Pengguna</span>
					</button>
				</div>

				{/* Users Table Card */}
				<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-6 py-4">Pengguna</th>
									<th className="px-6 py-4">Kontak</th>
									<th className="px-6 py-4">Peran</th>
									<th className="px-6 py-4">Status & Slide Switch</th>
									<th className="px-6 py-4">Terdaftar Pada</th>
									<th className="px-6 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{users.data.length === 0 ? (
									<tr>
										<td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
											Tidak ada data pengguna yang ditemukan.
										</td>
									</tr>
								) : (
									users.data.map((user) => {
										const isActive = user.status === 'active';
										return (
											<tr key={user.id} className="hover:bg-secondary/30 transition-colors">
												{/* Avatar & Name */}
												<td className="px-6 py-4">
													<div className="flex items-center gap-3">
														<div className="h-10 w-10 overflow-hidden rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-xs ring-1 ring-border">
															{user.image ? (
																<img src={user.image} alt={user.name} className="h-full w-full object-cover" />
															) : (
																<span>{user.name.charAt(0).toUpperCase()}</span>
															)}
														</div>
														<div>
															<p className="font-bold text-foreground">{user.name}</p>
															<p className="text-[11px] text-muted-foreground">{user.email}</p>
														</div>
													</div>
												</td>

												{/* Phone */}
												<td className="px-6 py-4 font-medium text-foreground">
													{user.phone || '-'}
												</td>

												{/* Role */}
												<td className="px-6 py-4">{getRoleBadge(user.role)}</td>

												{/* Status Slide Switch */}
												<td className="px-6 py-4">
													<div className="flex items-center gap-2.5">
														<button
															type="button"
															onClick={() => handleToggleStatus(user)}
															className={cn(
																'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner',
																isActive ? 'bg-[#0284C7]' : 'bg-gray-300'
															)}
															title={isActive ? 'Klik untuk Nonaktifkan Akun' : 'Klik untuk Aktifkan Akun'}
														>
															<span
																className={cn(
																	'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
																	isActive ? 'translate-x-5' : 'translate-x-0'
																)}
															/>
														</button>
														<span
															className={cn(
																'text-[11px] font-bold',
																isActive ? 'text-emerald-700' : 'text-gray-500'
															)}
														>
															{isActive ? 'Aktif' : 'Nonaktif'}
														</span>
													</div>
												</td>

												{/* Registered Date */}
												<td className="px-6 py-4 text-muted-foreground">
													{new Date(user.created_at).toLocaleDateString('id-ID', {
														day: 'numeric',
														month: 'short',
														year: 'numeric',
													})}
												</td>

												{/* Action Buttons */}
												<td className="px-6 py-4 text-right">
													<div className="inline-flex items-center gap-1.5">
														{/* View Button */}
														<button
															type="button"
															onClick={() => openViewModal(user)}
															className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
															title="Lihat Detail"
														>
															<Eye className="h-4 w-4" />
														</button>

														{/* Edit Button */}
														<button
															type="button"
															onClick={() => openEditModal(user)}
															className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
															title="Edit Pengguna"
														>
															<Pencil className="h-4 w-4" />
														</button>

														{/* Delete Button */}
														<button
															type="button"
															onClick={() => openDeleteModal(user)}
															className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors"
															title="Hapus Pengguna"
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
							Menampilkan <strong className="text-foreground">{users.from || 0}</strong>–<strong className="text-foreground">{users.to || 0}</strong> dari <strong className="text-foreground">{users.total}</strong> pengguna
						</p>
						<div className="flex items-center gap-1.5">
							{users.links.map((link, idx) => (
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

			{/* 1. Modal Tambah Pengguna (With Shake Effect on Outside Click) */}
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
							<h3 className="text-xl font-bold text-foreground">Tambah Pengguna Baru</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Lengkapi formulir untuk membuat akun admin atau klien baru.</p>
						</div>

						<form onSubmit={handleCreateSubmit} className="mt-5 space-y-4">
							{/* Avatar */}
							<div className="flex flex-col items-center justify-center gap-2">
								<div className="relative group">
									<div className="h-20 w-20 overflow-hidden rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-xl ring-2 ring-border shadow-sm">
										{avatarPreview ? (
											<img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
										) : (
											<UserIcon className="h-8 w-8" />
										)}
									</div>
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="absolute bottom-0 right-0 rounded-full bg-[#0284C7] text-white p-1.5 shadow-md hover:bg-[#0369a1]"
									>
										<Camera className="h-3.5 w-3.5" />
									</button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*,.heic,.heif"
									onChange={(e) => handleAvatarSelect(e, false)}
									className="hidden"
								/>
								<span className="text-[10px] text-muted-foreground">Upload foto (JPG, PNG, WEBP, HEIC)</span>
							</div>

							{/* Name */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Nama Lengkap</label>
								<input
									type="text"
									value={createForm.data.name}
									onChange={(e) => createForm.setData('name', e.target.value)}
									required
									placeholder="Contoh: Budi Santoso"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
								{createForm.errors.name && <p className="mt-1 text-xs text-red-600">{createForm.errors.name}</p>}
							</div>

							{/* Email */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Email</label>
								<input
									type="email"
									value={createForm.data.email}
									onChange={(e) => createForm.setData('email', e.target.value)}
									required
									placeholder="budi@example.com"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
								{createForm.errors.email && <p className="mt-1 text-xs text-red-600">{createForm.errors.email}</p>}
							</div>

							{/* Password */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Password</label>
								<input
									type="password"
									value={createForm.data.password}
									onChange={(e) => createForm.setData('password', e.target.value)}
									required
									placeholder="Minimal 8 karakter"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
								{createForm.errors.password && <p className="mt-1 text-xs text-red-600">{createForm.errors.password}</p>}
							</div>

							{/* Role & Status (2 Columns) */}
							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">Peran (Role)</label>
									<select
										value={createForm.data.role}
										onChange={(e) => createForm.setData('role', e.target.value)}
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#0284C7]"
									>
										<option value="buyer">Buyer / Klien</option>
										<option value="admin">Administrator</option>
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">Status</label>
									<select
										value={createForm.data.status}
										onChange={(e) => createForm.setData('status', e.target.value)}
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#0284C7]"
									>
										<option value="active">Aktif</option>
										<option value="inactive">Nonaktif</option>
									</select>
								</div>
							</div>

							{/* Phone */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">No. Telepon / WA</label>
								<input
									type="text"
									value={createForm.data.phone}
									onChange={(e) => createForm.setData('phone', e.target.value)}
									placeholder="+62 812-xxxx-xxxx"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
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
									className="rounded-full bg-[#0284C7] px-6 py-2 text-xs font-bold text-white hover:bg-[#0369a1] disabled:opacity-60 shadow-md"
								>
									{createForm.processing ? 'Menyimpan...' : 'Simpan Pengguna'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 2. Modal Edit Pengguna (With Shake Effect on Outside Click) */}
			{editModalOpen && selectedUser && (
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
							<h3 className="text-xl font-bold text-foreground">Edit Data Pengguna</h3>
							<p className="text-xs text-muted-foreground mt-0.5">Perbarui data profil, peran, status, atau password pengguna.</p>
						</div>

						<form onSubmit={handleEditSubmit} className="mt-5 space-y-4">
							{/* Avatar */}
							<div className="flex flex-col items-center justify-center gap-2">
								<div className="relative group">
									<div className="h-20 w-20 overflow-hidden rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-xl ring-2 ring-border shadow-sm">
										{avatarPreview ? (
											<img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
										) : (
											<span>{editForm.data.name.charAt(0).toUpperCase()}</span>
										)}
									</div>
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="absolute bottom-0 right-0 rounded-full bg-[#0284C7] text-white p-1.5 shadow-md hover:bg-[#0369a1]"
									>
										<Camera className="h-3.5 w-3.5" />
									</button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*,.heic,.heif"
									onChange={(e) => handleAvatarSelect(e, true)}
									className="hidden"
								/>
								<span className="text-[10px] text-muted-foreground">Upload foto (JPG, PNG, WEBP, HEIC)</span>
							</div>

							{/* Name */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Nama Lengkap</label>
								<input
									type="text"
									value={editForm.data.name}
									onChange={(e) => editForm.setData('name', e.target.value)}
									required
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
								{editForm.errors.name && <p className="mt-1 text-xs text-red-600">{editForm.errors.name}</p>}
							</div>

							{/* Email */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">Email</label>
								<input
									type="email"
									value={editForm.data.email}
									onChange={(e) => editForm.setData('email', e.target.value)}
									required
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
								{editForm.errors.email && <p className="mt-1 text-xs text-red-600">{editForm.errors.email}</p>}
							</div>

							{/* Password (Optional for edit) */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">
									Password Baru <span className="text-muted-foreground font-normal lowercase">(kosongkan jika tidak diubah)</span>
								</label>
								<input
									type="password"
									value={editForm.data.password}
									onChange={(e) => editForm.setData('password', e.target.value)}
									placeholder="Biarkan kosong jika tidak diubah"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
								{editForm.errors.password && <p className="mt-1 text-xs text-red-600">{editForm.errors.password}</p>}
							</div>

							{/* Role & Status (2 Columns) */}
							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">Peran (Role)</label>
									<select
										value={editForm.data.role}
										onChange={(e) => editForm.setData('role', e.target.value)}
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#0284C7]"
									>
										<option value="buyer">Buyer / Klien</option>
										<option value="admin">Administrator</option>
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider mb-1">Status</label>
									<select
										value={editForm.data.status}
										onChange={(e) => editForm.setData('status', e.target.value)}
										className="w-full h-10 rounded-xl border border-border bg-white px-3 text-xs font-semibold focus:border-[#0284C7]"
									>
										<option value="active">Aktif</option>
										<option value="inactive">Nonaktif</option>
									</select>
								</div>
							</div>

							{/* Phone */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider mb-1">No. Telepon / WA</label>
								<input
									type="text"
									value={editForm.data.phone}
									onChange={(e) => editForm.setData('phone', e.target.value)}
									placeholder="+62 812-xxxx-xxxx"
									className="w-full h-10 rounded-xl border border-border bg-white px-3.5 text-xs text-foreground focus:border-[#0284C7]"
								/>
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
									className="rounded-full bg-[#0284C7] px-6 py-2 text-xs font-bold text-white hover:bg-[#0369a1] disabled:opacity-60 shadow-md"
								>
									{editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 3. Modal Lihat Detail Pengguna */}
			{viewModalOpen && selectedUser && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-6">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex items-center gap-4 border-b border-border/60 pb-5">
							<div className="h-16 w-16 overflow-hidden rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-xl ring-2 ring-border shadow-sm">
								{selectedUser.image ? (
									<img src={selectedUser.image} alt={selectedUser.name} className="h-full w-full object-cover" />
								) : (
									<span>{selectedUser.name.charAt(0).toUpperCase()}</span>
								)}
							</div>
							<div>
								<h3 className="text-xl font-bold text-foreground">{selectedUser.name}</h3>
								<p className="text-xs text-muted-foreground">{selectedUser.email}</p>
								<div className="mt-2 flex items-center gap-2">
									{getRoleBadge(selectedUser.role)}
									<span className={cn('text-xs font-bold', selectedUser.status === 'active' ? 'text-emerald-700' : 'text-gray-500')}>
										{selectedUser.status === 'active' ? 'Aktif' : 'Nonaktif'}
									</span>
								</div>
							</div>
						</div>

						<dl className="space-y-3 text-xs">
							<div className="flex justify-between py-1 border-b border-border/40">
								<dt className="text-muted-foreground">No. Telepon / WhatsApp</dt>
								<dd className="font-bold text-foreground">{selectedUser.phone || 'Belum diisi'}</dd>
							</div>
							<div className="flex justify-between py-1">
								<dt className="text-muted-foreground">Tanggal Bergabung</dt>
								<dd className="font-bold text-foreground">
									{new Date(selectedUser.created_at).toLocaleDateString('id-ID', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</dd>
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

			{/* 4. Modal Konfirmasi Hapus Pengguna */}
			{deleteModalOpen && selectedUser && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-5">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
							<Trash2 className="h-6 w-6" />
						</div>

						<div>
							<h3 className="font-display text-xl font-bold text-foreground">
								Hapus Pengguna
							</h3>
							<p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
								Apakah Anda yakin ingin menghapus pengguna <strong className="text-foreground">{selectedUser.name}</strong> ({selectedUser.email})? Tindakan ini tidak dapat dibatalkan.
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
