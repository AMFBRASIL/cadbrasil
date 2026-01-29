import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ModalProcessamentoProps {
  isOpen: boolean;
  onComplete: () => void;
}

const etapasProcessamento = [
  { id: 1, label: "Validando dados da empresa..." },
  { id: 2, label: "Verificando informações do responsável..." },
  { id: 3, label: "Preparando documentação..." },
  { id: 4, label: "Conectando ao Portal do Fornecedor..." },
];

const ModalProcessamento = ({ isOpen, onComplete }: ModalProcessamentoProps) => {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setEtapaAtual(0);
      setConcluido(false);
      setProgress(0);

      const timers: NodeJS.Timeout[] = [];

      // Animação da barra de progresso
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 80);

      // Avançar pelas etapas
      etapasProcessamento.forEach((_, index) => {
        const timer = setTimeout(() => {
          setEtapaAtual(index + 1);
        }, (index + 1) * 1000);
        timers.push(timer);
      });

      // Marcar como concluído
      const finalTimer = setTimeout(() => {
        setConcluido(true);
        setProgress(100);
      }, etapasProcessamento.length * 1000 + 500);
      timers.push(finalTimer);

      // Chamar onComplete
      const closeTimer = setTimeout(() => {
        onComplete();
      }, etapasProcessamento.length * 1000 + 1500);
      timers.push(closeTimer);

      return () => {
        timers.forEach(clearTimeout);
        clearInterval(progressInterval);
      };
    }
  }, [isOpen, onComplete]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center">
            {concluido ? "Tudo Pronto!" : "Processando Dados"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Ícone central */}
          <div className="flex justify-center mb-6">
            {concluido ? (
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            )}
          </div>

          {/* Barra de progresso */}
          <div className="mb-6 px-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              {progress}% concluído
            </p>
          </div>

          {/* Etapas de processamento */}
          <div className="space-y-2">
            {etapasProcessamento.map((etapa, index) => {
              const isCompleta = etapaAtual > index;
              const isAtual = etapaAtual === index + 1 && !concluido;

              return (
                <div
                  key={etapa.id}
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
                      <span className="text-[10px] font-medium">{etapa.id}</span>
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
                    {isCompleta ? etapa.label.replace("...", " ✓") : etapa.label}
                  </span>
                </div>
              );
            })}
          </div>

          {concluido && (
            <p className="text-center text-muted-foreground text-sm mt-6 animate-in fade-in duration-500 flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Abrindo Portal do Fornecedor...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalProcessamento;
