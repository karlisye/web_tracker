<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/store-url', [UrlController::class, 'store']);
    Route::get('/load-website-data', [UrlController::class, 'loadVisitsByHost']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');