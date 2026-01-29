import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus, RefreshCw, FileText, Shield, Clock, Users, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const SolucoesSicaf = () => {
  const solucoes = [
    {
      icon: Plus,
      title: "Cadastro SICAF Novo",
      subtitle: "Para empresas sem cadastro",
      description: "Serviço completo de cadastramento para empresas que desejam iniciar o fornecimento ao Governo Federal.",
      features: [
        "Análise documental completa",
        "Cadastro em todos os níveis",
        "Orientação sobre CNAEs",
        "Acompanhamento até aprovação",
        "Garantia de resultado",
      ],
      link: "/cadastro-sicaf-novo",
    },
    {
      icon: RefreshCw,
      title: "Renovação SICAF",
      subtitle: "Para cadastros vencidos ou a vencer",
      description: "Atualização e renovação do cadastro SICAF para manter sua empresa habilitada a licitar.",
      features: [
        "Atualização de certidões",
        "Regularização de pendências",
        "Prazo médio de 48 horas",
        "Monitoramento de vencimentos",
        "Alertas automáticos",
      ],
      link: "/renovacao-sicaf",
      highlighted: true,
    },
  ];

  const diferenciais = [
    {
      icon: Clock,
      title: "Agilidade",
      description: "Processo otimizado com prazos reduzidos. Cadastro concluído em dias, não semanas.",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Seus dados protegidos com os mais altos padrões de segurança e conformidade LGPD.",
    },
    {
      icon: Users,
      title: "Suporte Especializado",
      description: "Equipe técnica disponível para orientar em cada etapa do processo.",
    },
    {
      icon: FileText,
      title: "Documentação Completa",
      description: "Orientação detalhada sobre todos os documentos necessários para o cadastro.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Soluções para Cadastramento SICAF"
        description="Conheça as soluções CADBRASIL para cadastramento SICAF: novo cadastro ou renovação. Escolha a opção ideal para sua empresa."
        canonical="/solucoes-sicaf"
        keywords="soluções SICAF, cadastro SICAF, renovação SICAF, serviços SICAF, cadastramento governo"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Cadastro SICAF Novo",
            provider: { "@type": "Organization", name: "CADBRASIL" },
            serviceType: "Novo Cadastro SICAF",
            description: "Serviço completo de cadastramento para empresas que desejam iniciar o fornecimento ao Governo Federal.",
            areaServed: "Brasil"
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Renovação SICAF",
            provider: { "@type": "Organization", name: "CADBRASIL" },
            serviceType: "Renovação de Cadastro SICAF",
            description: "Atualização e renovação do cadastro SICAF para manter sua empresa habilitada a licitar.",
            areaServed: "Brasil"
          }
        ]}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-white/80 font-medium text-xs uppercase tracking-widest mb-4">
                CADBRASIL
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Soluções para Cadastramento SICAF
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Escolha a solução ideal para sua empresa e comece a participar de licitações 
                federais com o suporte especializado da CADBRASIL.
              </p>
            </div>
          </div>
        </section>

        {/* Soluções Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {solucoes.map((solucao, index) => (
                <div
                  key={index}
                  className={`relative bg-card p-8 border transition-colors ${
                    solucao.highlighted
                      ? "border-primary"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {solucao.highlighted && (
                    <div className="absolute -top-3 left-4 bg-primary text-white text-xs font-medium px-3 py-1">
                      Mais Solicitado
                    </div>
                  )}

                  <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4">
                    <solucao.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {solucao.title}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-3">{solucao.subtitle}</p>
                  <p className="text-muted-foreground mb-6">{solucao.description}</p>

                  <ul className="space-y-3 mb-8">
                    {solucao.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={solucao.link}>
                    <Button
                      variant={solucao.highlighted ? "default" : "outline"}
                      size="lg"
                      className="w-full group"
                    >
                      Saiba Mais
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Por que Escolher a CADBRASIL?
              </h2>
              <p className="text-muted-foreground">
                15 anos de experiência em cadastramento SICAF e consultoria em licitações
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {diferenciais.map((diferencial, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <diferencial.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{diferencial.title}</h3>
                  <p className="text-muted-foreground text-sm">{diferencial.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Dúvidas sobre qual solução escolher?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para orientar sua empresa sobre o melhor caminho 
              para o cadastramento SICAF.
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SolucoesSicaf;
