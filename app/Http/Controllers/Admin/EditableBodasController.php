<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEditableBodasRequest;
use App\Models\EditablePage;
use App\Support\EditablePages\BodasPageDefaults;
use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EditableBodasController extends Controller
{
    public function edit(): Response
    {
        $editablePage = EditablePage::query()->firstOrCreate(
            ['slug' => BodasPageDefaults::SLUG],
            BodasPageDefaults::attributes(),
        );

        return Inertia::render('auth/bodas/edit', [
            'editablePage' => [
                'id' => $editablePage->id,
                'slug' => $editablePage->slug,
                'title' => $editablePage->title,
                'content' => $editablePage->content,
                'is_published' => $editablePage->is_published,
                'updated_at' => $editablePage->updated_at?->toISOString(),
            ],
            'uploadConfig' => [
                'accept' => 'image/*,video/mp4,video/quicktime,video/webm',
                'max_size_mb' => MediaUploadLimits::maxFileSizeMegabytes(),
            ],
        ]);
    }

    public function update(UpdateEditableBodasRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $content = $this->mergeUploadedMedia($validated['content'], $request);
        $isPublished = $request->boolean('is_published');

        EditablePage::query()->updateOrCreate(
            ['slug' => BodasPageDefaults::SLUG],
            [
                'title' => $validated['title'],
                'content' => $content,
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now() : null,
            ],
        );

        return redirect()
            ->route('admin.bodas.edit')
            ->with('success', 'Contenido de bodas guardado.');
    }

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    private function mergeUploadedMedia(array $content, UpdateEditableBodasRequest $request): array
    {
        $uploadGroups = $request->file('media_uploads', []);
        $mediaItems = Arr::get($content, 'media', []);

        foreach ($uploadGroups as $index => $group) {
            $target = $request->input("media_uploads.$index.target");
            $mediaId = $request->input("media_uploads.$index.media_id");
            $name = $request->input("media_uploads.$index.name");
            $file = Arr::get($group, 'file');

            if (
                ! is_string($target)
                || ! is_string($mediaId)
                || $mediaId === ''
                || ! $file instanceof UploadedFile
            ) {
                continue;
            }

            $mediaPayload = $this->mediaFromUpload($file, is_string($name) ? $name : null, $mediaId);

            if ($target === 'background' && Arr::get($content, 'background_media.id') === $mediaId) {
                $content['background_media'] = array_merge($content['background_media'], $mediaPayload);

                continue;
            }

            foreach ($mediaItems as $mediaIndex => $media) {
                if (Arr::get($media, 'id') !== $mediaId) {
                    continue;
                }

                $mediaItems[$mediaIndex] = array_merge($media, $mediaPayload);
                break;
            }
        }

        $content['media'] = $mediaItems;

        return $content;
    }

    /**
     * @return array{id: string, type: string, src: string, poster: null, alt: array{es: string, en: string}, label: array{es: string, en: string}}
     */
    private function mediaFromUpload(UploadedFile $file, ?string $name, string $mediaId): array
    {
        $label = $this->uploadLabel($file, $name);
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'bin');
        $filename = (Str::slug($label) ?: 'boda').'.'.$extension;
        $directory = public_path('imagenes/bodas');
        $targetPath = $directory.DIRECTORY_SEPARATOR.$filename;
        $mimeType = $file->getMimeType() ?? '';

        File::ensureDirectoryExists($directory);

        if (File::exists($targetPath)) {
            File::delete($targetPath);
        }

        $file->move($directory, $filename);

        return [
            'id' => $mediaId,
            'type' => str_starts_with($mimeType, 'video/') ? 'video' : 'image',
            'src' => '/imagenes/bodas/'.$filename,
            'poster' => null,
            'alt' => [
                'es' => $label,
                'en' => $label,
            ],
            'label' => [
                'es' => $label,
                'en' => $label,
            ],
        ];
    }

    private function uploadLabel(UploadedFile $file, ?string $name): string
    {
        $fallbackName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        return Str::of($name ?: $fallbackName ?: 'boda')
            ->replace(['-', '_'], ' ')
            ->squish()
            ->toString();
    }
}
