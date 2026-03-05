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
    const isExternal = /^https?:\/\//i.test(to);
    if (isExternal) {
      if (replace) {
        window.location.replace(to);
      } else {
        window.location.assign(to);
      }
      return;
    }
    navigate(to, { replace });
  }, [navigate, to, replace]);

  return null;
};

export default Redirect;
