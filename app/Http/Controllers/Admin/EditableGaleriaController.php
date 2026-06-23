<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEditableGaleriaRequest;
use App\Models\EditablePage;
use App\Support\EditablePages\GaleriaPageDefaults;
use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EditableGaleriaController extends Controller
{
    public function edit(): Response
    {
        $editablePage = EditablePage::query()->firstOrCreate(
            ['slug' => GaleriaPageDefaults::SLUG],
            GaleriaPageDefaults::attributes(),
        );

        return Inertia::render('auth/galeria/edit', [
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

    public function update(UpdateEditableGaleriaRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $content = $this->mergeUploadedMedia($validated['content'], $request);
        $isPublished = $request->boolean('is_published');

        EditablePage::query()->updateOrCreate(
            ['slug' => GaleriaPageDefaults::SLUG],
            [
                'title' => $validated['title'],
                'content' => $content,
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now() : null,
            ],
        );

        return redirect()
            ->route('admin.galeria.edit')
            ->with('success', 'Contenido de galeria guardado.');
    }

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    private function mergeUploadedMedia(array $content, UpdateEditableGaleriaRequest $request): array
    {
        $uploadGroups = $request->file('media_uploads', []);
        $images = Arr::get($content, 'images', []);

        foreach ($uploadGroups as $index => $group) {
            $galleryImageId = $request->input("media_uploads.$index.gallery_image_id");
            $mediaId = $request->input("media_uploads.$index.media_id");
            $name = $request->input("media_uploads.$index.name");
            $file = Arr::get($group, 'file');

            if (
                ! is_string($galleryImageId)
                || $galleryImageId === ''
                || ! is_string($mediaId)
                || $mediaId === ''
                || ! $file instanceof UploadedFile
            ) {
                continue;
            }

            foreach ($images as $imageIndex => $image) {
                if (
                    Arr::get($image, 'id') !== $galleryImageId
                    || Arr::get($image, 'image.id') !== $mediaId
                ) {
                    continue;
                }

                $images[$imageIndex]['image'] = array_merge(
                    Arr::get($image, 'image', []),
                    $this->mediaFromUpload($file, is_string($name) ? $name : null, $mediaId),
                );

                break;
            }
        }

        $content['images'] = $images;

        return $content;
    }

    /**
     * @return array{id: string, type: string, src: string, poster: null, alt: array{es: string, en: string}}
     */
    private function mediaFromUpload(UploadedFile $file, ?string $name, string $mediaId): array
    {
        $label = $this->uploadLabel($file, $name);
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'bin');
        $filename = (Str::slug($label) ?: 'galeria').'.'.$extension;
        $directory = public_path('imagenes/galeria');
        $targetPath = $directory.DIRECTORY_SEPARATOR.$filename;

        File::ensureDirectoryExists($directory);

        if (File::exists($targetPath)) {
            File::delete($targetPath);
        }

        $file->move($directory, $filename);

        return [
            'id' => $mediaId,
            'type' => 'image',
            'src' => '/imagenes/galeria/'.$filename,
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

        return Str::of($name ?: $fallbackName ?: 'galeria')
            ->replace(['-', '_'], ' ')
            ->squish()
            ->toString();
    }
}
