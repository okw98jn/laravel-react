<?php

namespace App\Dto\User;

/**
 * ユーザー削除Dto
 */
final readonly class DeleteDto
{
    /**
     * @param array<int> $ids
     */
    public function __construct(
        public array $ids,
    ) {
    }

    /**
     * 配列からDtoを作成
     *
     * @param  array<string, mixed> $data
     * @return self
     */
    public static function fromArray(array $data): self
    {
        return new self(
            ids: $data['ids'],
        );
    }
}
