<?php

namespace Tests\Feature\Admin;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FullCrudTestSuiteTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    private Category $category;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create([
            'name' => 'Administrator LFM Global',
            'email' => 'admin@lfmjayatama.com',
            'role' => UserRole::Admin,
            'status' => 'active',
        ]);

        $this->category = Category::create([
            'id' => 'cat-rempah-super',
            'name' => 'Rempah Kering Super',
            'slug' => 'rempah-kering-super',
            'description' => 'Komoditas rempah kering pilihan standar ekspor.',
            'active' => true,
        ]);
    }

    // ==========================================
    // 1. PRODUCT CRUD TESTS
    // ==========================================
    public function test_product_full_crud_lifecycle(): void
    {
        // 1. Create Product
        $createResponse = $this->actingAs($this->admin)->post(route('admin.products.store'), [
            'name' => 'Cengkeh Maluku Grade AB6',
            'slug' => 'cengkeh-maluku-grade-ab6',
            'category_id' => $this->category->id,
            'summary' => 'Cengkeh asli Maluku pilihan.',
            'description' => 'Kadar air di bawah 12%, tanpa tangkai, aroma pekat.',
            'active' => true,
            'show_price' => true,
            'variants' => [
                ['name' => 'Karung 25 Kg', 'price' => 3500000, 'stock' => 20],
                ['name' => 'Sampel 1 Kg', 'price' => 150000, 'stock' => 50],
            ],
        ]);
        $createResponse->assertRedirect(route('admin.products.index'));

        $product = Product::where('slug', 'cengkeh-maluku-grade-ab6')->first();
        $this->assertNotNull($product);
        $this->assertCount(2, $product->variants);
        $this->assertTrue($product->show_price);

        // 2. Read / Index
        $indexResponse = $this->actingAs($this->admin)->get(route('admin.products.index'));
        $indexResponse->assertOk();

        // 3. Update Product
        $updateResponse = $this->actingAs($this->admin)->put(route('admin.products.update', $product->id), [
            'name' => 'Cengkeh Maluku Super AB6 Premium',
            'slug' => 'cengkeh-maluku-super-ab6-premium',
            'category_id' => $this->category->id,
            'summary' => 'Ringkasan terupdate.',
            'description' => 'Deskripsi terupdate.',
            'active' => true,
            'show_price' => false, // Set to negotiation mode
            'variants' => [
                ['id' => $product->variants[0]->id, 'name' => 'Karung 25 Kg Super', 'price' => 3600000, 'stock' => 25],
            ],
        ]);
        $updateResponse->assertRedirect(route('admin.products.index'));

        $product->refresh();
        $this->assertSame('Cengkeh Maluku Super AB6 Premium', $product->name);
        $this->assertFalse($product->show_price);
        $this->assertCount(1, $product->variants);

        // 4. Toggle Price Display
        $toggleResponse = $this->actingAs($this->admin)->patch(route('admin.products.toggle-price', $product->id));
        $toggleResponse->assertRedirect();
        $this->assertTrue($product->fresh()->show_price);

        // 5. Delete Product
        $deleteResponse = $this->actingAs($this->admin)->delete(route('admin.products.destroy', $product->id));
        $deleteResponse->assertRedirect(route('admin.products.index'));
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
        $this->assertDatabaseMissing('variants', ['product_id' => $product->id]);
    }

    // ==========================================
    // 2. CATEGORY CRUD TESTS
    // ==========================================
    public function test_category_full_crud_lifecycle(): void
    {
        // 1. Create Category
        $response = $this->actingAs($this->admin)->post(route('admin.categories.store'), [
            'name' => 'Biji-Bijian & Pala',
            'slug' => 'biji-bijian-dan-pala',
            'description' => 'Biji pala dan fuli asli Kepulauan Banda.',
            'active' => true,
        ]);
        $response->assertRedirect(route('admin.categories.index'));

        $category = Category::where('slug', 'biji-bijian-dan-pala')->first();
        $this->assertNotNull($category);

        // 2. Read / Index
        $indexResponse = $this->actingAs($this->admin)->get(route('admin.categories.index'));
        $indexResponse->assertOk();

        // 3. Update Category
        $updateResponse = $this->actingAs($this->admin)->put(route('admin.categories.update', $category->id), [
            'name' => 'Biji-Bijian & Pala Banda',
            'slug' => 'biji-bijian-dan-pala-banda',
            'description' => 'Deskripsi terupdate.',
            'active' => true,
        ]);
        $updateResponse->assertRedirect(route('admin.categories.index'));
        $this->assertSame('Biji-Bijian & Pala Banda', $category->fresh()->name);

        // 4. Toggle Category Status
        $toggleResponse = $this->actingAs($this->admin)->patch(route('admin.categories.toggle', $category->id));
        $toggleResponse->assertRedirect();
        $this->assertFalse($category->fresh()->active);

        // 5. Delete Category
        $deleteResponse = $this->actingAs($this->admin)->delete(route('admin.categories.destroy', $category->id));
        $deleteResponse->assertRedirect(route('admin.categories.index'));
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }

    // ==========================================
    // 3. USER MANAGEMENT CRUD TESTS
    // ==========================================
    public function test_user_management_full_crud_lifecycle(): void
    {
        Storage::fake('public');

        // 1. Create User
        $avatar = UploadedFile::fake()->image('klien.jpg');
        $createResponse = $this->actingAs($this->admin)->post(route('admin.users.store'), [
            'name' => 'Hendrawan Buyer Global',
            'email' => 'hendrawan@importer.com',
            'password' => 'securepass123',
            'role' => 'buyer',
            'phone' => '+62811223344',
            'status' => 'active',
            'image' => $avatar,
        ]);
        $createResponse->assertRedirect(route('admin.users.index'));

        $user = User::where('email', 'hendrawan@importer.com')->first();
        $this->assertNotNull($user);
        $this->assertSame(UserRole::Buyer, $user->role);
        $this->assertNotNull($user->image);

        // 2. Read / Index
        $indexResponse = $this->actingAs($this->admin)->get(route('admin.users.index'));
        $indexResponse->assertOk();

        // 3. Update User
        $updateResponse = $this->actingAs($this->admin)->put(route('admin.users.update', $user->id), [
            'name' => 'Hendrawan Senior Buyer',
            'email' => 'hendrawan.senior@importer.com',
            'role' => 'buyer',
            'phone' => '+62899887766',
            'status' => 'active',
        ]);
        $updateResponse->assertRedirect(route('admin.users.index'));
        $this->assertSame('Hendrawan Senior Buyer', $user->fresh()->name);

        // 4. Toggle User Status
        $toggleResponse = $this->actingAs($this->admin)->patch(route('admin.users.toggle', $user->id));
        $toggleResponse->assertRedirect();
        $this->assertSame('inactive', $user->fresh()->status);

        // 5. Delete User
        $deleteResponse = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $user->id));
        $deleteResponse->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    // ==========================================
    // 4. GALLERY MANAGEMENT CRUD TESTS
    // ==========================================
    public function test_gallery_management_full_crud_lifecycle(): void
    {
        Storage::fake('public');

        // 1. Create Gallery Item
        $photo = UploadedFile::fake()->image('qc-facility.webp');
        $createResponse = $this->actingAs($this->admin)->post(route('admin.galleries.store'), [
            'title' => 'Ruang Quality Control & Laboratorium Rempah',
            'category' => 'laboratorium',
            'caption' => 'Pemeriksaan kadar air dan kebersihan cengkeh sebelum pengemasan ekspor.',
            'active' => true,
            'image' => $photo,
        ]);
        $createResponse->assertRedirect(route('admin.galleries.index'));

        $gallery = Gallery::where('title', 'Ruang Quality Control & Laboratorium Rempah')->first();
        $this->assertNotNull($gallery);
        $this->assertSame('laboratorium', $gallery->category);

        // 2. Read / Index Admin & Public
        $adminIndex = $this->actingAs($this->admin)->get(route('admin.galleries.index'));
        $adminIndex->assertOk();

        $publicIndex = $this->get(route('gallery.index'));
        $publicIndex->assertOk();

        // 3. Update Gallery Item
        $updateResponse = $this->actingAs($this->admin)->put(route('admin.galleries.update', $gallery->id), [
            'title' => 'Laboratorium Standar Internasional PT LFM',
            'category' => 'laboratorium',
            'caption' => 'Caption diperbarui.',
            'active' => true,
        ]);
        $updateResponse->assertRedirect(route('admin.galleries.index'));
        $this->assertSame('Laboratorium Standar Internasional PT LFM', $gallery->fresh()->title);

        // 4. Toggle Gallery Visibility
        $toggleResponse = $this->actingAs($this->admin)->patch(route('admin.galleries.toggle', $gallery->id));
        $toggleResponse->assertRedirect();
        $this->assertFalse($gallery->fresh()->active);

        // 5. Delete Gallery Item
        $deleteResponse = $this->actingAs($this->admin)->delete(route('admin.galleries.destroy', $gallery->id));
        $deleteResponse->assertRedirect(route('admin.galleries.index'));
        $this->assertDatabaseMissing('galleries', ['id' => $gallery->id]);
    }

    // ==========================================
    // 5. ORDER MANAGEMENT TESTS
    // ==========================================
    public function test_order_management_flow(): void
    {
        $buyer = User::factory()->create(['role' => UserRole::Buyer]);
        $order = Order::create([
            'id' => 'ORD-TEST-001',
            'buyer_id' => $buyer->id,
            'total_amount' => 5000000,
            'payment_status' => 'pending',
            'shipping_name' => 'Klien Ekspor Singapura',
            'shipping_address' => 'Jurong Port Road, Singapore',
            'shipping_phone' => '+65 9123 4567',
        ]);

        // 1. Admin Index Orders
        $indexResponse = $this->actingAs($this->admin)->get(route('admin.orders.index'));
        $indexResponse->assertOk();

        // 2. Admin Show Order
        $showResponse = $this->actingAs($this->admin)->get(route('admin.orders.show', $order->id));
        $showResponse->assertOk();

        // 3. Admin Update Order Status
        $updateResponse = $this->actingAs($this->admin)->put(route('admin.orders.update', $order->id), [
            'payment_status' => 'paid',
        ]);
        $updateResponse->assertRedirect();
        $this->assertSame('paid', $order->fresh()->payment_status);
    }

    // ==========================================
    // 6. PROFILE MODAL UPDATE TESTS
    // ==========================================
    public function test_profile_modal_update_with_avatar(): void
    {
        Storage::fake('public');

        $newAvatar = UploadedFile::fake()->image('admin-avatar.webp');

        $response = $this->actingAs($this->admin)
            ->from(route('admin.dashboard'))
            ->patch(route('profile.update'), [
                'name' => 'Administrator LFM Updated',
                'email' => 'admin.updated@lfmjayatama.com',
                'phone' => '+6281299998888',
                'image' => $newAvatar,
            ]);

        // Assert redirected back to admin dashboard, NOT /profile
        $response->assertRedirect(route('admin.dashboard'));
        $response->assertSessionHas('success');

        $this->admin->refresh();
        $this->assertSame('Administrator LFM Updated', $this->admin->name);
        $this->assertSame('admin.updated@lfmjayatama.com', $this->admin->email);
        $this->assertSame('+6281299998888', $this->admin->phone);
        $this->assertNotNull($this->admin->image);
    }
}
