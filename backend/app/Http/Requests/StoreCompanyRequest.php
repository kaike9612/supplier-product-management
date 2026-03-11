<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
            'cnpj' => 'required|numeric|digits:14|unique:companies,cnpj',
            'email' => 'required|string|email|max:255',
            'phone' => 'nullable|numeric|digits_between:10,11',
            'address' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome da empresa é obrigatório.',
            'name.string' => 'O nome deve ser um texto válido.',
            'name.max' => 'O nome deve ter no máximo 255 caracteres.',
            
            'cnpj.required' => 'O CNPJ é obrigatório.',
            'cnpj.numeric' => 'O CNPJ deve conter apenas números.',
            'cnpj.digits' => 'O CNPJ deve conter exatamente 14 dígitos.',
            'cnpj.unique' => 'Este CNPJ já está cadastrado.',
            
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'O email deve ser um endereço de email válido.',
            'email.max' => 'O email deve ter no máximo 255 caracteres.',
            
            'phone.numeric' => 'O telefone deve conter apenas números.',
            'phone.digits_between' => 'O telefone deve conter entre 10 e 11 dígitos.',
            
            'status.required' => 'O status é obrigatório.',
            'status.in' => 'O status deve ser "active" ou "inactive".',
        ];
    }
}
