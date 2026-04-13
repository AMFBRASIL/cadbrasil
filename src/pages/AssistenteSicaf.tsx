import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Shield,
  Sparkles,
} from "lucide-react";

const CHROME_WEB_STORE_URL =
  "https://chromewebstore.google.com/detail/cadbrasil-%E2%80%94-assistente-si/cdhhdgcabgbjdambnhkmdibhnmfkaicd";

const SITE_URL = "https://cadbrasil.com.br";
const ASSISTENTE_PATH = "/assistente-sicaf";
const ASSISTENTE_CANONICAL = `${SITE_URL}${ASSISTENTE_PATH}`;

const PAGE_TITLE_SHORT = "Assistente IA SICAF CadBrasil — extensão Chrome";
const PAGE_DESCRIPTION =
  "Assistente IA SICAF CadBrasil: extensão educativa para o sistema oficial SICAF. Ferramenta privada de orientação (não é órgão público). Instalação na Chrome Web Store, suporte a fornecedores e cadastro SICAF.";

const KEYWORDS_ASSISTENTE =
  "Assistente SICAF, extensão Chrome SICAF, CadBrasil assistente, SICAF fornecedor, cadastro SICAF, inteligência artificial SICAF, Chrome Web Store extensão, orientação SICAF, sistema cadastramento unificado fornecedores, compras públicas, licitações fornecedor, extensão navegador SICAF";

const assistenteSicafFaq = [
  {
    question: "A extensão substitui o SICAF oficial?",
    answer:
      "Não. O Assistente IA SICAF CadBrasil é uma ferramenta privada educacional e orientativa. Não substitui o sistema governamental, não altera suas funcionalidades e não interfere na estrutura oficial do SICAF.",
  },
  {
    question: "A CadBrasil é órgão público?",
    answer:
      "Não. A CadBrasil é empresa privada, sem vínculo institucional com o Governo Federal ou o Ministério da Gestão. O SICAF é sistema oficial e gratuito, acessível diretamente pelo portal do Governo.",
  },
  {
    question: "Como instalo a extensão Assistente SICAF no Chrome?",
    answer:
      "Use o Google Chrome, abra a página oficial na Chrome Web Store (link nesta página), clique em Usar no Chrome ou Adicionar ao Chrome e confirme no diálogo do navegador. Depois, gerencie a extensão em chrome://extensions quando necessário.",
  },
  {
    question: "O assistente altera meu cadastro ou envia dados ao governo por mim?",
    answer:
      "Não. O assistente não realiza alterações automáticas no cadastro, não envia dados ao Governo Federal em nome do usuário, não protocola documentos e não executa atos administrativos. Decisões e envios ao sistema oficial são sempre de responsabilidade do fornecedor.",
  },
  {
    question: "O SICAF é gratuito? Preciso pagar o governo para usar o SICAF?",
    answer:
      "O SICAF é sistema oficial e gratuito do Governo Federal. O acesso é público pelo portal oficial. A CadBrasil não vende acesso ao SICAF; oferece serviços privados de consultoria e tecnologia, e o Assistente IA SICAF integra o pacote como benefício educacional aos clientes.",
  },
  {
    question: "O Assistente IA SICAF garante habilitação em licitação?",
    answer:
      "Não. A ferramenta não garante habilitação em processos licitatórios, não substitui leitura de editais nem análise jurídica especializada, e não interfere em decisões de órgãos públicos.",
  },
  {
    question: "Em qual navegador a extensão funciona?",
    answer:
      "A distribuição é pela Chrome Web Store, pensada para o Google Chrome. Navegadores baseados em Chromium compatíveis com essa loja podem funcionar, mas o suporte oficial segue o ambiente Chrome indicado pela Google.",
  },
  {
    question: "Qual a diferença entre SICAF, CadBrasil e o Assistente IA SICAF?",
    answer:
      "SICAF é o sistema público e gratuito do Governo Federal. CadBrasil é empresa privada de consultoria e tecnologia. O Assistente IA SICAF é extensão e plataforma educacional privada da CadBrasil para apoiar a compreensão e a navegação no sistema oficial, sem substituí-lo.",
  },
] as const;

