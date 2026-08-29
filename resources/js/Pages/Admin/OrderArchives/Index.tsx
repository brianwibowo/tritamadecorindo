import useModalGuard from '@/hooks/useModalGuard';
import AdminLayout from '@/Layouts/AdminLayout';
import { cn } from '@/lib/utils';
import { Head, router, useForm } from '@inertiajs/react';
import {
	Calendar,
	CheckCircle,
	CheckCircle2,
	Clock,
	Copy,
	ExternalLink,
	Eye,
	FileSpreadsheet,
	Filter,
	MapPin,
	MessageSquare,
	Pencil,
	Phone,
	Plus,
	Receipt,
	RotateCcw,
	Search,
	Sparkles,
	Trash2,
	User,
	Wrench,
	X,
	XCircle
} from 'lucide-react';
import { useState } from 'react';
import type { PaginatedData } from '@/types';

/** Helper: Format number to Rp string with dot separators */
const formatRp = (value: number): string => {
	if (!value && value !== 0) return '';
	return 'Rp ' + value.toLocaleString('id-ID');
};

interface OrderArchiveItem {
	id: string;
	order_number: string;
	customer_name: string;
	customer_phone: string;
	customer_address: string | null;
	project_type: string;
	details: string;
	total_amount: number;
	total_amount_formatted: string;
	status: 'survey' | 'in_progress' | 'completed' | 'cancelled';
	installation_date: string | null;
	installation_date_formatted: string;
	notes: string | null;
	created_at: string;
}

interface OrderArchivesIndexProps {
	archives: PaginatedData<OrderArchiveItem>;
	stats: {
		totalArchives: number;
		totalSurvey: number;
		totalInProgress: number;
		totalCompleted: number;
		totalProjectValueFormatted: string;
	};
	filters: {
		search?: string;
		status?: string;
		project_type?: string;
	};
	projectTypes: string[];
}

const statusConfig: Record<
	string,
	{ label: string; badgeClass: string; icon: any; borderClass: string }
> = {
	survey: {
		label: 'Menunggu Survey',
		badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
		borderClass: 'border-l-amber-500',
		icon: Clock,
	},
	in_progress: {
		label: 'Pengerjaan / Pasang',
		badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
		borderClass: 'border-l-[#5478FF]',
		icon: Wrench,
	},
	completed: {
		label: 'Selesai & Lunas',
		badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
		borderClass: 'border-l-emerald-500',
		icon: CheckCircle2,
	},
	cancelled: {
		label: 'Dibatalkan',
		badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
		borderClass: 'border-l-rose-500',
		icon: XCircle,
	},
};

