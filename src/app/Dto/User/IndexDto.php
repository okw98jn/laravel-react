<?php

namespace App\Dto\User;

/**
 * ユーザー検索Dto
 */
final readonly class IndexDto
{
    public function __construct(
        public ?string $id,
        public ?string $name,
        public ?string $email,
        public int $page_size,
        public int $page_index,
        public ?string $sort,
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
            id: $data['id'],
            name: $data['name'],
            email: $data['email'],
            page_size: $data['page_size'],
            page_index: $data['page_index'],
            sort: $data['sort'],
        );
    }
}
