<?php

namespace App\Http\Requests\User;

use App\Enums\User\Gender;
use App\Enums\User\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreRequest extends FormRequest
{
    /**
     * リクエストに適用するバリデーションルールを取得
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users',
            ],
            'gender' => [
                'required',
                'string',
                Rule::enum(Gender::class),
            ],
            'status' => [
                'required',
                'string',
                Rule::enum(Status::class),
            ],
            'memo' => [
                'nullable',
                'string',
                'max:1000',
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
            'name'     => '名前',
            'email'    => 'メールアドレス',
            'gender'   => '性別',
            'status'   => 'ステータス',
            'memo'     => 'メモ',
            'password' => 'パスワード',
        ];
    }
}
