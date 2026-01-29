import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CadastroData } from "@/pages/Cadastro";
import { 
  ArrowLeft, 
  Send, 
  Building2, 
  User, 
  Landmark,
  Key,
  CheckCircle
} from "lucide-react";
import ModalValidacao from "./ModalValidacao";
import ModalTermosUso from "./ModalTermosUso";
import ModalPoliticaPrivacidade from "./ModalPoliticaPrivacidade";

interface EtapaRevisaoProps {
  dados: CadastroData;
  onAnterior: () => void;
  onFinalizar: (protocolo: string) => void;
  onSubmit: () => Promise<{ protocolo: string }>;
}

const EtapaRevisao = ({ dados, onAnterior, onFinalizar, onSubmit }: EtapaRevisaoProps) => {
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTermos, setShowTermos] = useState(false);
  const [showPrivacidade, setShowPrivacidade] = useState(false);

  const handleFinalizar = () => {
    if (!aceitoTermos) {
      setError("Você precisa aceitar os termos para continuar");
      return;
    }

    setError("");
    setShowModal(true);
  };

  const handleValidacaoCompleta = (data: { protocolo: string }) => {
    setShowModal(false);
    onFinalizar(data.protocolo);
  };

  const handleValidacaoErro = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Revisão do Cadastro</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Confira todos os dados antes de enviar
      </p>

      <div className="space-y-4">
        {/* Dados da Empresa */}
        <div className="border border-border">
          <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Dados da Empresa</h3>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">CNPJ:</span>
              <span className="text-foreground font-medium">{dados.cnpj || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Razão Social:</span>
              <span className="text-foreground">{dados.razaoSocial || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cidade/UF:</span>
              <span className="text-foreground">{dados.cidade && dados.uf ? `${dados.cidade}/${dados.uf}` : "-"}</span>
            </div>
          </div>
        </div>

        {/* Responsável Legal */}
        <div className="border border-border">
          <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Responsável Legal</h3>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome:</span>
              <span className="text-foreground">{dados.nomeResponsavel || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cargo / Função:</span>
              <span className="text-foreground">{dados.cargoResponsavel || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">E-mail:</span>
              <span className="text-foreground">{dados.emailResponsavel || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telefone:</span>
              <span className="text-foreground">{dados.telefoneResponsavel || "-"}</span>
            </div>
          </div>
        </div>

        {/* Dados para Licitação */}
        {/* Dados para Licitação - só aparece para CNPJ */}
        {dados.tipoPessoa === "cnpj" && (
          <div className="border border-border">
            <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
              <Landmark className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Dados para Licitação</h3>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modalidade:</span>
                <span className="text-foreground">{dados.segmentoAtuacao || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Porte:</span>
                <span className="text-foreground">{dados.objetivoLicitacao || "-"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Dados de Acesso */}
        <div className="border border-border">
          <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Dados de Acesso</h3>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email de Acesso:</span>
              <span className="text-foreground">{dados.emailAcesso || dados.emailResponsavel || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Notificações:</span>
              <span className="text-primary font-medium">{dados.aceitaNotificacoes ? "Sim" : "Não"}</span>
            </div>
          </div>
        </div>

        {/* Termos */}
        <div className="pt-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="termos"
              checked={aceitoTermos}
              onCheckedChange={(checked) => {
                setAceitoTermos(checked as boolean);
                if (checked) setError("");
              }}
            />
            <Label htmlFor="termos" className="text-sm font-normal leading-relaxed cursor-pointer">
              Declaro que li e aceito os{" "}
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); setShowTermos(true); }}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                termos de uso
              </button>
              {" "}e{" "}
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); setShowPrivacidade(true); }}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                política de privacidade
              </button>
              . Tenho ciência de que este é um serviço privado de assessoria.
            </Label>
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onAnterior} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button onClick={handleFinalizar} className="gap-2">
          Enviar Cadastro
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Modal de Validação */}
      <ModalValidacao
        isOpen={showModal}
        onSubmit={onSubmit}
        onComplete={handleValidacaoCompleta}
        onError={handleValidacaoErro}
      />

      {/* Modais de Termos e Privacidade */}
      <ModalTermosUso isOpen={showTermos} onClose={() => setShowTermos(false)} />
      <ModalPoliticaPrivacidade isOpen={showPrivacidade} onClose={() => setShowPrivacidade(false)} />
    </div>
  );
};

export default EtapaRevisao;
