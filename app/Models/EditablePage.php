<?php

namespace App\Models;

use Database\Factories\EditablePageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['slug', 'title', 'content', 'is_published', 'published_at'])]
class EditablePage extends Model
{
    /** @use HasFactory<EditablePageFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'content' => 'array',
            'is_published' => 'boolean',
            'published_at' => 'immutable_datetime',
        ];
    }

    /**
     * @param  Builder<EditablePage>  $query
     * @return Builder<EditablePage>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
