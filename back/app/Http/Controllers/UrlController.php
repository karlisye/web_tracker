<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            ->paginate(9);

        return response()->json([
            'visits' => $visits
        ]);
    }

    public function show($website_id)
    {
        $visits = Visit::with('website')
            ->where('website_id', $website_id)
            ->where('user_id', Auth::user()->id)
            ->orderBy('visit_time', 'desc')
            ->get();

        $visitCount = $visits->where('visit_time', '<', now()->subMonth())->count();

        return response()->json([
            'visits' => $visits,
            'visitCount' => $visitCount
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

    public function mostVisits(Request $request) 
    {
        $incomingFields = $request->validate([
            'sortBy' => ['required', 'in:all,lastMonth'],
            'startDate' => ['nullable', 'date'],
            'endDate' => ['nullable', 'date'],
        ]);

        
        $query = DB::table('visits')
            ->select('websites.host', DB::raw('COUNT(*) as total'))
            ->join('websites', 'visits.website_id', '=', 'websites.id')
            ->where('visits.user_id', $request->user()->id);

        if ($incomingFields['sortBy'] === 'lastMonth') {
            $query->where('visits.created_at', '>=', now()->subMonth());
        }

        $query->when($incomingFields['startDate'] ?? null, function ($q, $start) {
            return $q->where('visits.created_at', '>=', $start);
        });

        $query->when($incomingFields['endDate'] ?? null, function ($q, $start) {
            return $q->where('visits.created_at', '<=', $start);
        });

        $data = $query->groupBy('websites.host')
            ->orderByDesc('total')
            ->get();

        return response()->json([
            'mostVisits' => $data
        ]);
    }

    public function inactiveWebsites(Request $request) 
    {
        $inactiveWebsites = DB::table('visits')
            ->join('websites', 'visits.website_id', '=', 'websites.id')
            ->where('visits.user_id', $request->user()->id)
            ->select('websites.host', DB::raw('MAX(visits.visit_time) as last_visit'))
            ->groupBy('websites.host')
            ->having('last_visit', '<', now()->subMonth())
            ->orderBy('last_visit', 'asc')
            ->get();

        return response()->json([
            'inactiveWebsites' => $inactiveWebsites,
            'count' => $inactiveWebsites->count()
        ]);
    }

    public function loadVisitsByHost(Request $request) 
    {
        $request->validate([
            "websiteHost" => ['required', 'string'],
            "perPage" => ['nullable', 'int']
        ]);

        $perPage = $request->input("perPage", 10);

        $website = Website::where('host', $request->websiteHost)->first();

        if (!$website) {
            return response()->json([
                "visits" => []
            ]);
        }

        $visits = Visit::with('website')
            ->where('website_id', $website->id)
            ->where('user_id', auth()->id())
            ->latest('visit_time')
            ->paginate($perPage);

        return response()->json([
            "visits" => $visits->items(),
            "totalPages" => $visits->lastPage()
        ]);
    }
}
