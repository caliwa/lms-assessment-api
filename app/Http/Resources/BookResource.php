<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'isbn' => $this->isbn,
            'publication_year' => $this->publication_year,
            'available' => $this->availability_status,
            'author' => new AuthorResource($this->whenLoaded('author')), // Carga condicional
        ];
    }
}