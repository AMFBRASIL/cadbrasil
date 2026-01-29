import { FileSearch, FileText, Brain, Globe, FolderClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PortalFeatures = () => {
  const features = [
    {
      icon: FileSearch,
      title: "Análise de Documentação",
      description: "Verificação completa de toda documentação necessária para licitações com validação automática.",
    },
    {
      icon: FileText,
      title: "Análise de Contrato de Licitação",
      description: "Avaliação detalhada de contratos para identificar riscos e oportunidades antes de participar.",
    },
    {
      icon: Brain,
      title: "Análise de Edital por IA",
      description: "Inteligência artificial que analisa editais 24/7, identificando requisitos e pontos de atenção.",
    },
    {
      icon: Globe,
      title: "Leitura de Licitações Governamentais",
      description: "Monitoramento automático de oportunidades em portais federais, estaduais e municipais.",
    },
    {
      icon: FolderClock,
      title: "Gestão de Certidões",
      description: "Controle de documentos e certidões vencidas ou a vencer com alertas automáticos.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-foreground text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-primary font-medium text-xs uppercase tracking-widest mb-2">
            Plataforma Exclusiva
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Portal CADBRASIL
          </h2>
          <p className="text-white/70">
            Tecnologia avançada para simplificar sua participação em licitações públicas. 
            Todas as ferramentas que sua empresa precisa em um só lugar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors ${
                index === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/beneficios-cadbrasil">
            <Button variant="cta" size="lg" className="group">
              Conhecer a Plataforma
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortalFeatures;
