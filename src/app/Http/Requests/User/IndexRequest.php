<?php

namespace App\Http\Requests\User;

use App\Enums\User\Sort;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class IndexRequest extends FormRequest
{
    /**
     * リクエストに適用するバリデーションルールを取得
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => [
                'nullable',
                'string',
            ],
            'name' => [
                'nullable',
                'string',
                'max:255',
            ],
            'email' => [
                'nullable',
                'string',
                'max:255',
            ],
            'page_size' => [
                'required',
                'integer',
                'min:10',
                'max:100',
            ],
            'page' => [
                'required',
                'integer',
                'min:1',
            ],
            'sort_column' => [
                'required',
                'string',
                Rule::enum(Sort::class),
            ],
            'sort_direction' => [
                'required',
                'string',
                Rule::in(['asc', 'desc']),
            ],
        ];
    }

    /**
     * バリデーションエラーのカスタム属性の取得
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'id'             => 'ユーザーID',
            'name'           => '名前',
            'email'          => 'メールアドレス',
            'page_size'      => 'ページサイズ',
            'page'           => 'ページ番号',
            'sort_column'    => '並び順',
            'sort_direction' => '並び順',
        ];
    }
}
