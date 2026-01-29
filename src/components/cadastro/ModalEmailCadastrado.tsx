import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, X } from "lucide-react";

interface ModalEmailCadastradoProps {
  isOpen: boolean;
  onClose: () => void;
  email: string | null;
  tipoDocumento: "cpf" | "cnpj" | "";
  onAcessarPlataforma: () => void;
}

const ModalEmailCadastrado = ({ 
  isOpen, 
  onClose, 
  email,
  tipoDocumento,
  onAcessarPlataforma 
}: ModalEmailCadastradoProps) => {
  const isCPF = tipoDocumento === "cpf";
  const isCNPJ = tipoDocumento === "cnpj";
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email Cadastrado
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              O email cadastrado para este {isCPF ? "CPF" : isCNPJ ? "CNPJ" : "documento"} é:
            </p>
            {email ? (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                <p className="text-lg font-semibold text-foreground break-all">
                  {email}
                </p>
              </div>
            ) : (
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground">
                  Email não encontrado no cadastro
                </p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Use este email para acessar a plataforma do fornecedor
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onAcessarPlataforma}
              className="w-full bg-primary text-white hover:bg-primary/90 gap-2"
              size="lg"
            >
              <CheckCircle className="w-5 h-5" />
              Acessar Plataforma Fornecedor
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full gap-2"
            >
              <X className="w-4 h-4" />
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEmailCadastrado;
