import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, FileText, Upload, Search, Award, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const ComoFazerCadastroSicaf = () => {
  const etapas = [
    {
      numero: "01",
      icon: Search,
      titulo: "Acesso ao Portal",
      descricao: "Acesse nosso portal especializado de cadastramento SICAF para iniciar o processo.",
    },
    {
      numero: "02",
      icon: FileText,
      titulo: "Cadastro Inicial",
      descricao: "Preencha os dados básicos da empresa e do responsável pelo cadastro.",
    },
    {
      numero: "03",
      icon: Search,
      titulo: "Análise Especializada",
      descricao: "Nossa equipe realiza análise completa da documentação e situação fiscal.",
    },
    {
      numero: "04",
      icon: Upload,
      titulo: "Upload de Documentos",
      descricao: "Envie os documentos necessários através do nosso sistema seguro.",
    },
    {
      numero: "05",
      icon: Clock,
      titulo: "Processamento",
      descricao: "Acompanhe o processamento do cadastro em tempo real pelo portal.",
    },
    {
      numero: "06",
      icon: Award,
      titulo: "Aprovação",
      descricao: "Receba a confirmação de aprovação e comece a participar de licitações.",
    },
  ];

  const documentosBasicos = [
    "Contrato Social ou Estatuto (atualizado)",
    "CNPJ ativo e regularizado",
    "Inscrição Estadual (se aplicável)",
    "Inscrição Municipal (se aplicável)",
    "Balanço Patrimonial dos últimos 2 anos",
    "Demonstração de Resultados (DRE)",
  ];

  const certidoes = [
    "Certidão Negativa de Débitos Federais (Receita Federal)",
    "Certidão Negativa de Débitos Estaduais (SEFAZ)",
    "Certidão Negativa de Débitos Municipais (Prefeitura)",
    "Certidão de Regularidade FGTS",
    "Certidão de Regularidade INSS",
    "Certidão de Regularidade Trabalhista (CNDT)",
  ];

  const comparativo = [
    { item: "Tempo de cadastro", sozinho: "7-15 dias", cadbrasil: "Em até 3 horas" },
    { item: "Suporte técnico", sozinho: "Não disponível", cadbrasil: "24/7" },
    { item: "Garantia de resultado", sozinho: "Não há", cadbrasil: "100% garantido" },
    { item: "Orientação documental", sozinho: "Por conta própria", cadbrasil: "Completa" },
    { item: "Acompanhamento", sozinho: "Manual", cadbrasil: "Automatizado" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Como Fazer Cadastro no SICAF 2026 - Guia Completo"
        description="Aprenda como fazer cadastro no SICAF 2026 passo a passo. Processo simplificado em até 3 horas com suporte especializado da CADBRASIL. Guia completo com todos os documentos necessários."
        canonical="/como-fazer-cadastro-no-sicaf"
        keywords="como fazer cadastro SICAF, passo a passo SICAF, documentos SICAF, cadastro SICAF 2026, tutorial SICAF, guia cadastro SICAF, processo cadastro SICAF"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Como Fazer Cadastro no SICAF", url: "/como-fazer-cadastro-no-sicaf" }
        ]}
        ogType="article"
        article={{
          publishedTime: "2026-01-26T00:00:00Z",
          modifiedTime: "2026-01-26T00:00:00Z",
          author: "CADBRASIL",
          section: "Guia",
          tags: ["SICAF", "Cadastro SICAF", "Licitações", "Guia", "Tutorial"]
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como Fazer Cadastro no SICAF",
          description: "Guia completo passo a passo para cadastramento no SICAF (Sistema de Cadastramento Unificado de Fornecedores)",
          totalTime: "PT3H",
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: "BRL",
            value: "985.00"
          },
          step: [
            { "@type": "HowToStep", name: "Acesso ao Portal", text: "Acesse o portal de cadastramento SICAF" },
            { "@type": "HowToStep", name: "Cadastro Inicial", text: "Preencha os dados básicos da empresa e do responsável" },
            { "@type": "HowToStep", name: "Análise Especializada", text: "Nossa equipe realiza análise completa da documentação" },
            { "@type": "HowToStep", name: "Upload de Documentos", text: "Envie os documentos necessários através do sistema seguro" },
            { "@type": "HowToStep", name: "Processamento", text: "Acompanhe o processamento do cadastro em tempo real" },
            { "@type": "HowToStep", name: "Aprovação", text: "Receba a confirmação de aprovação e comece a participar de licitações" }
          ]
        }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-white/80 font-medium text-xs uppercase tracking-widest mb-4">
                Guia Completo e Atualizado
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Como Fazer Cadastro no SICAF 2026
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Aprenda como fazer cadastro no SICAF com a CADBRASIL. Processo simplificado, 
                suporte especializado e cadastro em até 3 horas.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">3h</div>
                  <div className="text-white/70 text-sm">Tempo Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Gratuito</div>
                  <div className="text-white/70 text-sm">Análise Inicial</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">8-12</div>
                  <div className="text-white/70 text-sm">Documentos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-white/70 text-sm">Aprovação</div>
                </div>
              </div>
              <Link to="/cadastro?tipo=novo">
                <Button variant="cta" size="lg" className="group">
                  Iniciar Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* O que é o SICAF */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que é o SICAF?
              </h2>
              <p className="text-muted-foreground mb-6">
                O <strong className="text-foreground">SICAF (Sistema de Cadastramento Unificado de Fornecedores)</strong> é 
                o sistema oficial do governo federal brasileiro para cadastramento de fornecedores que desejam participar 
                de licitações públicas. Este cadastro é <strong className="text-foreground">obrigatório</strong> para 
                empresas que pretendem vender para órgãos federais.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Importante:</strong> O SICAF é obrigatório apenas para 
                  licitações federais. Estados e municípios podem ter seus próprios sistemas de cadastramento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Passo a Passo */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Passo a Passo do Cadastro
              </h2>
              <p className="text-muted-foreground">
                Conheça cada etapa do processo de cadastramento SICAF
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {etapas.map((etapa, index) => (
                <div key={index} className="bg-card p-6 border border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-bold">
                      {etapa.numero}
                    </div>
                    <etapa.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {etapa.titulo}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {etapa.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentos Necessários */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Documentos para Licitação - Lista Completa SICAF 2026
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Documentos Básicos da Empresa
                  </h3>
                  <ul className="space-y-3">
                    {documentosBasicos.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Certidões Negativas
                  </h3>
                  <ul className="space-y-3">
                    {certidoes.map((cert, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparativo */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Fazer Sozinho vs. Com a CADBRASIL
              </h2>

              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-4 text-left text-foreground font-semibold">Item</th>
                      <th className="p-4 text-center text-foreground font-semibold">Sozinho</th>
                      <th className="p-4 text-center text-primary font-semibold">CADBRASIL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparativo.map((item, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-4 text-foreground">{item.item}</td>
                        <td className="p-4 text-center text-muted-foreground">{item.sozinho}</td>
                        <td className="p-4 text-center text-primary font-medium">{item.cadbrasil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para Iniciar seu Cadastro?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deixe a CADBRASIL cuidar de todo o processo. Em até 3 horas seu cadastro estará ativo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro?tipo=novo">
                <Button size="lg" className="group">
                  Iniciar Cadastro SICAF
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

export default ComoFazerCadastroSicaf;
