import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Check, Download, Eye, FileText } from "lucide-react";
import { generatePDF, downloadPDF, downloadFileFromURL } from "@/lib/pdf-service";
import DocumentPreview from "@/components/DocumentPreview";

// Dados de exemplo para documentos específicos
const mockDocumentDetails = {
  1: {
    id: 1,
    title: "Holerite Março/2025",
    status: "pending",
    date: "2025-03-30",
    company: "Empresa A",
    type: "Holerite",
    content: "Conteúdo do holerite de Março/2025...",
    previewUrl: "https://via.placeholder.com/800x1000/f3f4f6/000000?text=Holerite+Marco+2025",
    fileUrl: "/documents/holerite-marco-2025.pdf"
  },
  2: {
    id: 2,
    title: "Contrato de trabalho",
    status: "signed",
    date: "2025-02-15",
    company: "Empresa A",
    type: "Contrato",
    content: "Conteúdo do contrato de trabalho...",
    previewUrl: "https://via.placeholder.com/800x1000/f3f4f6/000000?text=Contrato+de+Trabalho",
    fileUrl: "/contrato-trabalho.pdf",
    signedAt: "2025-02-15T10:30:00"
  }
};

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numId = id ? parseInt(id) : 0;
  const documentRef = useRef<HTMLDivElement>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  
  // Verificar se o documento existe
  const documentExists = mockDocumentDetails[numId as keyof typeof mockDocumentDetails];
  if (!documentExists && numId !== 0) {
    navigate("/documents");
    return null;
  }

  const document = mockDocumentDetails[numId as keyof typeof mockDocumentDetails];
  
  const [showPreview, setShowPreview] = useState(false);
  const [signing, setSigning] = useState(false);
  const [documentStatus, setDocumentStatus] = useState(document.status);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Função para gerar PDF do documento
  const handleGeneratePDF = async () => {
    if (!documentRef.current) return;
    
    setPdfLoading(true);
    setPdfError(null);
    
    try {
      const pdfDataUrl = await generatePDF(documentRef.current, {
        filename: `${document.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        scale: 2,
        quality: 2
      });
      
      setPdfDataUrl(pdfDataUrl);
      
      toast({
        title: "PDF gerado com sucesso",
        description: "O PDF do documento foi gerado e está pronto para download.",
      });
    } catch (error) {
      setPdfError("Não foi possível gerar o PDF. Tente novamente.");
      toast({
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setPdfLoading(false);
    }
  };

  // Função para baixar o PDF
  const handleDownloadPDF = async () => {
    try {
      // Se já temos o PDF gerado, usamos ele
      if (pdfDataUrl) {
        downloadPDF(pdfDataUrl, `${document.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        toast({
          title: "Download iniciado",
          description: "O documento está sendo baixado.",
        });
        return;
      }
      
      // Caso contrário, baixamos da URL do arquivo
      await downloadFileFromURL(
        document.fileUrl, 
        `${document.title.toLowerCase().replace(/\s+/g, '-')}.pdf`
      );
      
      toast({
        title: "Download iniciado",
        description: "O documento está sendo baixado.",
      });
    } catch (error) {
      toast({
        title: "Erro ao baixar",
        description: "Não foi possível baixar o documento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleSign = async () => {
    setSigning(true);
    
    try {
      // Simulação de assinatura - em uma implementação real este seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDocumentStatus("signed");
      
      // Gerar PDF após a assinatura
      await handleGeneratePDF();
      
      toast({
        title: "Documento assinado",
        description: "O documento foi assinado com sucesso e está pronto para download.",
      });
    } catch (error) {
      toast({
        title: "Erro ao assinar",
        description: "Não foi possível assinar o documento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setSigning(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
              <span>{new Date(document.date).toLocaleDateString('pt-BR')}</span>
              <span>•</span>
              <span>{document.company}</span>
              <span>•</span>
              <span>{document.type}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" /> Visualizar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>{document.title}</DialogTitle>
                  <DialogDescription>
                    Visualize o documento antes de assiná-lo.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-auto my-6 border rounded-md">
                  {/* Usar iframe para visualizar o PDF quando disponível */}
                  {pdfDataUrl ? (
                    <iframe 
                      src={pdfDataUrl} 
                      className="w-full h-full min-h-[500px]" 
                      title="Visualização do documento"
                    />
                  ) : (
                    <div className="p-4">
                      <DocumentPreview 
                        document={{
                          ...document,
                          status: documentStatus
                        }}
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  {documentStatus === "pending" && (
                    <Button onClick={handleSign} disabled={signing}>
                      {signing ? "Assinando..." : "Assinar Documento"}
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleDownloadPDF} disabled={pdfLoading}>
                    <Download className="h-4 w-4 mr-2" /> Baixar PDF
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {documentStatus === "pending" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="flex items-center">
                    <Check className="h-4 w-4 mr-2" /> Assinar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar assinatura</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você está prestes a assinar digitalmente "{document.title}". Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction disabled={signing} onClick={handleSign}>
                      {signing ? "Assinando..." : "Confirmar Assinatura"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button 
                className="flex items-center"
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
              >
                <Download className="h-4 w-4 mr-2" /> 
                {pdfLoading ? "Gerando PDF..." : "Baixar"}
              </Button>
            )}
          </div>
        </div>
        
        {/* Document Status */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
              documentStatus === "signed" ? "bg-green-100" : "bg-yellow-100"
            }`}>
              {documentStatus === "signed" ? (
                <Check className="h-6 w-6 text-green-600" />
              ) : (
                <FileText className="h-6 w-6 text-yellow-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium">
                {documentStatus === "signed" ? "Documento Assinado" : "Documento Pendente"}
              </h3>
              <p className="text-sm text-gray-500">
                {documentStatus === "signed" 
                  ? `Assinado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`
                  : "Este documento está aguardando sua assinatura."}
              </p>
            </div>
          </div>
        </div>
        
        {/* Document Preview */}
        <div ref={documentRef} className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Visualização do Documento</h2>
            <Button 
              variant="ghost" 
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
          
          {showPreview && (
            <DocumentPreview 
              document={{
                ...document,
                status: documentStatus
              }}
            />
          )}
        </div>
        
        {/* Document History */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <h2 className="font-semibold text-lg mb-4">Histórico de Ações</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Documento criado</h3>
                <p className="text-xs text-gray-500">
                  {new Date(document.date).toLocaleDateString('pt-BR')} às 10:00
                </p>
              </div>
            </div>
            
            {documentStatus === "signed" && (
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Documento assinado</h3>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DocumentView;
