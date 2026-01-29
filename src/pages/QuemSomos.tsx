import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const QuemSomos = () => {
  const valores = [
    {
      icon: Shield,
      titulo: "Transparência",
      descricao: "Atuamos com total clareza em todos os processos, mantendo nossos clientes informados em cada etapa."
    },
    {
      icon: Award,
      titulo: "Excelência",
      descricao: "Buscamos a qualidade máxima em todos os serviços, garantindo resultados consistentes."
    },
    {
      icon: Heart,
      titulo: "Compromisso",
      descricao: "Dedicação total ao sucesso dos nossos clientes nas licitações públicas."
    },
    {
      icon: Clock,
      titulo: "Agilidade",
      descricao: "Processos otimizados para garantir rapidez sem comprometer a qualidade."
    }
  ];

  const diferenciais = [
    "Mais de 10.000 empresas atendidas em todo o Brasil",
    "Equipe especializada em licitações públicas",
    "Atendimento personalizado e humanizado",
    "Tecnologia de ponta com Inteligência Artificial",
    "Suporte contínuo durante todo o processo",
    "Alta taxa de aprovação nos cadastros"
  ];

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Quem Somos - CADBRASIL",
    description: "Conheça a CADBRASIL, empresa especializada em assessoria para cadastro SICAF e licitações públicas.",
    url: "https://sicaf-simplified.lovable.app/quem-somos",
    mainEntity: {
      "@type": "Organization",
      name: "CADBRASIL",
      foundingDate: "2010",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "50+"
      },
      slogan: "Sua porta de entrada para licitações públicas",
      knowsAbout: ["SICAF", "Licitações Públicas", "Comprasnet", "PNCP", "Cadastramento de Fornecedores"]
    }
  };

  return (
    <>
      <SEO
        title="Quem Somos - Especialistas em Cadastro SICAF"
        description="Conheça a CADBRASIL, empresa especializada em assessoria para cadastro SICAF e licitações públicas. Mais de 10.000 empresas atendidas em todo o Brasil com 98% de aprovação."
        keywords="cadbrasil, quem somos, empresa sicaf, assessoria licitações, sobre nós, cadastro sicaf, empresa de licitações, consultoria governo"
        canonical="/quem-somos"
        jsonLd={jsonLdWebPage}
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Quem Somos
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Somos uma empresa privada especializada em facilitar o acesso de fornecedores 
                ao mercado de licitações públicas, com foco em cadastramento SICAF e assessoria completa.
              </p>
            </div>
          </div>
        </section>

        {/* Sobre a Empresa */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6">
                  <Building2 className="w-4 h-4" />
                  Nossa História
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  CADBRASIL: Sua Porta de Entrada para as Licitações Públicas
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A CADBRASIL nasceu com o propósito de democratizar o acesso às licitações públicas, 
                    eliminando as barreiras burocráticas que impedem empresas de todos os portes de 
                    participarem deste mercado bilionário.
                  </p>
                  <p>
                    <strong className="text-foreground">Somos uma empresa privada</strong>, sem qualquer vínculo 
                    com órgãos governamentais, dedicada exclusivamente a prestar assessoria especializada 
                    para empresas que desejam se cadastrar no SICAF e participar de licitações.
                  </p>
                  <p>
                    Combinamos expertise humana com tecnologia de ponta, incluindo sistemas de 
                    Inteligência Artificial para análise de editais, garantindo eficiência e 
                    precisão em todos os processos.
                  </p>
                </div>
              </div>
              <div className="bg-muted/30 p-8 border border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                    <div className="text-sm text-muted-foreground">Empresas Atendidas</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Taxa de Aprovação</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-primary mb-2">27</div>
                    <div className="text-sm text-muted-foreground">Estados Atendidos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Missão */}
              <div className="bg-background p-8 border border-border">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Missão</h3>
                <p className="text-muted-foreground">
                  Facilitar o acesso de empresas brasileiras ao mercado de licitações públicas, 
                  oferecendo soluções ágeis, seguras e eficientes para cadastramento e habilitação.
                </p>
              </div>

              {/* Visão */}
              <div className="bg-background p-8 border border-border">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Visão</h3>
                <p className="text-muted-foreground">
                  Ser a referência nacional em assessoria para licitações públicas, reconhecida 
                  pela excelência no atendimento e inovação tecnológica.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-background p-8 border border-border">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Valores</h3>
                <p className="text-muted-foreground">
                  Transparência, ética, compromisso com o cliente, excelência operacional 
                  e inovação contínua em todos os processos.
                </p>
              </div>
            </div>

            {/* Valores em Grid */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                Nossos Valores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {valores.map((valor, index) => {
                  const Icon = valor.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-background border border-border">
                      <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{valor.titulo}</h4>
                        <p className="text-sm text-muted-foreground">{valor.descricao}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Por Que Nos Escolher
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Diferenciais CADBRASIL
              </h2>
              <p className="text-muted-foreground">
                Combinamos experiência, tecnologia e atendimento humanizado para oferecer 
                a melhor experiência em cadastramento SICAF.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diferenciais.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 border border-border">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Pronto para Começar?
              </h2>
              <p className="text-white/90 mb-8">
                Entre em contato conosco e descubra como podemos ajudar sua empresa 
                a conquistar o mercado de licitações públicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/cadastro" className="gap-2">
                    Iniciar Cadastro
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/contato">
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default QuemSomos;
