<?php

namespace App\Http\Controllers;

use App\Models\Website;
use Illuminate\Http\Request;

class UrlController extends Controller
{
    public function store(Request $request)
    {
        $incomingFields = $request->validate([
            'host' => 'required|string',
            'page_url' => 'required|url',
            'method' => 'required|string',
            'detected_at' => 'required|date',
        ]);

        Website::create($incomingFields);
        return response()->json(['message' => 'Stored successfully!'], 200);
    }
}
