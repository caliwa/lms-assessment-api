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

public function allBorrowedBooks()
    {
        $borrowedBooks = Book::where('availability_status', false)
            ->with([
                'author', 
                'borrowers' => fn($query) => $query->wherePivotNull('returned_at')
            ])
            ->latest('updated_at')
            ->get();
        
        $formattedData = $borrowedBooks->map(function($book) {
            $borrower = $book->borrowers->first();
            
            return [
                'book_id' => $book->id,
                'book_title' => $book->title,
                'author_name' => $book->author ? $book->author->name : 'Autor Desconocido', // ✅
                'user_id' => $borrower ? $borrower->id : null,
                'user_name' => $borrower ? $borrower->name : 'Usuario Desconocido', // ✅
                'due_at' => $borrower ? $borrower->pivot->due_at : null,
            ];
        });

        return response()->json(['data' => $formattedData]);
    }
}