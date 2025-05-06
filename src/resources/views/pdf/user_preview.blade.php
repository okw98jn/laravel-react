@extends('pdf.layout')

@section('content')
    <div class="title">ユーザー情報</div>
    <div class="section-title">基本情報</div>
    <table>
        <tr>
            <th>項目ああ</th>
            <th>内容</th>
        </tr>
        <tr>
            <td>名前あああ項目</td>
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
@endsection
