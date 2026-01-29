import { Building2, User, Landmark, Key, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CadastroProgressProps {
  etapaAtual: number;
  tipoPessoa?: "cpf" | "cnpj" | "";
}

const etapasCompletas = [
  { numero: 1, label: "Empresa", icon: Building2 },
  { numero: 2, label: "Responsável", icon: User },
  { numero: 3, label: "Licitação", icon: Landmark },
  { numero: 4, label: "Login", icon: Key },
  { numero: 5, label: "Revisão", icon: CheckCircle },
];

const CadastroProgress = ({ etapaAtual, tipoPessoa = "" }: CadastroProgressProps) => {
  // Filtrar etapas: se for CPF, remover etapa de Licitação (3)
  const etapas = tipoPessoa === "cpf" 
    ? etapasCompletas.filter(e => e.numero !== 3)
    : etapasCompletas;
  
  // Mapear etapa atual para visualização
  // Para CPF: etapa 4 (Login) vira visual 3, etapa 5 (Revisão) vira visual 4
  let etapaVisual = etapaAtual;
  if (tipoPessoa === "cpf") {
    if (etapaAtual === 4) etapaVisual = 3; // Login
    else if (etapaAtual === 5) etapaVisual = 4; // Revisão
  }
  
  const totalEtapas = etapas.length;
  const progresso = ((etapaVisual) / totalEtapas) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Barra de progresso */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Etapa {etapaVisual} de {totalEtapas} – {etapas[etapaVisual - 1]?.label || "Seleção"}</span>
          <span className="text-primary font-medium">{Math.round(progresso)}% concluído</span>
        </div>
        <div className="h-2 bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Etapas como pills/buttons - SEMPRE na mesma linha */}
      <div className="flex flex-nowrap justify-center items-center gap-1.5 md:gap-2 overflow-x-auto pb-2 -mx-2 px-2">
        {etapas.map((etapa, index) => {
          const Icon = etapa.icon;
          const numeroVisual = index + 1; // Número visual (1, 2, 3, 4 para CPF ou 1, 2, 3, 4, 5 para CNPJ)
          const isAtual = numeroVisual === etapaVisual;
          const isConcluida = numeroVisual < etapaVisual;
          const isPendente = numeroVisual > etapaVisual;

          return (
            <div
              key={etapa.numero}
              className={cn(
                "flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border transition-all whitespace-nowrap flex-shrink-0",
                isAtual && "bg-primary text-white border-primary font-medium",
                isConcluida && "bg-white border-primary/30 text-primary",
                isPendente && "bg-muted/50 border-border text-muted-foreground"
              )}
            >
              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{etapa.label}</span>
              {isConcluida && <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CadastroProgress;
