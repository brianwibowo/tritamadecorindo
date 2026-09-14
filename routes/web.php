<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\Buyer;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

// SEO Sitemap & Verification
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/google0acf7b7782458daf.html', function () {
    return response('google-site-verification: google0acf7b7782458daf.html', 200, [
        'Content-Type' => 'text/html; charset=UTF-8',
    ]);
});

// Storefront
Route::get('/', [Buyer\HomeController::class, 'index'])->name('home');
Route::get('/products', [Buyer\ProductController::class, 'index'])->name('products.index');
Route::get('/product/{slug}', [Buyer\ProductController::class, 'show'])->name('products.show');
Route::get('/galeri', [Buyer\GalleryController::class, 'index'])->name('gallery.index');

// Auth Dashboard / Profile
Route::get('/dashboard', function () {
    if (auth()->user()?->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Panel
Route::prefix('admin')->middleware(['auth', 'admin'])->name('admin.')->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::get('products/check-slug', [Admin\ProductController::class, 'checkSlug'])->name('products.check-slug');
    Route::patch('products/{product}/toggle-price', [Admin\ProductController::class, 'togglePrice'])->name('products.toggle-price');
    Route::patch('products/{product}/toggle', [Admin\ProductController::class, 'togglePrice'])->name('products.toggle');
    Route::resource('products', Admin\ProductController::class);

    Route::patch('categories/{category}/toggle', [Admin\CategoryController::class, 'toggleStatus'])->name('categories.toggle');
    Route::resource('categories', Admin\CategoryController::class);

    Route::patch('order-archives/{order_archive}/status', [Admin\OrderArchiveController::class, 'updateStatus'])->name('order-archives.status');
    Route::resource('order-archives', Admin\OrderArchiveController::class);

    Route::patch('users/{user}/toggle', [Admin\UserController::class, 'toggleStatus'])->name('users.toggle');
    Route::resource('users', Admin\UserController::class);

    Route::patch('galleries/{gallery}/toggle', [Admin\GalleryController::class, 'toggleStatus'])->name('galleries.toggle');
    Route::resource('galleries', Admin\GalleryController::class);
});

require __DIR__.'/auth.php';
