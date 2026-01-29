import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, RefreshCw, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: Plus,
      title: "Cadastro Novo",
      subtitle: "Para empresas sem cadastro SICAF",
      description:
        "Serviço completo de cadastramento para empresas que desejam iniciar o fornecimento ao Governo Federal.",
      features: [
        "Análise documental completa",
        "Cadastro em todos os níveis",
        "Orientação sobre CNAEs",
        "Acompanhamento até aprovação",
        "Garantia de resultado",
      ],
      cta: "Solicitar Cadastro",
      link: "/cadastro?tipo=novo",
      highlighted: false,
    },
    {
      icon: RefreshCw,
      title: "Renovação",
      subtitle: "Para cadastros vencidos ou a vencer",
      description:
        "Atualização e renovação do cadastro SICAF para manter sua empresa habilitada a licitar.",
      features: [
        "Atualização de certidões",
        "Regularização de pendências",
        "Prazo médio de 48 horas",
        "Monitoramento de vencimentos",
        "Alertas automáticos",
      ],
      cta: "Solicitar Renovação",
      link: "/cadastro?tipo=renovacao",
      highlighted: true,
    },
  ];

  return (
    <section id="servicos" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-primary font-medium text-xs uppercase tracking-widest mb-2">
            Serviços Disponíveis
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Soluções para Cadastramento SICAF
          </h2>
          <p className="text-muted-foreground">
            Escolha o serviço adequado às necessidades da sua empresa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-card p-6 border transition-colors ${
                service.highlighted
                  ? "border-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              {service.highlighted && (
                <div className="absolute -top-3 left-4 bg-primary text-white text-xs font-medium px-3 py-1">
                  Mais Solicitado
                </div>
              )}

              <div className="w-10 h-10 bg-primary flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-white" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                {service.title}
              </h3>
              <p className="text-primary text-xs font-medium mb-3">{service.subtitle}</p>
              <p className="text-muted-foreground text-sm mb-5">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={service.link}>
                <Button
                  variant={service.highlighted ? "default" : "outline"}
                  size="default"
                  className="w-full group"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Botão Saiba Mais */}
        <div className="text-center">
          <Link to="/solucoes-sicaf">
            <Button variant="outline" size="lg" className="group">
              Saiba Mais Sobre Nossas Soluções
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
