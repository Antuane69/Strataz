<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEditableRecomendacionesRequest;
use App\Models\EditablePage;
use App\Support\EditablePages\MediaUploadLimits;
use App\Support\EditablePages\RecomendacionesPageDefaults;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EditableRecomendacionesController extends Controller
{
    public function edit(): Response
    {
        $editablePage = EditablePage::query()->firstOrCreate(
            ['slug' => RecomendacionesPageDefaults::SLUG],
            RecomendacionesPageDefaults::attributes(),
        );

        return Inertia::render('auth/recomendaciones/edit', [
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

    public function update(UpdateEditableRecomendacionesRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $content = $this->mergeUploadedMedia($validated['content'], $request);
        $isPublished = $request->boolean('is_published');

        EditablePage::query()->updateOrCreate(
            ['slug' => RecomendacionesPageDefaults::SLUG],
            [
                'title' => $validated['title'],
                'content' => $content,
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now() : null,
            ],
        );

        return redirect()
            ->route('admin.recomendaciones.edit')
            ->with('success', 'Contenido de recomendaciones guardado.');
    }

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    private function mergeUploadedMedia(array $content, UpdateEditableRecomendacionesRequest $request): array
    {
        $uploadGroups = $request->file('media_uploads', []);
        $recommendations = Arr::get($content, 'recommendations', []);

        foreach ($uploadGroups as $index => $group) {
            $recommendationId = $request->input("media_uploads.$index.recommendation_id");
            $mediaId = $request->input("media_uploads.$index.media_id");
            $name = $request->input("media_uploads.$index.name");
            $file = Arr::get($group, 'file');

            if (
                ! is_string($recommendationId)
                || $recommendationId === ''
                || ! is_string($mediaId)
                || $mediaId === ''
                || ! $file instanceof UploadedFile
            ) {
                continue;
            }

            foreach ($recommendations as $recommendationIndex => $recommendation) {
                if (
                    Arr::get($recommendation, 'id') !== $recommendationId
                    || Arr::get($recommendation, 'image.id') !== $mediaId
                ) {
                    continue;
                }

                $recommendations[$recommendationIndex]['image'] = array_merge(
                    Arr::get($recommendation, 'image', []),
                    $this->mediaFromUpload($file, is_string($name) ? $name : null, $mediaId),
                );

                break;
            }
        }

        $content['recommendations'] = $recommendations;

        return $content;
    }

    /**
     * @return array{id: string, type: string, src: string, poster: null, alt: array{es: string, en: string}}
     */
    private function mediaFromUpload(UploadedFile $file, ?string $name, string $mediaId): array
    {
        $label = $this->uploadLabel($file, $name);
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'bin');
        $filename = (Str::slug($label) ?: 'recomendacion').'.'.$extension;
        $directory = public_path('imagenes/recomendaciones');
        $targetPath = $directory.DIRECTORY_SEPARATOR.$filename;

        File::ensureDirectoryExists($directory);

        if (File::exists($targetPath)) {
            File::delete($targetPath);
        }

        $file->move($directory, $filename);

        return [
            'id' => $mediaId,
            'type' => 'image',
            'src' => '/imagenes/recomendaciones/'.$filename,
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

        return Str::of($name ?: $fallbackName ?: 'recomendacion')
            ->replace(['-', '_'], ' ')
            ->squish()
            ->toString();
    }
}
