<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderArchiveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:50'],
            'customer_address' => ['nullable', 'string'],
            'project_type' => ['required', 'string', 'max:255'],
            'details' => ['required', 'string'],
            'total_amount' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'string', 'in:survey,in_progress,completed,cancelled'],
            'installation_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
