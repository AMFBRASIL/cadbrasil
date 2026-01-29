import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = {
    services: [
      { label: "Cadastro SICAF Novo", href: "/cadastro-sicaf-novo" },
      { label: "Renovação SICAF", href: "/renovacao-sicaf" },
      { label: "Consultoria em Licitações", href: "/consultoria-licitacoes" },
      { label: "Como Fazer Cadastro SICAF", href: "/como-fazer-cadastro-no-sicaf" },
    ],
    resources: [
      { label: "Sobre o SICAF", href: "/#sicaf" },
      { label: "Vantagens do SICAF", href: "/vantagens-sicaf" },
      { label: "Benefícios CADBRASIL", href: "/beneficios-cadbrasil" },
      { label: "Por que CADBRASIL", href: "/por-que-cadbrasil" },
    ],
    institutional: [
      { label: "Quem Somos", href: "/quem-somos" },
      { label: "Contato", href: "/contato" },
    ],
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <div>
                <span className="text-lg font-bold">CADBRASIL</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">
              Empresa especializada em cadastramento e renovação SICAF, com mais de 
              15 anos de atuação no mercado de licitações públicas.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Serviços</h4>
            <ul className="space-y-2">
              {links.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Recursos</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Institucional */}
            <h4 className="font-semibold text-sm mb-3 mt-6 uppercase tracking-wide">Institucional</h4>
            <ul className="space-y-2">
              {links.institutional.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+551121220202"
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  (011) 2122-0202
                </a>
              </li>
              <li>
                <a
                  href="mailto:documentos@fornecedordigital.com.br"
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  documentos@fornecedordigital.com.br
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/50 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>Atendimento em todo o território nacional</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="text-white/40 text-xs leading-relaxed space-y-1">
              <p>© {new Date().getFullYear()} CADBRASIL - Todos os direitos reservados</p>
              <p>Cadbrasil Portal de Licitacoes - CNPJ : 52.841.613/0001-55</p>
              <p>A Cadbrasil é uma empresa privada de assessoria. Não somos órgão público nem possuímos vínculo com o Governo.</p>
              <p>Versão de Site e Sistema 01/03/2024 - 14:34 - Versao 2.8</p>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <Link to="/politica-de-privacidade" className="text-white/40 hover:text-white text-xs transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos-de-uso" className="text-white/40 hover:text-white text-xs transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
