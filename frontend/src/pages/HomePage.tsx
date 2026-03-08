import { Link } from 'react-router-dom';
import { Building2, Package, ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Premium Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg mb-5">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Gestão de Fornecedores <span className="text-gradient">e Produtos</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Sistema para gerenciamento de empresas fornecedoras e seus produtos com uma interface moderna e intuitiva.
        </p>
      </div>

      {/* Premium Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        <Link
          to="/companies"
          className="group card card-hover p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl text-primary-600">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Empresas</h2>
          </div>
          <p className="text-slate-600 mb-5 leading-relaxed">
            Gerencie as empresas fornecedoras, incluindo cadastro, edição e inativação.
          </p>
          <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
            <span>Acessar</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </div>
        </Link>

        <Link
          to="/products"
          className="group card card-hover p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl text-primary-600">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Produtos</h2>
          </div>
          <p className="text-slate-600 mb-5 leading-relaxed">
            Gerencie os produtos vinculados às empresas, incluindo cadastro, edição e exclusão.
          </p>
          <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
            <span>Acessar</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
