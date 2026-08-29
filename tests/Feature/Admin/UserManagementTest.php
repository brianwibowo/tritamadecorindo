<?php

namespace Tests\Feature\Admin;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => UserRole::Admin]);
    }

    public function test_admin_can_view_users_list(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.users.index'));

        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_view_users_list(): void
    {
        $buyer = User::factory()->create(['role' => UserRole::Buyer]);

        $response = $this->actingAs($buyer)->get(route('admin.users.index'));

        $response->assertStatus(403);
    }

    public function test_admin_can_create_new_user_with_avatar(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->actingAs($this->admin)->post(route('admin.users.store'), [
            'name' => 'Budi Eksportir',
            'email' => 'budi@lfmjayatama.com',
            'password' => 'password123',
            'role' => 'admin',
            'phone' => '+628123456789',
            'status' => 'active',
            'image' => $file,
        ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', [
            'email' => 'budi@lfmjayatama.com',
            'role' => UserRole::Admin->value,
        ]);
    }

    public function test_admin_can_update_user(): void
    {
        $user = User::factory()->create([
            'name' => 'Old Name',
            'email' => 'old@example.com',
            'role' => UserRole::Buyer,
        ]);

        $response = $this->actingAs($this->admin)->put(route('admin.users.update', $user->id), [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'role' => 'admin',
            'phone' => '+628987654321',
            'status' => 'active',
        ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'role' => UserRole::Admin->value,
        ]);
    }

    public function test_admin_can_delete_other_user(): void
    {
        $user = User::factory()->create(['role' => UserRole::Buyer]);

        $response = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $user->id));

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_admin_cannot_delete_self(): void
    {
        $response = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $this->admin->id));

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', ['id' => $this->admin->id]);
    }
}
