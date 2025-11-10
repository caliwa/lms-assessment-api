<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'author_id', 'isbn', 'publication_year', 'availability_status',
    ];

    protected $casts = [
        'publication_year' => 'integer',
        'availability_status' => 'boolean',
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function borrowers()
    {
        return $this->belongsToMany(User::class, 'book_user')
                    ->withPivot('borrowed_at', 'due_at', 'returned_at');
    }

    public function scopeSearch(Builder $query, ?string $searchTerm)
    {
        if (!$searchTerm) {
            return $query;
        }

        return $query->where(function(Builder $q) use ($searchTerm) {
            $q->where('title', 'LIKE', "%{$searchTerm}%")
              ->orWhere('isbn', 'LIKE', "%{$searchTerm}%")
              ->orWhereHas('author', function(Builder $authorQuery) use ($searchTerm) {
                  $authorQuery->where('name', 'LIKE', "%{$searchTerm}%");
              });
        });
    }
}