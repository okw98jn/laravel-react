<!doctype html>
<html lang="ja">
<head>
    <meta charset="UTF-8"/>
    <style>
        @page { margin: 16mm 12mm; }
        body  { font-family: noto; font-size: 10pt; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th,td { border: 1px solid #999; padding: 8px; }
        th { background-color: #f2f2f2; }
        .title { font-size: 18pt; font-weight: bold; text-align: center; margin-bottom: 20px; }
        .section-title { font-size: 14pt; font-weight: bold; margin-top: 15px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="title">ユーザー情報</div>

    <div class="section-title">基本情報</div>

    <table>
        <tr>
            <th style="width: 30%;">項目</th>
            <th>内容</th>
        </tr>
        <tr>
            <td>名前</td>
            <td>{{ $user['name'] }}</td>
        </tr>
        <tr>
            <td>メールアドレス</td>
            <td>{{ $user['email'] }}</td>
        </tr>
    </table>

    <div style="margin-top: 30px; text-align: center; font-size: 9pt; color: #666;">
        このドキュメントはシステムによって自動生成されました。
    </div>
</body>
</html>