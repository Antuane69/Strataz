<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\EditablePage;
use App\Support\EditablePages\BodasPageDefaults;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BodasController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $editablePage = EditablePage::query()
            ->where('slug', BodasPageDefaults::SLUG)
            ->published()
            ->first();

        return Inertia::render('public/bodas', [
            'pageContent' => $editablePage?->content ?? BodasPageDefaults::content(),
            'locale' => $this->locale($request),
        ]);
    }

    private function locale(Request $request): string
    {
        $locale = $request->string('locale')->toString() ?: $request->string('lang', 'es')->toString();

        return in_array($locale, ['es', 'en'], true) ? $locale : 'es';
    }
}
