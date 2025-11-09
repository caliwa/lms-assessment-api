<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Services\BookService;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function __construct(protected BookService $bookService) {}

    public function index(Request $request)
    {
        $books = $this->bookService->getPaginated(
            $request->input('page', 1),
            $request->input('q')
        );
        return BookResource::collection($books);
    }

    public function store(StoreBookRequest $request)
    {
        $book = $this->bookService->create($request->validated());
        return new BookResource($book);
    }

    public function show(Book $book)
    {
        $bookData = $this->bookService->findById($book->id);
        return new BookResource($bookData);
    }
    
    public function search(Request $request)
    {
        return $this->index($request);
    }

    public function update(UpdateBookRequest $request, Book $book)
    {
        $updatedBook = $this->bookService->update($book, $request->validated());
        return new BookResource($updatedBook);
    }

    public function destroy(Book $book)
    {
        $this->bookService->delete($book);
        return response()->noContent();
    }
}