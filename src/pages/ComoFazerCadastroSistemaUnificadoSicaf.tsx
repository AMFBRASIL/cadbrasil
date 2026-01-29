import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  FileText,
  Upload,
  Search,
  Award,
  ArrowRight,
  AlertCircle,
  Building2,
  Shield,
  Sparkles,
  BookOpen,
  FileCheck,
  Headphones,
  Zap,
  Scale,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const ROTA = "/como-fazer-o-cadastro-no-sistema-de-cadastramento-unificado-sicaf";

const ComoFazerCadastroSistemaUnificadoSicaf = () => {
  const etapas = [
    {
      numero: "01",
      icon: Search,
      titulo: "Acesse o portal CADBRASIL",
      descricao: "Entre em cadbrasil.com.br e acesse a área de cadastro SICAF. Escolha entre novo cadastro ou renovação.",
    },
    {
      numero: "02",
      icon: FileText,
      titulo: "Preencha os dados",
      descricao: "Informe dados da empresa (ou CPF), do responsável legal, endereço e e-mail de acesso. A busca por CNPJ preenche automaticamente quando disponível.",
    },
    {
      numero: "03",
      icon: Shield,
      titulo: "Análise e validação",
      descricao: "Nossa equipe valida as informações e orienta sobre documentação. Você recebe o protocolo e as instruções para seguir.",
    },
    {
      numero: "04",
      icon: Upload,
      titulo: "Pagamento da taxa anual",
      descricao: "Gere a guia de pagamento (PIX ou Boleto) e efetue o pagamento. Após a confirmação, a etapa de documentação é liberada.",
    },
    {
      numero: "05",
      icon: FileCheck,
      titulo: "Envio de documentos",
      descricao: "Envie os documentos exigidos pelo SICAF através do nosso sistema seguro. Acompanhe o status do processamento.",
    },
    {
      numero: "06",
      icon: Award,
      titulo: "Aprovação e acesso",
      descricao: "Com o cadastro aprovado, você acessa o Portal do Fornecedor e pode participar de licitações federais.",
    },
  ];

  const servicos = [
    {
      icon: Sparkles,
      titulo: "Leitura de edital com IA",
      descricao: "Análise de editais com Inteligência Artificial para identificar requisitos, prazos e oportunidades.",
    },
    {
      icon: Scale,
      titulo: "Gestão de contratos jurídicos",
      descricao: "Assessoria na gestão e acompanhamento de contratos administrativos e análise de cláusulas.",
    },
    {
      icon: BookOpen,
      titulo: "Conteúdo de licitações",
      descricao: "Consultoria em processos licitatórios, análise de editais, elaboração de propostas e estratégias.",
    },
    {
      icon: Building2,
      titulo: "Cadastro no SICAF e outros órgãos",
      descricao: "Cadastramento e renovação no SICAF e em outros sistemas governamentais necessários para licitar.",
    },
    {
      icon: FileCheck,
      titulo: "Gestão de certidões e documentos",
      descricao: "Organização, controle de validade e renovação de certidões negativas e documentos para licitações.",
    },
    {
      icon: Headphones,
      titulo: "Suporte",
      descricao: "Suporte técnico e orientação durante todo o processo de cadastramento e participação em licitações.",
    },
    {
      icon: Zap,
      titulo: "Atendimento digital rápido",
      descricao: "Plataforma digital com atendimento ágil e acompanhamento em tempo real dos processos.",
    },
  ];

  const documentosBasicos = [
    "Contrato Social ou Estatuto (atualizado)",
    "CNPJ ativo e regularizado",
    "Inscrição Estadual e Municipal (se aplicável)",
    "Balanço Patrimonial e DRE",
  ];

  const certidoes = [
    "Certidão Negativa de Débitos Federais",
    "Certidão Negativa Estadual (SEFAZ)",
    "Certidão Negativa Municipal",
    "Certidão de Regularidade FGTS",
    "Certidão de Regularidade Trabalhista (CNDT)",
  ];

  const precos = [
    { item: "Licença anual da plataforma", valor: "R$ 985,00" },
    { item: "Manutenção gratuita", valor: "3 meses" },
    { item: "Licença de manutenção (após 3 meses)", valor: "R$ 155,00/mês" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Como Fazer o Cadastro no Sistema de Cadastramento Unificado (SICAF)"
        description="Guia completo: todos os serviços da CADBRASIL, o que é o SICAF e como cadastrar sua empresa no Sistema de Cadastramento Unificado de Fornecedores com assessoria especializada. Licença R$ 985/ano, suporte e gestão de certidões."
        canonical={ROTA}
        keywords="SICAF, Sistema de Cadastramento Unificado de Fornecedores, cadastro SICAF, como cadastrar SICAF, CADBRASIL, licitações federais, assessoria SICAF, certificação fornecedor governo"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Como Fazer Cadastro no SICAF", url: "/como-fazer-cadastro-no-sicaf" },
          { name: "Cadastro no Sistema Unificado SICAF", url: ROTA },
        ]}
        ogType="article"
        article={{
          publishedTime: "2026-01-26T00:00:00Z",
          modifiedTime: "2026-01-26T00:00:00Z",
          author: "CADBRASIL",
          section: "Guia",
          tags: ["SICAF", "Sistema Unificado", "Cadastro", "Licitações", "CADBRASIL"],
        }}
        faq={[
          {
            question: "O que é o SICAF?",
            answer: "O SICAF (Sistema de Cadastramento Unificado de Fornecedores) é o sistema oficial do Governo Federal para cadastro e habilitação de empresas que desejam participar de licitações públicas federais. O cadastro é obrigatório para fornecer bens ou serviços a órgãos federais.",
          },
          {
            question: "Quais serviços a CADBRASIL oferece?",
            answer: "A CADBRASIL oferece: leitura de edital com IA, gestão de contratos jurídicos, conteúdo de licitações, cadastro no SICAF e outros órgãos, gestão de certidões e documentos, suporte e atendimento digital rápido.",
          },
          {
            question: "Quanto custa o cadastro SICAF com a CADBRASIL?",
            answer: "A licença anual da plataforma é R$ 985,00, com 3 meses de manutenção gratuita. Após esse período, a licença de manutenção é R$ 155,00/mês.",
          },
          {
            question: "Quanto tempo leva o cadastro?",
            answer: "Com a CADBRASIL, o processo pode ser concluído em até 3 horas (tempo médio), com análise especializada e envio de documentação pelo sistema. O prazo final depende da análise dos órgãos competentes.",
          },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como Fazer o Cadastro no Sistema de Cadastramento Unificado (SICAF)",
          description: "Guia completo: todos os serviços da CADBRASIL, o que é o SICAF e como cadastrar sua empresa no Sistema de Cadastramento Unificado de Fornecedores com assessoria especializada.",
          totalTime: "PT3H",
          estimatedCost: { "@type": "MonetaryAmount", currency: "BRL", value: "985.00" },
          step: [
            { "@type": "HowToStep", name: "Acesse o portal CADBRASIL", text: "Entre em cadbrasil.com.br e acesse a área de cadastro SICAF. Escolha entre novo cadastro ou renovação." },
            { "@type": "HowToStep", name: "Preencha os dados", text: "Informe dados da empresa (ou CPF), do responsável legal, endereço e e-mail de acesso. A busca por CNPJ preenche automaticamente quando disponível." },
            { "@type": "HowToStep", name: "Análise e validação", text: "Nossa equipe valida as informações e orienta sobre documentação. Você recebe o protocolo e as instruções para seguir." },
            { "@type": "HowToStep", name: "Pagamento da taxa anual", text: "Gere a guia de pagamento (PIX ou Boleto) e efetue o pagamento. Após a confirmação, a etapa de documentação é liberada." },
            { "@type": "HowToStep", name: "Envio de documentos", text: "Envie os documentos exigidos pelo SICAF através do nosso sistema seguro. Acompanhe o status do processamento." },
            { "@type": "HowToStep", name: "Aprovação e acesso", text: "Com o cadastro aprovado, você acessa o Portal do Fornecedor e pode participar de licitações federais." },
          ],
        }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-white/80 font-medium text-xs uppercase tracking-widest mb-4">
                Guia completo
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Como Fazer o Cadastro no Sistema de Cadastramento Unificado (SICAF)
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Conheça todos os serviços da CADBRASIL, o que é o SICAF e como cadastrar sua empresa 
                no Sistema de Cadastramento Unificado de Fornecedores com assessoria especializada.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">3h</div>
                  <div className="text-white/70 text-sm">Tempo médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">R$ 985</div>
                  <div className="text-white/70 text-sm">Licença anual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-white/70 text-sm">Aprovação</div>
                </div>
              </div>
              <Link to="/cadastro?tipo=novo">
                <Button variant="cta" size="lg" className="group">
                  Iniciar Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* O que é o SICAF */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que é o SICAF?
              </h2>
              <p className="text-muted-foreground mb-6">
                O <strong className="text-foreground">SICAF (Sistema de Cadastramento Unificado de Fornecedores)</strong> é 
                o sistema oficial do Governo Federal para cadastramento e habilitação de empresas que desejam participar 
                de licitações públicas federais. O cadastro é <strong className="text-foreground">obrigatório</strong> para 
                fornecer produtos ou serviços a órgãos federais.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Importante:</strong> A CADBRASIL é uma empresa privada de assessoria. 
                  Não somos órgão público nem possuímos vínculo com o Governo. Facilitamos o processo de cadastramento 
                  junto aos órgãos competentes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Todos os serviços da CADBRASIL */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Todos os serviços da CADBRASIL
              </h2>
              <p className="text-muted-foreground">
                Conheça em detalhes o que oferecemos para sua empresa
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {servicos.map((s, i) => (
                <div key={i} className="bg-card p-6 border border-border rounded-lg flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{s.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{s.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como cadastrar no SICAF com a CADBRASIL */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Como cadastrar no SICAF junto à CADBRASIL
              </h2>
              <p className="text-muted-foreground">
                Passo a passo do cadastramento no Sistema de Cadastramento Unificado
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {etapas.map((etapa, i) => (
                <div key={i} className="bg-card p-6 border border-border rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-bold rounded-lg">
                      {etapa.numero}
                    </div>
                    <etapa.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{etapa.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{etapa.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentos */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Documentos necessários para o cadastro SICAF
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card p-6 border border-border rounded-lg">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Documentos da empresa
                  </h3>
                  <ul className="space-y-3">
                    {documentosBasicos.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card p-6 border border-border rounded-lg">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Certidões
                  </h3>
                  <ul className="space-y-3">
                    {certidoes.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Nossa equipe orienta sobre a documentação específica do seu caso. MEI e PF têm exigências simplificadas.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Investimento
              </h2>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-4 text-left text-foreground font-semibold">Item</th>
                      <th className="p-4 text-right text-foreground font-semibold">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {precos.map((p, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-4 text-foreground">{p.item}</td>
                        <td className="p-4 text-right text-primary font-medium">{p.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Pagamento via PIX ou Boleto. Após a confirmação, o acesso ao Portal do Fornecedor é liberado.
              </p>
            </div>
          </div>
        </section>

        {/* Garantia e CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Garantia de resultado
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Caso o cadastro não seja aprovado por motivo atribuível à nossa assessoria, 
              realizamos o reembolso integral. Taxa de aprovação de 98%.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro">
                <Button variant="cta" size="lg" className="group bg-white text-primary hover:bg-white/90">
                  Iniciar Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contato">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComoFazerCadastroSistemaUnificadoSicaf;
