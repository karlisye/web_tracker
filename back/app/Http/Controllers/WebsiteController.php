<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function show (Request $request)
    {
        $websites = $request->user()->websitesVisited()->get();
        return response()->json([
            'websites' => $websites,
            'count' => $websites->count()
        ]);
    }

    public function remove (Request $request, $id)
    {
        $request->user()->websitesVisited()->detach($id);

        return response()->json([
            'message' => 'Website data succesfully removed!'
        ]);
    }
}
