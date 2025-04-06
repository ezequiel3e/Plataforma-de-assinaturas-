import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { generatePDF, downloadPDF } from '@/lib/pdf-service';
import { toast } from '@/hooks/use-toast';

interface DocumentPreviewProps {
  document: {
    title: string;
    date: string;
    company: string;
    type: string;
    content?: string;
    status: string;
  };
  showDetailedPreview?: boolean;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  document, 
  showDetailedPreview = true
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  const handleGenerateAndDownloadPDF = async () => {
    if (!previewRef.current) return;
    
    try {
      toast({
        title: "Gerando PDF",
        description: "Aguarde enquanto o PDF é gerado...",
      });
      
      const pdfDataUrl = await generatePDF(previewRef.current, {
        filename: `${document.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        scale: 2,
        quality: 2
      });
      
      downloadPDF(pdfDataUrl, `${document.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      toast({
        title: "PDF baixado com sucesso",
        description: "O documento foi salvo no seu dispositivo.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <h3 className="font-medium">{document.title}</h3>
        <Button variant="outline" size="sm" onClick={handleGenerateAndDownloadPDF}>
          Baixar como PDF
        </Button>
      </div>
      
      <div ref={previewRef} className="p-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold">{document.title}</h2>
          <p className="text-gray-600 text-sm">{new Date(document.date).toLocaleDateString('pt-BR')}</p>
        </div>
        
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
            <div><span className="font-medium">Empresa:</span> {document.company}</div>
            <div><span className="font-medium">Tipo:</span> {document.type}</div>
            <div><span className="font-medium">Data:</span> {new Date(document.date).toLocaleDateString('pt-BR')}</div>
            <div>
              <span className="font-medium">Status:</span>{' '}
              <span className={document.status === 'signed' ? 'text-green-600' : 'text-yellow-600'}>
                {document.status === 'signed' ? 'Assinado' : 'Pendente'}
              </span>
            </div>
          </div>
        </div>
        
        {document.type === "Holerite" && showDetailedPreview && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-700">Detalhes do Holerite</h3>
            <div className="border-t border-b py-3">
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div><span className="font-medium">Salário Base:</span> R$ 5.000,00</div>
                <div><span className="font-medium">Horas Extras:</span> R$ 500,00</div>
                <div><span className="font-medium">Vale Refeição:</span> R$ 600,00</div>
                <div><span className="font-medium">Vale Transporte:</span> R$ 200,00</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t">
                <div><span className="font-medium">INSS:</span> R$ 550,00</div>
                <div><span className="font-medium">IRRF:</span> R$ 650,00</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mt-4 font-semibold">
              <div>Total de Proventos: R$ 6.300,00</div>
              <div>Total de Descontos: R$ 1.200,00</div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-lg font-bold">Valor Líquido: R$ 5.100,00</span>
            </div>
          </div>
        )}
        
        {document.content && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-700">Conteúdo</h3>
            <div className="text-sm text-gray-700 whitespace-pre-line p-4 bg-gray-50 rounded border">
              {document.content}
            </div>
          </div>
        )}
        
        {document.status === 'signed' && (
          <div className="mt-8 pt-4 border-t">
            <div className="flex items-center justify-center text-green-600">
              <Check className="h-5 w-5 mr-2" />
              <span className="font-medium">Documento Assinado Digitalmente</span>
            </div>
            <p className="text-center text-xs text-gray-500 mt-1">
              Assinado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview; 