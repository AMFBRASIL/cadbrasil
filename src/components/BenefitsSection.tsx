import { Clock, Shield, Users, FileCheck, Headphones, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Agilidade",
      description: "Processo otimizado com prazos reduzidos. Cadastro concluído em dias, não semanas.",
    },
    {
      icon: Shield,
      title: "Conformidade Legal",
      description: "Documentação em total conformidade com a legislação e normas vigentes.",
    },
    {
      icon: Users,
      title: "Equipe Técnica",
      description: "Profissionais especializados com mais de 15 anos de experiência no setor.",
    },
    {
      icon: FileCheck,
      title: "Garantia de Resultado",
      description: "Reembolso integral em caso de não aprovação do cadastro.",
    },
    {
      icon: Headphones,
      title: "Atendimento Dedicado",
      description: "Suporte personalizado durante todo o processo de cadastramento.",
    },
    {
      icon: TrendingUp,
      title: "Acesso ao Mercado",
      description: "Habilitação para participar de milhares de licitações federais.",
    },
  ];

  return (
    <section id="diferenciais" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-primary font-medium text-xs uppercase tracking-widest mb-2">
            Diferenciais
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Por que escolher a CADBRASIL
          </h2>
          <p className="text-muted-foreground">
            Mais de 10.000 empresas regularizadas em todo o território nacional
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card p-5 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-3">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Botão Saiba Mais */}
        <div className="text-center">
          <Link to="/por-que-cadbrasil">
            <Button variant="default" size="lg" className="group">
              Conheça Nossa Empresa
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
