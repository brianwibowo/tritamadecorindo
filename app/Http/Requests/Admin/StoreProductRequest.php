<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() === true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug'],
            'category_id' => ['required', 'string', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'summary' => ['nullable', 'string'],
            'active' => ['boolean'],
            'show_price' => ['boolean'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'string'],
            'image_files' => ['nullable', 'array'],
            'image_files.*' => ['nullable', 'image', 'max:5120'],
            'variants' => ['required', 'array', 'min:1'],
            'variants.*.name' => ['nullable', 'string', 'max:255'],
            'variants.*.price' => ['required', 'integer', 'min:0'],
            'variants.*.stock' => ['integer', 'min:0'],
        ];
    }
}