const assistenteSicafJsonLd: object[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${ASSISTENTE_CANONICAL}#software`,
    name: "CadBrasil — Assistente SICAF",
    alternateName: ["Assistente IA SICAF CadBrasil", "Assistente SICAF CadBrasil"],
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "ChromeExtension",
    operatingSystem: "Chrome",
    browserRequirements: "Requer Google Chrome ou navegador compatível com extensões da Chrome Web Store.",
    url: ASSISTENTE_CANONICAL,
    downloadUrl: CHROME_WEB_STORE_URL,
    installUrl: CHROME_WEB_STORE_URL,
    description:
      "Extensão educativa e orientativa para apoio ao uso do sistema oficial SICAF (Cadastramento Unificado de Fornecedores). Ferramenta privada da CadBrasil; não substitui o sistema governamental.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: CHROME_WEB_STORE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "CADBRASIL",
      url: SITE_URL,
    },
    provider: {
      "@type": "Organization",
      name: "CADBRASIL",
      url: SITE_URL,
    },
    featureList:
      "Orientação sobre funcionamento do SICAF; níveis de cadastramento; exigências documentais; interpretação de situação cadastral; indicação de possíveis pendências; sugestão de caminhos para regularização.",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${ASSISTENTE_CANONICAL}#howto-install`,
    name: "Como instalar a extensão Assistente IA SICAF CadBrasil",
    description:
      "Passos para instalar a extensão oficial CadBrasil — Assistente SICAF a partir da Chrome Web Store no Google Chrome.",
    totalTime: "PT3M",
    tool: [{ "@type": "HowToTool", name: "Google Chrome" }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Abrir a Chrome Web Store",
        text: "No Google Chrome, acesse a página oficial da extensão na Chrome Web Store usando o botão Instalar desta página ou o link direto fornecido.",
        url: CHROME_WEB_STORE_URL,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adicionar ao Chrome",
        text: "Na página da extensão, clique em Usar no Chrome ou Adicionar ao Chrome.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Confirmar a instalação",
        text: "Confirme na caixa de diálogo do navegador. A extensão será instalada e poderá ser gerenciada em chrome://extensions.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Usar no portal SICAF",
        text: "Acesse o portal oficial do SICAF e utilize os recursos do assistente conforme as instruções da extensão (ícone na barra de ferramentas).",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${ASSISTENTE_CANONICAL}#learning-resource`,
    name: "Assistente IA SICAF CadBrasil — apoio educacional ao SICAF",
    description:
      "Recurso educacional privado para fornecedores que utilizam o Sistema de Cadastramento Unificado de Fornecedores (SICAF), com orientação contextual e linguagem acessível, sem substituir o sistema oficial.",
    url: ASSISTENTE_CANONICAL,
    inLanguage: "pt-BR",
    learningResourceType: "InteractiveResource",
    educationalLevel: "Professional",
    teaches:
      "Uso e compreensão do cadastro no SICAF, níveis de cadastramento, documentação e interpretação de situação cadastral, sempre com responsabilidade do próprio fornecedor perante o sistema público.",
    offers: {
      "@type": "Offer",
      description:
        "Disponível como benefício adicional nos pacotes de serviços CadBrasil; o SICAF em si permanece gratuito no portal oficial do Governo Federal.",
      availability: "https://schema.org/LimitedAvailability",
    },
    publisher: {
      "@type": "Organization",
      name: "CADBRASIL",
      url: SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${ASSISTENTE_CANONICAL}#page-sections`,
    name: "Tópicos da página Assistente IA SICAF",
    description: "Estrutura do conteúdo informativo sobre o Assistente IA SICAF CadBrasil.",
    numberOfItems: 12,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Como instalar a extensão" },
      { "@type": "ListItem", position: 2, name: "Transparência institucional" },
      { "@type": "ListItem", position: 3, name: "Finalidade educacional e orientativa" },
      { "@type": "ListItem", position: 4, name: "Sobre o sistema SICAF" },
      { "@type": "ListItem", position: 5, name: "Modelo de atuação da CadBrasil" },
      { "@type": "ListItem", position: 6, name: "Tecnologia exclusiva e plataforma proprietária" },
      { "@type": "ListItem", position: 7, name: "Benefícios para o usuário" },
      { "@type": "ListItem", position: 8, name: "Limites de atuação" },
      { "@type": "ListItem", position: 9, name: "Serviço público versus serviço privado" },
      { "@type": "ListItem", position: 10, name: "Ética, transparência e conformidade" },
      { "@type": "ListItem", position: 11, name: "Inclusão no pacote de serviços" },
      { "@type": "ListItem", position: 12, name: "Conclusão" },
    ],
  },
];

