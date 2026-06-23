<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEditableContactoRequest;
use App\Models\EditablePage;
use App\Support\EditablePages\ContactoPageDefaults;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EditableContactoController extends Controller
{
    public function edit(): Response
    {
        $editablePage = EditablePage::query()->firstOrCreate(
            ['slug' => ContactoPageDefaults::SLUG],
            ContactoPageDefaults::attributes(),
        );

        return Inertia::render('auth/contacto/edit', [
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

    public function update(UpdateEditableContactoRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $isPublished = $request->boolean('is_published');

        EditablePage::query()->updateOrCreate(
            ['slug' => ContactoPageDefaults::SLUG],
            [
                'title' => $validated['title'],
                'content' => $validated['content'],
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now() : null,
            ],
        );

        return redirect()
            ->route('admin.contacto.edit')
            ->with('success', 'Contenido de contacto guardado.');
    }
}
