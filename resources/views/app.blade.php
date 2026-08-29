<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title inertia>{{ config('app.name', 'Tritama Decorindo Stiker — Ahli Kaca Film, Sandblast, Wallpaper & Interior Bekasi & Jabodetabek Sejak 2009') }}</title>
        
        <!-- Primary SEO Meta Tags -->
        <meta name="title" content="Tritama Decorindo Stiker — Ahli Kaca Film, Sandblast, Wallpaper & Interior Bekasi & Jabodetabek Sejak 2009">
        <meta name="description" content="Tritama Decorindo Stiker melayani penjualan material & jasa pasang Kaca Film Gedung/Rumah, Sandblast Cutting Logo, Wallpaper 3D, Roller Blinds, Huruf Timbul LED, dan Gorden di Bekasi, Cikarang, Tambun, Jakarta & seluruh Jabodetabek. Pengerjaan rapi, presisi & bergaransi sejak 2009.">
        <meta name="keywords" content="kaca film bekasi, pasang kaca film bekasi, kaca film gedung bekasi, kaca film rumah bekasi, sandblast bekasi, sandblast cutting logo bekasi, wallpaper dinding bekasi, pasang wallpaper bekasi, roller blind bekasi, vertical blinds bekasi, huruf timbul bekasi, huruf timbul akrilik led bekasi, gorden bekasi, kaca film cikarang, kaca film tambun, kaca film cibubur, kaca film jakarta, kaca film jabodetabek, tritama decorindo stiker">
        <meta name="author" content="Tritama Decorindo Stiker">
        <meta name="geo.region" content="ID-JB">
        <meta name="geo.placename" content="Bekasi">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="theme-color" content="#111FA2">

        <!-- Open Graph / Facebook / WhatsApp -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="Tritama Decorindo Stiker">
        <meta property="og:title" content="Tritama Decorindo Stiker — Ahli Kaca Film, Sandblast & Interior Bekasi Sejak 2009">
        <meta property="og:description" content="Solusi lengkap material & jasa pasang Kaca Film Tolak Panas, Sandblast Cutting Logo, Wallpaper 3D, Blinds, Huruf Timbul & Gorden di Bekasi dan Jabodetabek.">
        <meta property="og:image" content="{{ asset('images/products/kaca-film-sparta.webp') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Tritama Decorindo Stiker Kaca Film Bekasi">
        <meta property="og:locale" content="id_ID">

        <!-- Twitter Meta -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Tritama Decorindo Stiker — Ahli Kaca Film & Interior Bekasi">
        <meta name="twitter:description" content="Penyedia material & jasa pasang Kaca Film, Sandblast, Wallpaper, Blinds, dan Signage di Bekasi & Jabodetabek.">
        <meta name="twitter:image" content="{{ asset('images/products/kaca-film-sparta.webp') }}">

        <!-- Fonts: Inter & Outfit -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

        <!-- Structured Data (Schema.org JSON-LD: LocalBusiness, HomeAndConstructionBusiness & WebSite) -->
        <script type="application/ld+json">
        {!! json_encode([
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => ['HomeAndConstructionBusiness', 'LocalBusiness', 'ProfessionalService'],
                    '@id' => url('/') . '/#organization',
                    'name' => 'Tritama Decorindo Stiker - Ahli Kaca Film, Sandblast & Interior Bekasi',
                    'url' => url('/'),
                    'logo' => asset('images/products/kaca-film-sparta.webp'),
                    'image' => asset('images/products/kaca-film-sparta.webp'),
                    'description' => 'Penyedia material dan jasa pasang Kaca Film Tolak Panas (Riben, Sparta, One Way), Sandblast Cutting Logo, Wallpaper 3D, Roller Blinds, Vertical Blinds, Huruf Timbul LED, dan Gorden di Bekasi, Jakarta, dan seluruh Jabodetabek sejak 2009.',
                    'telephone' => '+6281990909646',
                    'email' => 'tritamadecorindostiker@gmail.com',
                    'priceRange' => 'Rp 20.000 - Rp 500.000',
                    'address' => [
                        '@type' => 'PostalAddress',
                        'streetAddress' => 'Grand Anandara Residence, Jl. Pertamina Blok E10 No.8, Kedungjaya, Kec. Babelan',
                        'addressLocality' => 'Kab. Bekasi',
                        'addressRegion' => 'Jawa Barat',
                        'postalCode' => '17610',
                        'addressCountry' => 'ID',
                    ],
                    'geo' => [
                        '@type' => 'GeoCoordinates',
                        'latitude' => -6.2383,
                        'longitude' => 106.9756,
                    ],
                    'areaServed' => [
                        'Bekasi',
                        'Bekasi Barat',
                        'Bekasi Timur',
                        'Bekasi Selatan',
                        'Bekasi Utara',
                        'Cikarang',
                        'Tambun',
                        'Cibubur',
                        'Jakarta Timur',
                        'Jakarta Selatan',
                        'Jakarta Pusat',
                        'Jakarta Barat',
                        'Jakarta Utara',
                        'Depok',
                        'Bogor',
                        'Tangerang',
                        'Jabodetabek',
                    ],
                    'openingHoursSpecification' => [
                        [
                            '@type' => 'OpeningHoursSpecification',
                            'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            'opens' => '08:00',
                            'closes' => '21:00',
                        ],
                    ],
                    'contactPoint' => [
                        '@type' => 'ContactPoint',
                        'telephone' => '+6281990909646',
                        'contactType' => 'customer service',
                        'availableLanguage' => ['Indonesian'],
                    ],
                ],
                [
                    '@type' => 'WebSite',
                    '@id' => url('/') . '/#website',
                    'url' => url('/'),
                    'name' => 'Tritama Decorindo Stiker Bekasi',
                    'description' => 'Katalog Produk & Jasa Pasang Kaca Film, Sandblast, Wallpaper & Blinds Bekasi',
                    'publisher' => [
                        '@id' => url('/') . '/#organization',
                    ],
                ],
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
        </script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-background text-foreground selection:bg-[#5478FF] selection:text-white">
        @inertia
    </body>
</html>
