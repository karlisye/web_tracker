<?php

namespace App\Console\Commands;

use App\Models\Visit;
use Illuminate\Console\Command;

class DeleteOldVisits extends Command
{
    protected $signature = 'visits:cleanup';
    protected $description = 'Delete old visits based on user retention settings';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $retentionPeriods = [
            "1month" => now()->subMonth(),
            "3months" => now()->subMonths(3),
            "6months" => now()->subMonths(6),
            "1year" => now()->subYear()
        ];

        $deletedCount = 0;

        foreach ($retentionPeriods as $period => $date) {
            $count = Visit::whereHas("user", function ($query) use ($period) {
                $query->where("data_retention", $period);
            })->where("visit_time", "<=", $date)->delete();

            $deletedCount += $count;
        }

        $this->info("Deleted {$deletedCount} old visits");

        return 0;
    }
}
