<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $incomingFields = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $user = User::where('email', $incomingFields['email'])->first();

        if(!$user || !Hash::check($incomingFields['password'], $user->password)){
            return response()->json(['message' => 'Incorrect email or password'], 401);
        }

        $token = $user->createToken('apiToken')->plainTextToken;
        return response()->json([
            'message' => 'Logged in!',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function register(Request $request)
    {
        $incomingFields = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $incomingFields['password'] = bcrypt($incomingFields['password']);

        User::create($incomingFields);

        return response()->json(['message' => 'succesfully created a new user'], 201);
    }
}
