<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\EditablePage;
use App\Support\EditablePages\RecomendacionesPageDefaults;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RecomendacionesController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $editablePage = EditablePage::query()
            ->where('slug', RecomendacionesPageDefaults::SLUG)
            ->published()->first();

        return Inertia::render('public/recomendaciones', [
            'pageContent' => $editablePage?->content ?? RecomendacionesPageDefaults::content(),
            'locale' => $this->locale($request),
        ]);
    }

    private function locale(Request $request): string
    {
        $locale = $request->string('locale')->toString() ?: $request->string('lang', 'es')->toString();

        return in_array($locale, ['es', 'en'], true) ? $locale : 'es';
    }
}
