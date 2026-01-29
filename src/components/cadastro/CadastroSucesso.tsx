import { useState, useRef, useEffect } from "react";
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
  ArrowLeft,
  Building2,
  Lock,
  ArrowRight,
  Send,
  FileText,
  User,
  Info,
  Percent
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ModalProcessamento from "./ModalProcessamento";
import ModalDesconto from "./ModalDesconto";
import EtapaPagamento from "./EtapaPagamento";

interface CadastroSucessoProps {
  dados: CadastroData;
  protocolo: string;
  idPedido: number | null;
}

const CadastroSucesso = ({ dados, protocolo, idPedido }: CadastroSucessoProps) => {
  const dataAtual = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [showModalProcessamento, setShowModalProcessamento] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [showModalDesconto, setShowModalDesconto] = useState(false);
  const [valorComDesconto, setValorComDesconto] = useState<number | null>(null);
  const [tempoGuiaGerada, setTempoGuiaGerada] = useState<number | null>(null);
  const pagamentoRef = useRef<HTMLDivElement>(null);
  
  const valorOriginal = 985.00;
  const descontoPercentual = 10;
  const valorDesconto = valorOriginal * (descontoPercentual / 100);
  const valorFinalComDesconto = valorOriginal - valorDesconto;

  // Vencimento em YYYY-MM-DD (30 dias a partir de hoje) — formato da API Gerencianet
  const calcularVencimento = () => {
    const data = new Date();
    data.setDate(data.getDate() + 30);
    const y = data.getFullYear();
    const m = String(data.getMonth() + 1).padStart(2, "0");
    const d = String(data.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Exibição pt-BR (dd/mm/yyyy) a partir de YYYY-MM-DD
  const formatarVencimentoDisplay = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const handleEnviarDocumentacao = () => {
    setShowModalProcessamento(true);
  };

  const handleProcessamentoComplete = () => {
    setShowModalProcessamento(false);
    window.location.href = "https://fornecedor.cadbr.com.br";
  };

  const handlePagamentoConfirmado = () => {
    setPagamentoConfirmado(true);
    setMostrarPagamento(false);
  };

  const handleGerarGuiaPagamento = () => {
    setMostrarPagamento(true);
    // Registrar o tempo em que a guia foi gerada (1 minuto e meio = 90000ms)
    setTempoGuiaGerada(Date.now());
    // Scroll automático para a seção de pagamento após um pequeno delay
    setTimeout(() => {
      pagamentoRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleAplicarDesconto = () => {
    setValorComDesconto(valorFinalComDesconto);
    setShowModalDesconto(false);
    // Scroll para a seção de pagamento para mostrar o novo valor
    setTimeout(() => {
      pagamentoRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleFecharModalDesconto = () => {
    setShowModalDesconto(false);
    // Quando fechar sem aplicar desconto, permitir sair normalmente
    // Removendo o listener de beforeunload temporariamente
  };

  // Scroll automático quando mostrarPagamento muda para true
  useEffect(() => {
    if (mostrarPagamento && pagamentoRef.current) {
      setTimeout(() => {
        pagamentoRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [mostrarPagamento]);

  // Estado para controlar se já passou 1 minuto e meio e pode mostrar o modal
  const [podeMostrarModalDesconto, setPodeMostrarModalDesconto] = useState(false);

  // Timer: após 1 minuto e meio de gerar a guia, permitir mostrar o modal ao tentar sair
  useEffect(() => {
    if (!tempoGuiaGerada || pagamentoConfirmado) return;

    const timer = setTimeout(() => {
      setPodeMostrarModalDesconto(true);
    }, 1.5 * 60 * 1000); // 1 minuto e meio (90 segundos)

    return () => clearTimeout(timer);
  }, [tempoGuiaGerada, pagamentoConfirmado]);

  // Estado para controlar se já mostrou o modal (para não mostrar repetidamente)
  const [modalDescontoJaMostrado, setModalDescontoJaMostrado] = useState(false);

  // Detectar tentativa de sair da página após 1 minuto e meio de gerar a guia
  useEffect(() => {
    if (!podeMostrarModalDesconto || pagamentoConfirmado || showModalDesconto || modalDescontoJaMostrado) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Se pode mostrar o modal e ainda não mostrou, prevenir saída e marcar para mostrar
      if (podeMostrarModalDesconto && !modalDescontoJaMostrado) {
        e.preventDefault();
        e.returnValue = '';
        setModalDescontoJaMostrado(true);
        setShowModalDesconto(true);
        return '';
      }
    };

    const handleVisibilityChange = () => {
      // Se a página está sendo ocultada (usuário mudando de aba ou fechando)
      if (document.hidden && podeMostrarModalDesconto && !showModalDesconto && !modalDescontoJaMostrado) {
        setModalDescontoJaMostrado(true);
        setShowModalDesconto(true);
      }
    };

    // Detectar quando o mouse sai da janela (tentativa de fechar)
    const handleMouseLeave = (e: MouseEvent) => {
      // Se o mouse saiu pela parte superior da janela (provavelmente tentando fechar)
      if (e.clientY < 0 && podeMostrarModalDesconto && !showModalDesconto && !modalDescontoJaMostrado) {
        setModalDescontoJaMostrado(true);
        setShowModalDesconto(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [podeMostrarModalDesconto, pagamentoConfirmado, showModalDesconto, modalDescontoJaMostrado]);

  return (
    <>
      <ModalProcessamento
        isOpen={showModalProcessamento}
        onComplete={handleProcessamentoComplete}
      />
      <ModalDesconto
        isOpen={showModalDesconto}
        onClose={handleFecharModalDesconto}
        onAplicarDesconto={handleAplicarDesconto}
        valorOriginal={valorOriginal}
        valorComDesconto={valorFinalComDesconto}
        descontoPercentual={descontoPercentual}
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
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded ${
                  pagamentoConfirmado 
                    ? "bg-green-500 text-white border border-green-600" 
                    : "bg-yellow-400 text-yellow-900 border border-yellow-500"
                }`}>
                  {pagamentoConfirmado ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Pagamento Concluído
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-yellow-900 rounded-full animate-pulse" />
                      Aguardando Pagamento
                    </>
                  )}
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
                  Sua empresa já está apta a participar de licitações, restando apenas a confirmação da Guia de <strong>Pagamento</strong> para que possamos liberar o <strong>Cadastro SICAF Digital</strong> através do portal CadBrasil. Após a confirmação do pagamento, você terá acesso ao <strong>Portal do Fornecedor</strong>, onde poderá enviar toda a documentação obrigatória e acompanhar o status do seu cadastro até a aprovação final no SICAF.
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

                  {/* Etapa 2 - Pagamento da Taxa Anual CADBRASIL */}
                  {pagamentoConfirmado ? (
                    <div className="flex gap-4 relative">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 z-10">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1 pt-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-primary">Pagamento da Taxa Anual CADBRASIL</h4>
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Concluída e Paga
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="bg-primary/5 border-2 border-primary/30 p-4 rounded-lg">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-primary/20">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                              <div>
                                <h4 className="font-semibold text-foreground">Pagamento da Taxa Anual CADBRASIL</h4>
                                <p className="text-primary text-sm mt-1 flex items-center gap-1 font-medium">
                                  Etapa atual - clique no botão abaixo para gerar guia de pagamento
                                </p>
                              </div>
                              <span className="text-xs bg-green-500 text-white px-3 py-1.5 font-medium rounded">
                                Em andamento
                              </span>
                            </div>
                            <Button
                              onClick={handleGerarGuiaPagamento}
                              className="w-full bg-primary text-white hover:bg-primary/90 gap-2 shadow-lg hover:shadow-xl transition-all"
                              size="lg"
                            >
                              <FileText className="w-5 h-5" />
                              Gerar Guia de Pagamento
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Etapa 3 - Envio de Documentação */}
                  <div className={`flex gap-4 relative ${pagamentoConfirmado ? "" : "opacity-60"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      pagamentoConfirmado ? "bg-primary text-white" : "bg-muted text-muted-foreground border border-border"
                    }`}>
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className={`font-semibold ${pagamentoConfirmado ? "text-primary" : "text-muted-foreground"}`}>
                        Envio de Documentação
                      </h4>
                      <p className={`text-sm mt-1 flex items-center gap-1 ${
                        pagamentoConfirmado ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {pagamentoConfirmado ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-primary" />
                            Liberada — use o botão abaixo para acessar o Portal do Fornecedor
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            Bloqueado até confirmação do pagamento
                          </>
                        )}
                      </p>
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

          {/* Guia de Processamento do Cadastro SICAF - Só aparece se não estiver mostrando pagamento */}
          {!mostrarPagamento && !pagamentoConfirmado && (
            <div className="bg-card border border-border mb-6 rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">Guia de Processamento do Cadastro SICAF</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-6">
                  Para dar continuidade ao seu processo, é necessário realizar o pagamento da Guia de Processamento do Cadastro SICAF, 
                  efetuado por meio do cadastro digital CadBrasil. Após a confirmação do pagamento, o acesso ao Portal do Fornecedor 
                  será liberado automaticamente.
                </p>
                <Button
                  onClick={handleGerarGuiaPagamento}
                  className="w-full bg-primary text-white hover:bg-primary/90 gap-2"
                  size="lg"
                >
                  <FileText className="w-5 h-5" />
                  Gerar Guia de Pagamento
                </Button>
              </div>
            </div>
          )}

          {/* Etapa de Pagamento - Aparece quando clicar no botão */}
          {mostrarPagamento && !pagamentoConfirmado && (() => {
            const vencimentoIso = calcularVencimento();
            return (
              <div ref={pagamentoRef} className="mb-6">
                {valorComDesconto && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Percent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-800 mb-1">
                        Desconto de {descontoPercentual}% Aplicado!
                      </p>
                      <p className="text-sm text-green-700">
                        Valor original: <span className="line-through">R$ {valorOriginal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> → 
                        Valor com desconto: <span className="font-bold">R$ {valorComDesconto.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </p>
                    </div>
                  </div>
                )}
                <EtapaPagamento
                  idPedido={idPedido}
                  protocolo={protocolo}
                  razaoSocial={dados.razaoSocial}
                  cnpjCpf={dados.cnpj}
                  valor={valorComDesconto || valorOriginal}
                  vencimento={vencimentoIso}
                  vencimentoDisplay={formatarVencimentoDisplay(vencimentoIso)}
                  cliente={dados}
                  onPagamentoConfirmado={handlePagamentoConfirmado}
                />
              </div>
            );
          })()}

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
                  O envio de documentos só será liberado após a confirmação do pagamento. Isso garante a segurança do processo 
                  e a correta validação do seu cadastro junto ao SICAF.
                </p>
              </div>
            </div>
          </div>

          {/* Seção de Envio de Documentação - Só aparece após pagamento confirmado */}
          {pagamentoConfirmado && (
            <div className="bg-card border border-border mb-6 rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">
                  ENVIAR DOCUMENTAÇÃO SICAF
                </h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Agora você pode enviar toda a documentação obrigatória para completar seu cadastro SICAF através do Portal do Fornecedor.
                </p>
                <Button
                  onClick={handleEnviarDocumentacao}
                  className="w-full bg-primary text-white hover:bg-primary/90 gap-2"
                  size="lg"
                >
                  <Upload className="w-5 h-5" />
                  Enviar Documentos SICAF
                </Button>
              </div>
            </div>
          )}

          {/* O que acontece após o pagamento? */}
          <div className="bg-card border border-border mb-6 rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">O que acontece após o pagamento?</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Etapa 1 - Liberação do Portal */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-semibold text-foreground">Liberação do Portal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Você receberá o acesso ao Portal do Fornecedor por e-mail.
                  </p>
                </div>

                {/* Etapa 2 - Envio de Documentos */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <h4 className="font-semibold text-foreground">Envio de Documentos</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No portal, faça o upload da documentação obrigatória.
                  </p>
                </div>

                {/* Etapa 3 - Análise Especializada */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <h4 className="font-semibold text-foreground">Análise Especializada</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe validará todos os documentos enviados.
                  </p>
                </div>

                {/* Etapa 4 - Cadastro Aprovado */}
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      4
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
