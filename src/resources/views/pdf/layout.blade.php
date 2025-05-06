<!doctype html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <style>
        @font-face {
            font-family: 'NotoSansJP';
            font-style: normal;
            font-weight: normal;
            src: url('{{ storage_path('fonts/NotoSansJP-Regular.ttf') }}');
        }

        @font-face {
            font-family: 'NotoSansJP';
            font-style: normal;
            font-weight: bold;
            src: url('{{ storage_path('fonts/NotoSansJP-Bold.ttf') }}');
        }

        /* 全てのHTML要素に適用 */
        body {
            font-family: "NotoSansJP", sans-serif;
        }

        @stack('styles')
    </style>
</head>

<body>
    @yield('content')
</body>

</html>
