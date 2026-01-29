import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CadastroData } from "@/pages/Cadastro";
import { ArrowRight, ArrowLeft, FileText, RefreshCw } from "lucide-react";

interface EtapaServicoProps {
  dados: CadastroData;
  atualizarDados: (dados: Partial<CadastroData>) => void;
  onProximo: () => void;
  onAnterior: () => void;
}

const segmentos = [
  "Tecnologia da Informação",
  "Construção Civil",
  "Serviços de Limpeza",
  "Material de Escritório",
  "Equipamentos Hospitalares",
  "Alimentação e Bebidas",
  "Transporte e Logística",
  "Consultoria e Assessoria",
  "Manutenção Predial",
  "Outro",
];

const EtapaServico = ({ dados, atualizarDados, onProximo, onAnterior }: EtapaServicoProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validar = () => {
    const novosErros: Record<string, string> = {};
    
    if (!dados.tipoServico) {
      novosErros.tipoServico = "Selecione o tipo de serviço";
    }
    if (!dados.segmentoAtuacao) {
      novosErros.segmentoAtuacao = "Selecione o segmento de atuação";
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
      <h2 className="text-xl font-bold text-foreground mb-1">Tipo de Serviço</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Selecione o serviço desejado e informe sobre sua área de atuação
      </p>

      <div className="space-y-6">
        {/* Tipo de Serviço */}
        <div>
          <Label className="text-base font-semibold">Qual serviço você precisa? *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <button
              type="button"
              onClick={() => atualizarDados({ tipoServico: "novo" })}
              className={`p-4 border-2 text-left transition-all ${
                dados.tipoServico === "novo"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 ${dados.tipoServico === "novo" ? "bg-primary text-white" : "bg-muted"}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Novo Cadastro</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Primeira vez cadastrando no SICAF
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => atualizarDados({ tipoServico: "renovacao" })}
              className={`p-4 border-2 text-left transition-all ${
                dados.tipoServico === "renovacao"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 ${dados.tipoServico === "renovacao" ? "bg-primary text-white" : "bg-muted"}`}>
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Renovação</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Renovar cadastro existente no SICAF
                  </p>
                </div>
              </div>
            </button>
          </div>
          {errors.tipoServico && (
            <p className="text-destructive text-xs mt-2">{errors.tipoServico}</p>
          )}
        </div>

        {/* Segmento de Atuação */}
        <div>
          <Label className="text-base font-semibold">Segmento de Atuação *</Label>
          <p className="text-muted-foreground text-sm mb-3">
            Selecione a área principal de atuação da sua empresa
          </p>
          <RadioGroup
            value={dados.segmentoAtuacao}
            onValueChange={(value) => atualizarDados({ segmentoAtuacao: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {segmentos.map((segmento) => (
              <div key={segmento} className="flex items-center space-x-2">
                <RadioGroupItem value={segmento} id={segmento} />
                <Label htmlFor={segmento} className="font-normal cursor-pointer">
                  {segmento}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.segmentoAtuacao && (
            <p className="text-destructive text-xs mt-2">{errors.segmentoAtuacao}</p>
          )}
        </div>

        {/* Objetivo com licitações */}
        <div>
          <Label htmlFor="objetivoLicitacao">
            Objetivo com as Licitações <span className="text-muted-foreground">(opcional)</span>
          </Label>
          <Textarea
            id="objetivoLicitacao"
            placeholder="Descreva brevemente qual seu objetivo ao participar de licitações públicas..."
            value={dados.objetivoLicitacao}
            onChange={(e) => atualizarDados({ objetivoLicitacao: e.target.value })}
            className="mt-1"
            rows={3}
          />
          <p className="text-muted-foreground text-xs mt-1">
            Isso nos ajuda a entender melhor suas necessidades
          </p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onAnterior} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </Button>
        <Button onClick={handleProximo} className="gap-2">
          Próximo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EtapaServico;
