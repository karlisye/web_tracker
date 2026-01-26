<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebsiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/visits', [UrlController::class, 'index']);
    Route::get('/visits/{website_id}', [UrlController::class, 'show']);
    Route::get('/most-visits', [UrlController::class, 'mostVisits']);
    Route::get('inactive-websites', [UrlController::class, 'inactiveWebsites']);

    Route::get('/websites', [WebsiteController::class, 'show']);
    Route::post('/remove-website/{website_id}', [WebsiteController::class, 'remove']);

    Route::post('/user/update', [UserController::class, 'update']);
    Route::delete('/account', [UserController::class, 'destroy']);
    Route::delete('/visits', [UserController::class, 'clearVisits']);
    Route::patch('/user/retention', [UserController::class, 'updateRetention']);
});