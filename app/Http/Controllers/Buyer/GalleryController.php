<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display the gallery page showcasing spice facilities, farming & export activities from database.
     */
    public function index(): Response
    {
        $query = Gallery::where('active', true)->orderBy('sort_order')->latest('id');

        $category = request('category', 'all');
        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        $galleryItems = $query->paginate(12)->withQueryString();

        return Inertia::render('Gallery', [
            'galleryItems' => $galleryItems,
            'currentCategory' => $category,
        ]);
    }
}
