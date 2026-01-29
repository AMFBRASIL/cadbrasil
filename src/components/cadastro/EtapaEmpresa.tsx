import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CadastroData } from "@/pages/Cadastro";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle, Info, Building2, User, Mail, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buscarCNPJ as buscarCNPJAPI, verificarClienteExistente as verificarClienteExistenteAPI } from "@/lib/api";
import { cn } from "@/lib/utils";
import ModalEmailCadastrado from "./ModalEmailCadastrado";

interface EtapaEmpresaProps {
  dados: CadastroData;
  atualizarDados: (dados: Partial<CadastroData>) => void;
  onProximo: () => void;
  onAnterior: () => void;
}

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14);
};

const formatCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
};

const formatCEP = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
};

const EtapaEmpresa = ({ dados, atualizarDados, onProximo, onAnterior }: EtapaEmpresaProps) => {
  const { toast } = useToast();
  const [buscandoCNPJ, setBuscandoCNPJ] = useState(false);
  const [erroBuscaCNPJ, setErroBuscaCNPJ] = useState(false);
  const [buscandoCEP, setBuscandoCEP] = useState(false);
  const [documentoVerificado, setDocumentoVerificado] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verificandoRenovacao, setVerificandoRenovacao] = useState(false);
  const [clientePodeRenovar, setClientePodeRenovar] = useState(false);
  const [emailCliente, setEmailCliente] = useState<string | null>(null);
  const [showModalEmail, setShowModalEmail] = useState(false);
  
  const isCPF = dados.tipoPessoa === "cpf";
  const isCNPJ = dados.tipoPessoa === "cnpj";
  const isRenovacao = dados.tipoServico === "renovacao";
  const cepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTipoPessoaChange = (tipo: "cpf" | "cnpj") => {
    atualizarDados({ 
      tipoPessoa: tipo,
      cnpj: "", // Limpar documento ao mudar tipo
      razaoSocial: "",
      nomeFantasia: "",
      cnae: "",
    });
    setDocumentoVerificado(false);
    setErroBuscaCNPJ(false);
  };

  const buscarCNPJ = async (cnpj: string) => {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    
    if (cnpjLimpo.length !== 14) {
      return;
    }

    // PRIMEIRO: Verificar se o cliente já existe no banco (para evitar duplicidade)
    const clienteExiste = await verificarClienteExistenteNoBanco(cnpj);
    
    // Se o cliente já existe, não buscar na ReceitaWS
    if (clienteExiste) {
      return;
    }

    // Se o cliente não existe, buscar na ReceitaWS
    setBuscandoCNPJ(true);
    setDocumentoVerificado(false);
    setErroBuscaCNPJ(false);
    
    try {
      const result = await buscarCNPJAPI(cnpj);
      
      if (!result || !result.success || !result.data) {
        throw new Error(result?.error || "CNPJ não encontrado");
      }

      const data = result.data;
      const atividadePrincipal = data.atividade_principal?.[0] || {};
      const cepFormatado = data.cep
        ? data.cep.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2")
        : "";

      atualizarDados({
        razaoSocial: data.nome || "",
        nomeFantasia: data.fantasia || "",
        cnae: atividadePrincipal.text || atividadePrincipal.code || "",
        cep: cepFormatado,
        logradouro: data.logradouro || "",
        numero: data.numero || "",
        complemento: data.complemento || "",
        bairro: data.bairro || "",
        cidade: data.municipio || "",
        uf: data.uf || "",
      });

      setBuscandoCNPJ(false);
      setDocumentoVerificado(true);
      setErroBuscaCNPJ(false);
      toast({
        title: "Dados encontrados",
        description: "Os dados da empresa foram preenchidos automaticamente",
      });
    } catch (error) {
      // QUALQUER erro na busca libera os campos para preenchimento manual
      console.error("Erro ao buscar CNPJ:", error);
      setBuscandoCNPJ(false);
      setDocumentoVerificado(false);
      setErroBuscaCNPJ(true); // Marcar que houve erro para liberar campos
      
      // Mensagem de erro amigável com tratamento especial para "Quota Exceeded"
      let errorMessage = error instanceof Error ? error.message : "Não foi possível buscar os dados do CNPJ";
      let errorTitle = "Erro ao buscar CNPJ";
      
      if (errorMessage.toLowerCase().includes("quota") || errorMessage.toLowerCase().includes("exceeded") || errorMessage.toLowerCase().includes("limite")) {
        errorTitle = "Limite de consultas atingido";
        errorMessage = "O limite de consultas à API de CNPJ foi atingido. Por favor, preencha os dados manualmente.";
      }
      
      toast({
        variant: "destructive",
        title: errorTitle,
        description: `${errorMessage} Os campos foram liberados para preenchimento manual.`,
      });
    }
  };

  // Função genérica para verificar se cliente existe (usada tanto para Renovação quanto Novo Cadastro)
  const verificarClienteExistenteNoBanco = async (documento: string): Promise<boolean> => {
    if (!dados.tipoPessoa) {
      return false;
    }

    const documentoLimpo = documento.replace(/\D/g, "");
    const tamanhoValido = (isCPF && documentoLimpo.length === 11) || (isCNPJ && documentoLimpo.length === 14);
    
    if (!tamanhoValido) {
      return false;
    }

    setVerificandoRenovacao(true);
    setClientePodeRenovar(false);

    try {
      const resultado = await verificarClienteExistenteAPI(documento, dados.tipoPessoa);
      
      if (resultado.success && resultado.existe && resultado.podeRenovar) {
        setClientePodeRenovar(true);
        setEmailCliente(resultado.email || null);
        // Mostrar modal com email automaticamente após um pequeno delay
        setTimeout(() => {
          setShowModalEmail(true);
        }, 800);
        toast({
          title: "Cliente já cadastrado",
          description: "Este CPF/CNPJ já possui cadastro no sistema. Você pode acessar a plataforma.",
        });
        return true; // Cliente existe
      } else {
        // Cliente não existe - continuar cadastro normal
        setClientePodeRenovar(false);
        setEmailCliente(null);
        return false; // Cliente não existe
      }
    } catch (error) {
      console.error("Erro ao verificar cliente:", error);
      // Em caso de erro, continuar com o cadastro normal
      setClientePodeRenovar(false);
      return false;
    } finally {
      setVerificandoRenovacao(false);
    }
  };

  const handleDocumentoChange = (value: string) => {
    const formatted = isCPF ? formatCPF(value) : formatCNPJ(value);
    atualizarDados({ cnpj: formatted });
    setDocumentoVerificado(false);
    setClientePodeRenovar(false);
    
    const documentoLimpo = formatted.replace(/\D/g, "");
    // Limpar erro anterior se o usuário estiver digitando um novo CNPJ
    if (isCNPJ && erroBuscaCNPJ) {
      if (documentoLimpo.length < 14) {
        // Limpar erro enquanto digita
        setErroBuscaCNPJ(false);
      } else if (documentoLimpo.length === 14) {
        // Limpar erro antes de tentar buscar novamente
        setErroBuscaCNPJ(false);
        buscarCNPJ(formatted);
        return; // Evitar buscar duas vezes
      }
    }
    
    if (isCNPJ && documentoLimpo.length === 14 && !erroBuscaCNPJ) {
      buscarCNPJ(formatted);
    } else if (isCPF && documentoLimpo.length === 11) {
      setDocumentoVerificado(true);
      // Verificar se cliente existe (tanto para Renovação quanto Novo Cadastro)
      setTimeout(() => verificarClienteExistenteNoBanco(formatted), 300);
    }
  };

  const buscarCEP = useCallback(async (cepValue?: string) => {
    const cepParaBuscar = cepValue || dados.cep;
    const cepLimpo = cepParaBuscar.replace(/\D/g, "");
    
    if (cepLimpo.length !== 8) {
      return;
    }

    // Evitar múltiplas buscas simultâneas
    if (buscandoCEP) {
      return;
    }

    setBuscandoCEP(true);
    
    try {
      // API ViaCEP - utiliza dados dos Correios
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.erro) {
        toast({
          variant: "destructive",
          title: "CEP não encontrado",
          description: "Verifique o CEP digitado e tente novamente",
        });
      } else {
        atualizarDados({
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: data.uf || "",
        });
        
        // Feedback positivo apenas para CPF (já que CNPJ preenche automaticamente)
        if (isCPF) {
          toast({
            title: "Endereço encontrado",
            description: "Os dados do endereço foram preenchidos automaticamente",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast({
        variant: "destructive",
        title: "Erro na busca",
        description: "Não foi possível buscar o CEP. Verifique sua conexão e tente novamente.",
      });
    } finally {
      setBuscandoCEP(false);
    }
  }, [dados.cep, buscandoCEP, isCPF, atualizarDados, toast]);

  // Buscar CEP automaticamente quando tiver 8 dígitos
  useEffect(() => {
    const cepLimpo = dados.cep.replace(/\D/g, "");
    
    // Limpar timeout anterior se existir
    if (cepTimeoutRef.current) {
      clearTimeout(cepTimeoutRef.current);
    }
    
    // Se CEP tem 8 dígitos e ainda não foi buscado (não tem logradouro)
    if (cepLimpo.length === 8 && !buscandoCEP && !dados.logradouro) {
      cepTimeoutRef.current = setTimeout(() => {
        buscarCEP(dados.cep);
      }, 500);
    }
    
    return () => {
      if (cepTimeoutRef.current) {
        clearTimeout(cepTimeoutRef.current);
      }
    };
  }, [dados.cep, dados.logradouro, buscandoCEP, buscarCEP]);

  const validar = () => {
    const novosErros: Record<string, string> = {};
    
    if (!dados.tipoPessoa) {
      novosErros.tipoPessoa = "Selecione o tipo de cadastro";
    }
    
    const documentoLimpo = dados.cnpj.replace(/\D/g, "");
    if (!dados.cnpj || (isCPF && documentoLimpo.length !== 11) || (isCNPJ && documentoLimpo.length !== 14)) {
      novosErros.cnpj = isCPF ? "CPF inválido" : "CNPJ inválido";
    }
    
    if (!dados.razaoSocial.trim()) {
      novosErros.razaoSocial = isCPF ? "Nome completo é obrigatório" : "Razão Social é obrigatória";
    }
    
    if (!dados.cep || dados.cep.replace(/\D/g, "").length !== 8) {
      novosErros.cep = "CEP inválido";
    }
    
    if (!dados.cidade.trim()) {
      novosErros.cidade = "Cidade é obrigatória";
    }
    
    if (!dados.uf.trim()) {
      novosErros.uf = "UF é obrigatória";
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
      <h2 className="text-xl font-bold text-foreground mb-1">
        {isRenovacao ? "Verificação de Renovação" : "Dados do Cadastro"}
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        {isRenovacao 
          ? "Informe seu CPF ou CNPJ para verificar se você possui cadastro ativo no sistema"
          : "Selecione o tipo de pessoa e informe os dados"
        }
      </p>

      {/* Seleção de Tipo de Cadastro */}
      <div className="mb-6">
        <Label className="text-base font-semibold mb-3 block">
          Tipo de Cadastro *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pessoa Jurídica */}
          <button
            type="button"
            onClick={() => handleTipoPessoaChange("cnpj")}
            className={cn(
              "relative p-4 border-2 rounded-lg text-left transition-all hover:border-primary/50",
              isCNPJ 
                ? "border-primary bg-primary/5" 
                : "border-border bg-card"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                isCNPJ ? "border-primary bg-primary" : "border-muted-foreground"
              )}>
                {isCNPJ && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
              <Building2 className={cn(
                "w-6 h-6",
                isCNPJ ? "text-primary" : "text-muted-foreground"
              )} />
              <div>
                <div className={cn(
                  "font-semibold",
                  isCNPJ ? "text-primary" : "text-foreground"
                )}>
                  Pessoa Jurídica
                </div>
                <div className="text-sm text-muted-foreground">CNPJ</div>
              </div>
            </div>
          </button>

          {/* Pessoa Física */}
          <button
            type="button"
            onClick={() => handleTipoPessoaChange("cpf")}
            className={cn(
              "relative p-4 border-2 rounded-lg text-left transition-all hover:border-primary/50",
              isCPF 
                ? "border-primary bg-primary/5" 
                : "border-border bg-card"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                isCPF ? "border-primary bg-primary" : "border-muted-foreground"
              )}>
                {isCPF && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
              <User className={cn(
                "w-6 h-6",
                isCPF ? "text-primary" : "text-muted-foreground"
              )} />
              <div>
                <div className={cn(
                  "font-semibold",
                  isCPF ? "text-primary" : "text-foreground"
                )}>
                  Pessoa Física
                </div>
                <div className="text-sm text-muted-foreground">CPF</div>
              </div>
            </div>
          </button>
        </div>
        {errors.tipoPessoa && (
          <p className="text-destructive text-xs mt-2">{errors.tipoPessoa}</p>
        )}
      </div>

      {/* Mensagem informativa sobre CPF ou CNPJ */}
      {dados.tipoPessoa && (
        <div className="bg-primary/5 border border-primary/20 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {isRenovacao 
                ? isCPF
                  ? "Digite o CPF completo para verificar se você possui cadastro ativo no sistema."
                  : "Digite o CNPJ completo para verificar se sua empresa possui cadastro ativo no sistema."
                : isCPF 
                  ? "Digite o CPF completo. Você precisará preencher os dados manualmente."
                  : "Digite o CNPJ completo da empresa. Os dados serão buscados automaticamente."
              }
            </p>
          </div>
        </div>
      )}

      {/* Mensagem de validação quando documento verificado */}
      {documentoVerificado && dados.tipoPessoa && (
        <div className="bg-green-50 border border-green-200 p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">
              {isCPF 
                ? "CPF validado! Preencha os dados e prossiga para o próximo passo."
                : "Dados da empresa carregados com sucesso! Você pode prosseguir para o próximo passo."
              }
            </p>
          </div>
        </div>
      )}

      {/* Botão de Acessar Plataforma - aparece quando cliente já existe (Renovação ou Novo Cadastro) */}
      {clientePodeRenovar && documentoVerificado && (
        <div className="bg-primary/10 border-2 border-primary p-6 mb-6 rounded-lg">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Cliente já cadastrado no sistema!
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRenovacao 
                  ? "Você possui um cadastro ativo e pode acessar a plataforma do fornecedor para gerenciar sua renovação."
                  : "Este CPF/CNPJ já possui cadastro no sistema. Você pode acessar a plataforma do fornecedor."
                }
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setShowModalEmail(true);
              }}
              variant="outline"
              className="w-full gap-2"
            >
              <Mail className="w-5 h-5" />
              Ver Email Cadastrado
            </Button>
            <Button
              onClick={() => {
                window.location.href = "https://fornecedor.cadbr.com.br";
              }}
              className="w-full bg-primary text-white hover:bg-primary/90 gap-2"
              size="lg"
            >
              <Building2 className="w-5 h-5" />
              Acessar Plataforma Fornecedor
            </Button>
          </div>
        </div>
      )}

      {/* Modal com Email Cadastrado */}
      <ModalEmailCadastrado
        isOpen={showModalEmail}
        onClose={() => setShowModalEmail(false)}
        email={emailCliente}
        tipoDocumento={dados.tipoPessoa}
        onAcessarPlataforma={() => {
          setShowModalEmail(false);
          window.location.href = "https://fornecedor.cadbr.com.br";
        }}
      />

      {/* Mensagem quando verificação foi concluída mas cliente não existe (apenas para Renovação) */}
      {isRenovacao && 
       !verificandoRenovacao && 
       documentoVerificado && 
       !clientePodeRenovar && 
       dados.cnpj &&
       dados.cnpj.replace(/\D/g, "").length === (isCPF ? 11 : 14) && (
        <div className="bg-blue-50 border border-blue-200 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              {isCPF 
                ? "CPF não encontrado no sistema. Continuando com o processo de cadastro..."
                : "CNPJ não encontrado no sistema. Continuando com o processo de cadastro..."
              }
            </p>
          </div>
        </div>
      )}

      {/* Mensagem quando há erro na busca de CNPJ - campos liberados para preenchimento manual */}
      {erroBuscaCNPJ && isCNPJ && dados.cnpj && dados.cnpj.replace(/\D/g, "").length === 14 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 mb-1">
                Não foi possível buscar os dados do CNPJ automaticamente
              </p>
              <p className="text-sm text-yellow-700">
                Os campos abaixo estão liberados para preenchimento manual. Preencha todos os dados da empresa.
              </p>
              <p className="text-xs text-yellow-600 mt-2 italic">
                Nota: Se o erro foi "Quota Exceeded", o limite diário de consultas foi atingido. Você pode tentar novamente amanhã ou preencher manualmente agora.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mensagem quando está verificando renovação */}
      {isRenovacao && verificandoRenovacao && (
        <div className="bg-primary/5 border border-primary/20 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Loader2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 animate-spin" />
            <p className="text-sm text-muted-foreground">
              Verificando se você possui cadastro no sistema...
            </p>
          </div>
        </div>
      )}

      {/* Campos do formulário - só aparece se tipo selecionado */}
      {dados.tipoPessoa && (
        <div className="space-y-4">
          {/* CPF/CNPJ */}
          <div>
            <Label htmlFor="documento" className="flex items-center gap-1">
              {isCPF ? "CPF" : "CNPJ"} *
            </Label>
            <div className="relative mt-1">
              <Input
                id="documento"
                placeholder={isCPF ? "000.000.000-00" : "00.000.000/0000-00"}
                value={dados.cnpj}
                onChange={(e) => handleDocumentoChange(e.target.value)}
                className={cn(
                  errors.cnpj ? "border-destructive" : "",
                  documentoVerificado ? "border-green-500 bg-green-50/50" : ""
                )}
              />
              {buscandoCNPJ && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-primary" />
              )}
              {documentoVerificado && !buscandoCNPJ && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              )}
            </div>
            {errors.cnpj && <p className="text-destructive text-xs mt-1">{errors.cnpj}</p>}
          </div>

          {/* Campos aparecem após documento verificado, se for CPF, ou se houver erro na busca (permite preenchimento manual) */}
          {/* Se for renovação e cliente pode renovar, não mostrar campos (só o botão acima) */}
          {(documentoVerificado || isCPF || erroBuscaCNPJ) && !(isRenovacao && clientePodeRenovar) && (
            <>
              {/* Nome Completo / Razão Social */}
              <div>
                <Label htmlFor="razaoSocial">
                  {isCPF ? "Nome Completo" : "Razão Social"} *
                </Label>
                <Input
                  id="razaoSocial"
                  placeholder={isCPF ? "Digite seu nome completo" : "Nome registrado da empresa"}
                  value={dados.razaoSocial}
                  onChange={(e) => atualizarDados({ razaoSocial: e.target.value })}
                  readOnly={isCNPJ && documentoVerificado && !erroBuscaCNPJ}
                  className={isCNPJ && documentoVerificado && !erroBuscaCNPJ ? "bg-muted/50 cursor-not-allowed" : ""}
                />
                {errors.razaoSocial && (
                  <p className="text-destructive text-xs mt-1">{errors.razaoSocial}</p>
                )}
              </div>

              {/* Nome Fantasia - só para CNPJ */}
              {isCNPJ && (documentoVerificado || erroBuscaCNPJ) && (
                <div>
                  <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                  <Input
                    id="nomeFantasia"
                    placeholder="Nome comercial"
                    value={dados.nomeFantasia}
                    onChange={(e) => atualizarDados({ nomeFantasia: e.target.value })}
                    readOnly={documentoVerificado && !erroBuscaCNPJ}
                    className={documentoVerificado && !erroBuscaCNPJ ? "bg-muted/50 cursor-not-allowed" : ""}
                  />
                </div>
              )}

              {/* CNAE - só para CNPJ */}
              {isCNPJ && (documentoVerificado || erroBuscaCNPJ) && (
                <div>
                  <Label htmlFor="cnae">Atividade Principal</Label>
                  <Input
                    id="cnae"
                    placeholder="Código de atividade econômica"
                    value={dados.cnae}
                    onChange={(e) => atualizarDados({ cnae: e.target.value })}
                    readOnly={documentoVerificado && !erroBuscaCNPJ}
                    className={documentoVerificado && !erroBuscaCNPJ ? "bg-muted/50 cursor-not-allowed" : ""}
                  />
                </div>
              )}

              {/* Endereço - CEP e Logradouro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      value={dados.cep}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const formatted = formatCEP(inputValue);
                        const cepLimpo = formatted.replace(/\D/g, "");
                        
                        // Limpar campos de endereço se CEP foi alterado e ainda não tem 8 dígitos
                        if (cepLimpo.length < 8 && dados.logradouro) {
                          atualizarDados({ 
                            cep: formatted,
                            logradouro: "",
                            bairro: "",
                            cidade: "",
                            uf: "",
                          });
                        } else {
                          atualizarDados({ cep: formatted });
                        }
                        
                        // Buscar automaticamente quando CEP completo (8 dígitos)
                        if (cepLimpo.length === 8) {
                          // Usar o valor formatado para garantir que está correto
                          setTimeout(() => {
                            buscarCEP(formatted);
                          }, 300);
                        }
                      }}
                      onBlur={(e) => {
                        // Também buscar quando o campo perde o foco e tem 8 dígitos
                        const cepLimpo = dados.cep.replace(/\D/g, "");
                        if (cepLimpo.length === 8 && !buscandoCEP && !dados.logradouro) {
                          buscarCEP(dados.cep);
                        }
                      }}
                      className={errors.cep ? "border-destructive" : ""}
                    />
                    {buscandoCEP && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-primary" />
                    )}
                    {!buscandoCEP && dados.logradouro && dados.cidade && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                    )}
                  </div>
                  {errors.cep && <p className="text-destructive text-xs mt-1">{errors.cep}</p>}
                  {buscandoCEP && (
                    <p className="text-primary text-xs mt-1 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Buscando endereço...
                    </p>
                  )}
                  {!buscandoCEP && !errors.cep && dados.cep && dados.cep.replace(/\D/g, "").length === 8 && (
                    <p className="text-muted-foreground text-xs mt-1">
                      {dados.logradouro && dados.cidade 
                        ? "Endereço encontrado ✓" 
                        : "Digite os 8 dígitos para buscar automaticamente"
                      }
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="logradouro">Endereço</Label>
                  <Input
                    id="logradouro"
                    placeholder="Rua, Avenida, etc."
                    value={dados.logradouro}
                    onChange={(e) => atualizarDados({ logradouro: e.target.value })}
                  />
                </div>
              </div>

              {/* Número e Complemento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    placeholder="N°"
                    value={dados.numero}
                    onChange={(e) => atualizarDados({ numero: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    placeholder="Apto, Sala..."
                    value={dados.complemento}
                    onChange={(e) => atualizarDados({ complemento: e.target.value })}
                  />
                </div>
              </div>

              {/* Bairro */}
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  placeholder="Bairro"
                  value={dados.bairro}
                  onChange={(e) => atualizarDados({ bairro: e.target.value })}
                />
              </div>

              {/* Cidade e UF */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    placeholder="Cidade"
                    value={dados.cidade}
                    onChange={(e) => atualizarDados({ cidade: e.target.value })}
                  />
                  {errors.cidade && <p className="text-destructive text-xs mt-1">{errors.cidade}</p>}
                </div>
                <div>
                  <Label htmlFor="uf">UF *</Label>
                  <Input
                    id="uf"
                    placeholder="UF"
                    maxLength={2}
                    value={dados.uf}
                    onChange={(e) => atualizarDados({ uf: e.target.value.toUpperCase() })}
                  />
                  {errors.uf && <p className="text-destructive text-xs mt-1">{errors.uf}</p>}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Botões - não mostrar se cliente pode renovar (já tem botão de acesso) */}
      {!(isRenovacao && clientePodeRenovar && documentoVerificado) && (
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
      )}
    </div>
  );
};

export default EtapaEmpresa;
