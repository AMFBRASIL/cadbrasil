import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";
import VantagensSicaf from "./pages/VantagensSicaf";
import SolucoesSicaf from "./pages/SolucoesSicaf";
import PorQueCadbrasil from "./pages/PorQueCadbrasil";
import ComoFazerCadastroSicaf from "./pages/ComoFazerCadastroSicaf";
import ComoFazerCadastroSistemaUnificadoSicaf from "./pages/ComoFazerCadastroSistemaUnificadoSicaf";
import BeneficiosCadbrasil from "./pages/BeneficiosCadbrasil";
import ConsultoriaLicitacoes from "./pages/ConsultoriaLicitacoes";
import RenovacaoSicaf from "./pages/RenovacaoSicaf";
import CadastroSicafNovo from "./pages/CadastroSicafNovo";
import QuemSomos from "./pages/QuemSomos";
import Contato from "./pages/Contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import Redirect from "./components/Redirect";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <WhatsAppButton />
          <Routes>
            {/* Rotas principais */}
            <Route path="/" element={<Index />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/vantagens-sicaf" element={<VantagensSicaf />} />
            <Route path="/solucoes-sicaf" element={<SolucoesSicaf />} />
            <Route path="/por-que-cadbrasil" element={<PorQueCadbrasil />} />
            <Route path="/como-fazer-cadastro-no-sicaf" element={<ComoFazerCadastroSicaf />} />
            <Route path="/como-fazer-o-cadastro-no-sistema-de-cadastramento-unificado-sicaf" element={<ComoFazerCadastroSistemaUnificadoSicaf />} />
            <Route path="/beneficios-cadbrasil" element={<BeneficiosCadbrasil />} />
            <Route path="/consultoria-licitacoes" element={<ConsultoriaLicitacoes />} />
            <Route path="/renovacao-sicaf" element={<RenovacaoSicaf />} />
            <Route path="/cadastro-sicaf-novo" element={<CadastroSicafNovo />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            
            {/* Redirecionamentos de URLs antigas (PHP) para home */}
            <Route path="/credenciamento" element={<Redirect to="/" />} />
            <Route path="/leituraia" element={<Redirect to="/" />} />
            <Route path="/consultoria" element={<Redirect to="/" />} />
            <Route path="/servicos" element={<Redirect to="/" />} />
            <Route path="/informativos" element={<Redirect to="/" />} />
            <Route path="/artigo-sicaf" element={<Redirect to="/" />} />
            <Route path="/artigo-licitacoes" element={<Redirect to="/" />} />
            <Route path="/artigo-editais" element={<Redirect to="/" />} />
            <Route path="/artigo-certidoes" element={<Redirect to="/" />} />
            <Route path="/documentos" element={<Redirect to="/" />} />
            <Route path="/transparencia" element={<Redirect to="/" />} />
            <Route path="/blog" element={<Redirect to="/" />} />
            
            {/* Redirecionamentos específicos */}
            <Route path="/sobre-cadbrasil-sicaf-comprasnet" element={<Redirect to="/quem-somos" />} />
            <Route path="/servicos-cadbrasil-digital-sicaf-comprasnet" element={<Redirect to="/" />} />
            <Route path="/category/blog" element={<Redirect to="/" />} />
            <Route path="/sicaf-contato-cadbrasil-suporte-acesso" element={<Redirect to="/contato" />} />
            <Route path="/sicaf-cadastro-unificado-de-fornecedores" element={<Redirect to="/" />} />
            <Route path="/o-seguro-garantia-na-nova-lei-de-licitacoes" element={<Redirect to="/" />} />
            <Route path="/tabela-de-precos-cadbrasil" element={<Redirect to="/" />} />
            <Route path="/quem-pode-se-cadastrar-no-sicaf" element={<Redirect to="/" />} />
            <Route path="/quais-sao-as-modalidades-de-licitacoes" element={<Redirect to="/" />} />
            <Route path="/nova-lei-de-licitacoes-2024-entenda-as-propostas-e-mudancas" element={<Redirect to="/" />} />
            <Route path="/como-participar-de-licitacoes-agora-com-a-nova-lei" element={<Redirect to="/" />} />
            <Route path="/credenciamento-sicaf-digital" element={<Redirect to="/" />} />
            <Route path="/como-se-cadastrar" element={<Redirect to="/cadastro" />} />
            <Route path="/tag/seguro-licitacoes" element={<Redirect to="/" />} />
            <Route path="/category/departments" element={<Redirect to="/" />} />
            <Route path="/team" element={<Redirect to="/" />} />
            <Route path="/category/negocios" element={<Redirect to="/" />} />
            <Route path="/category/servicos-para-o-setor-publico" element={<Redirect to="/" />} />
            <Route path="/o-sicaf-centralizacao-de-cadastro-e-habilitacao-de-fornecedores-para-licitacoes-publicas" element={<Redirect to="/" />} />
            <Route path="/services/arts-culture" element={<Redirect to="/" />} />
            <Route path="/shop" element={<Redirect to="/" />} />
            <Route path="/category/licitacoes" element={<Redirect to="/" />} />
            <Route path="/os-8-servicos-e-produtos-mais-vendidos-em-licitacao" element={<Redirect to="/" />} />
            <Route path="/entenda-a-nova-lei-de-licitacoes-e-o-atestado-de-capacidade-tecnica" element={<Redirect to="/" />} />
            <Route path="/entendendo-o-processo-de-licitacao-o-que-e-e-como-funciona" element={<Redirect to="/" />} />
            <Route path="/prazos-de-validade-de-certidoes-para-licitacoes" element={<Redirect to="/" />} />
            <Route path="/2024" element={<Redirect to="/" />} />
            <Route path="/events/2023-09-11" element={<Redirect to="/" />} />
            <Route path="/documentos.html" element={<Redirect to="/" />} />
            <Route path="/events/2023-04-18" element={<Redirect to="/" />} />
            <Route path="/index.html" element={<Redirect to="/" />} />
            <Route path="/home" element={<Redirect to="/" />} />
            <Route path="/events/2025-08-07" element={<Redirect to="/" />} />
            <Route path="/events/category/festivals/list" element={<Redirect to="/" />} />
            <Route path="/wp/govtpress/services-details" element={<Redirect to="/" />} />
            <Route path="/tag/kit" element={<Redirect to="/" />} />
            <Route path="/home-02" element={<Redirect to="/" />} />
            <Route path="/checkout" element={<Redirect to="/" />} />
            
            {/* Catch-all: qualquer URL não encontrada redireciona para home */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
