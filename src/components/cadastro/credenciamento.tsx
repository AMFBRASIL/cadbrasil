import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  Upload, 
  FileSearch, 
  Award, 
  Building2, 
  Mail, 
  Phone,
  MapPin,
  Lock,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  Shield,
  FileText
} from "lucide-react";

// Interface para os dados do protocolo
interface DadosProtocolo {
  protocolo: string;
  dataCriacao: string;
  status: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
  responsavel: string;
  cpfResponsavel: string;
  tipoServico: string;
  modalidadeLicitacao: string;
}

// Dados padrão (quando não vier via URL)
const dadosPadrao: DadosProtocolo = {
  protocolo: "CAD-0000-0000-0000",
  dataCriacao: new Date().toLocaleString("pt-BR"),
  status: "Aguardando Documentação",
  cnpj: "-",
  razaoSocial: "-",
  nomeFantasia: "-",
  email: "-",
  telefone: "-",
  endereco: "-",
  cidade: "-",
  uf: "-",
  cep: "-",
  responsavel: "-",
  cpfResponsavel: "-",
  tipoServico: "Novo Cadastro SICAF",
  modalidadeLicitacao: "-"
};

const etapasProcesso = [
  {
    id: 1,
    titulo: "Solicitação Recebida",
    descricao: "Seu pré-cadastro foi processado com sucesso",
    status: "concluida",
    icon: CheckCircle
  },
  {
    id: 2,
    titulo: "Enviar Documentação SICAF",
    descricao: "Acesse o Portal do Fornecedor para enviar os documentos necessários",
    status: "atual",
    icon: Upload
  },
  {
    id: 3,
    titulo: "Análise de Documentos",
    descricao: "Nossa equipe irá verificar toda a documentação enviada",
    status: "pendente",
    icon: FileSearch
  },
  {
    id: 4,
    titulo: "Aprovação Final",
    descricao: "Credenciamento aprovado e liberado no SICAF",
    status: "pendente",
    icon: Award
  }
];

const documentosNecessarios = [
  "Contrato Social ou Requerimento de Empresário",
  "Certidão Negativa de Débitos Federais",
  "Certidão de Regularidade do FGTS",
  "Certidão Negativa de Débitos Trabalhistas",
  "Balanço Patrimonial e DRE",
  "Documentos pessoais do responsável legal"
];

const Credenciamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dadosProtocolo, setDadosProtocolo] = useState<DadosProtocolo>(dadosPadrao);

  // Carregar dados via state do React Router ou sessionStorage (fallback)
  useEffect(() => {
    // Primeiro, tentar obter os dados do state (passados via navigate)
    const stateData = location.state as Record<string, string> | null;
    
    if (stateData && stateData.protocolo) {
      // Dados vieram via state do navigate
      setDadosProtocolo({
        protocolo: stateData.protocolo,
        dataCriacao: stateData.dataCriacao || new Date().toLocaleString("pt-BR"),
        status: "Aguardando Documentação",
        cnpj: stateData.cnpj || "-",
        razaoSocial: stateData.razaoSocial || "-",
        nomeFantasia: stateData.nomeFantasia || "-",
        email: stateData.email || "-",
        telefone: stateData.telefone || "-",
        endereco: stateData.endereco || "-",
        cidade: stateData.cidade || "-",
        uf: stateData.uf || "-",
        cep: stateData.cep || "-",
        responsavel: stateData.responsavel || "-",
        cpfResponsavel: stateData.cpfResponsavel || "-",
        tipoServico: stateData.tipoServico || "Novo Cadastro SICAF",
        modalidadeLicitacao: stateData.modalidadeLicitacao || "-"
      });
    } else {
      // Fallback: tentar obter do sessionStorage (caso usuário atualize a página)
      const storedData = sessionStorage.getItem("dadosCredenciamento");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setDadosProtocolo({
            protocolo: parsedData.protocolo || dadosPadrao.protocolo,
            dataCriacao: parsedData.dataCriacao || new Date().toLocaleString("pt-BR"),
            status: "Aguardando Documentação",
            cnpj: parsedData.cnpj || "-",
            razaoSocial: parsedData.razaoSocial || "-",
            nomeFantasia: parsedData.nomeFantasia || "-",
            email: parsedData.email || "-",
            telefone: parsedData.telefone || "-",
            endereco: parsedData.endereco || "-",
            cidade: parsedData.cidade || "-",
            uf: parsedData.uf || "-",
            cep: parsedData.cep || "-",
            responsavel: parsedData.responsavel || "-",
            cpfResponsavel: parsedData.cpfResponsavel || "-",
            tipoServico: parsedData.tipoServico || "Novo Cadastro SICAF",
            modalidadeLicitacao: parsedData.modalidadeLicitacao || "-"
          });
        } catch (e) {
          console.error("Erro ao parsear dados do sessionStorage:", e);
          // Se não houver dados válidos, redirecionar para o cadastro
          navigate("/cadastro");
        }
      } else {
        // Sem dados disponíveis, redirecionar para o cadastro
        navigate("/cadastro");
      }
    }
  }, [location.state, navigate]);

  // Abrir portal do fornecedor em nova aba
  const handleEnviarDocumentacao = () => {
    window.open("https://fornecedor.cadbr.com.br", "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Credenciamento SICAF | CADBRASIL</title>
        <meta
          name="description"
          content="Acompanhe seu processo de credenciamento no SICAF. Envie sua documentação e finalize seu cadastro para participar de licitações públicas."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/30">
        {/* Header da página - Estilo Protocolo */}
        <section className="bg-primary text-white">
          <div className="container mx-auto px-4 py-8 md:py-10">
            <div className="max-w-4xl mx-auto">
              {/* Linha superior */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-white/70" />
                    <p className="text-white/70 text-sm font-medium">Protocolo CADBRASIL Gerado</p>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-wider">
                    {dadosProtocolo.protocolo}
                  </h1>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-white/70 text-sm flex items-center gap-1.5 md:justify-end mb-2">
                    <Clock className="w-4 h-4" />
                    {dadosProtocolo.dataCriacao}
                  </p>
                  <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 text-sm font-bold rounded-sm">
                    <span className="w-2.5 h-2.5 bg-accent-foreground/70 rounded-full animate-pulse" />
                    {dadosProtocolo.status}
                  </span>
                </div>
              </div>

              {/* Dados resumidos em grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">CNPJ</p>
                    <p className="font-semibold text-white">{dadosProtocolo.cnpj}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Razão Social</p>
                    <p className="font-semibold text-white truncate max-w-[180px]">{dadosProtocolo.razaoSocial}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">E-mail</p>
                    <p className="font-semibold text-white truncate max-w-[180px]">{dadosProtocolo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Telefone</p>
                    <p className="font-semibold text-white">{dadosProtocolo.telefone}</p>
                  </div>
                </div>
              </div>

              {/* Tipo de serviço */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
                <span className="bg-white/10 text-white/90 px-3 py-1.5 text-sm font-medium rounded-sm flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {dadosProtocolo.tipoServico}
                </span>
                <span className="bg-white/10 text-white/90 px-3 py-1.5 text-sm font-medium rounded-sm">
                  {dadosProtocolo.modalidadeLicitacao}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coluna Principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Card CTA Principal */}
                <div className="bg-primary/5 border-2 border-primary/30 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Upload className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground mb-2">
                        Próximo Passo: Enviar Documentação
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Para concluir seu credenciamento no SICAF, acesse o Portal do Fornecedor 
                        e envie toda a documentação necessária. Nossa equipe irá analisar e 
                        finalizar seu cadastro.
                      </p>
                      <Button 
                        size="lg" 
                        className="gap-2 w-full sm:w-auto"
                        onClick={handleEnviarDocumentacao}
                      >
                        <Upload className="w-5 h-5" />
                        Enviar Documentação SICAF
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Etapas do Processo */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-foreground">Etapas do Credenciamento</h2>
                  </div>
                  <div className="p-6">
                    <div className="relative">
                      {/* Linha conectora */}
                      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />

                      <div className="space-y-6">
                        {etapasProcesso.map((etapa) => {
                          const Icon = etapa.icon;
                          const isConcluida = etapa.status === "concluida";
                          const isAtual = etapa.status === "atual";
                          const isPendente = etapa.status === "pendente";

                          return (
                            <div 
                              key={etapa.id} 
                              className={`flex gap-4 relative ${isPendente ? 'opacity-50' : ''}`}
                            >
                              <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                                  isConcluida 
                                    ? 'bg-primary text-white' 
                                    : isAtual 
                                      ? 'bg-primary text-white ring-4 ring-primary/20' 
                                      : 'bg-muted text-muted-foreground border border-border'
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 pt-1">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <h4 className={`font-semibold ${isConcluida || isAtual ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {etapa.titulo}
                                  </h4>
                                  {isConcluida && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                                      <CheckCircle className="w-3 h-3" />
                                      Concluído
                                    </span>
                                  )}
                                  {isAtual && (
                                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded font-medium">
                                      Em andamento
                                    </span>
                                  )}
                                  {isPendente && (
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Lock className="w-3 h-3" />
                                      Aguardando
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm mt-1 ${isPendente ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                  {etapa.descricao}
                                </p>
                                
                                {/* Botão na etapa atual */}
                                {isAtual && (
                                  <Button 
                                    className="mt-3 gap-2" 
                                    onClick={handleEnviarDocumentacao}
                                  >
                                    <Upload className="w-4 h-4" />
                                    Acessar Portal
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documentos Necessários */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-accent" />
                    <h2 className="font-bold text-foreground">Documentos Necessários</h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {documentosNecessarios.map((doc, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <span className="text-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted/50 rounded">
                      💡 Todos os documentos devem estar válidos e legíveis. Nossa equipe 
                      pode solicitar documentos adicionais conforme necessário.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Dados da Empresa */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b border-border">
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      Dados da Empresa
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">CNPJ</p>
                      <p className="font-medium text-foreground">{dadosProtocolo.cnpj}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Razão Social</p>
                      <p className="font-medium text-foreground">{dadosProtocolo.razaoSocial}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Nome Fantasia</p>
                      <p className="font-medium text-foreground">{dadosProtocolo.nomeFantasia}</p>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Endereço
                      </p>
                      <p className="text-sm text-foreground mt-1">
                        {dadosProtocolo.endereco}<br />
                        {dadosProtocolo.cidade} - {dadosProtocolo.uf}<br />
                        CEP: {dadosProtocolo.cep}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dados do Responsável */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b border-border">
                    <h3 className="font-bold text-foreground text-sm">Responsável Legal</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Nome</p>
                      <p className="font-medium text-foreground">{dadosProtocolo.responsavel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">CPF</p>
                      <p className="font-medium text-foreground">{dadosProtocolo.cpfResponsavel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        E-mail
                      </p>
                      <p className="text-sm text-foreground">{dadosProtocolo.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Telefone
                      </p>
                      <p className="text-sm text-foreground">{dadosProtocolo.telefone}</p>
                    </div>
                  </div>
                </div>

                {/* Detalhes do Serviço */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b border-border">
                    <h3 className="font-bold text-foreground text-sm">Detalhes do Serviço</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Tipo de Serviço</p>
                      <p className="font-medium text-foreground">{dadosProtocolo.tipoServico}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Modalidade</p>
                      <p className="font-medium text-foreground">{dadosProtocolo.modalidadeLicitacao}</p>
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b border-border">
                    <h3 className="font-bold text-foreground text-sm">Precisa de Ajuda?</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <a
                      href="https://wa.me/551121220202?text=Olá! Preciso de ajuda com meu credenciamento SICAF."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">WhatsApp</div>
                        <div className="text-muted-foreground text-xs">(11) 2122-0202</div>
                      </div>
                    </a>
                    <a
                      href="tel:+551121220202"
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">Telefone</div>
                        <div className="text-muted-foreground text-xs">(11) 2122-0202</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Credenciamento;
