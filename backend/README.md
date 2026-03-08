# Backend API

API REST desenvolvida em Laravel para gerenciamento de empresas fornecedoras e produtos.

## Stack

- Laravel
- PHP
- Eloquent ORM
- Form Requests
- API Resources

---

## Funcionalidades

### Empresas
- CRUD completo
- Paginação
- Filtro por nome
- Filtro por status
- Inativação lógica

### Produtos
- CRUD completo
- Paginação
- Filtro por nome
- Filtro por status
- Filtro por empresa

---

## Regras de negócio

- Ao inativar uma empresa, seus produtos também são inativados
- Empresa com produtos vinculados não pode ser excluída fisicamente
- company_id inválido retorna erro de validação
- recurso inexistente retorna 404

---

## Executar API

```
bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

API disponível em: http://127.0.0.1:8000

---

## Observação

Backend criado como parte de um desafio técnico full stack.
