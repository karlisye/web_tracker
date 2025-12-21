<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\Website;
use Illuminate\Http\Request;

class UrlController extends Controller
{
    public function index(Request $request)
    {
        $incomingFields = $request->validate([
            'sortBy' => ['required', 'in:visit_time,website_id'],
            'direction' => ['required', 'in:asc,desc']
        ]);

        $visits = $request->user()
            ->visits()
            ->with(['user', 'website'])
            ->orderBy($incomingFields['sortBy'], $incomingFields['direction'])
            ->paginate(10);

        return response()->json([
            'visits' => $visits
        ]);
    }


    public function store(Request $request)
    {
        $incomingFields = $request->validate([
            'host' => 'required|string',
            'page_url' => 'required|url',
            'method' => 'required|string',
            'detected_at' => 'required|date',
        ]);

        $website = Website::firstOrCreate(
            ['host' => $incomingFields['host']],
            [
                'page_url' => $incomingFields['page_url'],
                'method' => $incomingFields['method']
            ],
        );

        Visit::create([
            'user_id' => auth()->id(),
            'website_id' => $website->id,
            'detected_at' => $incomingFields['detected_at'],
        ]);

        return response()->json(['message' => 'Stored successfully!'], 200);
    }
}
