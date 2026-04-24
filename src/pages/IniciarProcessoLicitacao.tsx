import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Gavel,
  LineChart,
  Phone,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const PAGE_PATH = "/iniciar-processo-licitacao";
const SITE_URL = "https://cadbrasil.com.br";

const passos = [
  {
    numero: "01",
    titulo: "Estruture a empresa para compras públicas",
    texto:
      "Confirme CNPJ ativo, CNAE compatível com o que pretende vender, responsável legal definido e capacidade real de cumprir contratos (prazo, quantidade e qualidade).",
  },
  {
    numero: "02",
    titulo: "Mantenha o cadastro SICAF regular",
    texto:
      "Para o governo federal, o SICAF costuma ser pré-requisito. Revise nível de cadastramento, documentos enviados e situação cadastral para evitar bloqueios na hora de disputar.",
  },
  {
    numero: "03",
    titulo: "Organize certidões e documentação",
    texto:
      "Monte uma rotina de validade (federal, estadual, municipal, trabalhista, FGTS etc.). Licitação reprova por detalhe documental é comum; antecipação reduz risco.",
  },
  {
    numero: "04",
    titulo: "Defina porte e estratégia de participação",
    texto:
      "Avalie enquadramento como ME/EPP quando aplicável, limites de desconto, margens e política de preço. Decida quais órgãos e regiões serão prioridade no início.",
  },
  {
    numero: "05",
    titulo: "Monitore oportunidades nos portais",
    texto:
      "Acompanhe PNCP, Comprasnet e portais estaduais/municipais do seu interesse. Filtre por objeto, valor e local para não dispersar esforço.",
  },
  {
    numero: "06",
    titulo: "Leia o edital com critério técnico",
    texto:
      "Extraia prazos, exigências de habilitação, critério de julgamento, amostras, lances mínimos e riscos de desclassificação. Dúvidas devem ser esclarecidas dentro do prazo do edital.",
  },
  {
    numero: "07",
    titulo: "Prepare a proposta e anexos",
    texto:
      "Monte proposta comercial/técnica conforme modelo do edital, anexe documentos exatos (ordem, formato e assinaturas) e valide valores antes do envio.",
  },
  {
    numero: "08",
    titulo: "Cadastre e envie no sistema da licitação",
    texto:
      "Respeite horários e regras do portal. Guarde comprovantes de envio, declarações e protocolos. Revise tudo minutos antes do encerramento.",
  },
  {
    numero: "09",
    titulo: "Participe da sessão e acompanhe o resultado",
    texto:
      "No pregão eletrônico, siga regras de lances e impugnações. Após disputa, acompanhe habilitação, recurso (se houver), homologação e formalização do contrato.",
  },
];

const vantagens = [
  {
    icon: LineChart,
    titulo: "Demanda contínua e volumosa",
    descricao:
      "O setor público compra todo dia; com método, a empresa constrói pipeline de oportunidades recorrentes.",
  },
  {
    icon: Shield,
    titulo: "Regras públicas e transparência",
    descricao:
      "O processo é regido por lei, com critérios publicados, o que favorece quem se prepara com antecedência.",
  },
  {
    icon: Target,
    titulo: "Planejamento de receita",
    descricao:
      "Contratos bem dimensionados ajudam na previsibilidade de caixa e na escala de operação.",
  },
  {
    icon: Building2,
    titulo: "Abrangência nacional",
    descricao:
      "Muitas modalidades permitem disputar eletronicamente, ampliando mercado sem estrutura física em cada cidade.",
  },
  {
    icon: Users,
    titulo: "Benefícios a ME/EPP",
    descricao:
      "Quando enquadrada, a empresa pode concorrer com instrumentos legais que favorecem o pequeno negócio.",
  },
  {
    icon: Gavel,
    titulo: "Aprendizado acumulativo",
    descricao:
      "Cada edital ensina padrões de exigência; a equipe fica mais rápida e assertiva com o tempo.",
  },
];

const porqueCadbrasil = [
  "Metodologia focada em reduzir erro operacional (documentação, prazos e interpretação de exigências).",
  "Apoio no ecossistema SICAF e cadastro — base para disputar com regularidade.",
  "Consultoria em licitações para leitura de edital, estratégia de preço e acompanhamento de sessão.",
  "Licença e ferramentas CadBrasil (como o Assistente SICAF online) para dar clareza no dia a dia do fornecedor.",
  "Atendimento comercial e suporte para alinhar expectativas: a decisão final e o cumprimento legal continuam com a empresa cliente.",
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como iniciar o processo de participação em licitação pública",
  description:
    "Passo a passo para o fornecedor iniciar com segurança a participação em licitações públicas no Brasil.",
  step: passos.map((p, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: p.titulo,
    text: p.texto,
  })),
};

