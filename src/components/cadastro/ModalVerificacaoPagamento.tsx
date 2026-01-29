import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Loader2, 
  XCircle,
  AlertCircle,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalVerificacaoPagamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmado: () => void;
  onNaoPago: () => void;
  verificarPagamento: () => Promise<{ success: boolean; pago?: boolean; mensagem?: string }>;
}

type StatusVerificacao = "processando" | "pago" | "naoPago" | "erro";

const ModalVerificacaoPagamento = ({
  isOpen,
  onClose,
  onConfirmado,
  onNaoPago,
  verificarPagamento,
}: ModalVerificacaoPagamentoProps) => {
  const [status, setStatus] = useState<StatusVerificacao>("processando");
  const [mensagem, setMensagem] = useState<string>("");
  const [etapaAtual, setEtapaAtual] = useState(0);

  const etapas = [
    "Conectando ao sistema externo...",
    "Verificando status do pagamento...",
    "Validando transação PIX...",
    "Confirmando recebimento...",
  ];

  useEffect(() => {
    if (isOpen) {
      setStatus("processando");
      setEtapaAtual(0);
      setMensagem("");

      // Simular progresso das etapas
      const intervalos = etapas.map((_, index) => {
        return setTimeout(() => {
          setEtapaAtual(index + 1);
        }, (index + 1) * 1000);
      });

      // Verificação real via Gerencianet (pixDetailCharge por txid)
      const timerVerificacao = setTimeout(async () => {
        try {
          const resultado = await verificarPagamento();
          
          if (resultado.success && resultado.pago) {
            setStatus("pago");
            setMensagem(resultado.mensagem || "Pagamento confirmado com sucesso!");
            
            // Após 2 segundos, chamar callback de confirmação
            setTimeout(() => {
              onConfirmado();
            }, 2000);
          } else {
            setStatus("naoPago");
            setMensagem(resultado.mensagem || "O pagamento ainda não foi identificado no sistema. Aguarde alguns minutos e tente novamente.");
          }
        } catch (error) {
          setStatus("erro");
          setMensagem(error instanceof Error ? error.message : "Ocorreu um erro ao verificar o pagamento. Tente novamente.");
        }
      }, etapas.length * 1000 + 500);

      return () => {
        intervalos.forEach(clearTimeout);
        clearTimeout(timerVerificacao);
      };
    }
  }, [isOpen, verificarPagamento, onConfirmado]);

  const handleFechar = () => {
    if (status === "naoPago" || status === "erro") {
      onClose();
      onNaoPago();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleFechar(); }}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => {
        if (status === "processando") {
          e.preventDefault();
        }
      }}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {status === "processando" && "Verificando Pagamento"}
            {status === "pago" && "Pagamento Confirmado!"}
            {status === "naoPago" && "Pagamento Não Encontrado"}
            {status === "erro" && "Erro na Verificação"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Ícone central */}
          <div className="flex justify-center mb-6">
            {status === "processando" && (
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            )}
            {status === "pago" && (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            )}
            {(status === "naoPago" || status === "erro") && (
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {status === "naoPago" ? (
                  <AlertCircle className="w-12 h-12 text-yellow-600" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-600" />
                )}
              </div>
            )}
          </div>

          {/* Etapas de processamento */}
          {status === "processando" && (
            <div className="space-y-2 mb-6">
              {etapas.map((etapa, index) => {
                const isCompleta = etapaAtual > index;
                const isAtual = etapaAtual === index + 1;

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300",
                      isCompleta && "bg-primary/5",
                      isAtual && "bg-muted"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
                        isCompleta && "bg-primary text-white",
                        isAtual && "bg-primary/20 text-primary",
                        !isCompleta && !isAtual && "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleta ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : isAtual ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <span className="text-[10px] font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm transition-colors duration-300",
                        isCompleta && "text-primary font-medium",
                        isAtual && "text-foreground",
                        !isCompleta && !isAtual && "text-muted-foreground"
                      )}
                    >
                      {isCompleta ? etapa.replace("...", " ✓") : etapa}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mensagem de resultado */}
          {(status === "pago" || status === "naoPago" || status === "erro") && (
            <div className="text-center mb-6">
              <p className={cn(
                "text-base mb-2",
                status === "pago" && "text-green-700 font-semibold",
                status === "naoPago" && "text-yellow-700 font-semibold",
                status === "erro" && "text-red-700 font-semibold"
              )}>
                {mensagem}
              </p>
              {status === "pago" && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Liberando acesso ao Portal do Fornecedor...</span>
                </div>
              )}
            </div>
          )}

          {/* Botões de ação */}
          {(status === "naoPago" || status === "erro") && (
            <div className="flex gap-3">
              <Button
                onClick={handleFechar}
                variant="outline"
                className="flex-1"
              >
                Fechar
              </Button>
              {status === "naoPago" && (
                <Button
                  onClick={() => {
                    setStatus("processando");
                    setEtapaAtual(0);
                    // Tentar novamente
                    setTimeout(async () => {
                      try {
                        const resultado = await verificarPagamento();
                        if (resultado.success && resultado.pago) {
                          setStatus("pago");
                          setMensagem(resultado.mensagem || "Pagamento confirmado com sucesso!");
                          setTimeout(() => {
                            onConfirmado();
                          }, 2000);
                        } else {
                          setStatus("naoPago");
                          setMensagem(resultado.mensagem || "O pagamento ainda não foi identificado no sistema.");
                        }
                      } catch (error) {
                        setStatus("erro");
                        setMensagem(error instanceof Error ? error.message : "Erro ao verificar pagamento.");
                      }
                    }, 2000);
                  }}
                  className="flex-1 bg-primary text-white hover:bg-primary/90"
                >
                  Tentar Novamente
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalVerificacaoPagamento;
