import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Brain, FileCheck, Shield, BarChart3, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const BeneficiosCadbrasil = () => {
  const beneficiosPrincipais = [
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Cadastro SICAF em até 3 horas com nossa metodologia otimizada.",
      destaque: "3h",
    },
    {
      icon: Brain,
      title: "Análise com IA",
      description: "Sistema de inteligência artificial para análise de editais 24/7.",
      destaque: "24/7",
    },
    {
      icon: FileCheck,
      title: "Gestão de Certidões",
      description: "Monitoramento automático de vencimentos e renovações.",
      destaque: "Auto",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Conformidade total com LGPD e padrões ISO de segurança.",
      destaque: "LGPD",
    },
  ];

  const modulos = [
    {
      titulo: "SICAF Digital",
      descricao: "Formulários automáticos e validação em tempo real para cadastramento rápido e sem erros.",
      recursos: [
        "Preenchimento automático de dados",
        "Validação instantânea de documentos",
        "Acompanhamento em tempo real",
        "Alertas de pendências",
      ],
    },
    {
      titulo: "Análise IA",
      descricao: "Sistema inteligente que analisa editais automaticamente, identificando oportunidades e riscos.",
      recursos: [
        "Análise de editais 24/7",
        "Identificação de oportunidades",
        "Alertas personalizados",
        "Relatórios detalhados",
      ],
    },
    {
      titulo: "Gestão Documental",
      descricao: "Organização e monitoramento completo da documentação necessária para licitações.",
      recursos: [
        "Armazenamento seguro",
        "Alertas de vencimento",
        "Renovação automática",
        "Histórico completo",
      ],
    },
    {
      titulo: "Dashboard Analytics",
      descricao: "Painel completo com KPIs e análises para tomada de decisão estratégica.",
      recursos: [
        "Métricas em tempo real",
        "Análise competitiva",
        "Relatórios customizados",
        "Exportação de dados",
      ],
    },
  ];

  const timeline = [
    { ano: "2010", evento: "Fundação da CADBRASIL" },
    { ano: "2015", evento: "Mais de 5.000 empresas cadastradas" },
    { ano: "2020", evento: "Lançamento da plataforma digital" },
    { ano: "2023", evento: "Implementação de IA na análise de editais" },
    { ano: "2026", evento: "Líder de mercado em cadastramento SICAF" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Benefícios CADBRASIL"
        description="Conheça os benefícios da CADBRASIL: 15 anos de experiência, análise com IA, gestão de certidões automática e 98% de taxa de aprovação."
        canonical="/beneficios-cadbrasil"
        keywords="benefícios CADBRASIL, plataforma SICAF, análise IA editais, gestão certidões, cadastro SICAF rápido"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CADBRASIL",
          description: "Empresa especializada em cadastramento SICAF e consultoria em licitações públicas",
          foundingDate: "2010",
          numberOfEmployees: { "@type": "QuantitativeValue", value: "50+" },
          award: "Líder de mercado em cadastramento SICAF",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "1250",
            bestRating: "5"
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Serviços CADBRASIL",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cadastro SICAF" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovação SICAF" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultoria em Licitações" } }
            ]
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
                15 Anos de Experiência
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Benefícios CADBRASIL
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Descubra por que mais de 10.000 empresas confiam na CADBRASIL para seu 
                cadastramento SICAF e participação em licitações.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-white/70 text-sm">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10.000+</div>
                  <div className="text-white/70 text-sm">Empresas Atendidas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-white/70 text-sm">Taxa de Aprovação</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-white/70 text-sm">Suporte Disponível</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios Principais */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {beneficiosPrincipais.map((beneficio, index) => (
                <div key={index} className="bg-card p-6 border border-border text-center">
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <beneficio.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{beneficio.destaque}</div>
                  <h3 className="font-bold text-foreground mb-2">{beneficio.title}</h3>
                  <p className="text-muted-foreground text-sm">{beneficio.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Módulos da Plataforma */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Módulos da Plataforma
              </h2>
              <p className="text-muted-foreground">
                Conheça as ferramentas que vão transformar sua participação em licitações
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {modulos.map((modulo, index) => (
                <div key={index} className="bg-card p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-2">{modulo.titulo}</h3>
                  <p className="text-muted-foreground mb-4">{modulo.descricao}</p>
                  <ul className="space-y-2">
                    {modulo.recursos.map((recurso, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm">{recurso}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Nossa Trajetória
              </h2>
              <p className="text-muted-foreground">
                15 anos de história transformando o mercado de licitações
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative pl-12">
                      <div className="absolute left-0 w-8 h-8 bg-primary flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-primary font-bold mb-1">{item.ano}</div>
                      <div className="text-foreground">{item.evento}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Garantias */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Nossas Garantias
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white/10 p-6 rounded-lg">
                  <Shield className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Garantia de Aprovação</h3>
                  <p className="text-white/80 text-sm">Reembolso integral se o cadastro não for aprovado</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <Users className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Suporte Dedicado</h3>
                  <p className="text-white/80 text-sm">Atendimento personalizado durante todo o processo</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <Clock className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Prazo Garantido</h3>
                  <p className="text-white/80 text-sm">Cadastro concluído no prazo acordado</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para Experimentar Todos Esses Benefícios?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 10.000 empresas que já transformaram sua participação em licitações.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro?tipo=novo">
                <Button size="lg" className="group">
                  Iniciar Meu Cadastro
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+551121220202">
                <Button variant="outline" size="lg">
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

export default BeneficiosCadbrasil;
