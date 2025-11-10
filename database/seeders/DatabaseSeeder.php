<?php
namespace Database\Seeders;
use App\Models\User;
use App\Models\Author;
use App\Models\Book;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@lms.com',
            'password' => Hash::make('admin123'),
            'unique_library_id' => 'A00001',
            'role' => UserRole::ADMIN,
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@lms.com',
            'password' => Hash::make('user123'),
            'unique_library_id' => 'U00001',
            'role' => UserRole::USER,
        ]);

        Author::factory(10)->create()->each(function ($author) {
            Book::factory(rand(3, 8))->create([
                'author_id' => $author->id
            ]);
        });
    }
}