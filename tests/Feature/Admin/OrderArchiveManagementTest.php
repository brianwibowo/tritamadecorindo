<?php

namespace Tests\Feature\Admin;

use App\Enums\UserRole;
use App\Models\OrderArchive;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderArchiveManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create([
            'name' => 'Administrator Tritama',
            'email' => 'admin@tritamadecorindo.com',
            'role' => UserRole::Admin,
            'status' => 'active',
        ]);
    }

    public function test_admin_can_view_order_archives_list_and_dashboard(): void
    {
        $archive = OrderArchive::factory()->create([
            'customer_name' => 'PT Mega Sentosa Perkasa',
            'status' => 'in_progress',
        ]);

        $response = $this->actingAs($this->admin)->get(route('admin.order-archives.index'));
        $response->assertOk();

        $dashboardResponse = $this->actingAs($this->admin)->get(route('admin.dashboard'));
        $dashboardResponse->assertOk();
    }

    public function test_admin_can_create_new_order_archive(): void
    {
        $payload = [
            'customer_name' => 'Bpk. Ridwan (Apartemen Grand Kemang)',
            'customer_phone' => '0812-9988-7766',
            'customer_address' => 'Tower A Lt. 12 No. 5, Kemang, Jakarta Selatan',
            'project_type' => 'Pemasangan Kaca Film Gedung / Rumah',
            'details' => 'Kaca Film One Way 80% Anti-Panas 15 m²',
            'total_amount' => 1800000,
            'status' => 'survey',
            'installation_date' => '2026-09-05',
            'notes' => 'Survey pukul 14:00 WIB, bawa sample katalog kaca film.',
        ];

        $response = $this->actingAs($this->admin)->post(route('admin.order-archives.store'), $payload);
        $response->assertRedirect(route('admin.order-archives.index'));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('order_archives', [
            'customer_name' => 'Bpk. Ridwan (Apartemen Grand Kemang)',
            'total_amount' => 1800000,
            'status' => 'survey',
        ]);
    }

    public function test_admin_can_update_existing_order_archive(): void
    {
        $archive = OrderArchive::factory()->create([
            'customer_name' => 'Bpk. Surya Kencana',
            'total_amount' => 2000000,
            'status' => 'survey',
        ]);

        $updatePayload = [
            'customer_name' => 'Bpk. Surya Kencana (PT Kencana Solusi)',
            'customer_phone' => '0813-4455-6677',
            'customer_address' => 'Jl. TB Simatupang No. 8, Jakarta',
            'project_type' => 'Sandblast Cutting Motif Logo & Striping',
            'details' => 'Sandblast cutting motif logo 4 daun + garis horizontal 3 baris',
            'total_amount' => 3200000,
            'status' => 'in_progress',
            'installation_date' => '2026-09-10',
            'notes' => 'Pemasangan selesai survey dan DP 50% diterima.',
        ];

        $response = $this->actingAs($this->admin)->put(route('admin.order-archives.update', $archive->id), $updatePayload);
        $response->assertRedirect(route('admin.order-archives.index'));
        $response->assertSessionHas('success');

        $archive->refresh();
        $this->assertSame('Bpk. Surya Kencana (PT Kencana Solusi)', $archive->customer_name);
        $this->assertSame(3200000, $archive->total_amount);
        $this->assertSame('in_progress', $archive->status);
    }

    public function test_admin_can_quick_update_archive_status(): void
    {
        $archive = OrderArchive::factory()->create([
            'status' => 'in_progress',
        ]);

        $response = $this->actingAs($this->admin)->patch(route('admin.order-archives.status', $archive->id), [
            'status' => 'completed',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertSame('completed', $archive->fresh()->status);
    }

    public function test_admin_can_delete_order_archive(): void
    {
        $archive = OrderArchive::factory()->create();

        $response = $this->actingAs($this->admin)->delete(route('admin.order-archives.destroy', $archive->id));
        $response->assertRedirect(route('admin.order-archives.index'));
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('order_archives', ['id' => $archive->id]);
    }

    public function test_unauthenticated_user_cannot_access_order_archives(): void
    {
        $response = $this->get(route('admin.order-archives.index'));
        $response->assertRedirect(route('login'));
    }
}
