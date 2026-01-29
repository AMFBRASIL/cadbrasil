import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CadastroProgress from "@/components/cadastro/CadastroProgress";
import EtapaSelecaoTipo from "@/components/cadastro/EtapaSelecaoTipo";
import EtapaEmpresa from "@/components/cadastro/EtapaEmpresa";
import EtapaResponsavel from "@/components/cadastro/EtapaResponsavel";
import EtapaLicitacao from "@/components/cadastro/EtapaLicitacao";
import EtapaLogin from "@/components/cadastro/EtapaLogin";
import EtapaRevisao from "@/components/cadastro/EtapaRevisao";
import CadastroSucesso from "@/components/cadastro/CadastroSucesso";
import SEO from "@/components/SEO";
import { Shield, Lock, FileCheck } from "lucide-react";

export interface CadastroData {
  // Tipo de Pessoa
  tipoPessoa: "cpf" | "cnpj" | "";
  // Empresa/Pessoa
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnae: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  // Responsável
  nomeResponsavel: string;
  cpfResponsavel: string;
  cargoResponsavel: string;
  telefoneResponsavel: string;
  emailResponsavel: string;
  // Serviço/Licitação
  tipoServico: "novo" | "renovacao" | "";
  segmentoAtuacao: string;
  objetivoLicitacao: string;
  // Login (Etapa Dados de Acesso)
  emailAcesso: string;
  senha: string;
  aceitaNotificacoes: boolean;
}

const initialData: CadastroData = {
  tipoPessoa: "",
  cnpj: "",
  razaoSocial: "",
  nomeFantasia: "",
  cnae: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  nomeResponsavel: "",
  cpfResponsavel: "",
  cargoResponsavel: "",
  telefoneResponsavel: "",
  emailResponsavel: "",
  tipoServico: "",
  segmentoAtuacao: "",
  objetivoLicitacao: "",
  emailAcesso: "",
  senha: "",
  aceitaNotificacoes: true,
};