export default function OrderArchivesIndex({
	archives,
	stats,
	filters,
	projectTypes,
}: OrderArchivesIndexProps) {
	const [search, setSearch] = useState(filters.search || '');
	const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
	const [selectedProjectType, setSelectedProjectType] = useState(filters.project_type || '');

	// Modals State
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedArchive, setSelectedArchive] = useState<OrderArchiveItem | null>(null);
	const [copied, setCopied] = useState(false);

	// Create Form
	const createForm = useForm({
		customer_name: '',
		customer_phone: '',
		customer_address: '',
		project_type: projectTypes[0] || 'Pemasangan Kaca Film Gedung / Rumah',
		details: '',
		total_amount: 0,
		status: 'survey',
		installation_date: '',
		notes: '',
	});

	// Edit Form
	const editForm = useForm({
		customer_name: '',
		customer_phone: '',
		customer_address: '',
		project_type: '',
		details: '',
		total_amount: 0,
		status: 'survey',
		installation_date: '',
		notes: '',
		_method: 'PUT',
	});

	// Unsaved Changes Shake Guards
	const createGuard = useModalGuard({
		isDirty: createForm.isDirty,
		onClose: () => {
			setCreateModalOpen(false);
			createForm.reset();
		},
	});

	const editGuard = useModalGuard({
		isDirty: editForm.isDirty,
		onClose: () => {
			setEditModalOpen(false);
			editForm.reset();
		},
	});

	// Search & Filter Trigger
	const handleFilterChange = (params: Record<string, string>) => {
		router.get(
			route('admin.order-archives.index'),
			{
				search,
				status: selectedStatus,
				project_type: selectedProjectType,
				...params,
			},
			{ preserveState: true }
		);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleFilterChange({ search });
	};

	const handleResetFilters = () => {
		setSearch('');
		setSelectedStatus('');
		setSelectedProjectType('');
		router.get(route('admin.order-archives.index'));
	};

	// Open Edit Modal
	const openEditModal = (item: OrderArchiveItem) => {
		setSelectedArchive(item);
		editForm.setData({
			customer_name: item.customer_name,
			customer_phone: item.customer_phone,
			customer_address: item.customer_address || '',
			project_type: item.project_type,
			details: item.details,
			total_amount: item.total_amount,
			status: item.status,
			installation_date: item.installation_date || '',
			notes: item.notes || '',
			_method: 'PUT',
		});
		setEditModalOpen(true);
	};

	// Open View Modal
	const openViewModal = (item: OrderArchiveItem) => {
		setSelectedArchive(item);
		setCopied(false);
		setViewModalOpen(true);
	};

	// Open Delete Modal
	const openDeleteModal = (item: OrderArchiveItem) => {
		setSelectedArchive(item);
		setDeleteModalOpen(true);
	};

	// Submit Create
	const handleCreateSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createForm.post(route('admin.order-archives.store'), {
			onSuccess: () => {
				setCreateModalOpen(false);
				createForm.reset();
			},
		});
	};

	// Submit Edit
	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedArchive) return;
		editForm.post(route('admin.order-archives.update', selectedArchive.id), {
			onSuccess: () => {
				setEditModalOpen(false);
				editForm.reset();
			},
		});
	};

	// Submit Quick Status Change
	const handleQuickStatusChange = (archive: OrderArchiveItem, newStatus: string) => {
		router.patch(
			route('admin.order-archives.status', archive.id),
			{ status: newStatus },
			{ preserveScroll: true }
		);
	};

	// Submit Delete
	const handleDeleteSubmit = () => {
		if (!selectedArchive) return;
		router.delete(route('admin.order-archives.destroy', selectedArchive.id), {
			onSuccess: () => setDeleteModalOpen(false),
		});
	};

	// Copy Summary to Clipboard
	const copySummary = () => {
		if (!selectedArchive) return;
		const summaryText = `*RINGKASAN ARSIP PEMESANAN TRITAMA DECORINDO STIKER*
No. Arsip: ${selectedArchive.order_number}
Klien: ${selectedArchive.customer_name} (${selectedArchive.customer_phone})
Alamat: ${selectedArchive.customer_address || '-'}
Jenis Proyek: ${selectedArchive.project_type}
Rincian: ${selectedArchive.details}
Estimasi Nilai: ${selectedArchive.total_amount_formatted}
Jadwal Survey/Pasang: ${selectedArchive.installation_date_formatted}
Status: ${statusConfig[selectedArchive.status]?.label || selectedArchive.status}
Catatan: ${selectedArchive.notes || '-'}`;

		navigator.clipboard.writeText(summaryText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2500);
	};

	return (
		<AdminLayout header="Arsip Pemesanan Proyek">
			<Head title="Arsip Pemesanan — Panel Admin Tritama Decorindo" />

			<div className="space-y-8">
				{/* Top Metrics Cards */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
					{/* 1. Total Arsip */}
					<div className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
								<Receipt className="h-5 w-5" />
							</div>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
									Total Arsip
								</p>
								<p className="text-xl font-extrabold text-foreground mt-0.5">
									{stats.totalArchives}
								</p>
							</div>
						</div>
					</div>

					{/* 2. Menunggu Survey */}
					<div className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700">
								<Clock className="h-5 w-5" />
							</div>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
									Survey Lokasi
								</p>
								<p className="text-xl font-extrabold text-amber-700 mt-0.5">
									{stats.totalSurvey}
								</p>
							</div>
						</div>
					</div>

					{/* 3. Pengerjaan / Pasang */}
					<div className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-[#5478FF]">
								<Wrench className="h-5 w-5" />
							</div>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
									Pengerjaan
								</p>
								<p className="text-xl font-extrabold text-[#5478FF] mt-0.5">
									{stats.totalInProgress}
								</p>
							</div>
						</div>
					</div>

					{/* 4. Selesai / Lunas */}
					<div className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700">
								<CheckCircle2 className="h-5 w-5" />
							</div>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
									Selesai
								</p>
								<p className="text-xl font-extrabold text-emerald-700 mt-0.5">
									{stats.totalCompleted}
								</p>
							</div>
						</div>
					</div>

					{/* 5. Total Nilai Proyek */}
					<div className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-800">
								<Sparkles className="h-5 w-5 text-[#5478FF]" />
							</div>
							<div className="min-w-0">
								<p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
									Total Nilai
								</p>
								<p className="text-sm font-extrabold text-[#5478FF] mt-0.5 truncate" title={stats.totalProjectValueFormatted}>
									{stats.totalProjectValueFormatted}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Action Header & Search/Filters */}
				<div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-1">
						<h1 className="text-xl font-bold text-foreground">
							Daftar Arsip Pemesanan & Proyek
						</h1>
						<p className="text-xs text-muted-foreground">
							Pencatatan manual pesanan material dekorasi, jadwal survey, dan status pemasangan teknisi.
						</p>
					</div>

					<button
						type="button"
						onClick={() => setCreateModalOpen(true)}
						className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5478FF] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4064EB] active:scale-95 transition-all shrink-0"
					>
						<Plus className="h-4 w-4" />
						<span>Catat Arsip Baru</span>
					</button>
				</div>

				{/* Filter & Search Bar */}
				<div className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm space-y-4">
					<form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
						{/* Search Input */}
						<div className="sm:col-span-5 relative">
							<Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari nomor arsip, nama klien, telepon, atau rincian..."
								className="h-10 w-full rounded-2xl border border-border bg-slate-50/50 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-[#5478FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5478FF] transition-all"
							/>
						</div>

						{/* Status Filter */}
						<div className="sm:col-span-3">
							<select
								value={selectedStatus}
								onChange={(e) => {
									setSelectedStatus(e.target.value);
									handleFilterChange({ status: e.target.value });
								}}
								className="h-10 w-full rounded-2xl border border-border bg-slate-50/50 px-3 text-xs text-foreground focus:border-[#5478FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5478FF] transition-all"
							>
								<option value="">Semua Status Pengerjaan</option>
								<option value="survey">Menunggu Survey</option>
								<option value="in_progress">Pengerjaan / Pasang</option>
								<option value="completed">Selesai & Lunas</option>
								<option value="cancelled">Dibatalkan</option>
							</select>
						</div>

						{/* Project Type Filter */}
						<div className="sm:col-span-3">
							<select
								value={selectedProjectType}
								onChange={(e) => {
									setSelectedProjectType(e.target.value);
									handleFilterChange({ project_type: e.target.value });
								}}
								className="h-10 w-full rounded-2xl border border-border bg-slate-50/50 px-3 text-xs text-foreground focus:border-[#5478FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5478FF] transition-all"
							>
								<option value="">Semua Kategori Proyek</option>
								{projectTypes.map((t) => (
									<option key={t} value={t}>
										{t}
									</option>
								))}
							</select>
						</div>

						{/* Reset Button */}
						<div className="sm:col-span-1 flex items-center">
							<button
								type="button"
								onClick={handleResetFilters}
								title="Reset Filter"
								className="h-10 w-full flex items-center justify-center rounded-2xl border border-border bg-secondary hover:bg-slate-200 text-muted-foreground transition-colors"
							>
								<RotateCcw className="h-4 w-4" />
							</button>
						</div>
					</form>
				</div>

				{/* Order Archives Table */}
				<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="bg-[#FAF7F5] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
								<tr>
									<th className="px-5 py-4">No. Arsip & Tanggal</th>
									<th className="px-5 py-4">Klien & Kontak</th>
									<th className="px-5 py-4">Jenis Proyek & Rincian</th>
									<th className="px-5 py-4">Nilai Proyek</th>
									<th className="px-5 py-4">Jadwal Survey / Pasang</th>
									<th className="px-5 py-4">Status</th>
									<th className="px-5 py-4 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{archives.data.length === 0 ? (
									<tr>
										<td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
											Belum ada data arsip pemesanan. Klik tombol <strong>"Catat Arsip Baru"</strong> untuk menambahkan.
										</td>
									</tr>
								) : (
									archives.data.map((item) => {
										const currentStatus = statusConfig[item.status] || statusConfig.survey;
										const cleanPhone = item.customer_phone.replace(/[^0-9]/g, '');
										const waUrl = cleanPhone.startsWith('0')
											? `https://wa.me/62${cleanPhone.slice(1)}`
											: `https://wa.me/${cleanPhone}`;

										return (
											<tr key={item.id} className="hover:bg-secondary/30 transition-colors">
												{/* Order Number & Timestamp */}
												<td className="px-5 py-4">
													<p className="font-mono font-bold text-foreground">
														{item.order_number}
													</p>
													<p className="text-[10px] text-muted-foreground mt-0.5">
														{item.created_at}
													</p>
												</td>

												{/* Customer Name & Phone */}
												<td className="px-5 py-4">
													<p className="font-bold text-foreground">{item.customer_name}</p>
													<div className="flex items-center gap-1.5 mt-0.5">
														<a
															href={waUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline"
														>
															<MessageSquare className="h-3 w-3" />
															<span>{item.customer_phone}</span>
														</a>
													</div>
													{item.customer_address && (
														<p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5 max-w-[200px]" title={item.customer_address}>
															📍 {item.customer_address}
														</p>
													)}
												</td>

												{/* Project Type & Details */}
												<td className="px-5 py-4 max-w-xs">
													<p className="font-bold text-slate-800">{item.project_type}</p>
													<p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
														{item.details}
													</p>
												</td>

												{/* Total Amount */}
												<td className="px-5 py-4 font-bold text-[#5478FF]">
													{item.total_amount_formatted}
												</td>

												{/* Installation Date */}
												<td className="px-5 py-4">
													<div className="inline-flex items-center gap-1 text-slate-700 font-medium">
														<Calendar className="h-3.5 w-3.5 text-muted-foreground" />
														<span>{item.installation_date_formatted}</span>
													</div>
												</td>

												{/* Status Select */}
												<td className="px-5 py-4">
													<select
														value={item.status}
														onChange={(e) => handleQuickStatusChange(item, e.target.value)}
														className={cn(
															'rounded-full border px-3 py-1 text-[11px] font-bold cursor-pointer transition-colors focus:outline-none',
															currentStatus.badgeClass
														)}
													>
														<option value="survey">Menunggu Survey</option>
														<option value="in_progress">Pengerjaan / Pasang</option>
														<option value="completed">Selesai & Lunas</option>
														<option value="cancelled">Dibatalkan</option>
													</select>
												</td>

												{/* Actions */}
												<td className="px-5 py-4 text-right">
													<div className="inline-flex items-center gap-1.5">
														{/* View Button */}
														<button
															type="button"
															onClick={() => openViewModal(item)}
															className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
															title="Lihat Rincian & Salin"
														>
															<Eye className="h-4 w-4" />
														</button>

														{/* Edit Button */}
														<button
															type="button"
															onClick={() => openEditModal(item)}
															className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
															title="Edit Data Arsip"
														>
															<Pencil className="h-4 w-4" />
														</button>

														{/* Delete Button */}
														<button
															type="button"
															onClick={() => openDeleteModal(item)}
															className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors"
															title="Hapus Arsip"
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

					{/* Pagination Controls */}
					{archives.links && archives.links.length > 3 && (
						<div className="flex items-center justify-between border-t border-border/60 bg-[#FAF7F5] px-6 py-4">
							<p className="text-xs text-muted-foreground">
								Menampilkan <strong>{archives.from || 0}</strong> - <strong>{archives.to || 0}</strong> dari <strong>{archives.total}</strong> arsip
							</p>
							<div className="flex items-center gap-1">
								{archives.links.map((link, idx) => (
									<button
										key={idx}
										onClick={() => link.url && router.get(link.url)}
										disabled={!link.url || link.active}
										dangerouslySetInnerHTML={{ __html: link.label }}
										className={cn(
											'rounded-xl px-3 py-1.5 text-xs font-bold transition-colors',
											link.active
												? 'bg-[#5478FF] text-white'
												: link.url
													? 'bg-white border border-border text-foreground hover:bg-secondary'
													: 'text-muted-foreground/40 cursor-not-allowed'
										)}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* ========================================================================= */}
			{/* MODAL 1: TAMBAH ARSIP PEMESANAN BARU */}
			{/* ========================================================================= */}
			{createModalOpen && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
					onClick={createGuard.handleBackdropClick}
				>
					<div
						className={cn(
							'relative max-w-2xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border space-y-6 my-8',
							createGuard.isShaking && 'animate-modal-shake'
						)}
					>
						<button
							onClick={createGuard.handleClose}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex items-center gap-3 border-b border-border/60 pb-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-[#5478FF]">
								<Plus className="h-5 w-5" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-foreground">
									Catat Arsip Pemesanan Baru
								</h2>
								<p className="text-xs text-muted-foreground">
									Isi rincian klien dan pesanan material atau jasa pemasangan.
								</p>
							</div>
						</div>

						<form onSubmit={handleCreateSubmit} className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Customer Name */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Nama Klien / Perusahaan <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										value={createForm.data.customer_name}
										onChange={(e) => createForm.setData('customer_name', e.target.value)}
										placeholder="Misal: Bpk. Hendra / PT Maju Jaya"
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									/>
									{createForm.errors.customer_name && (
										<p className="text-[11px] text-red-500">{createForm.errors.customer_name}</p>
									)}
								</div>

								{/* Customer Phone */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										value={createForm.data.customer_phone}
										onChange={(e) => createForm.setData('customer_phone', e.target.value)}
										placeholder="0819-9090-9646"
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									/>
									{createForm.errors.customer_phone && (
										<p className="text-[11px] text-red-500">{createForm.errors.customer_phone}</p>
									)}
								</div>
							</div>

							{/* Customer Address */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-foreground">
									Alamat Lokasi Proyek / Gedung
								</label>
								<textarea
									rows={2}
									value={createForm.data.customer_address}
									onChange={(e) => createForm.setData('customer_address', e.target.value)}
									placeholder="Contoh: Gedung Menara Kuningan Lt. 12, Jl. HR Rasuna Said, Jakarta Selatan"
									className="w-full rounded-xl border border-border p-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Project Type */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Kategori Proyek <span className="text-red-500">*</span>
									</label>
									<select
										required
										value={createForm.data.project_type}
										onChange={(e) => createForm.setData('project_type', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									>
										{projectTypes.map((t) => (
											<option key={t} value={t}>
												{t}
											</option>
										))}
									</select>
								</div>

								{/* Total Amount */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Total Nilai Proyek (Rp) <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground pointer-events-none">Rp</span>
										<input
											type="number"
											required
											min={0}
											step={1000}
											value={createForm.data.total_amount || ''}
											onChange={(e) => createForm.setData('total_amount', Number(e.target.value))}
											placeholder="15000000"
											className="h-10 w-full rounded-xl border border-border pl-9 pr-3 text-xs font-semibold focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
										/>
									</div>
									{createForm.data.total_amount > 0 && (
										<p className="text-[10px] text-[#5478FF] font-bold mt-0.5 pl-1">= {formatRp(createForm.data.total_amount)}</p>
									)}
								</div>
							</div>

							{/* Details */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-foreground">
									Rincian Spesifikasi & Volume (m² / Roll / Unit) <span className="text-red-500">*</span>
								</label>
								<textarea
									rows={3}
									required
									value={createForm.data.details}
									onChange={(e) => createForm.setData('details', e.target.value)}
									placeholder="Contoh: Kaca Film Riben 80% (25 m2) + Sandblast Cutting motif garis pintu ruang meeting"
									className="w-full rounded-xl border border-border p-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Status */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Status Pengerjaan <span className="text-red-500">*</span>
									</label>
									<select
										required
										value={createForm.data.status}
										onChange={(e) => createForm.setData('status', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									>
										<option value="survey">Menunggu Survey</option>
										<option value="in_progress">Pengerjaan / Pasang</option>
										<option value="completed">Selesai & Lunas</option>
										<option value="cancelled">Dibatalkan</option>
									</select>
								</div>

								{/* Installation Date */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Jadwal Survey / Pemasangan
									</label>
									<input
										type="date"
										value={createForm.data.installation_date}
										onChange={(e) => createForm.setData('installation_date', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									/>
								</div>
							</div>

							{/* Notes */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-foreground">
									Catatan Tambahan / Garansi / Teknisi
								</label>
								<textarea
									rows={2}
									value={createForm.data.notes}
									onChange={(e) => createForm.setData('notes', e.target.value)}
									placeholder="Contoh: Garansi pasang 1 tahun, teknisi Pak Joko & tim"
									className="w-full rounded-xl border border-border p-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
								<button
									type="button"
									onClick={createGuard.handleClose}
									className="rounded-full bg-secondary px-5 py-2 text-xs font-bold text-foreground hover:bg-slate-200 transition-colors"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={createForm.processing}
									className="rounded-full bg-[#5478FF] px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-[#4064EB] disabled:opacity-50 transition-all"
								>
									{createForm.processing ? 'Menyimpan...' : 'Simpan Arsip'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 2: EDIT ARSIP PEMESANAN */}
			{/* ========================================================================= */}
			{editModalOpen && selectedArchive && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
					onClick={editGuard.handleBackdropClick}
				>
					<div
						className={cn(
							'relative max-w-2xl w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border space-y-6 my-8',
							editGuard.isShaking && 'animate-modal-shake'
						)}
					>
						<button
							onClick={editGuard.handleClose}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex items-center gap-3 border-b border-border/60 pb-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-700">
								<Pencil className="h-5 w-5" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-foreground">
									Edit Arsip #{selectedArchive.order_number}
								</h2>
								<p className="text-xs text-muted-foreground">
									Perbarui rincian pemesanan, nilai biaya, atau status proyek.
								</p>
							</div>
						</div>

						<form onSubmit={handleEditSubmit} className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Customer Name */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Nama Klien / Perusahaan <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										value={editForm.data.customer_name}
										onChange={(e) => editForm.setData('customer_name', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									/>
								</div>

								{/* Customer Phone */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										value={editForm.data.customer_phone}
										onChange={(e) => editForm.setData('customer_phone', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									/>
								</div>
							</div>

							{/* Customer Address */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-foreground">
									Alamat Lokasi Proyek / Gedung
								</label>
								<textarea
									rows={2}
									value={editForm.data.customer_address}
									onChange={(e) => editForm.setData('customer_address', e.target.value)}
									className="w-full rounded-xl border border-border p-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Project Type */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Kategori Proyek <span className="text-red-500">*</span>
									</label>
									<select
										required
										value={editForm.data.project_type}
										onChange={(e) => editForm.setData('project_type', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									>
										{projectTypes.map((t) => (
											<option key={t} value={t}>
												{t}
											</option>
										))}
									</select>
								</div>

								{/* Total Amount */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Total Nilai Proyek (Rp) <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground pointer-events-none">Rp</span>
										<input
											type="number"
											required
											min={0}
											step={1000}
											value={editForm.data.total_amount || ''}
											onChange={(e) => editForm.setData('total_amount', Number(e.target.value))}
											className="h-10 w-full rounded-xl border border-border pl-9 pr-3 text-xs font-semibold focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
										/>
									</div>
									{editForm.data.total_amount > 0 && (
										<p className="text-[10px] text-[#5478FF] font-bold mt-0.5 pl-1">= {formatRp(editForm.data.total_amount)}</p>
									)}
								</div>
							</div>

							{/* Details */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-foreground">
									Rincian Spesifikasi & Volume <span className="text-red-500">*</span>
								</label>
								<textarea
									rows={3}
									required
									value={editForm.data.details}
									onChange={(e) => editForm.setData('details', e.target.value)}
									className="w-full rounded-xl border border-border p-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Status */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Status Pengerjaan <span className="text-red-500">*</span>
									</label>
									<select
										required
										value={editForm.data.status}
										onChange={(e) => editForm.setData('status', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									>
										<option value="survey">Menunggu Survey</option>
										<option value="in_progress">Pengerjaan / Pasang</option>
										<option value="completed">Selesai & Lunas</option>
										<option value="cancelled">Dibatalkan</option>
									</select>
								</div>

								{/* Installation Date */}
								<div className="space-y-1">
									<label className="text-xs font-bold text-foreground">
										Jadwal Survey / Pemasangan
									</label>
									<input
										type="date"
										value={editForm.data.installation_date}
										onChange={(e) => editForm.setData('installation_date', e.target.value)}
										className="h-10 w-full rounded-xl border border-border px-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
									/>
								</div>
							</div>

							{/* Notes */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-foreground">
									Catatan Tambahan / Garansi / Teknisi
								</label>
								<textarea
									rows={2}
									value={editForm.data.notes}
									onChange={(e) => editForm.setData('notes', e.target.value)}
									className="w-full rounded-xl border border-border p-3 text-xs focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
								<button
									type="button"
									onClick={editGuard.handleClose}
									className="rounded-full bg-secondary px-5 py-2 text-xs font-bold text-foreground hover:bg-slate-200 transition-colors"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={editForm.processing}
									className="rounded-full bg-[#5478FF] px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-[#4064EB] disabled:opacity-50 transition-all"
								>
									{editForm.processing ? 'Menyimpan...' : 'Perbarui Arsip'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 3: DETAIL ARSIP & SALIN SUMMARY */}
			{/* ========================================================================= */}
			{viewModalOpen && selectedArchive && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border space-y-6">
						<button
							onClick={() => setViewModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="border-b border-border/60 pb-4">
							<div className="flex items-center justify-between">
								<span className="font-mono text-xs font-bold text-[#5478FF] bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
									{selectedArchive.order_number}
								</span>
								<span
									className={cn(
										'inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold border',
										statusConfig[selectedArchive.status]?.badgeClass
									)}
								>
									{statusConfig[selectedArchive.status]?.label || selectedArchive.status}
								</span>
							</div>
							<h3 className="text-xl font-bold text-foreground mt-2">
								{selectedArchive.customer_name}
							</h3>
							<p className="text-xs text-muted-foreground">
								Tritama Decorindo Stiker — Arsip Pengerjaan
							</p>
						</div>

						<dl className="space-y-3 text-xs">
							<div className="flex justify-between py-1.5 border-b border-border/40">
								<dt className="text-muted-foreground font-medium">Nomor WhatsApp</dt>
								<dd className="font-bold text-foreground">{selectedArchive.customer_phone}</dd>
							</div>
							<div className="flex justify-between py-1.5 border-b border-border/40">
								<dt className="text-muted-foreground font-medium">Alamat Proyek</dt>
								<dd className="font-medium text-foreground text-right max-w-[240px]">
									{selectedArchive.customer_address || 'Belum diisi'}
								</dd>
							</div>
							<div className="flex justify-between py-1.5 border-b border-border/40">
								<dt className="text-muted-foreground font-medium">Kategori Proyek</dt>
								<dd className="font-bold text-slate-900">{selectedArchive.project_type}</dd>
							</div>
							<div className="py-1.5 border-b border-border/40 space-y-1">
								<dt className="text-muted-foreground font-medium">Rincian Spesifikasi</dt>
								<dd className="rounded-xl bg-slate-50 p-3 font-medium text-foreground text-xs leading-relaxed border border-border/40">
									{selectedArchive.details}
								</dd>
							</div>
							<div className="flex justify-between py-1.5 border-b border-border/40">
								<dt className="text-muted-foreground font-medium">Total Nilai Proyek</dt>
								<dd className="font-extrabold text-[#5478FF] text-sm">
									{selectedArchive.total_amount_formatted}
								</dd>
							</div>
							<div className="flex justify-between py-1.5 border-b border-border/40">
								<dt className="text-muted-foreground font-medium">Jadwal Survey / Pasang</dt>
								<dd className="font-bold text-foreground">{selectedArchive.installation_date_formatted}</dd>
							</div>
							{selectedArchive.notes && (
								<div className="py-1.5 space-y-1">
									<dt className="text-muted-foreground font-medium">Catatan / Garansi</dt>
									<dd className="font-medium text-slate-700 italic">
										"{selectedArchive.notes}"
									</dd>
								</div>
							)}
						</dl>

						<div className="flex items-center justify-between gap-3 pt-2">
							<button
								type="button"
								onClick={copySummary}
								className={cn(
									'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm',
									copied
										? 'bg-emerald-600 text-white'
										: 'bg-secondary text-foreground hover:bg-slate-200'
								)}
							>
								{copied ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
								<span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Ringkasan'}</span>
							</button>

							<button
								type="button"
								onClick={() => setViewModalOpen(false)}
								className="rounded-full bg-slate-900 px-6 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
							>
								Tutup
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 4: KONFIRMASI HAPUS ARSIP */}
			{/* ========================================================================= */}
			{deleteModalOpen && selectedArchive && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
					<div className="relative max-w-sm w-full rounded-3xl bg-white p-6 shadow-2xl border border-border space-y-5 text-center">
						<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
							<Trash2 className="h-7 w-7" />
						</div>

						<div className="space-y-2">
							<h3 className="text-lg font-bold text-foreground">
								Hapus Data Arsip?
							</h3>
							<p className="text-xs text-muted-foreground leading-relaxed">
								Apakah Anda yakin ingin menghapus data arsip <strong>#{selectedArchive.order_number}</strong> atas nama <strong>{selectedArchive.customer_name}</strong>? Tindakan ini tidak dapat dibatalkan.
							</p>
						</div>

						<div className="flex items-center justify-center gap-3 pt-2">
							<button
								type="button"
								onClick={() => setDeleteModalOpen(false)}
								className="rounded-full bg-secondary px-5 py-2 text-xs font-bold text-foreground hover:bg-slate-200 transition-colors"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteSubmit}
								className="rounded-full bg-red-600 px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-red-700 active:scale-95 transition-all"
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
