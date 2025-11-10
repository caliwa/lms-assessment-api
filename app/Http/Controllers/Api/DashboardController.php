<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    /**
     */
    public function stats(Request $request)
    {
        $user = $request->user();

        $totalBooks = Cache::remember('stats:total_books', 3600, fn() => Book::count());
        $borrowedBooks = Cache::remember('stats:borrowed_books', 60, fn() => Book::where('availability_status', false)->count());

        $stats = [
            'totalBooks' => $totalBooks,
            'borrowedBooks' => $borrowedBooks,
            'availableBooks' => $totalBooks - $borrowedBooks,
        ];

        $rawRole = $user->getRawOriginal('role');

        if ($rawRole === 'Admin') {
            $stats['totalUsers'] = Cache::remember('stats:total_users', 3600, fn() => User::count());
        } else {
            $stats['myBorrowedCount'] = $user->currentBorrowedBooks()->count();
        }

        return response()->json($stats);
    }
}