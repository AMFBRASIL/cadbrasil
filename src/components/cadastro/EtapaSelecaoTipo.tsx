import { Button } from "@/components/ui/button";
import { CadastroData } from "@/pages/Cadastro";
import { FileText, RefreshCw, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface EtapaSelecaoTipoProps {
  dados: CadastroData;
  atualizarDados: (dados: Partial<CadastroData>) => void;
  onProximo: () => void;
}

const EtapaSelecaoTipo = ({ dados, atualizarDados, onProximo }: EtapaSelecaoTipoProps) => {
  const handleSelect = (tipo: "novo" | "renovacao") => {
    atualizarDados({ tipoServico: tipo });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Selecione o Tipo de Cadastro</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Escolha a opção que melhor se aplica à sua empresa
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Novo Cadastro */}
        <button
          type="button"
          onClick={() => handleSelect("novo")}
          className={`relative p-6 border-2 text-left transition-all group hover:shadow-lg ${
            dados.tipoServico === "novo"
              ? "border-primary bg-primary/10 shadow-md"
              : "border-border bg-primary/5 hover:border-primary/50"
          }`}
        >
          {/* Indicador de seleção */}
          {dados.tipoServico === "novo" && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          <div className={`w-14 h-14 flex items-center justify-center mb-4 ${
            dados.tipoServico === "novo" ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          } transition-colors`}>
            <FileText className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2">Novo Cadastro SICAF</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Para empresas que nunca foram cadastradas no SICAF e desejam participar de licitações públicas federais.
          </p>

          <div className="mt-4 pt-4 border-t border-border">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Primeira habilitação no sistema
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Documentação completa
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Assessoria especializada
              </li>
            </ul>
          </div>
        </button>

        {/* Card Renovação */}
        <button
          type="button"
          onClick={() => handleSelect("renovacao")}
          className={`relative p-6 border-2 text-left transition-all group hover:shadow-lg ${
            dados.tipoServico === "renovacao"
              ? "border-primary bg-primary/10 shadow-md"
              : "border-border bg-primary/5 hover:border-primary/50"
          }`}
        >
          {/* Indicador de seleção */}
          {dados.tipoServico === "renovacao" && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          <div className={`w-14 h-14 flex items-center justify-center mb-4 ${
            dados.tipoServico === "renovacao" ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          } transition-colors`}>
            <RefreshCw className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2">Renovação SICAF</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Para empresas que já possuem cadastro no SICAF e precisam atualizar ou renovar sua habilitação.
          </p>

          <div className="mt-4 pt-4 border-t border-border">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Atualização de documentos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Regularização de pendências
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Renovação de certidões
              </li>
            </ul>
          </div>
        </button>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-8">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Cancelar
          </Button>
        </Link>
        <Button 
          onClick={onProximo} 
          className="gap-2"
          disabled={!dados.tipoServico}
        >
          Próximo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EtapaSelecaoTipo;