const Cadastro = () => {
  const [searchParams] = useSearchParams();
  const tipoParam = searchParams.get("tipo");
  
  // Etapa 0 = Seleção de tipo, 1-5 = formulário. Se tipo na URL, pula etapa 0.
  const [etapaAtual, setEtapaAtual] = useState(tipoParam === "novo" || tipoParam === "renovacao" ? 1 : 0);
  const [dados, setDados] = useState<CadastroData>({
    ...initialData,
    tipoServico: tipoParam === "renovacao" ? "renovacao" : tipoParam === "novo" ? "novo" : "",
  });
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [protocolo, setProtocolo] = useState<string>("");
  const [idPedido, setIdPedido] = useState<number | null>(null);

  const atualizarDados = (novosDados: Partial<CadastroData>) => {
    setDados((prev) => ({ ...prev, ...novosDados }));
  };

  const proximaEtapa = () => {
    // Se for CPF, pular a etapa 3 (Licitação)
    if (dados.tipoPessoa === "cpf" && etapaAtual === 2) {
      // Pular direto para etapa 4 (Login) quando for CPF
      setEtapaAtual(4);
    } else if (etapaAtual < 5) {
      setEtapaAtual(etapaAtual + 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const etapaAnterior = () => {
    // Se for CPF, pular a etapa 3 (Licitação) ao voltar
    if (dados.tipoPessoa === "cpf" && etapaAtual === 4) {
      // Voltar para etapa 2 (Responsável) quando for CPF
      setEtapaAtual(2);
    } else if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finalizarCadastro = (protocoloRecebido: string) => {
    setProtocolo(protocoloRecebido);
    setCadastroConcluido(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cadastroConcluido) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO 
          title="Cadastro Concluído"
          description="Seu pré-cadastro SICAF foi realizado com sucesso. Acompanhe o status do seu processo."
          canonical="/cadastro"
          noIndex={true}
        />
        {/* Barra superior verde de segurança */}
        <div className="bg-primary text-white py-2 text-center text-sm">
          <div className="container mx-auto px-4 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Você está em um ambiente <strong>100% seguro</strong></span>
          </div>
        </div>

        <Header />
        <main className="flex-1 pt-16">
          <CadastroSucesso dados={dados} protocolo={protocolo} idPedido={idPedido} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title={dados.tipoServico === "renovacao" ? "Renovação SICAF - Formulário" : "Novo Cadastro SICAF - Formulário"}
        description="Preencha o formulário para iniciar seu cadastro SICAF. Processo simples e seguro com a CADBRASIL. Mais de 15 anos de experiência e 99% de aprovação."
        canonical="/cadastro"
        keywords="cadastro SICAF online, formulário cadastro SICAF, renovação SICAF, novo cadastro SICAF, cadastro fornecedor federal"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Cadastro SICAF", url: "/cadastro" }
        ]}
        noIndex={true}
      />
      {/* Barra superior verde de segurança */}
      <div className="bg-primary text-white py-2 text-center text-sm">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          <span>Você está em um ambiente <strong>100% seguro</strong></span>
        </div>
      </div>

      <Header />
      <main className="flex-1 py-8 md:py-12 pt-24">
        <div className="container mx-auto px-4">
          {/* Faixa verde decorativa */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-primary"></div>
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Cadastro de Empresa SICAF | Comprasnet
            </h1>
          </div>

          {/* Selos de segurança com fundo verde e textos/ícones brancos */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md">
              <Lock className="w-4 h-4 text-white" />
              <span className="text-white font-medium">Certificado SSL</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white font-medium">Dados protegidos por LGPD</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md">
              <FileCheck className="w-4 h-4 text-white" />
              <span className="text-white font-medium">Ambiente seguro</span>
            </div>
          </div>

          {/* Barra de progresso - só mostra a partir da etapa 1 */}
          {etapaAtual > 0 && (
            <div className="mb-8">
              <CadastroProgress etapaAtual={etapaAtual} tipoPessoa={dados.tipoPessoa} />
            </div>
          )}

          {/* Formulário */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border p-6 md:p-8">
              {etapaAtual === 0 && (
                <EtapaSelecaoTipo
                  dados={dados}
                  atualizarDados={atualizarDados}
                  onProximo={proximaEtapa}
                />
              )}
              {etapaAtual === 1 && (
                <EtapaEmpresa
                  dados={dados}
                  atualizarDados={atualizarDados}
                  onProximo={proximaEtapa}
                  onAnterior={etapaAnterior}
                />
              )}
              {etapaAtual === 2 && (
                <EtapaResponsavel
                  dados={dados}
                  atualizarDados={atualizarDados}
                  onProximo={proximaEtapa}
                  onAnterior={etapaAnterior}
                />
              )}
              {/* Etapa de Licitação - só aparece para CNPJ */}
              {etapaAtual === 3 && dados.tipoPessoa === "cnpj" && (
                <EtapaLicitacao
                  dados={dados}
                  atualizarDados={atualizarDados}
                  onProximo={proximaEtapa}
                  onAnterior={etapaAnterior}
                />
              )}
              {etapaAtual === 4 && (
                <EtapaLogin
                  dados={dados}
                  atualizarDados={atualizarDados}
                  onProximo={proximaEtapa}
                  onAnterior={etapaAnterior}
                />
              )}
              {etapaAtual === 5 && (
                <EtapaRevisao
                  dados={dados}
                  onAnterior={etapaAnterior}
                  onFinalizar={finalizarCadastro}
                  onSubmit={async () => {
                    const { enviarCadastro } = await import("@/lib/api");
                    const res = await enviarCadastro({
                      ...dados,
                      tipoServico: dados.tipoServico || "novo",
                    });
                    if (!res.success || !res.protocolo) throw new Error(res.error || "Erro ao enviar.");
                    if (res.idPedido) setIdPedido(res.idPedido);
                    return { protocolo: res.protocolo };
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cadastro;
