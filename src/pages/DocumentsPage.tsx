import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Check, FileText, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dados de exemplo para demonstração
const mockDocuments = [
  { 
    id: 1, 
    title: "Holerite Março/2025", 
    status: "pending", 
    date: "2025-03-30",
    company: "Empresa A",
    type: "Holerite"
  },
  { 
    id: 2, 
    title: "Contrato de trabalho", 
    status: "signed", 
    date: "2025-02-15",
    company: "Empresa A",
    type: "Contrato"
  },
  { 
    id: 3, 
    title: "Declaração de IRPF", 
    status: "pending", 
    date: "2025-03-25",
    company: "Empresa B",
    type: "Declaração"
  },
  { 
    id: 4, 
    title: "Termo de Confidencialidade", 
    status: "signed", 
    date: "2025-01-10",
    company: "Empresa C",
    type: "Termo"
  },
  { 
    id: 5, 
    title: "Holerite Fevereiro/2025", 
    status: "signed", 
    date: "2025-02-28",
    company: "Empresa A",
    type: "Holerite"
  }
];

// Extrair empresas e tipos únicos dos documentos
const companies = [...new Set(mockDocuments.map(doc => doc.company))];
const documentTypes = [...new Set(mockDocuments.map(doc => doc.type))];

const DocumentsPage = () => {
  const navigate = useNavigate();
  const [documents] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateSort, setDateSort] = useState("desc");

  // Funções de filtro
  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
                         
      const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
      const matchesCompany = companyFilter === "all" || doc.company === companyFilter;
      const matchesType = typeFilter === "all" || doc.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesCompany && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateSort === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setStatusFilter("all");
    setCompanyFilter("all");
    setTypeFilter("all");
    setDateSort("desc");
    setSearchTerm("");
  };

  // Função para navegar para a página de documentos específica
  const goToDocument = (id: number) => {
    navigate(`/documents/${id}`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                Todos
              </Button>
              <Button 
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                size="sm"
              >
                <Clock className="h-4 w-4 mr-1" /> Pendentes
              </Button>
              <Button 
                variant={statusFilter === "signed" ? "default" : "outline"}
                onClick={() => setStatusFilter("signed")}
                size="sm"
              >
                <Check className="h-4 w-4 mr-1" /> Assinados
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar and Filters */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filtros</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <div className="p-2">
                  <label className="text-sm font-medium mb-1 block">Empresa</label>
                  <Select value={companyFilter} onValueChange={setCompanyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <div className="p-2">
                  <label className="text-sm font-medium mb-1 block">Tipo de Documento</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <div className="p-2">
                  <label className="text-sm font-medium mb-1 block">Ordenar por Data</label>
                  <Select value={dateSort} onValueChange={setDateSort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Mais recentes primeiro</SelectItem>
                      <SelectItem value="asc">Mais antigos primeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem 
                className="justify-center text-center cursor-pointer"
                onClick={clearFilters}
              >
                Limpar Filtros
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 cursor-pointer transition-all"
                onClick={() => goToDocument(doc.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{new Date(doc.date).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{doc.company}</span>
                      <span>•</span>
                      <span>{doc.type}</span>
                    </div>
                  </div>
                </div>
                <div>
                  {doc.status === 'signed' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" /> Assinado
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="h-3 w-3 mr-1" /> Pendente
                    </span>
                  )}
                </div>
              </div>
            ))
          ) :
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum documento encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros ou os termos de busca.
              </p>
            </div>
          }
        </div>
      </div>
    </AppLayout>
  );
};

export default DocumentsPage;
