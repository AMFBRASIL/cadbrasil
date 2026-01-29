import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Shield, Users, FileCheck, Headphones, TrendingUp, Award, Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const PorQueCadbrasil = () => {
  const diferenciais = [
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

  const estatisticas = [
    { valor: "15+", label: "Anos de Experiência" },
    { valor: "10.000+", label: "Empresas Atendidas" },
    { valor: "98%", label: "Taxa de Aprovação" },
    { valor: "24/7", label: "Suporte Disponível" },
  ];

  const tecnologias = [
    {
      icon: Brain,
      title: "Análise com Inteligência Artificial",
      description: "Sistema de IA para análise completa de editais e identificação de oportunidades.",
    },
    {
      icon: Shield,
      title: "Segurança de Dados",
      description: "Infraestrutura segura com conformidade LGPD e certificações ISO.",
    },
    {
      icon: FileCheck,
      title: "Automação de Documentos",
      description: "Sistema automatizado para gestão e monitoramento de certidões e documentos.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Por que Escolher a CADBRASIL"
        description="Descubra por que mais de 10.000 empresas escolheram a CADBRASIL: 15 anos de experiência, equipe especializada e garantia de resultado."
        canonical="/por-que-cadbrasil"
        keywords="por que CADBRASIL, diferenciais CADBRASIL, empresa SICAF, especialistas licitações, garantia cadastro"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Por que escolher a CADBRASIL?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A CADBRASIL possui mais de 15 anos de experiência, equipe especializada e mais de 10.000 empresas cadastradas com sucesso."
              }
            },
            {
              "@type": "Question",
              name: "Qual a taxa de aprovação da CADBRASIL?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nossa taxa de aprovação é de 98%, a maior do mercado brasileiro."
              }
            },
            {
              "@type": "Question",
              name: "Em quanto tempo o cadastro SICAF fica pronto?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Com nossa metodologia otimizada, o cadastro pode ser concluído em até 3 horas."
              }
            }
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
                Conheça Nossa Empresa
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Por que Escolher a CADBRASIL
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Há mais de 15 anos transformando a forma como empresas brasileiras 
                acessam o mercado de licitações públicas.
              </p>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {estatisticas.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.valor}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Nossos Diferenciais
              </h2>
              <p className="text-muted-foreground">
                Mais de 10.000 empresas confiam na CADBRASIL para seu cadastramento SICAF
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {diferenciais.map((diferencial, index) => (
                <div
                  key={index}
                  className="bg-card p-6 border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                    <diferencial.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {diferencial.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {diferencial.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tecnologia */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Tecnologia a Seu Favor
              </h2>
              <p className="text-white/80">
                Utilizamos as mais avançadas tecnologias para otimizar seu processo
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tecnologias.map((tech, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-white/20 flex items-center justify-center mb-4 rounded-lg">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Nossa História
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  Fundada em 2010, a CADBRASIL nasceu com a missão de simplificar o acesso 
                  de empresas brasileiras ao mercado de licitações públicas. Ao longo de mais 
                  de 15 anos, nos tornamos referência nacional em cadastramento SICAF e 
                  consultoria em licitações.
                </p>
                <p className="mb-4">
                  Nossa equipe é formada por profissionais especializados que entendem 
                  profundamente as necessidades das empresas que desejam fornecer para o 
                  governo. Combinamos experiência com tecnologia de ponta, incluindo 
                  sistemas de inteligência artificial, para oferecer o melhor serviço do mercado.
                </p>
                <p>
                  Hoje, atendemos empresas de todos os portes em todo o território nacional, 
                  desde MEIs até grandes corporações, com o mesmo compromisso de excelência 
                  e garantia de resultado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Faça Parte dos Nossos Casos de Sucesso
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já confiam na CADBRASIL para seu 
              cadastramento SICAF e participação em licitações.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro?tipo=novo">
                <Button size="lg" className="group">
                  Iniciar Meu Cadastro
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/beneficios-cadbrasil">
                <Button variant="outline" size="lg" className="group">
                  Ver Todos os Benefícios
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PorQueCadbrasil;
