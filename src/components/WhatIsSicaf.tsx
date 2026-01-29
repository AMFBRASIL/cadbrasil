import { CheckCircle2, FileText, Shield, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhatIsSicaf = () => {
  const cards = [
    {
      icon: FileText,
      title: "SICAF",
      subtitle: "Sistema de Cadastramento Unificado de Fornecedores",
      description:
        "Registro obrigatório para empresas que desejam fornecer produtos ou serviços ao Governo Federal através de licitações públicas.",
    },
    {
      icon: Shield,
      title: "Comprasnet",
      subtitle: "Portal de Compras do Governo Federal",
      description:
        "Plataforma oficial onde são realizados os pregões eletrônicos e demais modalidades de contratação pública federal.",
    },
    {
      icon: Award,
      title: "PNCP",
      subtitle: "Portal Nacional de Contratações Públicas",
      description:
        "Sistema que centraliza informações sobre licitações e contratos públicos de todos os entes da federação.",
    },
  ];

  const benefits = [
    "Habilitação para participar de licitações federais",
    "Validade em todo o território nacional",
    "Acesso a oportunidades de negócio com o setor público",
    "Comprovação de regularidade fiscal e jurídica",
  ];

  return (
    <section id="sicaf" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-primary font-medium text-xs uppercase tracking-widest mb-2">
            Informações Essenciais
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Entenda o Sistema de Cadastramento
          </h2>
          <p className="text-muted-foreground">
            Para fornecer ao Governo Federal, sua empresa deve estar regularmente cadastrada no SICAF.
            Este é um requisito legal para participação em licitações públicas.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-card p-6 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-primary font-medium mb-2">
                {card.subtitle}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits List */}
        <div className="bg-primary p-8 md:p-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Vantagens do Cadastro SICAF
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-white/80 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/vantagens-sicaf">
                <Button variant="cta" size="lg" className="group">
                  Ver Todas as Vantagens
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSicaf;
