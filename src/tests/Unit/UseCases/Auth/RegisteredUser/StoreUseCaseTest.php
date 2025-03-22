<?php

namespace Tests\Unit\UseCases\Auth\RegisteredUser;

use App\Dto\Auth\RegisteredUser\StoreDTO;
use App\Models\User;
use App\UseCases\Auth\RegisteredUser\StoreUseCase;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
    public function test_user_can_be_registered_with_valid_data(): void
    {
        // テスト用データの準備
        $userData = [
            'name'     => 'テストユーザー',
            'email'    => 'test@example.com',
            'password' => 'password123',
        ];

        // DTOを作成
        $dto = StoreDTO::fromArray($userData);

        // UseCaseの実行
        $user = $this->useCase->handle($dto);

        // データベースに保存されたことを確認
        $this->assertDatabaseHas('users', [
            'name'  => 'テストユーザー',
            'email' => 'test@example.com',
        ]);

        // 返却されたユーザーが期待通りか確認
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('テストユーザー', $user->name);
        $this->assertEquals('test@example.com', $user->email);

        // パスワードがハッシュ化されていることを確認
        $this->assertTrue(Hash::check('password123', $user->password));

        // ユーザーがログイン状態になっていることを確認
        $this->assertTrue(Auth::check());
        $this->assertEquals($user->id, Auth::id());
    }

    /**
     * 既に存在するメールアドレスで登録しようとするとエラーが発生することをテスト
     */
    public function test_cannot_register_with_duplicate_email(): void
    {
        // 最初のユーザーを作成
        User::factory()->create([
            'email' => 'duplicate@example.com',
        ]);

        // 同じメールアドレスで2人目のユーザーを作成しようとする
        $userData = [
            'name'     => '重複ユーザー',
            'email'    => 'duplicate@example.com',
            'password' => 'password123',
        ];

        // DTOを作成
        $dto = StoreDTO::fromArray($userData);

        // QueryExceptionが発生することを期待
        $this->expectException(QueryException::class);
        $this->useCase->handle($dto);
    }

    /**
     * 名前が欠けている場合のテスト
     */
    public function test_throws_error_when_name_is_missing(): void
    {
        // 名前が欠けているデータ
        $missingNameData = [
            'email'    => 'missing@example.com',
            'password' => 'password123',
        ];

        // エラーが発生することを期待
        $this->expectException(\ErrorException::class);
        $this->useCase->handle(StoreDTO::fromArray($missingNameData));
    }

    /**
     * メールが欠けている場合のテスト
     */
    public function test_throws_error_when_email_is_missing(): void
    {
        // メールが欠けているデータ
        $missingEmailData = [
            'name'     => '不完全ユーザー',
            'password' => 'password123',
        ];

        // エラーが発生することを期待
        $this->expectException(\ErrorException::class);
        $this->useCase->handle(StoreDTO::fromArray($missingEmailData));
    }

    /**
     * パスワードが欠けている場合のテスト
     */
    public function test_throws_error_when_password_is_missing(): void
    {
        // パスワードが欠けているデータ
        $missingPasswordData = [
            'name'  => '不完全ユーザー',
            'email' => 'missing@example.com',
        ];

        // エラーが発生することを期待
        $this->expectException(\ErrorException::class);
        $this->useCase->handle(StoreDTO::fromArray($missingPasswordData));
    }

    /**
     * 名前が空でも登録できることをテスト
     */
    public function test_can_register_with_empty_name(): void
    {
        // 名前が空のデータ
        $emptyNameData = [
            'name'     => '',
            'email'    => 'empty-name@example.com',
            'password' => 'password123',
        ];

        // DTOを作成
        $dto = StoreDTO::fromArray($emptyNameData);

        // ユーザーが作成されることを確認
        $user = $this->useCase->handle($dto);
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('', $user->name);

        // データベースに保存されたことを確認
        $this->assertDatabaseHas('users', [
            'name'  => '',
            'email' => 'empty-name@example.com',
        ]);

        // ユーザーがログイン状態になっていることを確認
        $this->assertTrue(Auth::check());
        $this->assertEquals($user->id, Auth::id());
    }

    /**
     * 特殊文字を含むデータでも正常に登録できることをテスト
     */
    public function test_can_register_with_special_characters(): void
    {
        // 特殊文字を含むデータ
        $specialCharsData = [
            'name'     => '特殊文字テスト！＠＃＄％',
            'email'    => 'special+chars@example.com',
            'password' => 'p@$$w0rd!!',
        ];

        // DTOを作成
        $dto = StoreDTO::fromArray($specialCharsData);

        // UseCaseの実行
        $user = $this->useCase->handle($dto);

        // データが正しく保存されていることを確認
        $this->assertEquals('特殊文字テスト！＠＃＄％', $user->name);
        $this->assertEquals('special+chars@example.com', $user->email);
        $this->assertTrue(Hash::check('p@$$w0rd!!', $user->password));

        // ユーザーがログイン状態になっていることを確認
        $this->assertTrue(Auth::check());
        $this->assertEquals($user->id, Auth::id());
    }

    /**
     * 長い値でも正常に登録できることをテスト
     */
    public function test_can_register_with_long_values(): void
    {
        // 長い値を含むデータ
        $longName = str_repeat('あ', 100);
        $longData = [
            'name'     => $longName,
            'email'    => 'long@example.com',
            'password' => str_repeat('a', 50),
        ];

        // DTOを作成
        $dto = StoreDTO::fromArray($longData);

        // UseCaseの実行
        $user = $this->useCase->handle($dto);

        // データが正しく保存されていることを確認
        $this->assertEquals($longName, $user->name);
        $this->assertEquals('long@example.com', $user->email);
        $this->assertTrue(Hash::check(str_repeat('a', 50), $user->password));

        // ユーザーがログイン状態になっていることを確認
        $this->assertTrue(Auth::check());
        $this->assertEquals($user->id, Auth::id());
    }

    /**
     * ユーザー登録後にログアウト状態からログイン状態に変わることをテスト
     */
    public function test_user_is_logged_in_after_registration(): void
    {
        // 事前にログアウト状態であることを確認
        $this->assertFalse(Auth::check());

        // テスト用データの準備
        $userData = [
            'name'     => 'ログインテストユーザー',
            'email'    => 'login-test@example.com',
            'password' => 'password123',
        ];

        // DTOを作成
        $dto = StoreDTO::fromArray($userData);

        // UseCaseの実行
        $user = $this->useCase->handle($dto);

        // ユーザーがログイン状態になっていることを確認
        $this->assertTrue(Auth::check());
        $this->assertEquals($user->id, Auth::id());
    }
}
