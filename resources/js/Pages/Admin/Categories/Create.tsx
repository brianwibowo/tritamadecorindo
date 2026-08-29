import AdminLayout from '@/Layouts/AdminLayout';
import { slugify } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CategoryCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        active: true,
    });

    const handleNameChange = (value: string) => {
        setData((prev) => ({ ...prev, name: value, slug: slugify(value) }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AdminLayout header="Tambah Kategori">
            <Head title="Tambah Kategori — Admin" />

            <div className="mx-auto max-w-2xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Nama Kategori</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={data.active}
                                    onChange={(e) => setData('active', e.target.checked)}
                                    className="rounded border-gray-300"
                                />
                                <label htmlFor="active" className="text-sm text-gray-700">Kategori Aktif</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.categories.index')}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
