import AdminLayout from '@/Layouts/AdminLayout';
import { cn, formatMoney } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import type { Order, OrderItem } from '@/types';

interface OrderItemRow extends OrderItem {
    price_formatted: string;
    subtotal_formatted: string;
}

interface OrderDetail extends Order {
    total_amount_formatted: string;
    items: OrderItemRow[];
}

interface Props {
    order: OrderDetail;
}

const statusOptions = [
    { value: 'unpaid', label: 'Belum Bayar' },
    { value: 'pending_payment', label: 'Menunggu Pembayaran' },
    { value: 'paid', label: 'Dibayar' },
    { value: 'processing', label: 'Diproses' },
    { value: 'shipped', label: 'Dikirim' },
    { value: 'delivered', label: 'Diterima' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' },
    { value: 'refunded', label: 'Dikembalikan' },
];

const statusColors: Record<string, string> = {
    unpaid: 'bg-gray-100 text-gray-700',
    pending_payment: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-teal-100 text-teal-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-orange-100 text-orange-800',
};

export default function OrderShow({ order }: Props) {
    const { data, setData, put, processing } = useForm({
        payment_status: order.payment_status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.orders.update', order.id));
    };

    return (
        <AdminLayout header="Detail Pesanan">
            <Head title="Detail Pesanan — Admin" />

            <div className="mb-4">
                <Link
                    href={route('admin.orders.index')}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    ← Kembali ke Daftar Pesanan
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Order Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 text-base font-semibold text-gray-900">Item Pesanan</h2>

                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600">Produk</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600">Varian</th>
                                        <th className="px-4 py-2 text-right font-medium text-gray-600">Harga</th>
                                        <th className="px-4 py-2 text-right font-medium text-gray-600">Qty</th>
                                        <th className="px-4 py-2 text-right font-medium text-gray-600">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {order.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3 font-medium text-gray-900">{item.product_name}</td>
                                            <td className="px-4 py-3 text-gray-600">{item.variant_name}</td>
                                            <td className="px-4 py-3 text-right text-gray-600">{item.price_formatted}</td>
                                            <td className="px-4 py-3 text-right text-gray-600">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-900">{item.subtotal_formatted}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="border-t border-gray-200 bg-gray-50">
                                    <tr>
                                        <td colSpan={4} className="px-4 py-3 text-right font-semibold text-gray-900">Total</td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-900">{order.total_amount_formatted}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    {(order.shipping_name || order.shipping_address || order.shipping_phone) && (
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h2 className="mb-4 text-base font-semibold text-gray-900">Info Pengiriman</h2>
                            <dl className="space-y-2 text-sm">
                                {order.shipping_name && (
                                    <div className="flex gap-2">
                                        <dt className="w-24 shrink-0 text-gray-500">Nama</dt>
                                        <dd className="text-gray-900">{order.shipping_name}</dd>
                                    </div>
                                )}
                                {order.shipping_phone && (
                                    <div className="flex gap-2">
                                        <dt className="w-24 shrink-0 text-gray-500">Telepon</dt>
                                        <dd className="text-gray-900">{order.shipping_phone}</dd>
                                    </div>
                                )}
                                {order.shipping_address && (
                                    <div className="flex gap-2">
                                        <dt className="w-24 shrink-0 text-gray-500">Alamat</dt>
                                        <dd className="text-gray-900">{order.shipping_address}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 text-base font-semibold text-gray-900">Ringkasan</h2>
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-gray-500">ID Pesanan</dt>
                                <dd className="font-mono text-xs text-gray-900">{order.id.slice(0, 12)}...</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Pembeli</dt>
                                <dd className="text-gray-900">{order.buyer?.name ?? '-'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Tanggal</dt>
                                <dd className="text-gray-900">
                                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Status</dt>
                                <dd>
                                    <span className={cn(
                                        'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                                        statusColors[order.payment_status] ?? 'bg-gray-100 text-gray-700',
                                    )}>
                                        {order.payment_status}
                                    </span>
                                </dd>
                            </div>
                            {order.notes && (
                                <div>
                                    <dt className="mb-1 text-gray-500">Catatan</dt>
                                    <dd className="text-gray-900">{order.notes}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Update Status */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 text-base font-semibold text-gray-900">Update Status</h2>
                        <form onSubmit={submit} className="space-y-3">
                            <select
                                value={data.payment_status}
                                onChange={(e) => setData('payment_status', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                {statusOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Perbarui Status'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
