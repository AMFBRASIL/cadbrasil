import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Handshake,
  Phone,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const SITE_URL = "https://cadbrasil.com.br";
const PAGE_PATH = "/servicos-cadbrasil";
const CADASTRO_PAGE_URL = `${SITE_URL}/cadastro`;

const servicos = [
  {
    icon: ClipboardList,
    title: "Processos de cadastro e SICAF",
    description:
      "Incluso na Licença CadBrasil: assessoria nos fluxos de cadastro, conferência documental e acompanhamento técnico junto ao uso do sistema oficial.",
  },
  {
    icon: Wrench,
    title: "Manutenção dos processos",
    description:
      "Após 3 meses com a licença ativa, a manutenção dos processos segue em 12 parcelas de R$ 155,00, com foco em continuidade e prevenção de pendências.",
  },
  {
    icon: Briefcase,
    title: "Consultoria em licitações",
    description:
      "Incluso na licença: suporte estratégico para participação em pregões, análise de editais e orientação operacional, conforme escopo contratado.",
  },
  {
    icon: FileCheck2,
    title: "Regularização documental",
    description:
      "Incluso na licença: apoio na organização de certidões e documentos para reduzir risco de bloqueios ou inabilitações.",
  },
  {
    icon: Building2,
    title: "Estruturação para compras públicas",
    description:
      "Incluso na licença: planejamento prático para empresas que desejam atuar com mais segurança no mercado público.",
  },
  {
    icon: Sparkles,
    title: "Assistente SICAF online",
    description:
      "Incluso na Licença CadBrasil: o Assistente SICAF online (ferramenta privada educativa) para apoio ao uso do sistema oficial. Saiba mais na página dedicada.",
  },
];

