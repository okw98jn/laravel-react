<?php

namespace App\DTO\User;

/**
 * ユーザー削除DTO
 */
final readonly class DeleteDTO
{
    public function __construct(
        public int $id,
    ) {
    }

    /**
     * 配列からDTOを作成
     *
     * @param  array<string, mixed> $data
     * @return self
     */
    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
        );
    }
}
