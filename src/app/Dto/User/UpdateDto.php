<?php

namespace App\Dto\User;

use App\Enums\User\Gender;
use App\Enums\User\Status;

/**
 * ユーザー更新Dto
 */
final readonly class UpdateDto
{
    public function __construct(
        public int $id,
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
            id: $data['id'],
            name: $data['name'],
            email: $data['email'],
            gender: Gender::from($data['gender']),
            status: Status::from($data['status']),
            memo: $data['memo'],
            password: $data['password'],
        );
    }
}
