import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus, Clock, FileText, Shield, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const CadastroSicafNovo = () => {
  const beneficios = [
    {
      icon: Clock,
      title: "Rapidez",
      description: "Cadastro completo em até 3 horas com nossa metodologia.",
    },
    {
      icon: FileText,
      title: "Documentação",
      description: "Orientação completa sobre todos os documentos necessários.",
    },
    {
      icon: Shield,
      title: "Garantia",
      description: "Reembolso integral se o cadastro não for aprovado.",
    },
    {
      icon: Users,
      title: "Suporte",
      description: "Acompanhamento dedicado em todas as etapas.",
    },
  ];

  const inclusos = [
    "Análise documental completa",
    "Cadastro em todos os níveis do SICAF",
    "Orientação sobre CNAEs adequados",
    "Emissão de certidões",
    "Acompanhamento até aprovação",
    "Acesso ao portal do fornecedor",
    "Suporte técnico por 30 dias",
    "Garantia de resultado",
  ];

  const niveis = [
    {
      titulo: "Nível I - Credenciamento",
      descricao: "Dados básicos da empresa e responsáveis legais.",
    },
    {
      titulo: "Nível II - Habilitação Jurídica",
      descricao: "Documentos constitutivos e regularidade jurídica.",
    },
    {
      titulo: "Nível III - Regularidade Fiscal",
      descricao: "Certidões negativas federais, estaduais e municipais.",
    },
    {
      titulo: "Nível IV - Regularidade Fiscal Federal",
      descricao: "Tributos federais, FGTS e contribuições previdenciárias.",
    },
    {
      titulo: "Nível V - Regularidade Trabalhista",
      descricao: "Certidão Negativa de Débitos Trabalhistas.",
    },
    {
      titulo: "Nível VI - Qualificação Econômico-Financeira",
      descricao: "Balanço patrimonial e demonstrações contábeis.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Cadastro SICAF Novo"
        description="Faça seu primeiro cadastro SICAF em até 3 horas. Serviço completo com garantia de aprovação para empresas que desejam fornecer ao Governo Federal."
        canonical="/cadastro-sicaf-novo"
        keywords="cadastro SICAF novo, primeiro cadastro SICAF, como se cadastrar SICAF, fornecedor governo federal, MEI SICAF"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Cadastro SICAF Novo",
          provider: { "@type": "Organization", name: "CADBRASIL" },
          serviceType: "Novo Cadastro SICAF",
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
                Comece a Licitar com o Governo Federal
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Cadastro SICAF Novo
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Serviço completo de cadastramento SICAF para empresas que desejam iniciar 
                o fornecimento ao Governo Federal. Processo ágil e seguro.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">3h</div>
                  <div className="text-white/70 text-sm">Tempo Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-white/70 text-sm">Níveis Cadastrados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/70 text-sm">Garantia</div>
                </div>
              </div>
              <Link to="/cadastro?tipo=novo">
                <Button variant="cta" size="lg" className="group">
                  Iniciar Meu Cadastro
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {beneficios.map((beneficio, index) => (
                <div key={index} className="bg-card p-6 border border-border text-center">
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <beneficio.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{beneficio.title}</h3>
                  <p className="text-muted-foreground text-sm">{beneficio.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Níveis do SICAF */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Níveis do Cadastro SICAF
              </h2>
              <p className="text-muted-foreground">
                Cadastramos sua empresa em todos os níveis necessários
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {niveis.map((nivel, index) => (
                <div key={index} className="bg-card p-5 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm mb-1">{nivel.titulo}</h3>
                      <p className="text-muted-foreground text-xs">{nivel.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O que está incluso */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    O que Está Incluso
                  </h2>
                  <ul className="space-y-3">
                    {inclusos.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary p-8 text-center">
                  <Award className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Garantia de Resultado
                  </h3>
                  <p className="text-white/80 mb-6">
                    Se o cadastro não for aprovado, devolvemos 100% do valor pago.
                  </p>
                  <Link to="/cadastro?tipo=novo">
                    <Button variant="cta" size="lg" className="group">
                      Começar Agora
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quem pode se cadastrar */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Quem Pode se Cadastrar no SICAF?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { titulo: "Pessoas Jurídicas", descricao: "Empresas de todos os portes" },
                { titulo: "MEI", descricao: "Microempreendedores Individuais" },
                { titulo: "Cooperativas", descricao: "Associações e cooperativas" },
                { titulo: "Profissionais", descricao: "Autônomos e liberais" },
              ].map((tipo, index) => (
                <div key={index} className="bg-card p-5 border border-border text-center">
                  <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-foreground mb-1">{tipo.titulo}</h3>
                  <p className="text-muted-foreground text-sm">{tipo.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para Começar a Vender para o Governo?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Inicie seu cadastro SICAF agora e tenha acesso a milhares de oportunidades 
              de negócio em licitações federais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro?tipo=novo">
                <Button variant="cta" size="lg" className="group">
                  Iniciar Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+551121220202">
                <Button variant="ctaOutline" size="lg">
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

export default CadastroSicafNovo;
