<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function destroy (Request $request)
    {
        $user = Auth::user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Account deleted successfully']);
    }

    public function clearVisits (Request $request)
    {
        $user = Auth::user();

        Visit::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Visit history cleared']);
    }
}
