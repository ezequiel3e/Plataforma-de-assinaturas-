
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FileText, Users, Building, Check, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dados de exemplo para demonstração
const mockDocuments = [
  { id: 1, title: "Holerite Março/2025", status: "pending", date: "2025-03-30" },
  { id: 2, title: "Contrato de trabalho", status: "signed", date: "2025-02-15" },
  { id: 3, title: "Declaração de IRPF", status: "pending", date: "2025-03-25" }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [documents] = useState(mockDocuments);

  // Função para navegar para a página de documentos específica
  const goToDocument = (id: number) => {
    navigate(`/documents/${id}`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Documentos Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                +0% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Documentos Assinados</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +20% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Empresas</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 nova empresa este mês
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">
                +5 novos usuários este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <div>
          <h2 className="text-lg font-semibold tracking-tight mb-4">Documentos Recentes</h2>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 cursor-pointer"
                onClick={() => goToDocument(doc.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(doc.date).toLocaleDateString('pt-BR')}
                    </p>
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
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" onClick={() => navigate('/documents')}>
              Ver todos os documentos
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
