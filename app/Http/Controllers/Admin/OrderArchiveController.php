<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOrderArchiveRequest;
use App\Http\Requests\Admin\UpdateOrderArchiveRequest;
use App\Models\OrderArchive;
use App\Services\MoneyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderArchiveController extends Controller
{
    /**
     * Display a listing of order archives with metrics and filters.
     */
    public function index(Request $request): Response
    {
        $query = OrderArchive::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%")
                    ->orWhere('project_type', 'like', "%{$search}%")
                    ->orWhere('details', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($projectType = $request->input('project_type')) {
            $query->where('project_type', $projectType);
        }

        $archives = $query->latest('created_at')->paginate(10)->withQueryString();

        // Transform formatted total amount
        $archives->through(fn (OrderArchive $archive) => [
            'id' => $archive->id,
            'order_number' => $archive->order_number,
            'customer_name' => $archive->customer_name,
            'customer_phone' => $archive->customer_phone,
            'customer_address' => $archive->customer_address,
            'project_type' => $archive->project_type,
            'details' => $archive->details,
            'total_amount' => $archive->total_amount,
            'total_amount_formatted' => MoneyService::format($archive->total_amount),
            'status' => $archive->status,
            'installation_date' => $archive->installation_date?->format('Y-m-d'),
            'installation_date_formatted' => $archive->installation_date?->format('d M Y') ?? 'Belum Ditentukan',
            'notes' => $archive->notes,
            'created_at' => $archive->created_at->format('d M Y, H:i'),
        ]);

        // Aggregate Metrics
        $totalArchives = OrderArchive::count();
        $totalSurvey = OrderArchive::where('status', 'survey')->count();
        $totalInProgress = OrderArchive::where('status', 'in_progress')->count();
        $totalCompleted = OrderArchive::where('status', 'completed')->count();
        $totalProjectValue = OrderArchive::where('status', '!=', 'cancelled')->sum('total_amount');

        $projectTypes = [
            'Pemasangan Kaca Film Gedung / Rumah',
            'Kaca Film Tolak Panas (Riben / Sparta / One Way)',
            'Sandblast Cutting Motif Logo & Striping',
            'Wallpaper Dinding Custom 3D',
            'Roller Blind & Vertical Blind',
            'Huruf Timbul & Signage Akrilik',
            'Cutting Sticker & Digital Printing',
            'Lainnya / Custom Pengerjaan',
        ];

        return Inertia::render('Admin/OrderArchives/Index', [
            'archives' => $archives,
            'stats' => [
                'totalArchives' => $totalArchives,
                'totalSurvey' => $totalSurvey,
                'totalInProgress' => $totalInProgress,
                'totalCompleted' => $totalCompleted,
                'totalProjectValueFormatted' => MoneyService::format($totalProjectValue),
            ],
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', ''),
                'project_type' => $request->input('project_type', ''),
            ],
            'projectTypes' => $projectTypes,
        ]);
    }

    /**
     * Store a newly created order archive.
     */
    public function store(StoreOrderArchiveRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['order_number'] = OrderArchive::generateOrderNumber();

        OrderArchive::create($data);

        return redirect()->route('admin.order-archives.index')
            ->with('success', 'Arsip pemesanan proyek baru berhasil dicatat.');
    }

    /**
     * Update the specified order archive.
     */
    public function update(UpdateOrderArchiveRequest $request, OrderArchive $order_archive): RedirectResponse
    {
        $order_archive->update($request->validated());

        return redirect()->route('admin.order-archives.index')
            ->with('success', 'Data arsip pemesanan proyek berhasil diperbarui.');
    }

    /**
     * Quick status update for order archive.
     */
    public function updateStatus(Request $request, OrderArchive $order_archive): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'string', 'in:survey,in_progress,completed,cancelled'],
        ]);

        $order_archive->update(['status' => $request->input('status')]);

        return redirect()->back()
            ->with('success', "Status arsip #{$order_archive->order_number} berhasil diubah.");
    }

    /**
     * Remove the specified order archive.
     */
    public function destroy(OrderArchive $order_archive): RedirectResponse
    {
        $order_archive->delete();

        return redirect()->route('admin.order-archives.index')
            ->with('success', 'Arsip pemesanan berhasil dihapus.');
    }
}
