<?php
namespace App\Services;

use App\Models\Book;
use Illuminate\Support\Facades\Cache;
use Illuminate\Pagination\LengthAwarePaginator;

class BookService
{
    protected int $cacheTime = 60 * 5;

    public function getPaginated(int $page = 1, ?string $search = null): LengthAwarePaginator
    {
        $cacheKey = "books.page.{$page}.search.{$search}";

        return Cache::remember($cacheKey, $this->cacheTime, function () use ($search) {
            return Book::with('author')
                       ->search($search)
                       ->latest()
                       ->paginate(15);
        });
    }

    public function findById(int $id): Book
    {
        $cacheKey = "book.{$id}";
        return Cache::remember($cacheKey, $this->cacheTime, function () use ($id) {
            return Book::with('author')->findOrFail($id);
        });
    }

    public function create(array $data): Book
    {
        $book = Book::create($data);
        $this->clearCache();
        return $book->load('author');
    }

    public function update(Book $book, array $data): Book
    {
        $book->update($data);
        $this->clearCache($book->id);
        return $book->load('author');
    }

    public function delete(Book $book): void
    {
        $this->clearCache($book->id);
        $book->delete();
    }

    public function clearCache(int|null $id = null): void
    {
        if ($id) {
            Cache::forget("book.{$id}");
        }
        Cache::flush();
    }
}