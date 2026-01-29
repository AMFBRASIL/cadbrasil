import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ModalValidacaoProps {
  isOpen: boolean;
  onSubmit: () => Promise<{ protocolo: string }>;
  onComplete: (data: { protocolo: string }) => void;
  onError: () => void;
}

const etapasValidacao = [
  { id: 1, label: "Validando dados da empresa..." },
  { id: 2, label: "Verificando responsável legal..." },
  { id: 3, label: "Processando solicitação..." },
];

const ModalValidacao = ({ isOpen, onSubmit, onComplete, onError }: ModalValidacaoProps) => {
  const { toast } = useToast();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);
  const submitResultRef = useRef<{ protocolo: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setEtapaAtual(0);
    setConcluido(false);
    setSubmitOk(false);
    submitResultRef.current = null;

    let cancelled = false;
    const timers: NodeJS.Timeout[] = [];

    etapasValidacao.forEach((_, index) => {
      const t = setTimeout(() => !cancelled && setEtapaAtual(index + 1), (index + 1) * 1200);
      timers.push(t);
    });

    const doneTimer = setTimeout(() => {
      if (!cancelled) setConcluido(true);
    }, etapasValidacao.length * 1200 + 800);
    timers.push(doneTimer);

    const closeTimer = setTimeout(() => {
      if (cancelled) return;
      if (submitResultRef.current) onComplete(submitResultRef.current);
    }, etapasValidacao.length * 1200 + 1500);
    timers.push(closeTimer);

    onSubmit()
      .then((data) => {
        if (!cancelled) {
          submitResultRef.current = data;
          setSubmitOk(true);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        cancelled = true;
        timers.forEach(clearTimeout);
        toast({
          variant: "destructive",
          title: "Erro ao enviar cadastro",
          description: err?.message || "Tente novamente em instantes.",
        });
        onError();
      });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only when isOpen changes
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center">
            {concluido ? "Cadastro Enviado!" : "Validando Cadastro"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="flex justify-center mb-8">
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

          <div className="space-y-3">
            {etapasValidacao.map((etapa, index) => {
              const isCompleta = etapaAtual > index;
              const isAtual = etapaAtual === index + 1 && !concluido;

              return (
                <div
                  key={etapa.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                    isCompleta && "bg-primary/5",
                    isAtual && "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                      isCompleta && "bg-primary text-white",
                      isAtual && "bg-primary/20 text-primary",
                      !isCompleta && !isAtual && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleta ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : isAtual ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="text-xs font-medium">{etapa.id}</span>
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
            <p className="text-center text-muted-foreground text-sm mt-6 animate-in fade-in duration-500">
              Redirecionando para o protocolo...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalValidacao;