const ServicosCadbrasil = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Licença CadBrasil e valores"
        description="Licença CadBrasil: R$ 985,00 anual com todos os processos da empresa e Assistente SICAF online. Manutenção dos processos: 12x de R$ 155,00 após 3 meses da licença ativa."
        canonical={PAGE_PATH}
        keywords="licença cadbrasil, cadbrasil 985 anual, manutenção processos 12x 155, após 3 meses licença, assistente sicaf online, serviços cadbrasil"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Serviços CadBrasil", url: PAGE_PATH },
        ]}
        ogType="service"
        webPageAbout={{
          name: "Licença CadBrasil",
          description:
            "Licença anual com todos os processos da CadBrasil e Assistente SICAF online; manutenção dos processos em 12x de R$ 155,00 após 3 meses da licença ativa.",
        }}
        faq={[
          {
            question: "O que é a Licença CadBrasil e quanto custa?",
            answer:
              "A Licença CadBrasil custa R$ 985,00 por ano (valor anual) e reúne os processos privados de assessoria da CadBrasil, incluindo o Assistente SICAF online, conforme o pacote contratado.",
          },
          {
            question: "Quando começa a manutenção dos processos e qual o valor?",
            answer:
              "A manutenção dos processos é cobrada em 12 parcelas de R$ 155,00 (12x de R$ 155,00), com início após 3 meses com a licença ativa.",
          },
          {
            question: "O que está incluso dentro da licença?",
            answer:
              "Dentro da licença estão os processos operacionais da CadBrasil (cadastro/SICAF, consultoria, regularização documental e demais entregas do pacote) e o Assistente SICAF online como benefício tecnológico de apoio educativo ao uso do sistema oficial.",
          },
          {
            question: "A CadBrasil vende acesso ao SICAF?",
            answer:
              "Não. O SICAF é sistema oficial e gratuito do Governo Federal. A CadBrasil presta serviços privados de assessoria e tecnologia.",
          },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Licença CadBrasil",
            provider: {
              "@type": "Organization",
              name: "CADBRASIL",
              url: SITE_URL,
            },
            areaServed: "BR",
            serviceType: "Licença anual de assessoria e processos CadBrasil",
            offers: {
              "@type": "Offer",
              price: "985.00",
              priceCurrency: "BRL",
              description:
                "Licença CadBrasil anual (R$ 985,00/ano) com processos da empresa e Assistente SICAF online, conforme contrato.",
              url: `${SITE_URL}${PAGE_PATH}`,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Manutenção dos processos CadBrasil",
            provider: {
              "@type": "Organization",
              name: "CADBRASIL",
              url: SITE_URL,
            },
            areaServed: "BR",
            serviceType: "Manutenção e acompanhamento de processos após período inicial da licença",
            offers: {
              "@type": "Offer",
              price: "155.00",
              priceCurrency: "BRL",
              eligibleQuantity: {
                "@type": "QuantitativeValue",
                value: "12",
                unitText: "parcelas",
              },
              description:
                "Manutenção dos processos em 12 parcelas de R$ 155,00, com início após 3 meses com a licença CadBrasil ativa.",
              url: `${SITE_URL}${PAGE_PATH}`,
            },
          },
        ]}
      />
      <Header />

      <main>
        <section className="pt-28 pb-14 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-white/80 text-xs font-medium uppercase tracking-widest mb-4">
                Soluções Privadas CadBrasil
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
                Serviços CadBrasil
              </h1>
              <p className="text-white/85 text-lg">
                Licença CadBrasil anual com todos os processos da empresa e
                Assistente SICAF online. Manutenção dos processos em 12x de
                R$&nbsp;155,00 após 3 meses com a licença ativa.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6 rounded-lg border border-border bg-card p-5 md:p-6 text-center md:text-left">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Licença CadBrasil:</strong>{" "}
                  R$ 985,00 por ano, com acesso a{" "}
                  <strong className="text-foreground">
                    todos os processos da CadBrasil
                  </strong>
                  , incluindo o{" "}
                  <strong className="text-foreground">Assistente SICAF online</strong>
                  . A{" "}
                  <strong className="text-foreground">
                    manutenção dos processos
                  </strong>{" "}
                  (12 parcelas de R$ 155,00) entra em vigor{" "}
                  <strong className="text-foreground">
                    após 3 meses com a licença ativa
                  </strong>
                  .
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center text-center">
                <Button
                  variant="default"
                  size="xl"
                  className="h-auto min-h-14 w-full max-w-2xl px-6 py-5 text-base font-bold shadow-md md:text-lg"
                  asChild
                >
                  <a href={CADASTRO_PAGE_URL}>
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                    Ir para o cadastro CadBrasil
                  </a>
                </Button>
                <p className="mt-3 max-w-xl text-xs text-muted-foreground break-all">
                  {CADASTRO_PAGE_URL}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-primary/30 bg-primary/5 p-6 md:p-7 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                      Licença anual
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Licença CadBrasil
                  </h2>
                  <p className="text-muted-foreground mb-5">
                    Inclui todos os processos da CadBrasil no período da licença
                    e o Assistente SICAF online para apoio educativo ao uso do
                    sistema oficial.
                  </p>
                  <div className="bg-background border border-border rounded-md p-4">
                    <p className="text-sm text-muted-foreground">Valor (anual)</p>
                    <p className="text-3xl font-bold text-foreground">R$ 985,00 /ano</p>
                  </div>
                </div>

                <div className="border border-border bg-card p-6 md:p-7 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Handshake className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                      Após 3 meses ativos
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Manutenção dos processos
                  </h2>
                  <p className="text-muted-foreground mb-5">
                    Cobrança recorrente para continuidade operacional, organização
                    documental e acompanhamento dos processos, com início após 3
                    meses com a licença CadBrasil ativa.
                  </p>
                  <div className="bg-background border border-border rounded-md p-4">
                    <p className="text-sm text-muted-foreground">Condição</p>
                    <p className="text-3xl font-bold text-foreground">12x de R$ 155,00</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Início após 3 meses de licença ativa
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-900 leading-relaxed">
                    A CadBrasil é uma empresa privada. O SICAF é sistema oficial
                    e gratuito do Governo Federal. Os valores acima referem-se à
                    licença anual e à manutenção dos processos da CadBrasil, não
                    ao acesso governamental ao SICAF.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-14">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
                O que está na Licença CadBrasil
              </h2>
              <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                Dentro da licença você utiliza o conjunto de processos privados
                da CadBrasil e o{" "}
                <Link
                  to="/assistente-sicaf"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  Assistente SICAF online
                </Link>
                . A manutenção dos processos (12x de R$ 155,00) complementa a
                continuidade após os primeiros 3 meses com a licença ativa.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {servicos.map((servico) => (
                  <article
                    key={servico.title}
                    className="border border-border bg-card rounded-lg p-5"
                  >
                    <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                      <servico.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{servico.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {servico.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Resumo do que a licença cobre
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Todos os processos operacionais da CadBrasil no período da licença (conforme contrato)",
                  "Assistente SICAF online — apoio educativo ao uso do sistema oficial",
                  "Orientação sobre etapas e níveis de cadastramento no SICAF",
                  "Conferência e organização documental para envio correto",
                  "Consultoria e apoio em licitações dentro do escopo do pacote",
                  "Continuidade via manutenção dos processos (12x R$ 155,00) após 3 meses de licença ativa",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Fale com a CadBrasil para receber proposta detalhada
              </h2>
              <p className="text-muted-foreground mb-8">
                Se quiser, montamos um plano conforme o estágio atual da sua
                empresa e suas metas no mercado de compras públicas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:+551121220202">
                  <Button size="lg">
                    <Phone className="w-4 h-4" />
                    (011) 2122-0202
                  </Button>
                </a>
                <a
                  href="https://wa.me/551121220202"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    Atendimento via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicosCadbrasil;
