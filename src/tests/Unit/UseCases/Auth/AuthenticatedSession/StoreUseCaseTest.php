<?php

namespace Tests\Unit\UseCases\Auth\AuthenticatedSession;

use App\Dto\Auth\AuthenticatedSession\StoreDto;
use App\Models\User;
use App\UseCases\Auth\AuthenticatedSession\StoreUseCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
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
     * 有効な認証情報でユーザーが認証できることをテスト
     */
    public function test_can_authenticate_user_with_valid_credentials(): void
    {
        // ユーザーを作成
        $user = User::factory()->create([
            'email'    => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        // DTOを作成
        $dto = new StoreDto(
            email: 'test@example.com',
            password: 'password123'
        );

        // UseCaseを実行
        $result = $this->useCase->handle($dto);

        // 結果がユーザーと一致することを検証
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($user->id, $result->id);
        $this->assertEquals($user->email, $result->email);
        $this->assertTrue(Auth::check());
    }

    /**
     * 無効な認証情報で認証例外がスローされることをテスト
     */
    public function test_throws_authentication_exception_with_invalid_credentials(): void
    {
        // 存在しないユーザーの認証情報
        $dto = new StoreDto(
            email: 'invalid@example.com',
            password: 'invalid-password'
        );

        // 例外がスローされることを期待
        $this->expectException(AuthenticationException::class);

        // UseCaseを実行
        $this->useCase->handle($dto);
    }

    /**
     * 誤ったパスワードで認証例外がスローされることをテスト
     */
    public function test_throws_authentication_exception_with_wrong_password(): void
    {
        // ユーザーを作成
        User::factory()->create([
            'email'    => 'test@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        // 誤ったパスワードでDTOを作成
        $dto = new StoreDto(
            email: 'test@example.com',
            password: 'wrong-password'
        );

        // 例外がスローされることを期待
        $this->expectException(AuthenticationException::class);

        // UseCaseを実行
        $this->useCase->handle($dto);
    }

    /**
     * fromArrayメソッドで作成したDTOでユーザーが認証できることをテスト
     */
    public function test_can_authenticate_with_dto_created_from_array(): void
    {
        // ユーザーを作成
        $user = User::factory()->create([
            'email'    => 'array@example.com',
            'password' => bcrypt('array-password'),
        ]);

        // 配列からDTOを作成
        $dto = StoreDto::fromArray([
            'email'    => 'array@example.com',
            'password' => 'array-password',
        ]);

        // UseCaseを実行
        $result = $this->useCase->handle($dto);

        // 結果がユーザーと一致することを検証
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($user->id, $result->id);
        $this->assertEquals($user->email, $result->email);
        $this->assertTrue(Auth::check());
    }

    /**
     * 複数回認証試行後もユーザーが認証できることをテスト
     */
    public function test_can_authenticate_after_multiple_attempts(): void
    {
        // ユーザーを作成
        $user = User::factory()->create([
            'email'    => 'multiple@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        // 誤った認証情報でDTOを作成
        $wrongDto = new StoreDto(
            email: 'multiple@example.com',
            password: 'wrong-password'
        );

        // 複数回誤った認証を試行
        try {
            $this->useCase->handle($wrongDto);
        } catch (AuthenticationException) {
            // 例外は予想通り
        }

        try {
            $this->useCase->handle($wrongDto);
        } catch (AuthenticationException) {
            // 例外は予想通り
        }

        // 正しい認証情報でDTOを作成
        $correctDto = new StoreDto(
            email: 'multiple@example.com',
            password: 'correct-password'
        );

        // 正しい認証情報で認証
        $result = $this->useCase->handle($correctDto);

        // 結果がユーザーと一致することを検証
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($user->id, $result->id);
        $this->assertEquals($user->email, $result->email);
        $this->assertTrue(Auth::check());
    }
}
