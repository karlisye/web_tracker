<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/store-url', [UrlController::class, 'store'])->middleware('auth:sanctum');
