<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $service['title'] }} | Tritama Decorindo</title>
    <meta name="description" content="{{ $service['description'] }}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="{{ $canonical }}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Tritama Decorindo Stiker">
    <meta property="og:title" content="{{ $service['title'] }}">
    <meta property="og:description" content="{{ $service['description'] }}">
    <meta property="og:url" content="{{ $canonical }}">
    <meta property="og:image" content="{{ asset($service['image']) }}">
    <meta property="og:locale" content="id_ID">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $service['title'] }}">
    <meta name="twitter:description" content="{{ $service['description'] }}">
    <meta name="twitter:image" content="{{ asset($service['image']) }}">
    <style>
        :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        * { box-sizing: border-box; }
        body { margin: 0; color: #15213b; background: #f8fafc; line-height: 1.65; }
        a { color: #1237a6; }
        .wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
        header { background: #111fa2; color: white; }
        header .wrap { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-top: 16px; padding-bottom: 16px; }
        .brand { color: white; font-weight: 800; text-decoration: none; font-size: 1.15rem; }
        nav { display: flex; flex-wrap: wrap; gap: 14px; font-size: .9rem; }
        nav a { color: white; text-decoration: none; }
        main { padding: 34px 0 64px; }
        .crumbs { color: #53627d; font-size: .9rem; margin-bottom: 22px; }
        .hero { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(260px, .7fr); gap: 36px; align-items: center; }
        h1 { color: #0b176d; font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.12; margin: 0 0 16px; letter-spacing: -.03em; }
        h2 { color: #0b176d; line-height: 1.25; margin: 0 0 14px; }
        .lead { font-size: 1.1rem; color: #40506c; }
        .hero img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 18px; box-shadow: 0 18px 45px rgba(15, 31, 91, .18); }
        .button { display: inline-block; margin-top: 14px; padding: 12px 20px; border-radius: 999px; color: #111; background: #ffde42; font-weight: 800; text-decoration: none; }
        .section { margin-top: 46px; }
        .cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; padding: 0; list-style: none; }
        .cards li, .product { background: white; border: 1px solid #e4e9f2; border-radius: 14px; padding: 18px; }
        .cards li::before { content: '✓'; color: #1237a6; font-weight: 900; margin-right: 8px; }
        .product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .product { text-decoration: none; color: inherit; }
        .product img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 10px; }
        .product h3 { color: #1237a6; font-size: 1rem; margin: 10px 0 4px; line-height: 1.3; }
        .product p { margin: 0; color: #53627d; font-size: .9rem; }
        details { background: white; border-bottom: 1px solid #e4e9f2; padding: 16px 0; }
        summary { cursor: pointer; font-weight: 750; color: #0b176d; }
        footer { padding: 24px 0; color: #53627d; font-size: .9rem; border-top: 1px solid #e4e9f2; }
        @media (max-width: 760px) { header .wrap, .hero { display: block; } nav { margin-top: 10px; } .hero img { margin-top: 24px; } .cards, .product-grid { grid-template-columns: 1fr; } }
    </style>
    @php
        $image = asset($service['image']);
        $organizationId = url('/') . '/#organization';
        $schema = [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => ['LocalBusiness', 'HomeAndConstructionBusiness'],
                    '@id' => $organizationId,
                    'name' => 'Tritama Decorindo Stiker',
                    'url' => url('/'),
                    'logo' => asset('images/logo.png'),
                    'image' => $image,
                    'telephone' => '+6281990909646',
                    'address' => [
                        '@type' => 'PostalAddress',
                        'streetAddress' => 'Grand Anandara Residence, Jl. Pertamina Blok E10 No.8, Kedungjaya, Kec. Babelan',
                        'addressLocality' => 'Kabupaten Bekasi',
                        'addressRegion' => 'Jawa Barat',
                        'postalCode' => '17610',
                        'addressCountry' => 'ID',
                    ],
                    'areaServed' => $service['areas'],
                ],
                [
                    '@type' => 'Service',
                    '@id' => $canonical . '#service',
                    'name' => $service['name'],
                    'serviceType' => $service['name'],
                    'description' => $service['description'],
                    'url' => $canonical,
                    'image' => $image,
                    'provider' => ['@id' => $organizationId],
                    'areaServed' => $service['areas'],
                ],
                [
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => [
                        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => url('/')],
                        ['@type' => 'ListItem', 'position' => 2, 'name' => $service['name'], 'item' => $canonical],
                    ],
                ],
                [
                    '@type' => 'FAQPage',
                    'mainEntity' => array_map(fn (array $faq): array => [
                        '@type' => 'Question',
                        'name' => $faq['question'],
                        'acceptedAnswer' => ['@type' => 'Answer', 'text' => $faq['answer']],
                    ], $service['faqs']),
                ],
            ],
        ];
    @endphp
    <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
</head>
<body>
    <header>
        <div class="wrap">
            <a class="brand" href="{{ url('/') }}">Tritama Decorindo</a>
            <nav aria-label="Navigasi utama">
                <a href="{{ route('services.show', 'kaca-film-bekasi') }}">Kaca Film</a>
                <a href="{{ route('services.show', 'sandblast-bekasi') }}">Sandblast</a>
                <a href="{{ route('services.show', 'roller-blinds-bekasi') }}">Roller Blinds</a>
                <a href="{{ route('products.index') }}">Produk & Harga</a>
                <a href="{{ route('gallery.index') }}">Galeri</a>
            </nav>
        </div>
    </header>
    <main class="wrap">
        <div class="crumbs"><a href="{{ url('/') }}">Beranda</a> / {{ $service['name'] }}</div>
        <section class="hero">
            <div>
                <h1>{{ $service['title'] }}</h1>
                <p class="lead">{{ $service['intro'] }}</p>
                <a class="button" href="https://wa.me/6281990909646?text={{ rawurlencode('Halo Tritama Decorindo, saya ingin konsultasi ' . $service['name'] . ' di Bekasi.') }}">Konsultasi via WhatsApp</a>
            </div>
            <img src="{{ $image }}" alt="{{ $service['name'] }} Tritama Decorindo" width="800" height="600" fetchpriority="high">
        </section>
        <section class="section">
            <h2>Mengapa memilih Tritama Decorindo?</h2>
            <ul class="cards">
                @foreach ($service['benefits'] as $benefit)
                    <li>{{ $benefit }}</li>
                @endforeach
            </ul>
        </section>
        <section class="section">
            <h2>Produk terkait {{ $service['name'] }}</h2>
            <div class="product-grid">
                @forelse ($products as $product)
                    @php($productImage = asset($product->images[0] ?? $service['image']))
                    <a class="product" href="{{ route('products.show', $product->slug) }}">
                        <img src="{{ $productImage }}" alt="{{ $product->name }}" width="600" height="450" loading="lazy">
                        <h3>{{ $product->name }}</h3>
                        @if ($product->summary)<p>{{ $product->summary }}</p>@endif
                    </a>
                @empty
                    <p>Produk terkait sedang diperbarui. Hubungi kami untuk pilihan material dan estimasi terbaru.</p>
                @endforelse
            </div>
        </section>
        <section class="section">
            <h2>Area layanan</h2>
            <p>{{ implode(' · ', $service['areas']) }}</p>
        </section>
        <section class="section">
            <h2>Pertanyaan umum</h2>
            @foreach ($service['faqs'] as $faq)
                <details><summary>{{ $faq['question'] }}</summary><p>{{ $faq['answer'] }}</p></details>
            @endforeach
        </section>
    </main>
    <footer><div class="wrap">© {{ date('Y') }} Tritama Decorindo Stiker · Bekasi & Jabodetabek · <a href="{{ route('home') }}">Kembali ke beranda</a></div></footer>
</body>
</html>
