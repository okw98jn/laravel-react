<?php

namespace App\Http\Controllers;

use App\Dto\User\DeleteDto;
use App\Dto\User\IndexDto;
use App\Dto\User\PreviewPdfDto;
use App\Dto\User\StoreDto;
use App\Dto\User\UpdateDto;
use App\Facades\ApiResponse;
use App\Http\Requests\User\DeleteRequest;
use App\Http\Requests\User\IndexRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\SuggestRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\SuggestResource;
use App\Http\Resources\UserResource;
use App\UseCases\User\DeleteUseCase;
use App\UseCases\User\DownloadUseCase;
use App\UseCases\User\IndexUseCase;
use App\UseCases\User\PreviewPdfUseCase;
use App\UseCases\User\StoreUseCase;
use App\UseCases\User\SuggestUseCase;
use App\UseCases\User\UpdateUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Barryvdh\DomPDF\Facade\Pdf;

class UserController extends Controller
{
    /**
     * ユーザー一覧を取得
     *
     * @param  IndexRequest $request
     * @param  IndexUseCase $useCase
     * @return JsonResponse
     */
    public function index(IndexRequest $request, IndexUseCase $useCase): JsonResponse
    {
        $dto = IndexDto::fromArray($request->validated());

        $result = $useCase->handle($dto);

        return ApiResponse::success([
            'users'    => UserResource::collection($result),
            'paginate' => new PaginateResource($result),
        ], Response::HTTP_OK);
    }

    /**
     * ユーザーを作成
     *
     * @param  StoreRequest $request
     * @param  StoreUseCase $useCase
     * @return JsonResponse
     */
    public function store(StoreRequest $request, StoreUseCase $useCase): JsonResponse
    {
        $dto = StoreDto::fromArray($request->validated());

        $result = $useCase->handle($dto);

        return ApiResponse::success([
            'user' => new UserResource($result['user']),
            'pdf_path' => $result['pdf_path'],
        ], Response::HTTP_CREATED);
    }

    /**
     * ユーザーを更新
     *
     * @param  UpdateRequest $request
     * @param  UpdateUseCase $useCase
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, UpdateUseCase $useCase): JsonResponse
    {
        $dto = UpdateDto::fromArray($request->validated());

        $user = $useCase->handle($dto);

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_OK);
    }

    /**
     * ユーザーを削除
     *
     * @param  DeleteRequest $request
     * @param  DeleteUseCase $useCase
     * @return JsonResponse
     */
    public function delete(DeleteRequest $request, DeleteUseCase $useCase): JsonResponse
    {
        $dto = DeleteDto::fromArray($request->validated());

        $useCase->handle($dto);

        return ApiResponse::success([], Response::HTTP_NO_CONTENT);
    }

    /**
     * ユーザー情報のPDFプレビュー
     *
     * @param  Request $request
     * @param  PreviewPdfUseCase $useCase
     * @return Response
     */
    public function previewPdf(Request $request, PreviewPdfUseCase $useCase): Response
    {
        $dto = PreviewPdfDto::fromArray($request->only(['name', 'email']));

        $result = $useCase->handle($dto);

        return ApiResponse::pdfStream($result['pdf'], $result['fileName']);
    }

    /**
     * CSVファイルをダウンロード
     *
     * @param  DownloadUseCase  $useCase
     * @return StreamedResponse
     */
    public function download(DownloadUseCase $useCase): StreamedResponse
    {
        $result = $useCase->handle();

        return ApiResponse::csvDownload(
            $result['fileName'],
            $result['callback'],
        );
    }

    /**
     * ユーザーのサジェスト
     *
     * @param  SuggestRequest $request
     * @param  SuggestUseCase $useCase
     * @return JsonResponse
     */
    public function suggest(SuggestRequest $request, SuggestUseCase $useCase): JsonResponse
    {
        $result = $useCase->handle($request->keyword ?? '');

        return ApiResponse::success([
            'results' => SuggestResource::collection($result),
        ], Response::HTTP_OK);
    }
}
