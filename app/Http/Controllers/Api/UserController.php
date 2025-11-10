<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     */
    public function index()
    {
        return UserResource::collection(User::paginate(15));
    }

    /**
     */
    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();
        
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'unique_library_id' => $validatedData['unique_library_id'],
            'role' => $validatedData['role'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return new UserResource($user);
    }

    /**
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $validatedData = $request->validated();

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return new UserResource($user);
    }

    /**
     */
    public function destroy(User $user)
    {
        $user->delete();
        
        return response()->noContent();
    }
}