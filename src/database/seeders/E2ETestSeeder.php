<?php

namespace Database\Seeders;

use App\Enums\User\Status;
use App\Models\User;
use Illuminate\Database\Seeder;

class E2ETestSeeder extends Seeder
{
    /**
     * E2Eテスト用
     */
    public function run(): void
    {
        User::factory()->create([
            'name'     => 'テストユーザー',
            'email'    => 'e2e@example.com',
            'password' => bcrypt('password'),
            'status'   => Status::ACTIVE,
        ]);
    }
}
