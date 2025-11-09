<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Services\BorrowingService;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\BorrowingException;

class BorrowingController extends Controller
{
    public function __construct(protected BorrowingService $borrowingService) {}

    public function borrow(Request $request, Book $book)
    {
        try {
            $this->borrowingService->borrowBook(Auth::user(), $book->id);
            return response()->json(['message' => 'Libro prestado exitosamente.']);
        } catch (BorrowingException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function return(Request $request, Book $book)
    {
        try {
            $this->borrowingService->returnBook(Auth::user(), $book->id);
            return response()->json(['message' => 'Libro devuelto exitosamente.']);
        } catch (BorrowingException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function userBorrowedBooks(Request $request)
    {
        $books = $this->borrowingService->getUserBorrowedBooks(Auth::user());
        return BookResource::collection($books);
    }
}