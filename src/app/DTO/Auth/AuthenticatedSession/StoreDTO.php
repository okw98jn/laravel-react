<?php

namespace App\DTO\Auth\AuthenticatedSession;

/**
 * ログイン認証情報DTO
 */
final readonly class StoreDTO
{
    public function __construct(
        public string $email,
        public string $password,
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
            email: $data['email'],
            password: $data['password'],
        );
    }
}
