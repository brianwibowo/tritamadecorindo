export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'admin' | 'buyer';
    phone?: string;
    status: string;
    image?: string;
    banned: boolean;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    active: boolean;
    created_at: string;
    products_count?: number;
}

export interface Variant {
    id: string;
    product_id: string;
    name?: string;
    price: number;
    stock: number;
    images: string[];
    attributes: Record<string, unknown>;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string;
    summary?: string;
    category_id: string;
    images: string[];
    active: boolean;
    show_price?: boolean;
    created_at: string;
    updated_at: string;
    category?: Category;
    variants?: Variant[];
    lowest_price?: number;
}

export interface CartItem {
    id: string;
    cart_id: string;
    variant_id: string;
    quantity: number;
    created_at: string;
    updated_at: string;
    variant?: Variant;
    product?: Product;
}

export interface Cart {
    id: string;
    user_id?: number;
    created_at: string;
    updated_at: string;
    items?: CartItem[];
}

export interface OrderItem {
    id: string;
    order_id: string;
    variant_id?: string;
    product_name: string;
    variant_name: string;
    quantity: number;
    price: number;
    created_at: string;
    variant?: Variant;
}

export interface Order {
    id: string;
    buyer_id: number;
    total_amount: number;
    payment_method?: string;
    payment_status: string;
    notes?: string;
    shipping_name?: string;
    shipping_address?: string;
    shipping_phone?: string;
    created_at: string;
    updated_at: string;
    buyer?: User;
    items?: OrderItem[];
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface FlashMessages {
    success?: string;
    error?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: FlashMessages;
    cart_count?: number;
};
