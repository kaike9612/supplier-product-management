import { Link, useLocation } from 'react-router-dom';
import { Building2, Package, Home } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-slate-800 tracking-tight">
              Gestão de Fornecedores
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              to="/"
              className={`nav-link ${
                isActive('/') && location.pathname === '/'
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              <Home className="h-4 w-4" />
              Início
            </Link>
            <Link
              to="/companies"
              className={`nav-link ${
                isActive('/companies')
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Empresas
            </Link>
            <Link
              to="/products"
              className={`nav-link ${
                isActive('/products')
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              <Package className="h-4 w-4" />
              Produtos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
