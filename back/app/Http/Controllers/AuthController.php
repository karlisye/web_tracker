<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $incomingFields = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'unique:users', 'email'],
            'password' => ['required', 'confirmed'],
        ]);

        $user = User::create($incomingFields);

        $token = $user->createToken('auth-token')->plainTextToken;
        $user->extension_token = $token;
        $user->save();

        Auth::login($user);

        return [
            'user' => $user,
            'token' => $token
        ];
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'exists:users'],
            'password' => ['required'],
        ]);

        if(Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            $token = $user->createToken('auth-token')->plainTextToken;
            $user->extension_token = $token;
            $user->save();
    
            return [
                'user' => $user,
                'token' => $token
            ];
        }
        return [
            'errors' => [
                'email' => ['incorrect credentials']
            ]
        ];

    }
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return [
            'message' => 'you are logged out'
        ];
    }
}
