<?php

namespace App\DTO\User;

use App\Enums\User\Gender;
use App\Enums\User\Status;

/**
 * ユーザー作成DTO
 */
final readonly class StoreDTO
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
     * StoreRequestからDTOを作成
     *
     * @param  array<string, mixed> $data
     * @return self
     */
    public static function fromRequest(array $data): self
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
