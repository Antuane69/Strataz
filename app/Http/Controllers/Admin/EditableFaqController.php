<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEditableFaqRequest;
use App\Models\EditablePage;
use App\Support\EditablePages\FaqPageDefaults;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EditableFaqController extends Controller
{
    public function edit(): Response
    {
        $editablePage = EditablePage::query()->firstOrCreate(
            ['slug' => FaqPageDefaults::SLUG],
            FaqPageDefaults::attributes(),
        );

        return Inertia::render('auth/faq/edit', [
            'editablePage' => [
                'id' => $editablePage->id,
                'slug' => $editablePage->slug,
                'title' => $editablePage->title,
                'content' => $editablePage->content,
                'is_published' => $editablePage->is_published,
                'updated_at' => $editablePage->updated_at?->toISOString(),
            ],
        ]);
    }

    public function update(UpdateEditableFaqRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $isPublished = $request->boolean('is_published');

        EditablePage::query()->updateOrCreate(
            ['slug' => FaqPageDefaults::SLUG],
            [
                'title' => $validated['title'],
                'content' => $validated['content'],
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now() : null,
            ],
        );

        return redirect()
            ->route('admin.faq.edit')
            ->with('success', 'Contenido de FAQ guardado.');
    }
}
