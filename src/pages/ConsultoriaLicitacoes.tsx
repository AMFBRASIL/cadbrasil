import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Search, FileText, Users, Shield, BarChart3, Brain, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const ConsultoriaLicitacoes = () => {
  const servicos = [
    {
      icon: Search,
      title: "Análise de Editais",
      description: "Análise completa de editais para identificar oportunidades e requisitos.",
    },
    {
      icon: FileText,
      title: "Elaboração de Propostas",
      description: "Suporte na elaboração de propostas técnicas e comerciais competitivas.",
    },
    {
      icon: Brain,
      title: "Inteligência de Mercado",
      description: "Monitoramento de oportunidades e análise da concorrência.",
    },
    {
      icon: Shield,
      title: "Compliance",
      description: "Orientação sobre conformidade legal e documental.",
    },
    {
      icon: BarChart3,
      title: "Estratégia de Preços",
      description: "Apoio na definição de estratégias de precificação competitiva.",
    },
    {
      icon: Users,
      title: "Acompanhamento",
      description: "Suporte durante todo o processo licitatório.",
    },
  ];

  const beneficios = [
    "Aumento da taxa de sucesso em licitações",
    "Redução de tempo na preparação de propostas",
    "Identificação de oportunidades relevantes",
    "Minimização de riscos de desclassificação",
    "Acesso a especialistas em licitações",
    "Suporte jurídico especializado",
  ];

  const etapas = [
    {
      numero: "01",
      titulo: "Diagnóstico",
      descricao: "Análise do perfil da empresa e identificação de oportunidades no mercado de licitações.",
    },
    {
      numero: "02",
      titulo: "Planejamento",
      descricao: "Definição de estratégias e cronograma para participação em licitações.",
    },
    {
      numero: "03",
      titulo: "Execução",
      descricao: "Acompanhamento e suporte durante todo o processo licitatório.",
    },
    {
      numero: "04",
      titulo: "Análise",
      descricao: "Avaliação dos resultados e identificação de melhorias contínuas.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Consultoria em Licitações"
        description="Consultoria especializada em licitações públicas. Análise de editais, elaboração de propostas e acompanhamento completo do processo licitatório."
        canonical="/consultoria-licitacoes"
        keywords="consultoria licitações, assessoria licitações, análise editais, elaboração propostas, pregão eletrônico"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Consultoria em Licitações",
          provider: { "@type": "Organization", name: "CADBRASIL" },
          serviceType: "Consultoria em Licitações Públicas",
          areaServed: "Brasil"
        }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-white/80 font-medium text-xs uppercase tracking-widest mb-4">
                Serviço Especializado
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Consultoria em Licitações
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Assessoria especializada para aumentar suas chances de sucesso em 
                licitações públicas federais, estaduais e municipais.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:+551121220202">
                  <Button variant="cta" size="lg" className="group">
                    <Phone className="w-4 h-4" />
                    (011) 2122-0202
                  </Button>
                </a>
                <a href="https://wa.me/551121220202" target="_blank" rel="noopener noreferrer">
                  <Button variant="ctaOutline" size="lg" className="group">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Nossos Serviços de Consultoria
              </h2>
              <p className="text-muted-foreground">
                Soluções completas para sua participação em licitações
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {servicos.map((servico, index) => (
                <div
                  key={index}
                  className="bg-card p-6 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                    <servico.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {servico.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {servico.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Como Funciona
              </h2>
              <p className="text-muted-foreground">
                Metodologia estruturada para maximizar seus resultados
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {etapas.map((etapa, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{etapa.numero}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{etapa.titulo}</h3>
                  <p className="text-muted-foreground text-sm">{etapa.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Benefícios da Nossa Consultoria
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0" />
                    <span className="text-white/90">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para Aumentar suas Chances de Sucesso?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Entre em contato com nossos especialistas e descubra como podemos 
              ajudar sua empresa a vencer mais licitações.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+551121220202">
                <Button size="lg" className="group">
                  <Phone className="w-4 h-4" />
                  Falar com Especialista
                </Button>
              </a>
              <Link to="/cadastro?tipo=novo">
                <Button variant="outline" size="lg" className="group">
                  Iniciar Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

export default ConsultoriaLicitacoes;
