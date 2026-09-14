<?php

namespace Tests\Feature\Admin;

use App\Enums\UserRole;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class GalleryManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => UserRole::Admin]);
    }

    public function test_admin_can_view_galleries_list(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.galleries.index'));

        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_view_admin_galleries(): void
    {
        $buyer = User::factory()->create(['role' => UserRole::Buyer]);

        $response = $this->actingAs($buyer)->get(route('admin.galleries.index'));

        $response->assertStatus(403);
    }

    public function test_admin_can_create_gallery_item(): void
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->image('proyek_kaca_film.jpg');

        $response = $this->actingAs($this->admin)->post(route('admin.galleries.store'), [
            'caption' => 'Pemasangan kaca film riben penolak panas 80%.',
            'active' => true,
            'image' => $file,
        ]);

        $response->assertRedirect(route('admin.galleries.index'));
        $this->assertDatabaseHas('galleries', [
            'caption' => 'Pemasangan kaca film riben penolak panas 80%.',
        ]);
    }

    public function test_admin_can_create_multiple_gallery_items_at_once(): void
    {
        Storage::fake('public');
        $files = [
            UploadedFile::fake()->image('foto1.jpg'),
            UploadedFile::fake()->image('foto2.jpg'),
            UploadedFile::fake()->image('foto3.jpg'),
        ];

        $response = $this->actingAs($this->admin)->post(route('admin.galleries.store'), [
            'caption' => 'Pemasangan sandblast cutting logo kantor 3 lantai.',
            'active' => true,
            'images' => $files,
        ]);

        $response->assertRedirect(route('admin.galleries.index'));
        $this->assertDatabaseCount('galleries', 3);
    }

    public function test_admin_can_update_gallery_item(): void
    {
        $gallery = Gallery::create([
            'title' => 'Judul Lama',
            'caption' => 'Caption Lama',
            'category' => 'sandblast',
            'category_label' => 'Sandblast & Stiker',
            'image' => '/images/products/sandblast-polos.webp',
            'active' => true,
        ]);

        $response = $this->actingAs($this->admin)->put(route('admin.galleries.update', $gallery->id), [
            'title' => 'Judul Baru Diperbarui',
            'caption' => 'Caption Baru',
            'category' => 'wallpaper',
            'active' => false,
        ]);

        $response->assertRedirect(route('admin.galleries.index'));
        $this->assertDatabaseHas('galleries', [
            'id' => $gallery->id,
            'title' => 'Judul Baru Diperbarui',
            'category' => 'wallpaper',
            'category_label' => 'Wallpaper Dinding',
            'active' => false,
        ]);
    }

    public function test_admin_can_delete_gallery_item(): void
    {
        $gallery = Gallery::create([
            'title' => 'Dokumentasi untuk dihapus',
            'category' => 'kaca_film',
            'image' => '/images/products/kaca-film-riben.webp',
            'active' => true,
        ]);

        $response = $this->actingAs($this->admin)->delete(route('admin.galleries.destroy', $gallery->id));

        $response->assertRedirect(route('admin.galleries.index'));
        $this->assertDatabaseMissing('galleries', ['id' => $gallery->id]);
    }

    public function test_public_user_can_view_gallery_page_from_database(): void
    {
        Gallery::create([
            'title' => 'Dokumentasi Publik',
            'caption' => 'Penjelasan publik',
            'category' => 'kaca_film',
            'category_label' => 'Kaca Film',
            'image' => '/images/products/kaca-film-riben.webp',
            'active' => true,
        ]);

        $response = $this->get(route('gallery.index'));

        $response->assertStatus(200);
    }
}