const IniciarProcessoLicitacao = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Como iniciar o processo de licitação"
        description="Passo a passo para participar de licitação pública: SICAF, documentação, edital, proposta e sessão. Vantagens do mercado público e por que contar com a CadBrasil."
        canonical={PAGE_PATH}
        keywords="iniciar licitação, processo licitação, como participar licitação, pregão eletrônico, SICAF fornecedor, cadastro compras públicas, consultoria licitação CadBrasil"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Iniciar processo de licitação", url: PAGE_PATH },
        ]}
        ogType="article"
        article={{
          publishedTime: "2026-04-14T00:00:00Z",
          modifiedTime: "2026-04-14T00:00:00Z",
          author: "CADBRASIL",
          section: "Licitações",
          tags: [
            "Licitação",
            "Pregão",
            "SICAF",
            "Fornecedor",
            "Compras públicas",
          ],
        }}
        faq={[
          {
            question: "Qual o primeiro passo para licitar?",
            answer:
              "Garantir empresa regular, documentação em dia e cadastro SICAF coerente com o objeto, antes de buscar editais e montar proposta.",
          },
          {
            question: "Preciso de consultoria para licitar?",
            answer:
              "Não é obrigatório por lei, mas reduz risco de desclassificação e acelera aprendizado. A CadBrasil atua como assessoria privada; decisões e assinaturas seguem com o cliente.",
          },
          {
            question: "A CadBrasil garante vitória em licitação?",
            answer:
              "Não. Ninguém pode garantir resultado em certame público. O que oferecemos é método, clareza e suporte técnico para concorrer com mais organização.",
          },
        ]}
        jsonLd={[
          howToJsonLd,
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Consultoria e apoio para licitações públicas",
            provider: { "@type": "Organization", name: "CADBRASIL", url: SITE_URL },
            serviceType: "Assessoria em licitações e cadastro SICAF",
            areaServed: "BR",
            url: `${SITE_URL}${PAGE_PATH}`,
          },
        ]}
      />
      <Header />

      <main>
        <section className="pt-28 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-white/80">
                Guia para fornecedores
              </span>
              <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Iniciar processo de licitação
              </h1>
              <p className="text-lg text-white/85">
                Do preparo cadastral à sessão pública: o que fazer, por que vale a
                pena e como a CadBrasil pode apoiar sua empresa no caminho.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-4">
                Passo a passo
              </h2>
              <p className="text-muted-foreground">
                Visão prática do fornecedor que vai participar de licitação pela
                primeira vez ou quer padronizar a operação. Ajuste conforme o
                edital e o órgão comprador.
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-6">
              {passos.map((passo) => (
                <div
                  key={passo.numero}
                  className="flex gap-4 border border-border bg-card p-5 md:p-6 rounded-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-lg font-bold text-primary-foreground">
                    {passo.numero}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground md:text-xl">
                      {passo.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {passo.texto}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-4">
                Vantagens de participar de licitações
              </h2>
              <p className="text-muted-foreground">
                O mercado público exige disciplina, mas oferece oportunidades
                relevantes para empresas preparadas.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vantagens.map((v) => (
                <div
                  key={v.titulo}
                  className="border border-border bg-card p-6 rounded-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center bg-primary/10">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{v.titulo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-4">
                Por que a CadBrasil entra no meio
              </h2>
              <p className="text-muted-foreground">
                A CadBrasil é empresa privada de assessoria e tecnologia. Não
                somos órgão público; atuamos para organizar o processo e reduzir
                retrabalho da sua equipe.
              </p>
            </div>

            <div className="mx-auto max-w-3xl rounded-lg border border-primary/25 bg-primary/5 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <FileSearch className="h-8 w-8 text-primary shrink-0" />
                <p className="text-sm font-semibold text-foreground md:text-base">
                  Onde fazemos diferença no dia a dia do fornecedor
                </p>
              </div>
              <ul className="space-y-3">
                {porqueCadbrasil.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground leading-relaxed md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <Button asChild size="lg">
                  <Link to="/consultoria-licitacoes">
                    <ClipboardList className="h-4 w-4" />
                    Consultoria em licitações
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/servicos-cadbrasil">
                    Serviços e licença CadBrasil
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="https://cadastro.cadbrasil.com.br">
                    <ArrowRight className="h-4 w-4" />
                    Iniciar cadastro
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Dúvidas pontuais:{" "}
                <Link to="/contato" className="text-primary underline-offset-4 hover:underline">
                  fale conosco
                </Link>{" "}
                ou{" "}
                <a
                  href="tel:+551121220202"
                  className="text-primary underline-offset-4 hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  (011) 2122-0202
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IniciarProcessoLicitacao;
