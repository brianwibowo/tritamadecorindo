<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
     * Store a newly created gallery item with multiple photos.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:50'],
            'active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:10240'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'image', 'max:10240'],
            'image_url' => ['nullable', 'string'],
        ]);

        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('galleries', 'public');
                $imagePaths[] = '/storage/'.$path;
            }
        } elseif ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $imagePaths[] = '/storage/'.$path;
        } else {
            $imagePaths[] = $validated['image_url'] ?? '/images/products/kaca-film-riben.webp';
        }

        $categoryLabels = [
            'kaca_film' => 'Kaca Film',
            'sandblast' => 'Sandblast & Stiker',
            'wallpaper' => 'Wallpaper Dinding',
            'signage' => 'Signage & Huruf Timbul',
            'blinds' => 'Blinds & Gorden',
        ];

        $category = $request->input('category', 'kaca_film');
        $categoryLabel = $categoryLabels[$category] ?? 'Dokumentasi Proyek';

        Gallery::create([
            'title' => $validated['title'],
            'caption' => null,
            'category' => $category,
            'category_label' => $categoryLabel,
            'image' => $imagePaths[0],
            'images' => $imagePaths,
            'active' => isset($validated['active']) ? (bool) $validated['active'] : true,
            'sort_order' => 0,
        ]);

        return redirect()->route('admin.galleries.index')->with('success', 'Galeri proyek berhasil ditambahkan.');
    }

    /**
     * Update the specified gallery item.
     */
    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:50'],
            'active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:10240'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'image', 'max:10240'],
            'existing_images' => ['nullable', 'array'],
        ]);

        $categoryLabels = [
            'kaca_film' => 'Kaca Film',
            'sandblast' => 'Sandblast & Stiker',
            'wallpaper' => 'Wallpaper Dinding',
            'signage' => 'Signage & Huruf Timbul',
            'blinds' => 'Blinds & Gorden',
        ];

        $currentImages = $request->input('existing_images', $gallery->all_images);
        if (! is_array($currentImages)) {
            $currentImages = $gallery->all_images;
        }

        // If new images uploaded, append them
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('galleries', 'public');
                $currentImages[] = '/storage/'.$path;
            }
        } elseif ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $currentImages = ['/storage/'.$path];
        }

        $gallery->title = $validated['title'];
        $gallery->caption = null;

        if ($request->filled('category')) {
            $gallery->category = $request->input('category');
            $gallery->category_label = $categoryLabels[$request->input('category')] ?? 'Dokumentasi Proyek';
        }

        if (! empty($currentImages)) {
            $gallery->images = array_values($currentImages);
            $gallery->image = $currentImages[0];
        }

        if (isset($validated['active'])) {
            $gallery->active = (bool) $validated['active'];
        }

        $gallery->save();

        return redirect()->route('admin.galleries.index')->with('success', 'Galeri proyek berhasil diperbarui.');
    }

    /**
     * Remove the specified gallery item.
     */
    public function destroy(Gallery $gallery): RedirectResponse
    {
        foreach ($gallery->all_images as $imgPath) {
            if ($imgPath && str_starts_with($imgPath, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $imgPath);
                Storage::disk('public')->delete($oldPath);
            }
        }

        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Galeri proyek berhasil dihapus.');
    }
}
