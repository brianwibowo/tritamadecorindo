<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the users with search & filters.
     */
    public function index(): Response
    {
        $query = User::query();

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($role = request('role')) {
            $query->where('role', $role);
        }

        if ($status = request('status')) {
            $query->where('status', $status);
        }

        $users = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => request('search', ''),
                'role' => request('role', ''),
                'status' => request('status', ''),
            ],
            'roles' => [
                ['value' => UserRole::Admin->value, 'label' => 'Administrator'],
                ['value' => UserRole::Buyer->value, 'label' => 'Buyer / Klien'],
            ],
        ]);
    }

    /**
     * Quick toggle active status of a user (Slide Switch).
     */
    public function toggleStatus(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users.index')->with('error', 'Anda tidak dapat menonaktifkan akun Anda sendiri.');
        }

        $user->status = $user->status === 'active' ? 'inactive' : 'active';
        $user->save();

        $statusText = $user->status === 'active' ? 'Aktif' : 'Nonaktif';

        return redirect()
            ->back()
            ->with('success', "Status akun '{$user->name}' berhasil diubah menjadi {$statusText}.");
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', Password::defaults()],
            'role' => ['required', Rule::in(['admin', 'buyer'])],
            'phone' => ['nullable', 'string', 'max:50'],
            'status' => ['required', Rule::in(['active', 'inactive', 'suspended'])],
            'image' => ['nullable', 'image', 'max:5120'], // Max 5MB, all image formats
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('avatars', 'public');
            $imagePath = '/storage/'.$imagePath;
        }

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] === 'admin' ? UserRole::Admin : UserRole::Buyer,
            'phone' => $validated['phone'] ?? null,
            'status' => $validated['status'],
            'image' => $imagePath,
        ]);

        return redirect()->route('admin.users.index')->with('success', 'Pengguna baru berhasil ditambahkan.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        $user->load(['orders.items.product', 'orders.items.variant']);

        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', Password::defaults()],
            'role' => ['required', Rule::in(['admin', 'buyer'])],
            'phone' => ['nullable', 'string', 'max:50'],
            'status' => ['required', Rule::in(['active', 'inactive', 'suspended'])],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            if ($user->image && str_starts_with($user->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $user->image);
                Storage::disk('public')->delete($oldPath);
            }
            $imagePath = $request->file('image')->store('avatars', 'public');
            $user->image = '/storage/'.$imagePath;
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'] === 'admin' ? UserRole::Admin : UserRole::Buyer;
        $user->phone = $validated['phone'] ?? null;
        $user->status = $validated['status'];

        if (! empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->route('admin.users.index')->with('success', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users.index')->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        if ($user->image && str_starts_with($user->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $user->image);
            Storage::disk('public')->delete($oldPath);
        }

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'Pengguna berhasil dihapus.');
    }
}
