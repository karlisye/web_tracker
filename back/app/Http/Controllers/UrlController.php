<?php

namespace App\Http\Controllers;

use App\Models\Webiste;
use App\Models\Website;
use Illuminate\Http\Request;

class UrlController extends Controller
{
    public function store(Request $request)
    {
        $incomingFields = $request->validate([
            'name' => ['required'],
        ]);
        
        Website::create($incomingFields);
        return response()->json(['message' => 'URL received successfully!'], 200);
    }
}
