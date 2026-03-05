import { useState } from "react";
import { CadastroData } from "@/pages/Cadastro";
import { 
  CheckCircle, 
  Mail, 
  MessageCircle, 
  Phone,
  Upload,
  FileSearch,
  Award,
  Clock,
  Building2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Send,
  Info
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ModalProcessamento from "./ModalProcessamento";

interface CadastroSucessoProps {
  dados: CadastroData;
  protocolo: string;
  idPedido?: number | null; // Mantido para compatibilidade, mas não usado no momento
}

const CadastroSucesso = ({ dados, protocolo }: CadastroSucessoProps) => {
  const navigate = useNavigate();
  const dataAtual = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [showModalProcessamento, setShowModalProcessamento] = useState(false);

  const handleProcessamentoComplete = () => {
    setShowModalProcessamento(false);
    window.open("https://fornecedor.cadbr.com.br", "_blank");
  };

  // Navegar para a tela de credenciamento com os dados do cadastro
  const handleIrParaCredenciamento = () => {
    // Dados do credenciamento
    const dadosCredenciamento = {
      protocolo: protocolo,
      cnpj: dados.cnpj || "",
      razaoSocial: dados.razaoSocial || "",
      nomeFantasia: dados.nomeFantasia || "",
      email: dados.emailResponsavel || "",
      telefone: dados.telefoneResponsavel || "",
      responsavel: dados.nomeResponsavel || "",
      cpfResponsavel: dados.cpfResponsavel || "",
      endereco: dados.logradouro ? `${dados.logradouro}, ${dados.numero}` : "",
      cidade: dados.cidade || "",
      uf: dados.uf || "",
      cep: dados.cep || "",
      tipoServico: dados.tipoServico === "renovacao" ? "Renovação SICAF" : "Novo Cadastro SICAF",
      modalidadeLicitacao: dados.objetivoLicitacao || "",
      dataCriacao: dataAtual
    };

    // Salvar no sessionStorage como backup (caso usuário atualize a página)
    sessionStorage.setItem("dadosCredenciamento", JSON.stringify(dadosCredenciamento));

    // Navegar passando os dados via state (não aparece na URL)
    navigate("/credenciamento", { state: dadosCredenciamento });
  };

  return (
    <>
      <ModalProcessamento
        isOpen={showModalProcessamento}
        onComplete={handleProcessamentoComplete}
      />
    <section className="py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header - Protocolo SICAF Gerado */}
          <div className="bg-primary text-white p-6 mb-6 rounded-t-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/70 text-sm mb-1">Protocolo SICAF Gerado</p>
                <h1 className="text-2xl md:text-3xl font-bold tracking-wide">{protocolo}</h1>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm flex items-center gap-1 justify-end mb-2">
                  <Clock className="w-4 h-4" />
                  {dataAtual}
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-yellow-400 text-yellow-900 border border-yellow-500">
                  <span className="w-2 h-2 bg-yellow-900 rounded-full animate-pulse" />
                  Aguardando Documentação
                </span>
              </div>
            </div>

            {/* Dados da Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-white/70 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-white/70 text-xs mb-1">CNPJ</p>
                  <p className="font-medium break-words text-sm">{dados.cnpj}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-white/70 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-white/70 text-xs mb-1">Razão Social</p>
                  <p className="font-medium break-words overflow-wrap-anywhere text-sm">{dados.razaoSocial}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-white/70 text-xs mb-1">E-mail</p>
                  <p className="font-medium break-words overflow-wrap-anywhere text-sm">{dados.emailResponsavel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mensagem Principal - Você já concluiu a parte principal */}
          <div className="bg-green-50 border border-green-200 p-6 mb-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">
                  Você já concluiu a parte principal do processo.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Sua empresa já está apta a participar de licitações. Agora você precisa enviar a <strong>documentação obrigatória</strong> através do <strong>Portal do Fornecedor</strong>. Após o envio, nossa equipe analisará os documentos e dará andamento ao seu <strong>Cadastro SICAF Digital</strong> até a aprovação final.
                </p>
              </div>
            </div>
          </div>

          {/* Etapas do Processo */}
          <div className="bg-card border border-border mb-6 rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">Etapas do Processo</h2>
            </div>
            <div className="p-6">
              <div className="relative">
                {/* Linha conectora */}
                <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />

                <div className="space-y-6">
                  {/* Etapa 1 - Solicitação Recebida - Concluída */}
                  <div className="flex gap-4 relative">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-primary">Solicitação Recebida</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Concluído
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Etapa 2 - Envio de Documentação (habilitado) */}
                  <div className="relative">
                    <div className="bg-primary/5 border-2 border-primary/30 p-4 rounded-lg">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-primary/20">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground">Envio de Documentação</h4>
                              <p className="text-primary text-sm mt-1 flex items-center gap-1 font-medium">
                                Etapa atual - clique no botão abaixo para enviar seus documentos
                              </p>
                            </div>
                            <span className="text-xs bg-green-500 text-white px-3 py-1.5 font-medium rounded">
                              Em andamento
                            </span>
                          </div>
                          <Button
                            onClick={handleIrParaCredenciamento}
                            className="w-full bg-primary text-white hover:bg-primary/90 gap-2 shadow-lg hover:shadow-xl transition-all"
                            size="lg"
                          >
                            <Upload className="w-5 h-5" />
                            Enviar Documentação - Clique Aqui
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Etapa 4 - Análise de Documentos - Pendente */}
                  <div className="flex gap-4 relative opacity-60">
                    <div className="w-10 h-10 bg-muted text-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 z-10 border border-border">
                      <FileSearch className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="font-semibold text-muted-foreground">Análise de Documentos</h4>
                      <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Aguardando etapa anterior
                      </p>
                    </div>
                  </div>

                  {/* Etapa 5 - Aprovação Final no SICAF - Pendente */}
                  <div className="flex gap-4 relative opacity-60">
                    <div className="w-10 h-10 bg-muted text-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 z-10 border border-border">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="font-semibold text-muted-foreground">Aprovação Final no SICAF</h4>
                      <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Aguardando etapa anterior
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guia de Processamento e Pagamento removidos - fluxo simplificado */}

          {/* Aviso Importante */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-900 mb-1">Importante</p>
                <p className="text-sm text-yellow-800">
                  Para concluir seu cadastro SICAF, envie toda a documentação obrigatória através do Portal do Fornecedor.
                  Nossa equipe analisará os documentos e dará andamento ao processo.
                </p>
              </div>
            </div>
          </div>

          {/* Seção de Envio de Documentação - Sempre visível */}
          <div className="bg-card border border-border mb-6 rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">
                ENVIAR DOCUMENTAÇÃO SICAF
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Acesse o Portal do Fornecedor para enviar toda a documentação obrigatória e completar seu cadastro SICAF.
              </p>
              <Button
                onClick={handleIrParaCredenciamento}
                className="w-full bg-primary text-white hover:bg-primary/90 gap-2"
                size="lg"
              >
                <Upload className="w-5 h-5" />
                Enviar Documentação - Clique Aqui
              </Button>
            </div>
          </div>

          {/* Próximos Passos */}
          <div className="bg-card border border-border mb-6 rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">Próximos Passos</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Etapa 1 - Envio de Documentos */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-semibold text-foreground">Envio de Documentos</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Acesse o Portal do Fornecedor e faça o upload da documentação obrigatória.
                  </p>
                </div>

                {/* Etapa 2 - Análise Especializada */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <h4 className="font-semibold text-foreground">Análise Especializada</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe validará todos os documentos enviados.
                  </p>
                </div>

                {/* Etapa 3 - Cadastro Aprovado */}
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <h4 className="font-semibold text-foreground">Cadastro Aprovado</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Seu cadastro SICAF estará completo e ativo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dúvidas */}
          <div className="bg-blue-50 border border-blue-200 p-6 mb-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Dúvidas?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Entre em contato com nossa equipe pelo WhatsApp ou e-mail. Estamos prontos para ajudar no seu cadastro SICAF.
                </p>
                
                {/* Informativo sobre módulos da licença */}
                <div className="bg-white border border-blue-100 rounded-lg p-4 mt-4">
                  <p className="text-xs font-semibold text-foreground mb-3">
                    📦 Módulos incluídos na sua licença anual:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>Leitura de edital por IA</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>Gestor de contratos</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>Gestão de certidões</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>Conteúdo de licitações</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>Suporte digital</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>Acompanhamento do processo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botão voltar */}
          <div className="text-center">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default CadastroSucesso;
