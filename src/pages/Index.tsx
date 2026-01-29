import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicosDisponiveis from "@/components/ServicosDisponiveis";
import CompanyTypesSection from "@/components/CompanyTypesSection";
import WhatIsSicaf from "@/components/WhatIsSicaf";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import BenefitsSection from "@/components/BenefitsSection";
import PortalFeatures from "@/components/PortalFeatures";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Cadastro SICAF e Consultoria em Licitações - CADBRASIL"
        description="Cadastre sua empresa no SICAF e participe de licitações em todo o Brasil. Mais de 15 anos de experiência, 10.000+ empresas atendidas e 100% de aprovação. Processo rápido e seguro."
        canonical="/"
        keywords="cadastro SICAF, cadastro SICAF online, como fazer cadastro SICAF, renovação SICAF, licitações públicas, compras governamentais, fornecedor governo federal, cadastro fornecedor, SICAF 2025, consultoria licitações"
        breadcrumbs={[
          { name: "Início", url: "/" }
        ]}
        faq={[
          {
            question: "O que é o SICAF?",
            answer: "O SICAF (Sistema de Cadastramento Unificado de Fornecedores) é o sistema oficial do Governo Federal para registro e habilitação de empresas que desejam participar de licitações públicas. O cadastro é obrigatório para fornecer produtos ou serviços a órgãos federais."
          },
          {
            question: "Qual o prazo para conclusão do cadastro?",
            answer: "O prazo médio para conclusão do cadastro é de 48 horas úteis após a entrega completa da documentação. Casos que exijam regularização de pendências podem demandar prazo adicional, sempre com comunicação prévia."
          },
          {
            question: "Quais documentos são necessários?",
            answer: "Os documentos básicos incluem: contrato social atualizado, documentos dos sócios, certidões negativas (federal, estadual, municipal), comprovante de regularidade do FGTS, CNDT trabalhista, balanço patrimonial, entre outros. Nossa equipe realiza análise prévia e orienta sobre a documentação específica."
          },
          {
            question: "MEI pode obter cadastro SICAF?",
            answer: "Sim. Microempreendedores Individuais podem e devem obter o cadastro SICAF para participar de licitações federais. O processo é simplificado para MEIs, com documentação reduzida."
          },
          {
            question: "Com qual periodicidade o SICAF deve ser renovado?",
            answer: "O SICAF deve ser renovado anualmente. Algumas certidões possuem validade inferior e requerem atualização periódica. Oferecemos serviço de monitoramento e alertas para garantir a manutenção da regularidade."
          },
          {
            question: "Há garantia de aprovação do cadastro?",
            answer: "Sim. Oferecemos garantia de resultado. Caso o cadastro não seja aprovado por qualquer motivo, realizamos o reembolso integral do valor investido. Nossa taxa de aprovação é de 99%."
          }
        ]}
      />
      <Header />
      <main>
        <HeroSection />
        <ServicosDisponiveis />
        <CompanyTypesSection />
        <WhatIsSicaf />
        <ServicesSection />
        <HowItWorks />
        <BenefitsSection />
        <PortalFeatures />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
