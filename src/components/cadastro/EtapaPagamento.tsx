import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  QrCode, 
  FileText, 
  Copy, 
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ModalBoleto from "./ModalBoleto";
import ModalVerificacaoPagamento from "./ModalVerificacaoPagamento";
import { verificarPagamentoPIX, gerarBoleto, gerarPix } from "@/lib/api";
import { CadastroData } from "@/pages/Cadastro";

interface EtapaPagamentoProps {
  idPedido: number | null;
  protocolo: string;
  razaoSocial: string;
  cnpjCpf: string;
  valor: number;
  vencimento: string;
  vencimentoDisplay?: string;
  cliente: CadastroData;
  onPagamentoConfirmado: () => void;
}

const EtapaPagamento = ({
  idPedido,
  protocolo,
  razaoSocial,
  cnpjCpf,
  valor,
  vencimento,
  vencimentoDisplay,
  cliente,
  onPagamentoConfirmado,
}: EtapaPagamentoProps) => {
  const { toast } = useToast();
  const [showModalBoleto, setShowModalBoleto] = useState(false);
  const [showModalVerificacao, setShowModalVerificacao] = useState(false);
  const [pixCopiado, setPixCopiado] = useState(false);
  const [loadingBoleto, setLoadingBoleto] = useState(false);
  const [loadingPix, setLoadingPix] = useState(false);
  const [codigoPix, setCodigoPix] = useState<string>("");
  const [txidPix, setTxidPix] = useState<string>("");
  const [qrcodeImage, setQrcodeImage] = useState<string>("");
  const [urlBoleto, setUrlBoleto] = useState<string>("");
  const [pixGerado, setPixGerado] = useState(false);
  const [boletoGerado, setBoletoGerado] = useState(false);
  const valorAnteriorRef = useRef<number>(valor);

  const clienteData = {
    nome: cliente.nomeResponsavel,
    razaoSocial: cliente.razaoSocial,
    email: cliente.emailResponsavel,
    telefone: cliente.telefoneResponsavel,
    cpf: cliente.cpfResponsavel,
    cnpj: cliente.tipoPessoa === "cnpj" ? cliente.cnpj : undefined,
    endereco: {
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      complemento: cliente.complemento,
      bairro: cliente.bairro,
      cidade: cliente.cidade,
      uf: cliente.uf,
      cep: cliente.cep,
    },
  };

  // Gerar PIX. forceRetry = true permite gerar de novo (ex.: após erro) sem refazer o cadastro.
  const gerarPixPagamento = async (forceRetry = false) => {
    if (!idPedido || loadingPix) return;
    if (pixGerado && !forceRetry) return;

    setLoadingPix(true);
    if (forceRetry) {
      setCodigoPix("");
      setQrcodeImage("");
      setTxidPix("");
      setPixGerado(false);
    }
    try {
      const response = await gerarPix(idPedido, protocolo, valor, clienteData);

      if (response.success && response.pix?.copy_paste) {
        setCodigoPix(response.pix.copy_paste);
        setQrcodeImage(response.pix?.qrcode_image ?? "");
        setTxidPix(response.txid ?? "");
        setPixGerado(true);
      } else {
        throw new Error("Erro ao gerar PIX");
      }
    } catch (error: unknown) {
      toast({
        title: "Erro ao gerar PIX",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoadingPix(false);
    }
  };

  // Gerar boleto (openModal = true apenas quando usuário clica em "Visualizar")
  const gerarBoletoPagamento = async (openModal: boolean) => {
    if (!idPedido || loadingBoleto) return;
    if (boletoGerado) {
      if (openModal) setShowModalBoleto(true);
      return;
    }

    setLoadingBoleto(true);
    try {
      const response = await gerarBoleto(idPedido, protocolo, valor, vencimento, clienteData);

      const link = response.boleto?.link ?? response.boleto?.pdf ?? "";
      if (response.success && link) {
        setUrlBoleto(link);
        setBoletoGerado(true);
        if (openModal) setShowModalBoleto(true);
      } else {
        throw new Error("Erro ao gerar boleto");
      }
    } catch (error: unknown) {
      toast({
        title: "Erro ao gerar boleto",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoadingBoleto(false);
    }
  };

  const copiarPix = () => {
    if (!codigoPix) {
      toast({
        title: "PIX não gerado",
        description: "Aguarde a geração do código PIX.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(codigoPix);
    setPixCopiado(true);
    toast({
      title: "Código PIX copiado!",
      description: "Cole o código no app do seu banco para pagar.",
    });
    setTimeout(() => setPixCopiado(false), 2000);
  };

  // Resetar PIX e boleto quando o valor mudar (ex: desconto aplicado)
  useEffect(() => {
    // Se o valor mudou e já tiver PIX/boleto gerados, resetar para regenerar com novo valor
    if (valorAnteriorRef.current !== valor && (pixGerado || boletoGerado)) {
      setCodigoPix("");
      setQrcodeImage("");
      setTxidPix("");
      setPixGerado(false);
      setUrlBoleto("");
      setBoletoGerado(false);
      valorAnteriorRef.current = valor;
    } else if (valorAnteriorRef.current !== valor) {
      valorAnteriorRef.current = valor;
    }
  }, [valor, pixGerado, boletoGerado]);

  // Gerar PIX automaticamente ao montar o componente ou quando valor mudar ou quando for resetado
  useEffect(() => {
    if (idPedido && !pixGerado && !loadingPix) {
      gerarPixPagamento();
    }
  }, [idPedido, valor, pixGerado]);

  // Gerar boleto automaticamente ao montar (em paralelo ao PIX) ou quando valor mudar ou quando for resetado
  useEffect(() => {
    if (idPedido && !boletoGerado && !loadingBoleto) {
      gerarBoletoPagamento(false);
    }
  }, [idPedido, valor, boletoGerado]);

  const handlePixPago = () => {
    setShowModalVerificacao(true);
  };

  const handlePagamentoConfirmado = () => {
    setShowModalVerificacao(false);
    toast({
      title: "Pagamento confirmado!",
      description: "Acesse o Portal do Fornecedor para enviar seus documentos.",
    });
    onPagamentoConfirmado();
  };

  const handlePagamentoNaoPago = () => {
    // Modal já foi fechado, apenas resetar estado se necessário
  };

  return (
    <>
      <ModalBoleto
        isOpen={showModalBoleto}
        onClose={() => setShowModalBoleto(false)}
        urlBoleto={urlBoleto}
      />

      <ModalVerificacaoPagamento
        isOpen={showModalVerificacao}
        onClose={() => setShowModalVerificacao(false)}
        onConfirmado={handlePagamentoConfirmado}
        onNaoPago={handlePagamentoNaoPago}
        verificarPagamento={async () =>
          verificarPagamentoPIX(idPedido, txidPix, protocolo)
        }
      />

      <div className="bg-white rounded-lg mb-6 overflow-hidden">
        {/* Header com fundo verde */}
        <div className="bg-primary text-white px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            {/* Ícone de documento branco */}
            <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Guia de Processamento do Cadastro SICAF
            </h2>
          </div>
          {/* Texto explicativo */}
          <p className="text-sm text-white/90 leading-relaxed">
            Para dar continuidade ao seu processo, é necessário realizar o pagamento da Guia de Processamento do Cadastro SICAF, 
            efetuado por meio do cadastro digital CadBrasil. Após a confirmação do pagamento, o acesso ao Portal do Fornecedor 
            será liberado automaticamente.
          </p>
        </div>

        {/* Opções de Pagamento - Grid 2 colunas */}
        <div className="px-6 pb-6 pt-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* PIX - Card Esquerdo */}
            <div className="border-2 border-green-300 rounded-lg p-6 bg-white shadow-lg">
              {/* Header do Card PIX */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  {/* Ícone PIX verde com "0|0:r" */}
                  <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-[10px] leading-tight">0|0:r</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Pague com PIX</h3>
                    <p className="text-sm text-green-600 font-medium">Liberação imediata</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* QR Code */}
                <div className="bg-white flex justify-center">
                  {loadingPix ? (
                    <div className="w-64 h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <RefreshCw className="w-12 h-12 text-gray-400 animate-spin" />
                      <p className="text-sm text-gray-500 mt-2">Gerando PIX...</p>
                    </div>
                  ) : qrcodeImage ? (
                    <div className="w-64 h-64 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center p-2">
                      <img
                        src={qrcodeImage}
                        alt="QR Code PIX"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : codigoPix ? (
                    <div className="w-64 h-64 bg-white rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center">
                      <QrCode className="w-48 h-48 text-gray-400" />
                    </div>
                  ) : (
                    <div className="w-64 h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <QrCode className="w-48 h-48 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Código Copia e Cola */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Código Copia e Cola:
                  </label>
                  <div className="bg-gray-100 border border-gray-300 rounded p-3 mb-3 min-h-[80px]">
                    {loadingPix ? (
                      <p className="text-xs text-gray-500">Gerando código PIX...</p>
                    ) : codigoPix ? (
                      <p className="text-xs font-mono text-gray-700 break-all">
                        {codigoPix}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">Clique em &quot;Gerar PIX&quot; para obter o código</p>
                    )}
                  </div>
                  <Button
                    onClick={copiarPix}
                    disabled={!codigoPix || loadingPix}
                    className="w-full bg-green-600 text-white hover:bg-green-700 gap-2 disabled:opacity-50"
                    size="default"
                  >
                    <Copy className="w-4 h-4" />
                    {pixCopiado ? "Copiado!" : "Copiar Código PIX"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Boleto - Card Direito */}
            <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
              {/* Header do Card Boleto */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  {/* Ícone Boleto amarelo com padrão azul */}
                  <div className="w-10 h-10 bg-yellow-400 rounded-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600 opacity-40"></div>
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-yellow-900">
                        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" fill="currentColor" opacity="0.3"/>
                        <path d="M8 8h8v2H8V8zm0 4h8v2H8v-2z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Boleto Bancário</h3>
                    <p className="text-sm text-gray-500 font-medium">Compensação em até 3 dias úteis</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Valor e Vencimento lado a lado */}
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-500">Valor</span>
                    <p className="font-bold text-gray-800">R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500">Vencimento</span>
                    <p className="font-bold text-gray-800">{vencimentoDisplay ?? vencimento}</p>
                  </div>
                </div>

                {/* Botão Visualizar Boleto */}
                <Button
                  onClick={() => (boletoGerado ? setShowModalBoleto(true) : gerarBoletoPagamento(true))}
                  disabled={loadingBoleto}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 gap-2 font-semibold disabled:opacity-50"
                  size="default"
                >
                  {loadingBoleto ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Gerando Boleto...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Visualizar Boleto Completo
                    </>
                  )}
                </Button>

                {/* Aviso */}
                <div className="bg-yellow-50 border border-orange-300 rounded-lg p-3">
                  <p className="text-xs text-gray-700">
                    <strong className="text-orange-600">Atenção:</strong> O boleto pode levar até 3 dias úteis para compensação. 
                    Para liberação imediata, utilize o PIX.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mensagem de Aguardando Pagamento */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              {/* Ícone circular com C */}
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Estamos aguardando a confirmação do pagamento.
                </h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Esse processo pode levar alguns minutos. Assim que confirmado, o acesso ao Portal do Fornecedor será liberado automaticamente.
                </p>
                <div className="bg-white border border-blue-200 rounded p-3 mb-3">
                  <p className="text-xs text-gray-600">
                    <strong>Tempo estimado:</strong> PIX (imediato) | Boleto (até 3 dias úteis)
                  </p>
                </div>
                <Button
                  onClick={handlePixPago}
                  disabled={!txidPix}
                  variant="outline"
                  size="default"
                  className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                >
                  <RefreshCw className="w-4 h-4" />
                  Verificar status agora
                </Button>
              </div>
            </div>
          </div>

          {/* Botão de Confirmação de Pagamento - Abaixo dos cards */}
          <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">
                Já fiz o pagamento - Liberar o Portal do Fornecedor
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Clique aqui após efetuar o pagamento para agilizar a verificação
            </p>
            <Button
              onClick={handlePixPago}
              disabled={!txidPix}
              className="w-full bg-green-600 text-white hover:bg-green-700 gap-2 disabled:opacity-50"
              size="lg"
            >
              <CheckCircle2 className="w-5 h-5" />
              Confirmar Pagamento e Liberar Portal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EtapaPagamento;
