<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $companyId = $this->route('id');
        
        return [
            'name' => 'sometimes|required|string|max:255',
            'cnpj' => [
                'sometimes',
                'required',
                'string',
                'max:18',
                Rule::unique('companies', 'cnpj')->ignore($companyId)
            ],
            'email' => 'sometimes|required|string|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'status' => 'sometimes|required|in:active,inactive',
        ];
    }
}
