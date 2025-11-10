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

class BorrowingApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $regularUser;
    protected Book $availableBook;

    protected function setUp(): void
    {
        parent::setUp();
        $this->regularUser = User::factory()->create(['role' => UserRole::USER]);
        Author::factory()->create();
        $this->availableBook = Book::factory()->create([
            'author_id' => 1,
            'availability_status' => true
        ]);

        Sanctum::actingAs($this->regularUser);
    }

    #[Test]
    public function a_user_can_borrow_a_book()
    {
        $response = $this->postJson('/api/books/' . $this->availableBook->id . '/borrow');

        $response->assertOk();
        $response->assertJsonPath('message', 'Libro prestado exitosamente.');

        $this->assertDatabaseHas('books', [
            'id' => $this->availableBook->id,
            'availability_status' => false
        ]);

        // 
        $this->assertDatabaseHas('book_user', [
            'user_id' => $this->regularUser->id,
            'book_id' => $this->availableBook->id,
            'returned_at' => null
        ]);
    }

    #[Test]
    public function a_user_cannot_borrow_an_unavailable_book()
    {
        $unavailableBook = Book::factory()->create([
            'author_id' => 1,
            'availability_status' => false
        ]);

        $response = $this->postJson('/api/books/' . $unavailableBook->id . '/borrow');

        $response->assertStatus(422);
        $response->assertJsonPath('message', 'El libro no está disponible.');
    }

    #[Test]
    public function a_user_cannot_borrow_more_than_3_books()
    {
        $books = Book::factory()->count(3)->create(['author_id' => 1]);
        foreach ($books as $book) {
            $this->postJson('/api/books/' . $book->id . '/borrow');
        }

        $this->assertEquals(3, $this->regularUser->currentBorrowedBooks()->count());

        $fourthBook = Book::factory()->create(['author_id' => 1]);
        $response = $this->postJson('/api/books/' . $fourthBook->id . '/borrow');

        $response->assertStatus(422);
        $response->assertJsonPath('message', 'Límite de préstamos (3) alcanzado.');
    }

    #[Test]
    public function a_user_can_return_a_borrowed_book()
    {
        $this->postJson('/api/books/' . $this->availableBook->id . '/borrow');

        $response = $this->postJson('/api/books/' . $this->availableBook->id . '/return');

        $response->assertOk();
        $response->assertJsonPath('message', 'Libro devuelto exitosamente.');

        $this->assertDatabaseHas('books', [
            'id' => $this->availableBook->id,
            'availability_status' => true
        ]);

        $this->assertDatabaseMissing('book_user', [
            'user_id' => $this->regularUser->id,
            'book_id' => $this->availableBook->id,
            'returned_at' => null 
        ]);
    }
}