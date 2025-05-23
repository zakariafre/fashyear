<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserController extends Controller
{
    //  Display a listing of the resource.
    public function listing()
    {
        return User::all();
    }

    // Login client
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user,
            'role' => $user->type,
        ]);
    }

    // SignUp action - only for clients
    public function signup(Request $request)
    {
        try {
            // Validate the request
            $validatedData = $request->validate([
                'username' => 'nullable|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:8|confirmed',
            ]);

            // Create the user - always as client
            $user = User::create([
                'username' => $request->username ?? explode('@', $request->email)[0], // Use part of email as username if not provided
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type' => 'client', // Set type to client
                'address' => $request->address,
                'phone_number' => $request->phone_number,
            ]);

            // Login the user
            Auth::login($user);
            
            // Create token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return the response
            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    // Logout user
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    // Get authenticated user
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // Refresh token
    public function refresh(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user,
        ]);
    }

    //  Display the specified resource.
    public function show(string $id)
    {
        return User::findorFail($id);
    }




    //  Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'type' => 'required|in:admin,user',
        ]);


        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => $request->type,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
        ]);

        return response()->json($user, 201);
    }



    //  Update the specified resource in storage.
    public function update(Request $request, string $id)
    {
        $user = User::findorFail($id);


        $user->update($request->only([
            'username',
            'email',
            'phone_number',
            'address',
        ]));

        return response()->json($user);

    }




    //  Remove the specified resource from storage.     
    public function destroy(string $id)
    {
        $user = User::findorFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
