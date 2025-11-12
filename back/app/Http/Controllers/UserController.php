<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $incomingFields = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($incomingFields)){
            $request->session()->regenerate();
            return response()->json(['message' => 'succesfully logged in']);
        }
        return response()->json([
            'error' => 'Email or password is incorrect',
        ], 401);
    }
}
