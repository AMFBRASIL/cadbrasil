import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RefreshCw, Clock, FileCheck, AlertTriangle, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const RenovacaoSicaf = () => {
  const beneficios = [
    {
      icon: Clock,
      title: "Prazo Reduzido",
      description: "Renovação concluída em até 48 horas úteis.",
    },
    {
      icon: FileCheck,
      title: "Atualização Completa",
      description: "Renovação de todas as certidões e documentos necessários.",
    },
    {
      icon: Shield,
      title: "Monitoramento",
      description: "Alertas automáticos sobre vencimentos futuros.",
    },
    {
      icon: RefreshCw,
      title: "Regularização",
      description: "Resolução de pendências e irregularidades.",
    },
  ];

  const inclusos = [
    "Atualização de todas as certidões",
    "Regularização de pendências fiscais",
    "Verificação de documentação",
    "Atualização de dados cadastrais",
    "Monitoramento de vencimentos",
    "Alertas automáticos por e-mail",
    "Suporte técnico dedicado",
    "Garantia de resultado",
  ];

  const sinaisRenovacao = [
    "Certidões vencidas ou próximas do vencimento",
    "Pendências fiscais não resolvidas",
    "Alterações societárias não atualizadas",
    "Mudança de endereço ou contato",
    "Inclusão de novas atividades (CNAEs)",
    "Atualização de capital social",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Renovação SICAF"
        description="Renove seu cadastro SICAF em até 48 horas. Atualização de certidões, regularização de pendências e monitoramento automático de vencimentos."
        canonical="/renovacao-sicaf"
        keywords="renovação SICAF, atualizar SICAF, certidões vencidas, regularizar SICAF, renovar cadastro governo"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Renovação SICAF",
          provider: { "@type": "Organization", name: "CADBRASIL" },
          serviceType: "Renovação de Cadastro SICAF",
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
                Mantenha seu Cadastro Ativo
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Renovação SICAF
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Mantenha seu cadastro SICAF sempre atualizado e habilitado para participar 
                de licitações federais. Renovação rápida e sem burocracia.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">48h</div>
                  <div className="text-white/70 text-sm">Prazo Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/70 text-sm">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-white/70 text-sm">Monitoramento</div>
                </div>
              </div>
              <Link to="/cadastro?tipo=renovacao">
                <Button variant="cta" size="lg" className="group">
                  Solicitar Renovação
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

        {/* Quando Renovar */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      Quando Renovar o SICAF?
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Fique atento aos sinais de que seu cadastro precisa de renovação:
                  </p>
                  <ul className="space-y-3">
                    {sinaisRenovacao.map((sinal, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-foreground">{sinal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary p-6 text-white">
                  <h3 className="text-xl font-bold mb-6">
                    O que Está Incluso na Renovação
                  </h3>
                  <ul className="space-y-3">
                    {inclusos.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-white/80 flex-shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Processo Simplificado
              </h2>
              <p className="text-muted-foreground">
                Renovação rápida em apenas 3 passos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Solicite a Renovação</h3>
                <p className="text-muted-foreground text-sm">
                  Preencha o formulário com os dados da sua empresa
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Análise e Atualização</h3>
                <p className="text-muted-foreground text-sm">
                  Nossa equipe atualiza todas as certidões e documentos
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Cadastro Renovado</h3>
                <p className="text-muted-foreground text-sm">
                  Receba a confirmação e volte a licitar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Não Perca Oportunidades por Cadastro Vencido
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Renove seu SICAF agora e continue participando de licitações federais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro?tipo=renovacao">
                <Button variant="cta" size="lg" className="group">
                  Renovar Meu SICAF
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

export default RenovacaoSicaf;
