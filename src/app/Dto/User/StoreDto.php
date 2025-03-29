<?php

namespace App\Dto\User;

use App\Enums\User\Gender;
use App\Enums\User\Status;

/**
 * ユーザー作成Dto
 */
final readonly class StoreDto
{
    public function __construct(
        public string $name,
        public string $email,
        public Gender $gender,
        public Status $status,
        public ?string $memo,
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
            gender: Gender::from($data['gender']),
            status: Status::from($data['status']),
            memo: $data['memo'],
            password: $data['password'],
        );
    }
}
