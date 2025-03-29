<?php

namespace App\Dto\Auth\AuthenticatedSession;

/**
 * ログイン認証情報Dto
 */
final readonly class StoreDto
{
    public function __construct(
        public string $email,
        public string $password,
    ) {
    }

    //
    /**
     * 配列からDtoを作成
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
