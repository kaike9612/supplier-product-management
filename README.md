# Supplier Product Management

Sistema full stack para gerenciamento de empresas e produtos.

---

## 📋 Descrição

Este projeto é uma aplicação completa para gerenciamento de empresas fornecedoras e seus produtos. A API RESTful permite realizar operações de CRUD completo, com validações robustas tanto no backend quanto no frontend.

---

## 🛠 Stack Tecnológica

### Backend
- **PHP** - Linguagem de programação
- **Laravel** - Framework PHP
- **REST API** - Arquitetura de API
- **Eloquent ORM** - Mapeamento objeto-relacional
- **Form Request Validation** - Validação de requisições

### Frontend
- **React** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **Axios** - Cliente HTTP
- **React Query** - Gerenciamento de estado servidor
- **Zod** - Validação de esquemas
- **TailwindCSS** - Framework de estilização

---

## ✨ Funcionalidades

### Empresas
- ✅ Criar empresa
- ✅ Editar empresa
- ✅ Excluir empresa
- ✅ Listar empresas
- ✅ Validação de CNPJ
- ✅ Validação de telefone

### Produtos
- ✅ Criar produto
- ✅ Editar produto
- ✅ Excluir produto
- ✅ Listar produtos
- ✅ Ativar / desativar produto (toggle status)

---

## 📝 Regras de Negócio

- Uma empresa não pode ser excluída se possuir produtos vinculados
- Produtos podem ser ativados ou desativados
- Validação de dados no frontend e backend
- Tratamento de erros padronizado

---

## 🔒 Validações Implementadas

### Backend
Laravel Form Requests com mensagens personalizadas:
- Validação de CNPJ (formato e unicidade)
- Validação de telefone (formato brasileiro)
- Validação de campos obrigatórios
- Validação de e-mail
- Validação de valores numéricos

### Frontend
Validação com Zod para:
- CNPJ (formato e máscara)
- Telefone (formato brasileiro)
- Campos obrigatórios
- E-mail
- Preços positivos

---

## 🚀 Melhorias Aplicadas Após Feedback Técnico

- ✅ Implementação do toggle de status de produto
- ✅ Correção da captura de resposta da API (response.data.data)
- ✅ Sanitização de CNPJ e telefone antes do envio para API
- ✅ Melhorias nas mensagens de erro
- ✅ Tratamento global de erros com Axios
- ✅ Correção do retorno HTTP ao excluir empresa com produtos vinculados

---

## 💻 Como Rodar o Projeto

### Backend

```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Estrutura do Projeto

```
supplier-product-management/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/    # Controllers da API
│   │   │   ├── Requests/       # Validações de formulários
│   │   │   └── Resources/      # Transformação de respostas
│   │   ├── Models/             # Modelos Eloquent
│   │   └── Services/           # Lógica de negócio
│   └── routes/
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas da aplicação
│   │   ├── services/           # Serviços de API
│   │   ├── lib/                # Configurações e utilitários
│   │   └── types/              # Tipos TypeScript
│   └── package.json
│
├── docs/                       # Documentação
└── README.md
```

---

## 📸 Interface do Sistema

![System Interface](docs/images/system-interface.png)

---

## 🔗 Endpoints da API

### Companies
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/companies` | Listar empresas |
| POST | `/api/companies` | Criar empresa |
| GET | `/api/companies/{id}` | Visualizar empresa |
| PUT | `/api/companies/{id}` | Atualizar empresa |
| DELETE | `/api/companies/{id}` | Excluir empresa |

### Products
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products` | Listar produtos |
| POST | `/api/products` | Criar produto |
| GET | `/api/products/{id}` | Visualizar produto |
| PUT | `/api/products/{id}` | Atualizar produto |
| PATCH | `/api/products/{id}/toggle` | Alternar status |
| DELETE | `/api/products/{id}` | Excluir produto |

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Autor:** Kaike Souza
