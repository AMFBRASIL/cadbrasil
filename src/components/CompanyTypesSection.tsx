import { Building, Building2, Factory, Globe } from "lucide-react";

const CompanyTypesSection = () => {
  const companyTypes = [
    {
      icon: Building,
      title: "MEI e Microempresas",
      description: "Processo simplificado para microempreendedores individuais e pequenos negócios",
    },
    {
      icon: Building2,
      title: "Pequeno e Médio Porte",
      description: "Cadastro completo com assessoria especializada para empresas em crescimento",
    },
    {
      icon: Factory,
      title: "Grande Porte",
      description: "Gestão integral do SICAF para operações corporativas de grande escala",
    },
    {
      icon: Globe,
      title: "Empresas Estrangeiras",
      description: "Assessoria para empresas internacionais que desejam licitar no Brasil",
    },
  ];

  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Atendimento para Todos os Portes Empresariais
          </h2>
          <p className="text-muted-foreground text-sm">
            Soluções adequadas às necessidades específicas de cada tipo de empresa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companyTypes.map((type, index) => (
            <div
              key={index}
              className="bg-card p-5 border border-border hover:border-primary/30 transition-colors text-center"
            >
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <type.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{type.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyTypesSection;
