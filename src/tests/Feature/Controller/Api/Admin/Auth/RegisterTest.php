<?php

namespace Tests\Feature\Controller\Api\Admin\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    private const REGISTER_ENDPOINT = '/api/admin/register';

    /**
     * 有効なデータでユーザー登録できることをテスト
     */
    public function test_can_register_with_valid_data(): void
    {
        $userData = [
            'name'                  => 'テストユーザー',
            'email'                 => 'test@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson(self::REGISTER_ENDPOINT, $userData);

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'email_verified_at',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJson([
                'data' => [
                    'name'  => 'テストユーザー',
                    'email' => 'test@example.com',
                ],
            ]);
    }

    /**
     * 不正な形式のメールアドレスで登録できないことをテスト
     */
    public function test_cannot_register_with_invalid_email_format(): void
    {
        $invalidEmailData = [
            'name'                  => 'テストユーザー',
            'email'                 => 'invalid-email',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson(self::REGISTER_ENDPOINT, $invalidEmailData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * パスワード確認が一致しない場合に登録できないことをテスト
     */
    public function test_cannot_register_with_mismatched_passwords(): void
    {
        $invalidPasswordData = [
            'name'                  => 'テストユーザー',
            'email'                 => 'test@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'different-password',
        ];

        $response = $this->postJson(self::REGISTER_ENDPOINT, $invalidPasswordData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonValidationErrors(['password']);
    }

    /**
     * 必須項目が不足している場合に登録できないことをテスト
     */
    public function test_cannot_register_with_missing_required_fields(): void
    {
        $missingFieldsData = [
            'name' => 'テストユーザー',
        ];

        $response = $this->postJson(self::REGISTER_ENDPOINT, $missingFieldsData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    /**
     * 既存のメールアドレスで登録できないことをテスト
     */
    public function test_cannot_register_with_duplicate_email(): void
    {
        // 既存のユーザーを作成
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $duplicateEmailData = [
            'name'                  => '新規ユーザー',
            'email'                 => 'existing@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson(self::REGISTER_ENDPOINT, $duplicateEmailData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonValidationErrors(['email']);
    }
}
