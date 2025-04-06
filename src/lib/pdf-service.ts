import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface GeneratePDFOptions {
  filename: string;
  quality?: number;
  scale?: number;
  useCustomFont?: boolean;
}

/**
 * Gera um PDF a partir de um elemento HTML
 * @param element Elemento HTML a ser convertido para PDF
 * @param options Opções de configuração
 */
export const generatePDF = async (
  element: HTMLElement, 
  options: GeneratePDFOptions
): Promise<string> => {
  const { 
    filename, 
    quality = 2, 
    scale = 2,
    useCustomFont = false
  } = options;

  try {
    // Capturar o elemento como uma imagem
    const canvas = await html2canvas(element, {
      scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', quality);
    
    // Definir o formato do PDF baseado na proporção do elemento
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: imgHeight > pageHeight ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let position = 0;
    let heightLeft = imgHeight;

    // Adicionar a primeira página
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Adicionar páginas adicionais se necessário
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Salvar o PDF como um arquivo
    const pdfOutput = pdf.output('datauristring');
    return pdfOutput;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Não foi possível gerar o PDF');
  }
};

/**
 * Faz o download de um PDF
 * @param pdfData Dados do PDF (Data URI)
 * @param filename Nome do arquivo
 */
export const downloadPDF = (pdfData: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = pdfData;
  link.download = filename;
  link.click();
};

/**
 * Faz o download de um arquivo a partir de uma URL
 * @param url URL do arquivo
 * @param filename Nome do arquivo
 */
export const downloadFileFromURL = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    link.click();
    
    // Limpar o objeto URL
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
    throw new Error('Não foi possível baixar o arquivo');
  }
}; 