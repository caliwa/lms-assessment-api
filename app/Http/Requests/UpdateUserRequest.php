<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user')->id;

        return [
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId), //
            ],
            'password' => ['sometimes', 'required', 'confirmed', Password::min(8)],
            'unique_library_id' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($userId), //
            ],
            'role' => ['sometimes', 'required', new Enum(UserRole::class)],
        ];
    }
}