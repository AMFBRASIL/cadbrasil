import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Redirecionar automaticamente após 5 segundos
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO 
        title="Página Não Encontrada"
        description="A página que você está procurando não existe. Volte para a página inicial da CADBRASIL."
        noIndex={true}
      />
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <p className="mb-6 text-sm text-muted-foreground">
          Redirecionando para a página inicial em {countdown} segundo{countdown !== 1 ? "s" : ""}...
        </p>
        <Link to="/" className="text-primary underline hover:text-primary/90 font-medium">
          Voltar para o Início agora
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
