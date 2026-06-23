<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEditableServiciosRequest;
use App\Models\EditablePage;
use App\Support\EditablePages\MediaUploadLimits;
use App\Support\EditablePages\ServiciosPageDefaults;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EditableServiciosController extends Controller
{
    public function edit(): Response
    {
        $editablePage = EditablePage::query()->firstOrCreate(
            ['slug' => ServiciosPageDefaults::SLUG],
            ServiciosPageDefaults::attributes(),
        );

        return Inertia::render('auth/servicios/edit', [
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

    public function update(UpdateEditableServiciosRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $content = $this->mergeUploadedMedia($validated['content'], $request);
        $isPublished = $request->boolean('is_published');

        EditablePage::query()->updateOrCreate(
            ['slug' => ServiciosPageDefaults::SLUG],
            [
                'title' => $validated['title'],
                'content' => $content,
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now() : null,
            ],
        );

        return redirect()
            ->route('admin.servicios.edit')
            ->with('success', 'Contenido de servicios guardado.');
    }

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    private function mergeUploadedMedia(array $content, UpdateEditableServiciosRequest $request): array
    {
        $uploadGroups = $request->file('media_uploads', []);
        $services = Arr::get($content, 'services', []);

        foreach ($uploadGroups as $index => $group) {
            $serviceId = $request->input("media_uploads.$index.service_id");
            $mediaId = $request->input("media_uploads.$index.media_id");
            $name = $request->input("media_uploads.$index.name");
            $file = Arr::get($group, 'file');

            if (
                ! is_string($serviceId)
                || $serviceId === ''
                || ! is_string($mediaId)
                || $mediaId === ''
                || ! $file instanceof UploadedFile
            ) {
                continue;
            }

            foreach ($services as $serviceIndex => $service) {
                if (Arr::get($service, 'id') !== $serviceId) {
                    continue;
                }

                $mediaPayload = $this->mediaFromUpload($file, is_string($name) ? $name : null, $mediaId);
                $mediaItems = Arr::get($service, 'media', []);
                $mediaWasUpdated = false;

                foreach ($mediaItems as $mediaIndex => $media) {
                    if (Arr::get($media, 'id') !== $mediaId) {
                        continue;
                    }

                    $mediaItems[$mediaIndex] = array_merge($media, $mediaPayload);
                    $mediaWasUpdated = true;
                    break;
                }

                if ($mediaWasUpdated) {
                    $services[$serviceIndex]['media'] = $mediaItems;
                }
            }
        }

        $content['services'] = $services;

        return $content;
    }

    /**
     * @return array{id: string, type: string, src: string, poster: null, alt: array{es: string, en: string}}
     */
    private function mediaFromUpload(UploadedFile $file, ?string $name, string $mediaId): array
    {
        $label = $this->uploadLabel($file, $name);
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'bin');
        $filename = (Str::slug($label) ?: 'servicio').'.'.$extension;
        $directory = public_path('imagenes/servicios');
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
            'src' => '/imagenes/servicios/'.$filename,
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

        return Str::of($name ?: $fallbackName ?: 'servicio')
            ->replace(['-', '_'], ' ')
            ->squish()
            ->toString();
    }
}
