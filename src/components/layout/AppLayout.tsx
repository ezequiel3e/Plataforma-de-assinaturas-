
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  User,
  FileText,
  Building,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Implementação futura de logout
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar para Mobile */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">DocSign</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {renderNavLinks()}
          </nav>
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar para Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">DocSign</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-3 py-4 space-y-1">
              {renderNavLinks()}
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-white flex-shrink-0 h-16 border-b border-gray-200 flex px-4">
          <button
            type="button"
            className="lg:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1"></div>
          <div className="ml-4 flex items-center md:ml-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );

  function renderNavLinks() {
    return (
      <>
        <Link
          to="/dashboard"
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            isActive("/dashboard")
              ? "bg-gray-100 text-primary"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <FileText className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/documents"
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            isActive("/documents")
              ? "bg-gray-100 text-primary"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <FileText className="mr-3 h-5 w-5" />
          Documentos
        </Link>
        <Link
          to="/admin/users"
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            isActive("/admin/users")
              ? "bg-gray-100 text-primary"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Users className="mr-3 h-5 w-5" />
          Usuários
        </Link>
        <Link
          to="/admin/companies"
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            isActive("/admin/companies")
              ? "bg-gray-100 text-primary"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Building className="mr-3 h-5 w-5" />
          Empresas
        </Link>
        <Link
          to="/profile"
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            isActive("/profile")
              ? "bg-gray-100 text-primary"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <User className="mr-3 h-5 w-5" />
          Perfil
        </Link>
      </>
    );
  }
};

export default AppLayout;
