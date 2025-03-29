<?php

namespace Tests\Unit\UseCases\User;

use App\Dto\User\StoreDto;
use App\Enums\User\Gender;
use App\Enums\User\Status;
use App\Models\User;
use App\UseCases\User\StoreUseCase;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class StoreUseCaseTest extends TestCase
{
    use RefreshDatabase;

    private StoreUseCase $useCase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->useCase = new StoreUseCase();
    }

    /**
     * 正常なデータでユーザーが登録できることをテスト
     */
    public function test_user_can_be_created_with_valid_data(): void
    {
        // テスト用Dtoの準備
        $dto = StoreDto::fromArray([
            'name'     => 'テストユーザー',
            'email'    => 'test@example.com',
            'gender'   => Gender::MALE->value,
            'status'   => Status::ACTIVE->value,
            'memo'     => 'テストメモ',
            'password' => 'password',
        ]);

        // UseCaseの実行
        $this->useCase->handle($dto);

        // データベースに保存されたことを確認
        $this->assertDatabaseHas('users', [
            'name'   => $dto->name,
            'email'  => $dto->email,
            'gender' => $dto->gender,
            'status' => $dto->status,
            'memo'   => $dto->memo,
        ]);
    }

    /**
     * メモがnullでもユーザーが登録できることをテスト
     */
    public function test_user_can_be_created_with_null_memo(): void
    {
        // メモがnullのDto
        $dto = StoreDto::fromArray([
            'name'     => 'メモなしユーザー',
            'email'    => 'no-memo@example.com',
            'gender'   => Gender::FEMALE->value,
            'status'   => Status::TEMPORARY->value,
            'memo'     => null,
            'password' => 'password',
        ]);

        // UseCaseの実行
        $user = $this->useCase->handle($dto);

        // データベースに保存されたことを確認
        $this->assertDatabaseHas('users', [
            'name'   => 'メモなしユーザー',
            'email'  => 'no-memo@example.com',
            'gender' => Gender::FEMALE->value,
            'status' => Status::TEMPORARY->value,
            'memo'   => null,
        ]);

        // メモがnullであることを確認
        $this->assertNull($user->memo);
    }

    /**
     * 既に存在するメールアドレスで登録しようとするとエラーが発生することをテスト
     */
    public function test_cannot_create_with_duplicate_email(): void
    {
        // 最初のユーザーを作成
        User::factory()->create([
            'email' => 'duplicate@example.com',
        ]);

        // 同じメールアドレスで2人目のユーザーを作成しようとする
        $dto = StoreDto::fromArray([
            'name'     => '重複ユーザー',
            'email'    => 'duplicate@example.com',
            'gender'   => Gender::MALE->value,
            'status'   => Status::ACTIVE->value,
            'memo'     => 'テストメモ',
            'password' => 'password',
        ]);

        // QueryExceptionが発生することを期待
        $this->expectException(QueryException::class);
        $this->useCase->handle($dto);
    }

    /**
     * 様々なステータス値でユーザーが登録できることをテスト
     */
    public function test_user_can_be_created_with_different_status_values(): void
    {
        foreach (Status::cases() as $status) {
            $dto = StoreDto::fromArray([
                'name'     => "ステータステスト{$status->value}",
                'email'    => "status-test-{$status->value}@example.com",
                'gender'   => Gender::MALE->value,
                'status'   => $status->value,
                'memo'     => "ステータス: {$status->name}",
                'password' => 'password',
            ]);

            $user = $this->useCase->handle($dto);

            $this->assertEquals($status, $user->status);
            $this->assertDatabaseHas('users', [
                'email'  => "status-test-{$status->value}@example.com",
                'status' => $status->value,
            ]);
        }
    }

    /**
     * 様々な性別値でユーザーが登録できることをテスト
     */
    public function test_user_can_be_created_with_different_gender_values(): void
    {
        foreach (Gender::cases() as $gender) {
            $dto = StoreDto::fromArray([
                'name'     => "性別テスト{$gender->value}",
                'email'    => "gender-test-{$gender->value}@example.com",
                'gender'   => $gender->value,
                'status'   => Status::ACTIVE->value,
                'memo'     => "性別: {$gender->name}",
                'password' => 'password',
            ]);

            $user = $this->useCase->handle($dto);

            $this->assertEquals($gender, $user->gender);
            $this->assertDatabaseHas('users', [
                'email'  => "gender-test-{$gender->value}@example.com",
                'gender' => $gender->value,
            ]);
        }
    }
}
