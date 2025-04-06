import { useEffect, useRef, useState } from "react";
import SignaturePad from "signature_pad";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureData: string) => void;
}

export function SignatureModal({ isOpen, onClose, onSave }: SignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      canvas.getContext("2d")?.scale(2, 2);
      
      signaturePadRef.current = new SignaturePad(canvas, {
        backgroundColor: "rgb(255, 255, 255)",
        penColor: "rgb(0, 0, 0)",
      });

      signaturePadRef.current.addEventListener("beginStroke", () => {
        setIsEmpty(false);
      });

      return () => {
        if (signaturePadRef.current) {
          signaturePadRef.current.off();
        }
      };
    }
  }, [isOpen]);

  const handleSave = () => {
    if (signaturePadRef.current && !isEmpty) {
      const signatureData = signaturePadRef.current.toDataURL();
      onSave(signatureData);
      handleClear();
      onClose();
    }
  };

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setIsEmpty(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assinatura Digital</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="border rounded-lg p-2 w-full bg-white">
            <canvas
              ref={canvasRef}
              className="w-full h-[200px] border rounded touch-none"
              style={{ touchAction: "none" }}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClear}>
              Limpar
            </Button>
            <Button onClick={handleSave} disabled={isEmpty}>
              Salvar Assinatura
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 