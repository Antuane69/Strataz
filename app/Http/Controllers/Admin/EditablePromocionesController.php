<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEditablePromocionesRequest;
use App\Models\EditablePage;
use App\Support\EditablePages\MediaUploadLimits;
use App\Support\EditablePages\PromocionesPageDefaults;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EditablePromocionesController extends Controller
{
    public function edit(): Response
    {
        $editablePage = EditablePage::query()->firstOrCreate(
            ['slug' => PromocionesPageDefaults::SLUG],
            PromocionesPageDefaults::attributes(),
        );

        return Inertia::render('auth/promociones/edit', [
            'editablePage' => [
                'id' => $editablePage->id,
                'slug' => $editablePage->slug,
                'title' => $editablePage->title,
                'content' => $editablePage->content,
                'is_published' => $editablePage->is_published,
                'updated_at' => $editablePage->updated_at?->toISOString(),
            ],
            'uploadConfig' => [
                'accept' => 'image/*',
                'max_size_mb' => MediaUploadLimits::maxFileSizeMegabytes(),
            ],
        ]);
    }

    public function update(UpdateEditablePromocionesRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $content = $this->mergeUploadedMedia($validated['content'], $request);
        $isPublished = $request->boolean('is_published');

        EditablePage::query()->updateOrCreate(
            ['slug' => PromocionesPageDefaults::SLUG],
            [
                'title' => $validated['title'],
                'content' => $content,
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now() : null,
            ],
        );

        return redirect()
            ->route('admin.promociones.edit')
            ->with('success', 'Contenido de promociones guardado.');
    }

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    private function mergeUploadedMedia(array $content, UpdateEditablePromocionesRequest $request): array
    {
        $uploadGroups = $request->file('media_uploads', []);
        $promotions = Arr::get($content, 'promotions', []);

        foreach ($uploadGroups as $index => $group) {
            $promotionId = $request->input("media_uploads.$index.promotion_id");
            $mediaId = $request->input("media_uploads.$index.media_id");
            $name = $request->input("media_uploads.$index.name");
            $file = Arr::get($group, 'file');

            if (
                ! is_string($promotionId)
                || $promotionId === ''
                || ! is_string($mediaId)
                || $mediaId === ''
                || ! $file instanceof UploadedFile
            ) {
                continue;
            }

            foreach ($promotions as $promotionIndex => $promotion) {
                if (Arr::get($promotion, 'id') !== $promotionId || Arr::get($promotion, 'image.id') !== $mediaId) {
                    continue;
                }

                $promotions[$promotionIndex]['image'] = array_merge(
                    $promotion['image'],
                    $this->mediaFromUpload($file, is_string($name) ? $name : null, $mediaId),
                );
            }
        }

        $content['promotions'] = $promotions;

        return $content;
    }

    /**
     * @return array{id: string, type: string, src: string, poster: null, alt: array{es: string, en: string}}
     */
    private function mediaFromUpload(UploadedFile $file, ?string $name, string $mediaId): array
    {
        $label = $this->uploadLabel($file, $name);
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'bin');
        $filename = (Str::slug($label) ?: 'promocion').'.'.$extension;
        $directory = public_path('imagenes/promociones');
        $targetPath = $directory.DIRECTORY_SEPARATOR.$filename;

        File::ensureDirectoryExists($directory);

        if (File::exists($targetPath)) {
            File::delete($targetPath);
        }

        $file->move($directory, $filename);

        return [
            'id' => $mediaId,
            'type' => 'image',
            'src' => '/imagenes/promociones/'.$filename,
            'poster' => null,
            'alt' => [
                'es' => $label,
                'en' => $label,
            ],
        ];
    }

    private function uploadLabel(UploadedFile $file, ?string $name): string
    {
        $fallbackName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        return Str::of($name ?: $fallbackName ?: 'promocion')
            ->replace(['-', '_'], ' ')
            ->squish()
            ->toString();
    }
}
