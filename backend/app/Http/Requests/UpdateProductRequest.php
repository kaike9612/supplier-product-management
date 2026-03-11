<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
        $productId = $this->route('id');
        
        return [
            'company_id' => 'sometimes|required|integer|exists:companies,id',
            'name' => 'sometimes|required|string|max:255',
            'sku' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                Rule::unique('products', 'sku')->ignore($productId)
            ],
            'price' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|in:active,inactive',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'company_id.required' => 'A empresa é obrigatória.',
            'company_id.integer' => 'O ID da empresa deve ser um número válido.',
            'company_id.exists' => 'A empresa selecionada não existe.',
            
            'name.required' => 'O nome do produto é obrigatório.',
            'name.string' => 'O nome deve ser um texto válido.',
            'name.max' => 'O nome deve ter no máximo 255 caracteres.',
            
            'sku.required' => 'O SKU é obrigatório.',
            'sku.string' => 'O SKU deve ser um texto válido.',
            'sku.max' => 'O SKU deve ter no máximo 50 caracteres.',
            'sku.unique' => 'Este SKU já está cadastrado.',
            
            'price.required' => 'O preço é obrigatório.',
            'price.numeric' => 'O preço deve ser um número válido.',
            'price.min' => 'O preço deve ser maior ou igual a zero.',
            
            'status.required' => 'O status é obrigatório.',
            'status.in' => 'O status deve ser "active" ou "inactive".',
        ];
    }
}
