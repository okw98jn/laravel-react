<?php

namespace App\Dto\Auth\RegisteredUser;

/**
 * ユーザー登録Dto
 */
final readonly class StoreDto
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
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
            name: $data['name'],
            email: $data['email'],
            password: $data['password'],
        );
    }
}
