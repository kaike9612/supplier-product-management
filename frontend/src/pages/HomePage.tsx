import { Link } from 'react-router-dom';
import { Building2, Package, ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Gestão de Fornecedores e Produtos
        </h1>
        <p className="text-lg text-gray-600">
          Sistema para gerenciamento de empresas fornecedoras e seus produtos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/companies"
          className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-primary-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Empresas</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Gerencie as empresas fornecedoras, incluindo cadastro, edição e inativação.
          </p>
          <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
            Acessar <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>

        <Link
          to="/products"
          className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-primary-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Produtos</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Gerencie os produtos vinculados às empresas, incluindo cadastro, edição e exclusão.
          </p>
          <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
            Acessar <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
