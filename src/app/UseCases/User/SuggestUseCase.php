<?php

namespace App\UseCases\User;

use App\Models\User;
use Illuminate\Support\Collection;

final class SuggestUseCase
{
    /**
     * ユーザーのサジェスト
     *
     * @param  string                                               $keyword キーワード
     * @return Collection<int, array{value: string, label: string}>
     */
    public function handle(string $keyword): Collection
    {
        return User::query()
            ->select('id', 'name')
            ->where('name', 'like', '%' . $keyword . '%')
            ->orderBy('id', 'asc')
            ->limit(100)
            ->get()
            ->map(fn (User $user) => [
                'value' => (string) $user->id,
                'label' => $user->name,
            ]);
    }
}
