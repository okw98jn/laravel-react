<?php

namespace App\Dto\User;

/**
 * ユーザー検索DTO
 */
final readonly class IndexDTO
{
    public function __construct(
        public ?string $id,
        public ?string $name,
        public ?string $email,
        public int $pageSize,
        public int $pageIndex,
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
            name: $data['name'],
            email: $data['email'],
            pageSize: $data['pageSize'],
            pageIndex: $data['pageIndex'],
        );
    }
}
