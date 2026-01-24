<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function update (Request $request)
    {
        $user = $request->user();

        $credentials = $request->validate([
            "name" => ["required", "min:3"],
            "email" => ["required", "email", Rule::unique("users")->ignore($user->id)]
        ]);

        $user->update($credentials);

        $token = $user->createToken('auth-token')->plainTextToken;
        $user->extension_token = $token;
        $user->save();

        return [
            'user' => $user,
            'token' => $token
        ];
    }
}
