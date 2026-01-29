import { Brain, FileText, Search, BarChart3, FolderOpen, Headphones } from "lucide-react";

const ServicosDisponiveis = () => {
  const servicos = [
    {
      icon: Brain,
      categoria: "Inovação",
      titulo: "Análise de Editais com IA",
      descricao: "Sistema inteligente para análise completa de editais",
      tempo: "~2 min",
    },
    {
      icon: FileText,
      categoria: "SICAF",
      titulo: "Credenciamento SICAF",
      descricao: "Processo completo de cadastramento no SICAF",
      tempo: "~15 min",
    },
    {
      icon: Search,
      categoria: "Licitações",
      titulo: "Consultoria em Licitações",
      descricao: "Assessoria especializada para participação em licitações",
      tempo: "~30 min",
    },
    {
      icon: BarChart3,
      categoria: "Análise",
      titulo: "Análise de Oportunidades",
      descricao: "Identificação de oportunidades em licitações",
      tempo: "~10 min",
    },
    {
      icon: FolderOpen,
      categoria: "Documentação",
      titulo: "Gestão de Documentos",
      descricao: "Organização e gestão de documentação para licitações",
      tempo: "~5 min",
    },
    {
      icon: Headphones,
      categoria: "Suporte",
      titulo: "Suporte Especializado",
      descricao: "Atendimento técnico especializado em licitações",
      tempo: "24/7",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Serviços Disponíveis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Acesse os principais serviços municipais de forma digital, rápida e segura, 24 horas por dia.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 border border-border"
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <servico.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {servico.categoria}
                </span>
              </div>

              {/* Conteúdo */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {servico.titulo}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {servico.descricao}
              </p>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  <span className="text-xs text-muted-foreground">Disponível</span>
                </div>
                <span className="text-xs font-medium text-primary">{servico.tempo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicosDisponiveis;
