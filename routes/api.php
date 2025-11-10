<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BorrowingController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::get('/books/search', [BookController::class, 'search']);
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{book}', [BookController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/books/{book}/borrow', [BorrowingController::class, 'borrow'])
         ->middleware('throttle:borrow'); // Rate limiting
    Route::post('/books/{book}/return', [BorrowingController::class, 'return']);
    Route::get('/user/borrowed', [BorrowingController::class, 'userBorrowedBooks']);

    Route::group(['middleware' => ['admin']], function () {
        
        Route::post('/books', [BookController::class, 'store']);
        Route::put('/books/{book}', [BookController::class, 'update']);
        Route::delete('/books/{book}', [BookController::class, 'destroy']);

        Route::apiResource('/users', UserController::class);
    });
});