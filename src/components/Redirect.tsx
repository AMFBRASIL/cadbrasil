import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectProps {
  to: string;
  replace?: boolean;
}

/**
 * Componente de redirecionamento simples
 * Redireciona para a URL especificada
 */
const Redirect = ({ to, replace = true }: RedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, to, replace]);

  return null;
};

export default Redirect;
