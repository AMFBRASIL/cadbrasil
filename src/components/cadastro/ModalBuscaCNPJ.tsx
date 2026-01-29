import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface ModalBuscaCNPJProps {
  isOpen: boolean;
}

const ModalBuscaCNPJ = ({ isOpen }: ModalBuscaCNPJProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-md [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            Consultando CNPJ
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Buscando dados na Receita Federal...
          </p>
          <p className="text-xs text-muted-foreground text-center max-w-[280px]">
            Aguarde enquanto consultamos os dados da empresa. O modal será fechado automaticamente quando a busca terminar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBuscaCNPJ;
