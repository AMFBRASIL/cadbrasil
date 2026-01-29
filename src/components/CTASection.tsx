import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-12 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Regularize sua Empresa para Licitações
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Inicie o processo de cadastramento SICAF. Nossa equipe técnica está pronta para 
            auxiliar sua empresa a acessar o mercado de compras públicas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
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

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/20">
            <a
              href="tel:+551121220202"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-70 uppercase tracking-wide">Telefone</div>
                <div className="font-medium">(011) 2122-0202</div>
              </div>
            </a>

            <a
              href="https://wa.me/551121220202"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-70 uppercase tracking-wide">WhatsApp</div>
                <div className="font-medium">(011) 2122-0202</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
