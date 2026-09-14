<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of the gallery items.
     */
    public function index(): Response
    {
        $query = Gallery::query();

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('caption', 'like', "%{$search}%");
            });
        }

        if ($category = request('category')) {
            $query->where('category', $category);
        }

        $galleries = $query->orderBy('sort_order')->latest('id')->paginate(12)->withQueryString();

        $categoryOptions = [
            ['value' => 'kaca_film', 'label' => 'Kaca Film'],
            ['value' => 'sandblast', 'label' => 'Sandblast & Stiker'],
            ['value' => 'wallpaper', 'label' => 'Wallpaper Dinding'],
            ['value' => 'signage', 'label' => 'Signage & Huruf Timbul'],
            ['value' => 'blinds', 'label' => 'Blinds & Gorden'],
        ];

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
            'filters' => [
                'search' => request('search', ''),
                'category' => request('category', ''),
            ],
            'categories' => $categoryOptions,
        ]);
    }

    /**
     * Quick toggle active status of a gallery item (Slide Switch).
     */
    public function toggleStatus(Gallery $gallery): RedirectResponse
    {
        $gallery->update([
            'active' => ! $gallery->active,
        ]);

        $statusText = $gallery->active ? 'Tampil' : 'Disembunyikan';

        return redirect()
            ->back()
            ->with('success', "Status galeri berhasil diubah menjadi {$statusText}.");
    }

    /**
     * Store a newly created gallery item (or multiple items in batch).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string'],
            'category' => ['nullable', Rule::in(['kaca_film', 'sandblast', 'wallpaper', 'signage', 'blinds'])],
            'active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:10240'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'image', 'max:10240'],
            'image_url' => ['nullable', 'string'],
        ]);

        $categoryLabels = [
            'kaca_film' => 'Kaca Film',
            'sandblast' => 'Sandblast & Stiker',
            'wallpaper' => 'Wallpaper Dinding',
            'signage' => 'Signage & Huruf Timbul',
            'blinds' => 'Blinds & Gorden',
        ];

        $category = $validated['category'] ?? 'kaca_film';
        $categoryLabel = $categoryLabels[$category] ?? 'Dokumentasi Proyek';
        $active = isset($validated['active']) ? (bool) $validated['active'] : true;
        $caption = $validated['caption'] ?? null;
        $title = ! empty($validated['title']) ? $validated['title'] : ($caption ? Str::limit($caption, 60, '...') : 'Dokumentasi Proyek');

        // Multiple images upload
        if ($request->hasFile('images')) {
            $uploadedFiles = $request->file('images');
            foreach ($uploadedFiles as $file) {
                $path = $file->store('galleries', 'public');
                Gallery::create([
                    'title' => $title,
                    'caption' => $caption,
                    'category' => $category,
                    'category_label' => $categoryLabel,
                    'image' => '/storage/'.$path,
                    'active' => $active,
                    'sort_order' => 0,
                ]);
            }

            $count = count($uploadedFiles);

            return redirect()->route('admin.galleries.index')->with('success', "Berhasil menambahkan {$count} foto ke galeri.");
        }

        // Single image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            Gallery::create([
                'title' => $title,
                'caption' => $caption,
                'category' => $category,
                'category_label' => $categoryLabel,
                'image' => '/storage/'.$path,
                'active' => $active,
                'sort_order' => 0,
            ]);

            return redirect()->route('admin.galleries.index')->with('success', 'Foto galeri berhasil ditambahkan.');
        }

        // Fallback image url
        $imagePath = $validated['image_url'] ?? '/images/products/kaca-film-riben.webp';
        Gallery::create([
            'title' => $title,
            'caption' => $caption,
            'category' => $category,
            'category_label' => $categoryLabel,
            'image' => $imagePath,
            'active' => $active,
            'sort_order' => 0,
        ]);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto galeri berhasil ditambahkan.');
    }

    /**
     * Update the specified gallery item.
     */
    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string'],
            'category' => ['nullable', Rule::in(['kaca_film', 'sandblast', 'wallpaper', 'signage', 'blinds'])],
            'active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:10240'],
        ]);

        $categoryLabels = [
            'kaca_film' => 'Kaca Film',
            'sandblast' => 'Sandblast & Stiker',
            'wallpaper' => 'Wallpaper Dinding',
            'signage' => 'Signage & Huruf Timbul',
            'blinds' => 'Blinds & Gorden',
        ];

        $category = $validated['category'] ?? $gallery->category ?? 'kaca_film';
        $categoryLabel = $categoryLabels[$category] ?? 'Dokumentasi Proyek';
        $caption = array_key_exists('caption', $validated) ? $validated['caption'] : $gallery->caption;
        $title = ! empty($validated['title']) ? $validated['title'] : ($caption ? Str::limit($caption, 60, '...') : ($gallery->title ?: 'Dokumentasi Proyek'));

        if ($request->hasFile('image')) {
            if ($gallery->image && str_starts_with($gallery->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $gallery->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('galleries', 'public');
            $gallery->image = '/storage/'.$path;
        }

        $gallery->title = $title;
        $gallery->caption = $caption;
        $gallery->category = $category;
        $gallery->category_label = $categoryLabel;
        if (isset($validated['active'])) {
            $gallery->active = (bool) $validated['active'];
        }
        $gallery->save();

        return redirect()->route('admin.galleries.index')->with('success', 'Foto galeri berhasil diperbarui.');
    }

    /**
     * Remove the specified gallery item.
     */
    public function destroy(Gallery $gallery): RedirectResponse
    {
        if ($gallery->image && str_starts_with($gallery->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $gallery->image);
            Storage::disk('public')->delete($oldPath);
        }

        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Foto galeri berhasil dihapus.');
    }
}
