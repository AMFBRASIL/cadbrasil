import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Shield, 
  TrendingUp, 
  Building2, 
  FileText, 
  Award, 
  ArrowRight, 
  DollarSign,
  Users,
  Landmark,
  BarChart3,
  BookOpen,
  AlertCircle,
  Briefcase,
  Globe,
  ShieldCheck,
  Target,
  Zap,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const VenderParaGoverno = () => {
  const vantagensVenderGoverno = [
    {
      icon: DollarSign,
      title: "Pagamento Garantido",
      description: "O governo é o maior comprador do país e paga em dia. Diferente do setor privado, o pagamento é garantido por lei após a entrega do produto ou serviço."
    },
    {
      icon: TrendingUp,
      title: "Mercado de Bilhões",
      description: "O governo federal movimenta mais de R$ 200 bilhões por ano em compras públicas. São milhares de oportunidades diárias em todos os segmentos."
    },
    {
      icon: BarChart3,
      title: "Contratos Recorrentes",
      description: "Muitos contratos governamentais são de longo prazo, com possibilidade de renovação por até 5 anos, garantindo receita previsível para sua empresa."
    },
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "Todas as compras seguem a Lei de Licitações (Lei 14.133/2021), garantindo transparência e igualdade de condições para todos os fornecedores."
    },
    {
      icon: Users,
      title: "Benefícios para ME e EPP",
      description: "Microempresas e Empresas de Pequeno Porte têm vantagens exclusivas: preferência em empate, licitações exclusivas e margens de preferência."
    },
    {
      icon: Globe,
      title: "Abrangência Nacional",
      description: "Venda para qualquer órgão federal do Brasil sem precisar de representante local. Tudo é feito de forma eletrônica pelo portal Comprasnet."
    }
  ];

  const segmentosAtivos = [
    { segmento: "Tecnologia e Informática", exemplos: "Computadores, softwares, serviços de TI, impressoras" },
    { segmento: "Material de Escritório", exemplos: "Papéis, canetas, mobiliário, equipamentos de escritório" },
    { segmento: "Saúde e Hospitalar", exemplos: "Medicamentos, equipamentos médicos, EPIs, materiais cirúrgicos" },
    { segmento: "Alimentação", exemplos: "Gêneros alimentícios, refeições coletivas, cestas básicas" },
    { segmento: "Construção Civil", exemplos: "Obras, reformas, manutenção predial, materiais de construção" },
    { segmento: "Serviços Gerais", exemplos: "Limpeza, vigilância, manutenção, transporte, logística" },
    { segmento: "Veículos e Peças", exemplos: "Automóveis, peças automotivas, combustíveis, manutenção de frota" },
    { segmento: "Comunicação e Marketing", exemplos: "Publicidade, gráficas, serviços de comunicação, eventos" }
  ];

  const modalidades = [
    {
      nome: "Pregão Eletrônico",
      descricao: "Modalidade mais utilizada pelo governo. Lances em tempo real pela internet. Ideal para bens e serviços comuns.",
      destaque: true
    },
    {
      nome: "Concorrência Eletrônica",
      descricao: "Para obras, serviços de engenharia e compras de grande valor. Processo mais complexo e detalhado."
    },
    {
      nome: "Dispensa de Licitação",
      descricao: "Compras de até R$ 50.000 para bens/serviços e R$ 100.000 para obras. Processo simplificado e rápido."
    },
    {
      nome: "Cotação Eletrônica",
      descricao: "Para compras de pequeno valor. Processo ágil e simplificado, ideal para empresas iniciantes."
    },
    {
      nome: "Leilão Eletrônico",
      descricao: "Para venda de bens inservíveis do governo ou concessões. Quem oferece o maior lance vence."
    },
    {
      nome: "Diálogo Competitivo",
      descricao: "Novidade da Nova Lei. Para projetos complexos onde o governo dialoga com fornecedores para definir a melhor solução."
    }
  ];

  const passosParaVender = [
    {
      numero: "01",
      titulo: "Faça o Cadastro SICAF",
      descricao: "O primeiro passo é cadastrar sua empresa no SICAF (Sistema de Cadastramento Unificado de Fornecedores). Este é o cadastro obrigatório para vender ao governo federal.",
      destaque: true
    },
    {
      numero: "02",
      titulo: "Regularize sua Empresa",
      descricao: "Mantenha CNPJ ativo, certidões negativas em dia (federal, estadual, municipal, FGTS, trabalhista) e documentação contábil atualizada."
    },
    {
      numero: "03",
      titulo: "Conheça seu Mercado",
      descricao: "Identifique quais órgãos compram seus produtos ou serviços. Use o Portal Nacional de Contratações Públicas (PNCP) e o Comprasnet para pesquisar."
    },
    {
      numero: "04",
      titulo: "Monitore as Licitações",
      descricao: "Acompanhe diariamente os editais publicados no Comprasnet e no PNCP. Filtre por seu segmento, região e valor."
    },
    {
      numero: "05",
      titulo: "Prepare sua Proposta",
      descricao: "Leia o edital com atenção, calcule seus custos com margem segura e prepare toda a documentação exigida antes do prazo."
    },
    {
      numero: "06",
      titulo: "Participe e Vença",
      descricao: "Envie sua proposta, participe da sessão de lances (no pregão) e, se vencer, formalize o contrato e entregue com qualidade."
    }
  ];

  const faqItems = [
    {
      pergunta: "Qualquer empresa pode vender para o governo?",
      resposta: "Sim! Qualquer empresa com CNPJ ativo pode vender para o governo, independente do porte. Microempresas (ME) e Empresas de Pequeno Porte (EPP) ainda contam com benefícios exclusivos nas licitações."
    },
    {
      pergunta: "Quanto custa para se cadastrar no SICAF?",
      resposta: "O cadastro no SICAF em si é gratuito pelo portal do governo. Porém, a CADBRASIL oferece um serviço completo de assessoria para garantir que tudo seja feito corretamente e em tempo recorde, evitando erros que podem atrasar semanas."
    },
    {
      pergunta: "MEI pode participar de licitações?",
      resposta: "Sim! O Microempreendedor Individual (MEI) pode participar de licitações e tem os mesmos benefícios das microempresas, como preferência em empates e licitações exclusivas para valores até R$ 80.000."
    },
    {
      pergunta: "Preciso ir presencialmente a algum órgão?",
      resposta: "Não. Hoje, 100% do processo é digital. O cadastro SICAF, a participação em pregões eletrônicos e até a assinatura de contratos podem ser feitos pela internet."
    },
    {
      pergunta: "Quanto tempo leva para começar a vender?",
      resposta: "Com a CADBRASIL, seu cadastro SICAF pode ficar pronto em até 3 horas. Após isso, você já pode participar de licitações imediatamente."
    },
    {
      pergunta: "O governo paga em dia?",
      resposta: "Sim. Por lei, o governo tem prazo de até 30 dias para pagamento após o recebimento definitivo do produto ou serviço. Na prática, muitos órgãos pagam em 15 a 20 dias."
    },
    {
      pergunta: "Posso vender para estados e municípios também?",
      resposta: "Sim! Além do governo federal (que usa o SICAF), você pode se cadastrar em portais estaduais e municipais. A CADBRASIL auxilia em todos os níveis de governo."
    },
    {
      pergunta: "O que acontece se eu não cumprir o contrato?",
      resposta: "O descumprimento pode gerar multas, suspensão do direito de licitar e até declaração de inidoneidade. Por isso, é fundamental só assumir contratos que sua empresa consiga cumprir integralmente."
    }
  ];

  const numerosGoverno = [
    { valor: "R$ 200 bi+", descricao: "em compras anuais" },
    { valor: "500 mil+", descricao: "licitações por ano" },
    { valor: "300 mil+", descricao: "fornecedores ativos" },
    { valor: "30 dias", descricao: "prazo máximo de pagamento" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Como Vender para o Governo em 2026 - Guia Completo"
        description="Aprenda como vender para o governo federal, estadual e municipal. Guia completo com passo a passo, modalidades de licitação, documentos necessários e dicas para iniciantes. Cadastro SICAF rápido com a CADBRASIL."
        canonical="/vender-para-o-governo"
        keywords="vender para o governo, como vender para o governo, licitações públicas, fornecedor do governo, compras públicas, pregão eletrônico, SICAF, cadastro fornecedor governo, licitação 2026, como participar de licitação"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Vender para o Governo", url: "/vender-para-o-governo" }
        ]}
        ogType="article"
        article={{
          publishedTime: "2026-01-29T00:00:00Z",
          modifiedTime: "2026-01-29T00:00:00Z",
          author: "CADBRASIL",
          section: "Guia",
          tags: ["Vender para o Governo", "Licitações", "SICAF", "Compras Públicas", "Fornecedor Governo"]
        }}
        faq={faqItems.map(item => ({ question: item.pergunta, answer: item.resposta }))}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Como Vender para o Governo em 2026 - Guia Completo",
          description: "Guia completo sobre como vender para o governo federal, estadual e municipal. Passo a passo, modalidades e documentos necessários.",
          author: {
            "@type": "Organization",
            name: "CADBRASIL"
          },
          publisher: {
            "@type": "Organization",
            name: "CADBRASIL",
            url: "https://cadbrasil.com.br"
          }
        }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-white/80 font-medium text-xs uppercase tracking-widest mb-4">
                Guia Completo 2026 - Atualizado com a Nova Lei de Licitações
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Como Vender para o Governo
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Descubra como sua empresa pode faturar vendendo para o maior comprador do Brasil. 
                Mais de R$ 200 bilhões em compras públicas todos os anos esperando por você.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {numerosGoverno.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white">{item.valor}</div>
                    <div className="text-white/70 text-sm">{item.descricao}</div>
                  </div>
                ))}
              </div>
              <Link to="/cadastro?tipo=novo">
                <Button variant="cta" size="lg" className="group">
                  Quero Vender para o Governo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* O que é vender para o governo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O Que Significa Vender para o Governo?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Vender para o governo significa fornecer produtos, serviços ou obras para órgãos públicos 
                federais, estaduais e municipais. Isso inclui ministérios, autarquias, universidades, 
                hospitais públicos, forças armadas, prefeituras e muito mais.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                O processo é feito por meio de <strong className="text-foreground">licitações públicas</strong>, 
                que são procedimentos administrativos onde o governo seleciona a proposta mais vantajosa. 
                Com a <strong className="text-foreground">Nova Lei de Licitações (Lei 14.133/2021)</strong>, 
                o processo ficou mais digital, transparente e acessível para empresas de todos os portes.
              </p>
              <div className="bg-primary/5 border-2 border-primary/20 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <Landmark className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Você sabia?</h3>
                    <p className="text-muted-foreground text-sm">
                      O governo brasileiro é o <strong className="text-foreground">maior comprador do país</strong>. 
                      São mais de 500 mil processos de compras por ano, abrangendo praticamente todos os 
                      segmentos da economia: de material de escritório a equipamentos hospitalares, de 
                      serviços de TI a obras de infraestrutura.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Por que vender para o governo */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Por Que Vender para o Governo?
              </h2>
              <p className="text-muted-foreground">
                Conheça as vantagens que fazem milhares de empresas buscarem o mercado de compras públicas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {vantagensVenderGoverno.map((vantagem, index) => (
                <div
                  key={index}
                  className="bg-card p-6 border border-border hover:border-primary/30 transition-colors rounded-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <vantagem.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {vantagem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {vantagem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O que posso vender - Segmentos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  O Que Posso Vender para o Governo?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Praticamente todo tipo de produto e serviço é comprado pelo governo. 
                  Veja os segmentos mais ativos:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {segmentosAtivos.map((item, index) => (
                  <div key={index} className="bg-card border border-border p-5 rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{item.segmento}</h3>
                        <p className="text-muted-foreground text-sm">{item.exemplos}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Não encontrou seu segmento?</strong> A lista acima é apenas uma amostra. 
                  O governo compra de tudo: desde uniformes e alimentos até consultorias especializadas e 
                  equipamentos científicos. Entre em contato e descubra as oportunidades no seu ramo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modalidades de Licitação */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Modalidades de Licitação
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Conheça as formas de compra que o governo utiliza segundo a Nova Lei de Licitações (14.133/2021)
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modalidades.map((modalidade, index) => (
                  <div 
                    key={index} 
                    className={`bg-card border p-5 rounded-lg ${
                      modalidade.destaque 
                        ? 'border-primary/50 ring-2 ring-primary/10' 
                        : 'border-border'
                    }`}
                  >
                    {modalidade.destaque && (
                      <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-3">
                        MAIS COMUM
                      </span>
                    )}
                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {modalidade.nome}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {modalidade.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Passo a Passo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Passo a Passo: Como Começar a Vender
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Siga este guia e comece a fornecer para o governo em poucos dias
                </p>
              </div>

              <div className="space-y-4">
                {passosParaVender.map((passo, index) => (
                  <div 
                    key={index} 
                    className={`bg-card border rounded-lg overflow-hidden ${
                      passo.destaque 
                        ? 'border-primary/50 ring-2 ring-primary/10' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-start gap-4 p-5">
                      <div className={`w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 rounded-lg ${
                        passo.destaque 
                          ? 'bg-primary text-white' 
                          : 'bg-muted text-foreground'
                      }`}>
                        {passo.numero}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-lg mb-1">
                          {passo.titulo}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {passo.descricao}
                        </p>
                        {passo.destaque && (
                          <Link to="/cadastro?tipo=novo">
                            <Button className="mt-3 gap-2 group" size="sm">
                              Fazer Cadastro SICAF Agora
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requisitos - O que preciso */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                O Que Preciso para Vender ao Governo?
              </h2>
              <p className="text-white/70 text-center mb-10 max-w-2xl mx-auto">
                Requisitos básicos que toda empresa precisa atender
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documentação Obrigatória
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "CNPJ ativo e regular",
                      "Contrato Social ou Estatuto atualizado",
                      "Certidões negativas (federal, estadual, municipal)",
                      "Regularidade com FGTS e INSS",
                      "Certidão Negativa de Débitos Trabalhistas",
                      "Balanço Patrimonial e DRE"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-white/80 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Cadastros e Certificações
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Cadastro SICAF (obrigatório para governo federal)",
                      "Certificado Digital e-CNPJ (para assinar propostas)",
                      "Cadastro no Comprasnet / gov.br",
                      "Cadastro no PNCP (Portal Nacional de Contratações)",
                      "Registro em portais estaduais/municipais (se aplicável)",
                      "Atestados de Capacidade Técnica (recomendado)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-white/80 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-white/70 text-sm mb-4">
                  Parece muita coisa? A CADBRASIL resolve tudo para você!
                </p>
                <Link to="/cadastro?tipo=novo">
                  <Button variant="cta" size="lg" className="group">
                    Começar Meu Cadastro SICAF
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios ME/EPP */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Benefícios Exclusivos para Pequenas Empresas
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A Nova Lei de Licitações garante vantagens especiais para Microempresas (ME), 
                  Empresas de Pequeno Porte (EPP) e MEIs
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Target,
                    titulo: "Licitações Exclusivas",
                    descricao: "Licitações de até R$ 80.000 são exclusivas para ME, EPP e MEI. Só pequenas empresas podem participar."
                  },
                  {
                    icon: Zap,
                    titulo: "Direito de Preferência",
                    descricao: "Em caso de empate (diferença de até 5%), a pequena empresa tem prioridade para cobrir a proposta."
                  },
                  {
                    icon: BookOpen,
                    titulo: "Regularização Fiscal Posterior",
                    descricao: "Mesmo com pendências fiscais, a ME/EPP pode participar e tem prazo de 5 dias úteis para regularizar."
                  },
                  {
                    icon: Award,
                    titulo: "Subcontratação Obrigatória",
                    descricao: "Em licitações acima de R$ 80.000, o edital pode exigir subcontratação de até 25% do objeto para ME/EPP."
                  }
                ].map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-card border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <beneficio.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{beneficio.titulo}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{beneficio.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SICAF - Cadastro obrigatório */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border-2 border-primary/20 p-8 md:p-10 rounded-lg">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Cadastro SICAF: Seu Passaporte para Vender ao Governo
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      O <strong className="text-foreground">SICAF (Sistema de Cadastramento Unificado de Fornecedores)</strong> é 
                      o cadastro obrigatório para qualquer empresa que deseja fornecer para o governo federal. 
                      Sem ele, sua empresa não consegue participar de pregões eletrônicos e demais licitações.
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      A CADBRASIL é especialista em cadastro SICAF há mais de 15 anos. Nós cuidamos de 
                      todo o processo para você: análise documental, preenchimento, envio e acompanhamento 
                      até a aprovação. <strong className="text-foreground">Seu cadastro pronto em até 3 horas.</strong>
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">15+</div>
                        <div className="text-xs text-muted-foreground">anos de experiência</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">10.000+</div>
                        <div className="text-xs text-muted-foreground">empresas cadastradas</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <div className="text-xs text-muted-foreground">de aprovação</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/cadastro?tipo=novo">
                        <Button size="lg" className="group w-full sm:w-auto">
                          Fazer Cadastro SICAF
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Link to="/cadastro?tipo=renovacao">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                          Renovar Cadastro SICAF
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Perguntas Frequentes
                </h2>
                <p className="text-muted-foreground">
                  Tire suas dúvidas sobre vender para o governo
                </p>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details 
                    key={index} 
                    className="bg-card border border-border rounded-lg group"
                  >
                    <summary className="p-5 cursor-pointer font-semibold text-foreground flex items-center gap-3 hover:text-primary transition-colors list-none">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="flex-1">{item.pergunta}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-5 pt-0 ml-8">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.resposta}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para Vender para o Governo?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              A CADBRASIL cuida de todo o processo de cadastramento SICAF para sua empresa. 
              Comece agora e tenha acesso ao maior mercado de compras do Brasil.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro?tipo=novo">
                <Button variant="cta" size="lg" className="group">
                  Iniciar Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://wa.me/551121220202?text=Olá! Quero saber como vender para o governo." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
                  Falar com Especialista
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VenderParaGoverno;
