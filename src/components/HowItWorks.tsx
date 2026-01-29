const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Análise Documental",
      description:
        "Avaliação completa da situação cadastral e identificação dos documentos necessários para o processo.",
    },
    {
      number: "02",
      title: "Obtenção de Certidões",
      description:
        "Auxílio na obtenção de todas as certidões e documentos exigidos pela legislação vigente.",
    },
    {
      number: "03",
      title: "Cadastro no Sistema",
      description:
        "Realização do cadastro ou renovação junto ao Comprasnet/SICAF em conformidade com as normas.",
    },
    {
      number: "04",
      title: "Validação",
      description:
        "Acompanhamento do processo de validação até a aprovação completa do cadastro.",
    },
    {
      number: "05",
      title: "Monitoramento",
      description:
        "Acompanhamento contínuo dos vencimentos e alertas para renovação tempestiva.",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-primary font-medium text-xs uppercase tracking-widest mb-2">
            Fluxo do Processo
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Etapas do Cadastramento
          </h2>
          <p className="text-muted-foreground">
            Processo estruturado em 5 etapas para garantir a regularização da sua empresa
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 mb-6 last:mb-0"
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-6 border-b border-border last:border-0">
                <h3 className="text-base font-bold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
