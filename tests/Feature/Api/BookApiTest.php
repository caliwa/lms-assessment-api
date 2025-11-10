<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\Book;
use App\Models\Author;
use App\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class BookApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $this->adminUser = $admin->fresh();
        
        $user = User::factory()->create(['role' => UserRole::USER]);
        $this->regularUser = $user->fresh();
    }

    #[Test]
    public function a_public_user_can_list_books()
    {
        Author::factory()->create();
        Book::factory()->count(5)->create(['author_id' => 1]);

        $response = $this->getJson('/api/books');

        $response->assertOk();
        $response->assertJsonCount(5, 'data');
    }

    #[Test]
    public function an_admin_can_create_a_book()
    {
        Sanctum::actingAs($this->adminUser);
        $author = Author::factory()->create();
        $bookData = [
            'title' => 'Nuevo Libro de Prueba',
            'author_id' => $author->id,
            'isbn' => '978-1234567890',
            'publication_year' => 2025,
        ];

        $response = $this->postJson('/api/books', $bookData);

        $response->assertStatus(201);
        $response->assertJsonPath('data.title', 'Nuevo Libro de Prueba');
        $this->assertDatabaseHas('books', [
            'isbn' => '978-1234567890'
        ]);
    }

    #[Test]
    public function a_regular_user_cannot_create_a_book()
    {
        Sanctum::actingAs($this->regularUser);
        $author = Author::factory()->create();
        $bookData = [
            'title' => 'Libro Ilegal',
            'author_id' => $author->id,
            'isbn' => '978-0000000001',
            'publication_year' => 2020,
        ];

        $response = $this->postJson('/api/books', $bookData);

        $response->assertStatus(403);
        $response->assertJsonPath('message', 'Acceso denegado. Requiere rol de administrador.');
    }

    #[Test]
    public function an_admin_cannot_create_a_book_with_invalid_data()
    {
        Sanctum::actingAs($this->adminUser);
        
        $response = $this->postJson('/api/books', ['isbn' => '123']);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('title');
    }
}