<?php

namespace Tests\Unit\Services;

use App\Services\ApiResponseService;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Tests\TestCase;

class ApiResponseServiceTest extends TestCase
{
    use WithFaker;

    private ApiResponseService $apiResponseService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->apiResponseService = new ApiResponseService();
    }

    /**
     * success メソッドが配列データで正しいレスポンスを返すことをテスト
     */
    public function test_success_with_array_data(): void
    {
        // テストデータ
        $testData = ['id' => 1, 'name' => 'テスト'];

        // テスト実行
        $response = $this->apiResponseService->success($testData);

        // アサーション
        $this->assertEquals(HttpResponse::HTTP_OK, $response->getStatusCode());
        $this->assertEquals([
            'success' => true,
            'data'    => $testData,
        ], json_decode($response->getContent(), true));
    }

    /**
     * success メソッドがカスタムステータスコードで正しいレスポンスを返すことをテスト
     */
    public function test_success_with_custom_status_code(): void
    {
        // テストデータ
        $testData     = ['id' => 1, 'name' => 'テスト'];
        $customStatus = HttpResponse::HTTP_CREATED;

        // テスト実行
        $response = $this->apiResponseService->success($testData, $customStatus);

        // アサーション
        $this->assertEquals($customStatus, $response->getStatusCode());
        $this->assertEquals([
            'success' => true,
            'data'    => $testData,
        ], json_decode($response->getContent(), true));
    }

    /**
     * success メソッドがJsonResourceで正しいレスポンスを返すことをテスト
     */
    public function test_success_with_json_resource(): void
    {
        // モックリソースの作成
        $resourceData = ['id' => 1, 'name' => 'テスト'];
        $resource     = new class ($resourceData) extends JsonResource {
            public static $wrap = null;
        };

        // テスト実行
        $response = $this->apiResponseService->success($resource);

        // アサーション
        $this->assertEquals(HttpResponse::HTTP_OK, $response->getStatusCode());
        $responseData = json_decode($response->getContent(), true);
        $this->assertTrue($responseData['success']);
        $this->assertEquals($resourceData, $responseData['data']);
    }

    /**
     * error メソッドが正しいエラーレスポンスを返すことをテスト
     */
    public function test_error_with_default_parameters(): void
    {
        // テストデータ
        $errorMessage = 'エラーが発生しました';

        // テスト実行
        $response = $this->apiResponseService->error($errorMessage);

        // アサーション
        $this->assertEquals(HttpResponse::HTTP_INTERNAL_SERVER_ERROR, $response->getStatusCode());
        $this->assertEquals([
            'success' => false,
            'message' => $errorMessage,
            'error'   => [],
        ], json_decode($response->getContent(), true));
    }

    /**
     * error メソッドがカスタムパラメータで正しいエラーレスポンスを返すことをテスト
     */
    public function test_error_with_custom_parameters(): void
    {
        // テストデータ
        $errorMessage = 'バリデーションエラー';
        $errorDetails = ['name' => ['名前は必須です']];
        $customStatus = HttpResponse::HTTP_UNPROCESSABLE_ENTITY;

        // テスト実行
        $response = $this->apiResponseService->error($errorMessage, $errorDetails, $customStatus);

        // アサーション
        $this->assertEquals($customStatus, $response->getStatusCode());
        $this->assertEquals([
            'success' => false,
            'message' => $errorMessage,
            'error'   => $errorDetails,
        ], json_decode($response->getContent(), true));
    }
}
