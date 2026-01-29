import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Percent, X, CheckCircle2 } from "lucide-react";

interface ModalDescontoProps {
  isOpen: boolean;
  onClose: () => void;
  onAplicarDesconto: () => void;
  valorOriginal: number;
  valorComDesconto: number;
  descontoPercentual: number;
}

const ModalDesconto = ({
  isOpen,
  onClose,
  onAplicarDesconto,
  valorOriginal,
  valorComDesconto,
  descontoPercentual,
}: ModalDescontoProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Percent className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold">
            Oferta Especial de Desconto!
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-2">
            Notamos que você ainda não finalizou o pagamento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-center text-gray-700 mb-3">
              <strong>Houve alguma dúvida sobre a adesão ao SICAF?</strong>
            </p>
            <p className="text-xs text-center text-gray-600 mb-4">
              Estamos aqui para ajudar! Oferecemos um desconto especial para facilitar sua adesão.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Valor Original</p>
              <p className="text-lg line-through text-gray-500 mb-1">
                R$ {valorOriginal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-green-600 font-semibold mb-2">
                Desconto de {descontoPercentual}%
              </p>
              <p className="text-2xl font-bold text-green-600 mb-1">
                R$ {valorComDesconto.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-600">
                Economia de R$ {(valorOriginal - valorComDesconto).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={onAplicarDesconto}
              className="w-full bg-green-600 text-white hover:bg-green-700 gap-2"
              size="lg"
            >
              <CheckCircle2 className="w-5 h-5" />
              Sim, quero aproveitar o desconto!
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full gap-2"
            >
              <X className="w-4 h-4" />
              Não, obrigado
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Esta oferta é válida apenas para este cadastro. Não perca esta oportunidade!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDesconto;
