import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CadastroData } from "@/pages/Cadastro";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";

interface EtapaLicitacaoProps {
  dados: CadastroData;
  atualizarDados: (dados: Partial<CadastroData>) => void;
  onProximo: () => void;
  onAnterior: () => void;
}

const modalidades = [
  { value: "pregao", label: "Pregão Eletrônico" },
  { value: "concorrencia", label: "Concorrência" },
  { value: "tomada", label: "Tomada de Preços" },
  { value: "convite", label: "Convite" },
  { value: "leilao", label: "Leilão" },
  { value: "todas", label: "Todas as modalidades" },
];

const portes = [
  {
    value: "mei",
    label: "MEI",
    description: "Microempreendedor Individual",
  },
  {
    value: "me",
    label: "ME",
    description: "Microempresa",
  },
  {
    value: "epp",
    label: "EPP",
    description: "Empresa de Pequeno Porte",
  },
  {
    value: "medio",
    label: "Médio Porte",
    description: "Empresa em crescimento",
  },
  {
    value: "grande",
    label: "Grande Porte",
    description: "Empresa de grande porte",
  },
];

const EtapaLicitacao = ({ dados, atualizarDados, onProximo, onAnterior }: EtapaLicitacaoProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validar = () => {
    const novosErros: Record<string, string> = {};
    
    if (!dados.segmentoAtuacao) {
      novosErros.segmentoAtuacao = "Selecione a modalidade de licitação";
    }
    if (!dados.objetivoLicitacao) {
      novosErros.objetivoLicitacao = "Selecione o porte da empresa";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleProximo = () => {
    if (validar()) {
      onProximo();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Dados para Licitação</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Informe os dados relacionados à participação em licitações
      </p>

      {/* Alerta informativo */}
      <div className="bg-primary/5 border border-primary/20 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Essas informações nos ajudam a preparar sua documentação de acordo com as 
            modalidades de licitação que você pretende participar.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Modalidade de Licitação */}
        <div>
          <Label className="text-sm font-medium">Modalidade de Licitação *</Label>
          <p className="text-muted-foreground text-xs mb-3">
            Selecione a modalidade principal de licitação que pretende participar
          </p>
          <Select
            value={dados.segmentoAtuacao}
            onValueChange={(value) => atualizarDados({ segmentoAtuacao: value })}
          >
            <SelectTrigger className={errors.segmentoAtuacao ? "border-destructive" : ""}>
              <SelectValue placeholder="Selecione a modalidade" />
            </SelectTrigger>
            <SelectContent>
              {modalidades.map((modalidade) => (
                <SelectItem key={modalidade.value} value={modalidade.value}>
                  {modalidade.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.segmentoAtuacao && (
            <p className="text-destructive text-xs mt-1">{errors.segmentoAtuacao}</p>
          )}
        </div>

        {/* Porte da Empresa */}
        <div>
          <Label className="text-sm font-medium">Porte da Empresa *</Label>
          <p className="text-muted-foreground text-xs mb-3">
            O porte determina benefícios especiais nas licitações (ME/EPP têm preferências)
          </p>
          <RadioGroup
            value={dados.objetivoLicitacao}
            onValueChange={(value) => atualizarDados({ objetivoLicitacao: value })}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
          >
            {portes.map((porte) => (
              <Label
                key={porte.value}
                htmlFor={porte.value}
                className={`relative flex min-h-[78px] flex-col justify-center rounded-md border p-2.5 transition-colors cursor-pointer ${
                  dados.objetivoLicitacao === porte.value
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
              >
                <RadioGroupItem value={porte.value} id={porte.value} className="absolute right-2 top-2 scale-90" />
                <span className="text-xs font-semibold text-foreground pr-6 leading-tight">{porte.label}</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{porte.description}</span>
              </Label>
            ))}
          </RadioGroup>
          {errors.objetivoLicitacao && (
            <p className="text-destructive text-xs mt-2">{errors.objetivoLicitacao}</p>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onAnterior} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button onClick={handleProximo} className="gap-2">
          Próximo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EtapaLicitacao;
