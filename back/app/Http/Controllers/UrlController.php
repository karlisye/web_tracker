<?php

namespace App\Http\Controllers;

use App\Models\Website;
use Illuminate\Http\Request;

class UrlController extends Controller
{
    public function store(Request $request)
    {
        $incomingFields = $request->validate([
            'name' => ['required'],
        ]);
        
        // !! vēlāk pievienot COUNT
        if(Website::where('name', $incomingFields['name'])->exists()){
            return response()->json(['message' => 'URL added to count successfuly'], 200);
        }


        Website::create($incomingFields);
        return response()->json(['message' => 'URL received successfully!'], 200);
    }
}
