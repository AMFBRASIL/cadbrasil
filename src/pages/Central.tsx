import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

type CentralItem = {
  path: string;
  title: string;
  description: string;
};

const centralPages: CentralItem[] = [
  {
    path: "/servicos-cadbrasil",
    title: "Serviços CadBrasil",
    description:
      "Licença anual, manutenção dos processos, o que está incluso e valores para apresentar ao cliente.",
  },
  {
    path: "/assistente-sicaf",
    title: "Assistente SICAF",
    description:
      "Extensão educativa, instalação na Chrome Web Store e esclarecimentos institucionais.",
  },
  {
    path: "/vantagens-sicaf",
    title: "Vantagens do SICAF",
    description:
      "Conteúdo para explicar ao cliente o papel do cadastro unificado nas compras públicas.",
  },
  {
    path: "/iniciar-processo-licitacao",
    title: "Iniciar processo de licitação",
    description:
      "Passo a passo para licitar, vantagens do mercado público e por que envolver a CadBrasil.",
  },
];

function CentralCard({ item }: { item: CentralItem }) {
  const className = cn(
    "group relative flex min-h-[160px] flex-col justify-between rounded-xl border-2 border-border bg-card p-6 md:min-h-[180px] md:p-8",
    "transition-all duration-200 hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  );

  const body = (
    <>
      <div>
        <h3 className="text-xl font-bold text-foreground md:text-2xl group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {item.description}
        </p>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <span className="font-mono text-xs text-primary/80 break-all md:text-sm">
          {item.path}
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-primary opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
      </div>
    </>
  );

  return (
    <Link to={item.path} className={className}>
      {body}
    </Link>
  );
}

const Central = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Central de páginas — atendimento"
        description="Atalhos rápidos: Serviços CadBrasil, Assistente SICAF, Vantagens do SICAF e Iniciar processo de licitação — para colaboradores orientarem o cliente."
        canonical="/central"
        keywords="central cadbrasil, servicos cadbrasil, assistente sicaf, vantagens sicaf, iniciar licitação, atendimento"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Central", url: "/central" },
        ]}
        webPageAbout={{
          name: "Central de páginas CadBrasil",
          description:
            "Páginas principais do site para suporte ao cliente: serviços, assistente, vantagens do SICAF e guia para iniciar licitação.",
        }}
      />
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="mx-auto max-w-5xl space-y-14 md:space-y-16">
            <header className="text-center md:text-left">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 md:mx-0">
                <Compass className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                Central de páginas
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-muted-foreground md:mx-0 md:text-lg">
                Páginas mais usadas no atendimento. Toque no card para abrir e
                alinhar a conversa com o cliente.
              </p>
            </header>
            <section aria-labelledby="central-principais">
              <h2
                id="central-principais"
                className="sr-only"
              >
                Páginas principais
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {centralPages.map((item) => (
                  <CentralCard key={item.path} item={item} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Central;
