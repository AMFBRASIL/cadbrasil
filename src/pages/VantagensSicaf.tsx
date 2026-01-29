import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Clock, FileCheck, Users, TrendingUp, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const VantagensSicaf = () => {
  const vantagens = [
    {
      icon: Shield,
      title: "Acesso a Licitações Federais",
      description: "Habilitação para participar de milhares de processos licitatórios em órgãos do Governo Federal em todo o Brasil.",
    },
    {
      icon: Clock,
      title: "Agilidade nos Processos",
      description: "Com o cadastro ativo, sua empresa já está pré-qualificada, reduzindo a burocracia a cada nova licitação.",
    },
    {
      icon: FileCheck,
      title: "Validade Nacional",
      description: "O SICAF é válido em todo o território nacional para licitações federais, dispensando cadastros múltiplos.",
    },
    {
      icon: Users,
      title: "Credibilidade no Mercado",
      description: "Empresas cadastradas no SICAF demonstram regularidade fiscal, jurídica e técnica perante o governo.",
    },
    {
      icon: TrendingUp,
      title: "Novas Oportunidades de Negócio",
      description: "Acesso a um mercado de bilhões de reais em compras públicas federais anualmente.",
    },
    {
      icon: Award,
      title: "Comprovação de Regularidade",
      description: "Centralização de certidões e documentos que comprovam a regularidade da sua empresa.",
    },
  ];

  const beneficiosAdicionais = [
    "Dispensa de apresentação de documentos a cada licitação",
    "Monitoramento automático de vencimentos de certidões",
    "Integração com o Portal Comprasnet",
    "Participação em pregões eletrônicos",
    "Acesso ao Portal Nacional de Contratações Públicas (PNCP)",
    "Histórico de participações registrado no sistema",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Vantagens do Cadastro SICAF"
        description="Descubra as vantagens do cadastro SICAF: acesso a licitações federais, validade nacional, agilidade nos processos e credibilidade no mercado."
        canonical="/vantagens-sicaf"
        keywords="vantagens SICAF, benefícios cadastro SICAF, licitações federais, comprasnet, fornecedor governo"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Vantagens do Cadastro SICAF",
          description: "Descubra as vantagens do cadastro SICAF: acesso a licitações federais, validade nacional, agilidade nos processos.",
          mainEntity: {
            "@type": "ItemList",
            name: "Vantagens do SICAF",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Acesso a Licitações Federais" },
              { "@type": "ListItem", position: 2, name: "Agilidade nos Processos" },
              { "@type": "ListItem", position: 3, name: "Validade Nacional" },
              { "@type": "ListItem", position: 4, name: "Credibilidade no Mercado" },
              { "@type": "ListItem", position: 5, name: "Novas Oportunidades de Negócio" },
              { "@type": "ListItem", position: 6, name: "Comprovação de Regularidade" }
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
                SICAF - Sistema de Cadastramento Unificado de Fornecedores
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Vantagens do Cadastro SICAF
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Descubra por que milhares de empresas já estão cadastradas no SICAF e aproveitando 
                as oportunidades do mercado de licitações públicas federais.
              </p>
              <Link to="/cadastro?tipo=novo">
                <Button variant="cta" size="lg" className="group">
                  Iniciar Meu Cadastro
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Vantagens Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Principais Vantagens
              </h2>
              <p className="text-muted-foreground">
                O cadastro no SICAF abre portas para o maior mercado de compras do país
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {vantagens.map((vantagem, index) => (
                <div
                  key={index}
                  className="bg-card p-6 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                    <vantagem.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {vantagem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {vantagem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios Adicionais */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary p-8 md:p-12">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Benefícios Adicionais do Cadastro SICAF
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {beneficiosAdicionais.map((beneficio, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para Aproveitar Essas Vantagens?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              A CADBRASIL cuida de todo o processo de cadastramento para sua empresa. 
              Comece agora e tenha acesso a milhares de oportunidades.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro?tipo=novo">
                <Button size="lg" className="group">
                  Novo Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/cadastro?tipo=renovacao">
                <Button variant="outline" size="lg" className="group">
                  Renovar Meu Cadastro
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

export default VantagensSicaf;
