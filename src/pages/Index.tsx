import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Building, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="relative bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-primary">DocSign</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#features" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Funcionalidades
              </a>
              <a href="#benefits" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Benefícios
              </a>
            </div>
            <div>
              <Button 
                onClick={() => navigate('/login')}
                className="ml-4"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-32">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6 text-center lg:text-left md:max-w-2xl md:mx-auto lg:mx-0 pt-8 lg:pt-24">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500">Docusign</span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900">Assine documentos</span>
                    <span className="block text-primary">de forma segura e rápida</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Uma plataforma moderna para gestão e assinatura de documentos, com foco na experiência do usuário e segurança de dados.
                </p>
                <div className="mt-8 sm:mt-12">
                  <Button 
                    className="w-full sm:w-auto text-lg px-8 py-4 h-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => navigate('/login')}
                  >
                    {isHovered ? "Começar agora" : "Experimente grátis"}
                  </Button>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-6">
                <div className="px-4 sm:px-0">
                  <img
                    className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                    alt="Dashboard da plataforma"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Funcionalidades completas para sua empresa
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Tudo o que você precisa para gerenciar documentos e assinaturas em um só lugar.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Assinatura Digital</h3>
              <p className="mt-2 text-gray-500">
                Assine documentos digitalmente com segurança e validade jurídica.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Gestão de Empresas</h3>
              <p className="mt-2 text-gray-500">
                Organize documentos por empresa e filial para fácil acesso.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Controle de Usuários</h3>
              <p className="mt-2 text-gray-500">
                Defina permissões e papéis para cada usuário da plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div id="benefits" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Benefícios da nossa plataforma
            </h2>
          </div>

          <div className="mt-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Redução de custos</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Elimine custos com impressão, armazenamento e envio de documentos físicos.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Agilidade nos processos</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Reduza o tempo de assinatura de documentos de dias para minutos.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Segurança garantida</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Proteção de dados com criptografia e autenticação em múltiplos níveis.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Acesso de qualquer lugar</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Acesse seus documentos a qualquer hora, em qualquer dispositivo, de qualquer lugar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2025 DocSign. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
