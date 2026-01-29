import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, FileText, Globe, CheckCircle2, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import heroGovernment from "@/assets/hero-government.jpg";

const HeroSection = () => {
  const floatingIndicators = [
    { 
      icon: FileText, 
      label: "SICAF", 
      value: "Ativo",
      sublabel: "Cadastro habilitado",
      position: "top-8 -right-4" 
    },
    { 
      icon: Globe, 
      label: "Comprasnet", 
      value: "100%",
      sublabel: "Integração completa",
      position: "top-1/3 -right-6" 
    },
    { 
      icon: BarChart3, 
      label: "Oportunidades", 
      value: "100.000+",
      sublabel: "Licitações diárias",
      position: "bottom-1/4 -right-4" 
    },
  ];

  return (
    <section className="relative bg-primary pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium tracking-wide uppercase">
                Assessoria Especializada em Licitações
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              ...Cadastre sua empresa no SICAF e participe de licitações em todo o Brasil
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl lg:max-w-none">
              A Cadbrasil cuida de todo o processo para sua empresa participar de licitações federais com segurança, agilidade e respaldo legal. Com o SICAF ativo, você ainda conta com nossos módulos inteligentes de licitações para não perder nenhuma oportunidade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-8 lg:mb-0">
              <Link to="/cadastro">
                <Button variant="cta" size="lg" className="w-full sm:w-auto group">
                  Novo Cadastro SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="ctaOutline" size="lg" className="w-full sm:w-auto group">
                  Renovação SICAF
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Cloud Image with Floating Indicators */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Cloud Effect Container */}
              <div className="relative">
                {/* Outer glow/shadow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl blur-2xl" />
                
                {/* Main Image with cloud border effect */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]">
                  {/* Image */}
                  <img 
                    src={heroGovernment} 
                    alt="Prédio governamental brasileiro" 
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Soft fade overlay for cloud effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-white/10" />
                  
                  {/* Edge blur effect - creates the cloud/soft border look */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_20px_rgba(30,70,50,0.3)]" />
                </div>
              </div>

              {/* Floating Indicators - White card style */}
              {floatingIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className={`absolute ${indicator.position} bg-white shadow-2xl rounded-xl px-4 py-3 min-w-[140px] animate-float`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <indicator.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{indicator.label}</p>
                      <p className="text-lg font-bold text-foreground">{indicator.value}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        <span className="text-xs text-primary">{indicator.sublabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-12 mt-12 border-t border-white/20">
          {[
            { value: "6M+", label: "Licitações" },
            { value: "50.000+", label: "Processos SICAF" },
            { value: "100%", label: "Aprovação" },
            { value: "15+", label: "Anos de Atuação" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
