import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "O que é o SICAF?",
      answer:
        "O SICAF (Sistema de Cadastramento Unificado de Fornecedores) é o sistema oficial do Governo Federal para registro e habilitação de empresas que desejam participar de licitações públicas. O cadastro é obrigatório para fornecer produtos ou serviços a órgãos federais.",
    },
    {
      question: "Qual o prazo para conclusão do cadastro?",
      answer:
        "O prazo médio para conclusão do cadastro é de 48 horas úteis após a entrega completa da documentação. Casos que exijam regularização de pendências podem demandar prazo adicional, sempre com comunicação prévia.",
    },
    {
      question: "Quais documentos são necessários?",
      answer:
        "Os documentos básicos incluem: contrato social atualizado, documentos dos sócios, certidões negativas (federal, estadual, municipal), comprovante de regularidade do FGTS, CNDT trabalhista, balanço patrimonial, entre outros. Nossa equipe realiza análise prévia e orienta sobre a documentação específica.",
    },
    {
      question: "MEI pode obter cadastro SICAF?",
      answer:
        "Sim. Microempreendedores Individuais podem e devem obter o cadastro SICAF para participar de licitações federais. O processo é simplificado para MEIs, com documentação reduzida.",
    },
    {
      question: "Com qual periodicidade o SICAF deve ser renovado?",
      answer:
        "O SICAF deve ser renovado anualmente. Algumas certidões possuem validade inferior e requerem atualização periódica. Oferecemos serviço de monitoramento e alertas para garantir a manutenção da regularidade.",
    },
    {
      question: "Quais as consequências do SICAF vencido?",
      answer:
        "Com o cadastro vencido, a empresa fica impedida de participar de novas licitações e pode ter contratos vigentes suspensos. A regularização deve ser realizada o mais breve possível.",
    },
    {
      question: "Há garantia de aprovação do cadastro?",
      answer:
        "Sim. Oferecemos garantia de resultado. Caso o cadastro não seja aprovado por qualquer motivo, realizamos o reembolso integral do valor investido. Nossa taxa de aprovação é de 99%.",
    },
    {
      question: "Como acompanhar o andamento do processo?",
      answer:
        "Disponibilizamos um especialista dedicado que mantém comunicação sobre cada etapa do processo. Relatórios de status são fornecidos mediante solicitação.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-primary font-medium text-xs uppercase tracking-widest mb-2">
            Dúvidas Frequentes
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Perguntas e Respostas
          </h2>
          <p className="text-muted-foreground">
            Informações sobre o SICAF e os serviços oferecidos
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border px-4 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4 text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
