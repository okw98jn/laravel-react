<?php

namespace App\UseCases\User;

use App\DTO\User\UpdateDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class UpdateUseCase
{
    /**
     * ユーザーを更新する
     *
     * @param  UpdateDTO $dto ユーザー更新DTO
     * @return User
     */
    public function handle(UpdateDTO $dto): User
    {
        $user = User::findOrFail($dto->id);

        $user->update([
            'name'     => $dto->name,
            'email'    => $dto->email,
            'gender'   => $dto->gender,
            'status'   => $dto->status,
            'memo'     => $dto->memo,
            'password' => Hash::make($dto->password),
        ]);

        return $user;
    }
}
