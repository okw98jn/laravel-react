<?php

namespace App\UseCases\User;

use App\Dto\User\UpdateDto;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class UpdateUseCase
{
    /**
     * ユーザーを更新する
     *
     * @param  UpdateDto $dto ユーザー更新Dto
     * @return User
     */
    public function handle(UpdateDto $dto): User
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
