<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

        $galleries = $query->orderBy('sort_order')->latest('id')->paginate(10)->withQueryString();

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
            ->with('success', "Status galeri '{$gallery->title}' berhasil diubah menjadi {$statusText}.");
    }

    /**
     * Store a newly created gallery item.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string'],
            'category' => ['required', Rule::in(['kaca_film', 'sandblast', 'wallpaper', 'signage', 'blinds'])],
            'active' => ['required', 'boolean'],
            'image' => ['nullable', 'image', 'max:5120'],
            'image_url' => ['nullable', 'string'],
        ]);

        $categoryLabels = [
            'kaca_film' => 'Kaca Film',
            'sandblast' => 'Sandblast & Stiker',
            'wallpaper' => 'Wallpaper Dinding',
            'signage' => 'Signage & Huruf Timbul',
            'blinds' => 'Blinds & Gorden',
        ];

        $imagePath = $validated['image_url'] ?? '/images/products/kaca-film-riben.webp';
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $imagePath = '/storage/'.$path;
        }

        Gallery::create([
            'title' => $validated['title'],
            'caption' => $validated['caption'] ?? null,
            'category' => $validated['category'],
            'category_label' => $categoryLabels[$validated['category']] ?? 'Kaca Film',
            'image' => $imagePath,
            'active' => $validated['active'],
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
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string'],
            'category' => ['required', Rule::in(['kaca_film', 'sandblast', 'wallpaper', 'signage', 'blinds'])],
            'active' => ['required', 'boolean'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        $categoryLabels = [
            'kaca_film' => 'Kaca Film',
            'sandblast' => 'Sandblast & Stiker',
            'wallpaper' => 'Wallpaper Dinding',
            'signage' => 'Signage & Huruf Timbul',
            'blinds' => 'Blinds & Gorden',
        ];

        if ($request->hasFile('image')) {
            if ($gallery->image && str_starts_with($gallery->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $gallery->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('galleries', 'public');
            $gallery->image = '/storage/'.$path;
        }

        $gallery->title = $validated['title'];
        $gallery->caption = $validated['caption'] ?? null;
        $gallery->category = $validated['category'];
        $gallery->category_label = $categoryLabels[$validated['category']] ?? 'Kaca Film';
        $gallery->active = $validated['active'];
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
