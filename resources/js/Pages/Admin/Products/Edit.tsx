import AdminLayout from '@/Layouts/AdminLayout';
import { slugify } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import type { Category, Product } from '@/types';

interface Props {
    product: Product;
    categories: Pick<Category, 'id' | 'name'>[];
}

interface VariantForm {
    id?: string;
    name: string;
    price: number | string;
    stock: number | string;
}

export default function ProductEdit({ product, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm<{
        name: string;
        slug: string;
        category_id: string;
        description: string;
        summary: string;
        active: boolean;
        variants: VariantForm[];
    }>({
        name: product.name,
        slug: product.slug,
        category_id: product.category_id,
        description: product.description ?? '',
        summary: product.summary ?? '',
        active: product.active,
        variants: product.variants?.map((v) => ({
            id: v.id,
            name: v.name ?? '',
            price: v.price,
            stock: v.stock,
        })) ?? [{ name: '', price: '', stock: '' }],
    });

    const handleNameChange = (value: string) => {
        setData((prev) => ({ ...prev, name: value, slug: slugify(value) }));
    };

    const addVariant = () => {
        setData('variants', [...data.variants, { name: '', price: '', stock: '' }]);
    };

    const removeVariant = (index: number) => {
        if (data.variants.length <= 1) return;
        setData('variants', data.variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index: number, field: keyof VariantForm, value: string | number) => {
        const updated = [...data.variants];
        updated[index] = { ...updated[index], [field]: value };
        setData('variants', updated);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    return (
        <AdminLayout header="Edit Produk">
            <Head title={`Edit ${product.name} — Admin`} />

            <div className="mx-auto max-w-3xl">
                <form onSubmit={submit} className="space-y-6">
                    {/* Product Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 text-base font-semibold text-gray-900">Informasi Produk</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Nama Produk</label>
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
                                <label className="mb-1 block text-sm font-medium text-gray-700">Kategori</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Pilih kategori...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="mt-1 text-xs text-red-600">{errors.category_id}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Ringkasan</label>
                                <input
                                    type="text"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
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
                                <label htmlFor="active" className="text-sm text-gray-700">Produk Aktif</label>
                            </div>
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-900">Varian Produk</h2>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                + Tambah Varian
                            </button>
                        </div>

                        <div className="space-y-4">
                            {data.variants.map((variant, index) => (
                                <div key={variant.id ?? `new-${index}`} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="grid flex-1 grid-cols-3 gap-3">
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-gray-600">Nama Varian</label>
                                            <input
                                                type="text"
                                                value={variant.name}
                                                onChange={(e) => updateVariant(index, 'name', e.target.value)}
                                                placeholder="Contoh: Ukuran M"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-gray-600">Harga (IDR)</label>
                                            <input
                                                type="number"
                                                value={variant.price}
                                                onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                                placeholder="45000"
                                                min="0"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                required
                                            />
                                            {errors[`variants.${index}.price` as keyof typeof errors] && (
                                                <p className="mt-1 text-xs text-red-600">{errors[`variants.${index}.price` as keyof typeof errors]}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-gray-600">Stok</label>
                                            <input
                                                type="number"
                                                value={variant.stock}
                                                onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                                placeholder="50"
                                                min="0"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    {data.variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="mt-6 rounded p-1 text-red-500 hover:bg-red-50"
                                            title="Hapus varian"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {errors.variants && <p className="mt-2 text-xs text-red-600">{errors.variants}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.products.index')}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Perbarui Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