const AssistenteSicaf = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={PAGE_TITLE_SHORT}
        description={PAGE_DESCRIPTION}
        canonical={ASSISTENTE_PATH}
        keywords={KEYWORDS_ASSISTENTE}
        ogImageAlt="CadBrasil Assistente SICAF — extensão educativa para uso do sistema SICAF no Chrome"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Assistente SICAF", url: ASSISTENTE_PATH },
        ]}
        ogType="article"
        webPageAbout={{
          name: "Assistente IA SICAF CadBrasil",
          description:
            "Plataforma educacional privada e extensão para Chrome que apoia fornecedores na compreensão e navegação do sistema oficial SICAF, sem substituir o governo.",
          sameAs: CHROME_WEB_STORE_URL,
        }}
        speakableCssSelectors={["h1.assistente-sicaf-title", ".assistente-sicaf-hero-summary"]}
        includeDefaultServiceSchema={false}
        article={{
          publishedTime: "2026-04-13T00:00:00Z",
          modifiedTime: "2026-04-13T00:00:00Z",
          author: "CADBRASIL",
          section: "Produtos",
          tags: [
            "Assistente SICAF",
            "Extensão Chrome",
            "SICAF",
            "Inteligência artificial",
            "Fornecedor",
            "Cadastro SICAF",
            "Chrome Web Store",
            "Compras públicas",
          ],
        }}
        faq={[...assistenteSicafFaq]}
        jsonLd={assistenteSicafJsonLd}
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="assistente-sicaf-title text-3xl md:text-4xl font-bold text-foreground mb-3">
              Assistente IA SICAF CadBrasil
            </h1>
            <p className="assistente-sicaf-hero-summary text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Plataforma educacional inteligente de apoio ao uso do sistema oficial SICAF
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm mb-10 text-center">
            <p className="text-sm font-medium text-foreground mb-4">
              Instale a extensão oficial na Chrome Web Store
            </p>
            <Button variant="default" size="xl" className="w-full max-w-xl mx-auto h-auto min-h-14 py-4 px-6 text-base md:text-lg" asChild>
              <a href={CHROME_WEB_STORE_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                Instalar extensão CadBrasil — Assistente SICAF
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Abre em nova aba:{" "}
              <a
                href={CHROME_WEB_STORE_URL}
                className="text-primary underline-offset-4 hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {CHROME_WEB_STORE_URL}
              </a>
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2 md:justify-start">
              <GraduationCap className="w-7 h-7 text-primary shrink-0" />
              Como instalar
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
              <li>
                Utilize o navegador <strong className="text-foreground">Google Chrome</strong> (ou outro baseado em Chromium compatível com a Chrome Web Store).
              </li>
              <li>
                Clique no botão acima <strong className="text-foreground">Instalar extensão CadBrasil — Assistente SICAF</strong> para abrir a página oficial na Chrome Web Store.
              </li>
              <li>
                Na loja, clique em <strong className="text-foreground">Usar no Chrome</strong> ou <strong className="text-foreground">Adicionar ao Chrome</strong>.
              </li>
              <li>
                Confirme na caixa de diálogo do navegador. A extensão será instalada e poderá ser gerenciada em{" "}
                <strong className="text-foreground">chrome://extensions</strong>.
              </li>
              <li>
                Ao acessar o <strong className="text-foreground">portal oficial do SICAF</strong>, use os recursos do assistente conforme orientações na própria extensão (ícone na barra de ferramentas).
              </li>
            </ol>
          </section>

          <Separator className="my-10" />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 leading-relaxed space-y-2">
                <p className="font-bold">Transparência institucional — leia com atenção</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>A CadBrasil é uma empresa privada.</li>
                  <li>A CadBrasil não é órgão governamental.</li>
                  <li>A CadBrasil não integra a Administração Pública.</li>
                  <li>A CadBrasil não possui vínculo institucional com o Governo Federal.</li>
                  <li>A CadBrasil não representa o Ministério da Gestão ou qualquer entidade pública.</li>
                </ul>
                <p>
                  O <strong>SICAF</strong> é um sistema oficial e gratuito do Governo Federal do Brasil. O acesso é público e pode ser feito diretamente pelo portal oficial, sem necessidade de contratação de serviço privado.
                </p>
                <p>
                  O <strong>Assistente IA SICAF CadBrasil</strong> não substitui o sistema governamental, não altera suas funcionalidades e não interfere em sua estrutura oficial. Trata-se de ferramenta privada, de caráter educacional e orientativo, para auxiliar na compreensão e na navegação do sistema.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary shrink-0" />
                Finalidade educacional e orientativa
              </h2>
              <p>
                A proposta do Assistente IA SICAF é oferecer suporte técnico, informativo e estratégico ao fornecedor durante a utilização do sistema público.
              </p>
              <p className="font-semibold text-foreground mt-4 mb-2">A ferramenta foi projetada para:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Esclarecer dúvidas sobre o funcionamento do SICAF</li>
                <li>Orientar quanto aos níveis de cadastramento</li>
                <li>Explicar exigências documentais</li>
                <li>Auxiliar na interpretação da situação do fornecedor</li>
                <li>Indicar possíveis pendências cadastrais</li>
                <li>Sugerir caminhos para regularização</li>
              </ul>
              <p className="font-semibold text-foreground mt-6 mb-2">Importante destacar:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>O assistente não realiza alterações automáticas no cadastro.</li>
                <li>Não envia dados ao Governo Federal em nome do usuário.</li>
                <li>Não protocola documentos.</li>
                <li>Não executa atos administrativos.</li>
                <li>Não substitui consultoria jurídica formal.</li>
              </ul>
              <p className="mt-4">
                O controle das informações, decisões e envios ao sistema oficial permanece integralmente sob responsabilidade do fornecedor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o sistema SICAF</h2>
              <p>
                O SICAF é uma plataforma pública mantida pelo Governo Federal com o objetivo de centralizar informações cadastrais de empresas interessadas em contratar com a administração pública.
              </p>
              <p className="mt-3">Seu uso é gratuito.</p>
              <p className="mt-3">
                Qualquer fornecedor pode acessar o sistema diretamente pelo portal oficial, independentemente da CadBrasil. A CadBrasil não vende acesso ao SICAF e não cobra pelo uso do sistema governamental. O que a CadBrasil oferece são serviços privados especializados de apoio ao mercado de licitações.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Modelo de atuação da CadBrasil</h2>
              <p>
                A CadBrasil é uma empresa especializada em soluções estratégicas para empresas que desejam atuar com segurança no mercado de compras públicas.
              </p>
              <p className="font-semibold text-foreground mt-4 mb-2">Entre seus serviços estão:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Consultoria em licitações públicas</li>
                <li>Assessoria técnica para participação em pregões</li>
                <li>Regularização e organização documental</li>
                <li>Planejamento estratégico para fornecimento ao setor público</li>
                <li>Ferramentas tecnológicas de apoio ao fornecedor</li>
              </ul>
              <p className="mt-4">
                Dentro dos pacotes de serviços contratados, a empresa disponibiliza o Assistente IA SICAF como benefício adicional aos clientes. O assistente não é comercializado como acesso ao sistema público; integra o ecossistema de soluções privadas oferecidas pela CadBrasil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary shrink-0" />
                Tecnologia exclusiva e plataforma proprietária
              </h2>
              <p>
                O Assistente IA SICAF foi desenvolvido com arquitetura própria e metodologia tecnológica exclusiva. Trata-se de solução privada e proprietária, protegida por direitos de propriedade intelectual.
              </p>
              <p className="font-semibold text-foreground mt-4 mb-2">Sua inovação está na capacidade de:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Interpretar informações exibidas no sistema oficial</li>
                <li>Oferecer orientação contextual em tempo real</li>
                <li>Auxiliar na leitura de relatórios e documentos</li>
                <li>Sinalizar inconsistências informativas</li>
                <li>Traduzir linguagem técnica em orientação clara</li>
              </ul>
              <p className="mt-4">
                A tecnologia não possui integração institucional com bases governamentais e não representa canal oficial de comunicação pública. Ela atua como ferramenta educacional de apoio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Benefícios para o usuário</h2>
              <p>
                Ao utilizar o Assistente IA SICAF dentro do pacote de serviços CadBrasil, o fornecedor passa a contar com:
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  "Maior clareza sobre sua situação cadastral",
                  "Redução de dúvidas operacionais",
                  "Orientação técnica estruturada",
                  "Apoio preventivo para evitar bloqueios",
                  "Melhor organização documental",
                  "Ganho de tempo na navegação",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                A ferramenta atua como um guia inteligente, oferecendo suporte durante o uso do sistema oficial.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limites de atuação</h2>
              <p>Para garantir total transparência, reforça-se que:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>O Assistente IA SICAF não substitui o sistema oficial.</li>
                <li>Não substitui leitura de editais.</li>
                <li>Não substitui análise jurídica especializada.</li>
                <li>Não garante habilitação em processos licitatórios.</li>
                <li>Não interfere na decisão de órgãos públicos.</li>
              </ul>
              <p className="mt-4">
                A responsabilidade pelas informações inseridas no sistema e pelas decisões tomadas permanece exclusivamente com o fornecedor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Diferenciação entre serviço público e serviço privado
              </h2>
              <p className="font-semibold text-foreground">É essencial compreender a distinção:</p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                <li>
                  <strong className="text-foreground">SICAF</strong> → Sistema oficial e gratuito do Governo Federal.
                </li>
                <li>
                  <strong className="text-foreground">CadBrasil</strong> → Empresa privada de consultoria e tecnologia.
                </li>
                <li>
                  <strong className="text-foreground">Assistente IA SICAF</strong> → Ferramenta privada educacional de apoio ao uso do sistema.
                </li>
              </ul>
              <p className="mt-4">
                A CadBrasil não se apresenta como órgão público e não utiliza indevidamente símbolos oficiais. Toda a comunicação institucional respeita a separação entre ambiente governamental e serviço privado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Compromisso com ética, transparência e conformidade
              </h2>
              <p>A CadBrasil atua com base em princípios de:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Transparência</li>
                <li>Legalidade</li>
                <li>Responsabilidade</li>
                <li>Clareza institucional</li>
                <li>Respeito às normas vigentes</li>
              </ul>
              <p className="mt-4">
                O objetivo da empresa é contribuir para que fornecedores utilizem o sistema público de maneira mais organizada, segura e estratégica — sem substituição do sistema, sem interferência governamental e sem promessa indevida; apenas apoio técnico estruturado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Inclusão no pacote de serviços</h2>
              <p>
                O Assistente IA SICAF é oferecido como benefício adicional aos clientes que contratam os serviços especializados da CadBrasil. Integra o pacote como ferramenta complementar de apoio educacional.
              </p>
              <p className="mt-3">
                Não há cobrança pelo acesso ao sistema governamental. O que se contrata são serviços privados de consultoria e tecnologia.
              </p>
            </section>

            <section className="bg-muted/50 border border-border rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Conclusão</h2>
              <p>
                O Assistente IA SICAF CadBrasil representa uma inovação no apoio educacional ao uso do sistema oficial SICAF. É uma plataforma privada, tecnologia proprietária, ferramenta de orientação e benefício incluso nos serviços da CadBrasil.
              </p>
              <p className="mt-3">
                O SICAF continua sendo gratuito e acessível a qualquer fornecedor diretamente pelo Governo Federal. A CadBrasil atua como parceira estratégica das empresas que desejam operar com maior organização, compreensão e segurança no ambiente de compras públicas.
              </p>
              <p className="mt-3">
                Com transparência institucional, responsabilidade técnica e tecnologia aplicada, a CadBrasil reafirma seu compromisso com o desenvolvimento profissional do fornecedor no mercado de licitações.
              </p>
            </section>

            <div className="text-center pt-4">
              <Button variant="default" size="xl" className="w-full max-w-xl mx-auto h-auto min-h-14 py-4 px-6 text-base md:text-lg" asChild>
                <a href={CHROME_WEB_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                  Instalar extensão na Chrome Web Store
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssistenteSicaf;
