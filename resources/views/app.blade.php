<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title inertia>{{ config('app.name', 'PT Tritama Decorindo — Architectural Interior & Luxury Wall Panel') }}</title>
        
        <!-- Primary Meta Tags -->
        <meta name="title" content="PT Tritama Decorindo — Luxury Wall Panel, Custom Blinds & Flooring">
        <meta name="description" content="PT Tritama Decorindo adalah spesialis material interior arsitektural mewah: Acoustic Slatted Wood Panel, Luxury Fluted Wall Panel, Custom Motorized Blinds, dan Luxury SPC Herringbone Flooring.">
        <meta name="keywords" content="acoustic wood panel, fluted wall panel, custom blinds jakarta, motorized roller blinds, spc herringbone flooring, engineered wood oak, interior decor indonesia, pt tritama decorindo">
        <meta name="author" content="PT Tritama Decorindo">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="theme-color" content="#1E232A">

        <!-- Open Graph / Facebook / WhatsApp -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="PT Tritama Decorindo">
        <meta property="og:title" content="PT Tritama Decorindo — Architectural Interior & Luxury Decor">
        <meta property="og:description" content="Katalog material interior arsitektural premium: Acoustic Wood Panel, Custom Blinds, dan Luxury Flooring untuk hunian, kantor, dan hotel.">
        <meta property="og:image" content="{{ asset('images/products/cengkeh-maluku.webp') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="PT Tritama Decorindo Interior Showcase">
        <meta property="og:locale" content="id_ID">

        <!-- Twitter Meta -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@tritamadecor">
        <meta name="twitter:title" content="PT Tritama Decorindo — Architectural Interior & Luxury Decor">
        <meta name="twitter:description" content="Katalog material interior arsitektural premium: Acoustic Wood Panel, Custom Blinds, dan Luxury Flooring.">
        <meta name="twitter:image" content="{{ asset('images/products/cengkeh-maluku.webp') }}">

        <!-- Fonts: Fraunces (display) + Inter (body) -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        <!-- Structured Data (Schema.org JSON-LD: Organization & WebSite) -->
        <script type="application/ld+json">
        {!! json_encode([
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'Organization',
                    '@id' => url('/') . '/#organization',
                    'name' => 'PT Tritama Decorindo',
                    'url' => url('/'),
                    'logo' => asset('images/products/cengkeh-maluku.webp'),
                    'description' => 'Spesialis material interior arsitektural mewah: Acoustic Wall Panel, Custom Motorized Blinds, dan Luxury Flooring.',
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressCountry' => 'ID',
                    ],
                    'contactPoint' => [
                        '@type' => 'ContactPoint',
                        'telephone' => '+62-812-8888-9999',
                        'contactType' => 'customer service',
                        'availableLanguage' => ['Indonesian', 'English'],
                    ],
                ],
                [
                    '@type' => 'WebSite',
                    '@id' => url('/') . '/#website',
                    'url' => url('/'),
                    'name' => 'PT Tritama Decorindo',
                    'description' => 'Katalog Material Interior Arsitektural Mewah & Home Decor',
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
    <body class="font-sans antialiased bg-[#FDFBF9] text-[#1E1B18] selection:bg-[#1E232A] selection:text-[#C5A880]">
        @inertia
    </body>
</html>
