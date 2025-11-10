<?php
namespace App\Services;

use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use App\Exceptions\BorrowingException;

class BorrowingService
{
    const MAX_BORROW_LIMIT = 3;
    const BORROW_DURATION_DAYS = 14;

    public function borrowBook(User $user, int $bookId): void
    {
        $book = Book::findOrFail($bookId);

        if (!$book->availability_status) {
            throw new BorrowingException('El libro no está disponible.');
        }

        $currentBorrows = $user->currentBorrowedBooks()->count();
        if ($currentBorrows >= self::MAX_BORROW_LIMIT) {
            throw new BorrowingException('Límite de préstamos (3) alcanzado.');
        }

        DB::transaction(function () use ($user, $book) {
            $user->borrowedBooks()->attach($book->id, [
                'borrowed_at' => now(),
                'due_at' => now()->addDays(self::BORROW_DURATION_DAYS),
            ]);

            $book->update(['availability_status' => false]);
        });

        $this->clearBorrowingCache($user, $book->id);
    }

    public function returnBook(User $user, int $bookId): void
    {
        $book = Book::findOrFail($bookId);
        $borrowRecord = $user->currentBorrowedBooks()->where('book_id', $book->id)->first();

        if (!$borrowRecord) {
            throw new BorrowingException('No tienes este libro prestado.');
        }

        DB::transaction(function () use ($user, $book, $borrowRecord) {
            $user->currentBorrowedBooks()->updateExistingPivot($book->id, [
                'returned_at' => now()
            ]);

            $book->update(['availability_status' => true]);
        });

        $this->clearBorrowingCache($user, $book->id);
    }

    public function getUserBorrowedBooks(User $user)
    {
        $cacheKey = "user.{$user->id}.borrowed";
        return Cache::remember($cacheKey, 3600, function () use ($user) {
            return $user->currentBorrowedBooks()->with('author')->get();
        });
    }

    private function clearBorrowingCache(User $user, int $bookId): void
    {
        Cache::forget("user.{$user->id}.borrowed");
        Cache::forget("book.{$bookId}");
        Cache::flush();
    }
}