import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  X,
} from "lucide-react";

interface ModalBoletoProps {
  isOpen: boolean;
  onClose: () => void;
  urlBoleto: string;
}

const ModalBoleto = ({
  isOpen,
  onClose,
  urlBoleto,
}: ModalBoletoProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[60vw] w-[60vw] h-[80vh] max-h-[80vh] p-0 flex flex-col overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 z-50 h-10 w-10 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="bg-white w-full h-full overflow-hidden rounded-lg flex items-center justify-center">
          {urlBoleto ? (
            <iframe
              src={urlBoleto}
              className="w-full h-full border-0 rounded-lg"
              title="Visualização do Boleto"
              allow="payment"
            />
          ) : (
            <p className="text-gray-500">Boleto não disponível.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBoleto;
