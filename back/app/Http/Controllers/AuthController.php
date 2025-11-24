<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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

        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'exists:users'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return [
                'errors' => [
                    'email' => ['incorrect credentials']
                ]
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'you are logged out'
        ];
    }
}
