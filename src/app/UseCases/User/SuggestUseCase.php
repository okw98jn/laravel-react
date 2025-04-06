<?php

namespace App\UseCases\User;

use App\Models\User;
use Illuminate\Support\Collection;

final class SuggestUseCase
{
    /**
     * ユーザーのサジェスト
     *
     * @param  string                                            $keyword キーワード
     * @return Collection<int, array{value: int, label: string}>
     */
    public function handle(string $keyword): Collection
    {
        return User::query()
            ->select('id', 'name')
            ->where('name', 'like', '%' . $keyword . '%')
            ->orWhere('email', 'like', '%' . $keyword . '%')
            ->orderBy('id', 'asc')
            ->limit(100)
            ->get()
            ->map(fn (User $user) => [
                'value' => $user->id,
                'label' => $user->name,
            ]);
    }
}
