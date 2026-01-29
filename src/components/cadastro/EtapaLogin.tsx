import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CadastroData } from "@/pages/Cadastro";
import { ArrowRight, ArrowLeft, Info, Eye, EyeOff } from "lucide-react";

interface EtapaLoginProps {
  dados: CadastroData;
  atualizarDados: (dados: Partial<CadastroData>) => void;
  onProximo: () => void;
  onAnterior: () => void;
}

const EtapaLogin = ({ dados, atualizarDados, onProximo, onAnterior }: EtapaLoginProps) => {
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  useEffect(() => {
    if (!dados.emailAcesso?.trim() && dados.emailResponsavel?.trim()) {
      atualizarDados({ emailAcesso: dados.emailResponsavel });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- prefill apenas quando emailResponsavel mudar
  }, [dados.emailResponsavel]);

  const validarEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validar = () => {
    const novosErros: Record<string, string> = {};
    const emailAcesso = dados.emailAcesso ?? "";
    const senha = dados.senha ?? "";

    if (!emailAcesso || !validarEmail(emailAcesso)) {
      novosErros.emailAcesso = "E-mail inválido";
    }
    if (!senha || senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres";
    }
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não conferem";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleProximo = () => {
    if (validar()) {
      onProximo();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Dados de Acesso</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Crie seus dados de acesso para o Portal do Fornecedor
      </p>

      <div className="bg-primary/5 border border-primary/20 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Crie seus dados de acesso para o Portal do Fornecedor Cadbrasil. Você utilizará
            este e-mail e senha para acessar o portal, enviar documentos e acompanhar o status
            do seu cadastro SICAF.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="emailAcesso">Email de Acesso *</Label>
          <Input
            id="emailAcesso"
            type="email"
            placeholder="seu@email.com.br"
            value={dados.emailAcesso ?? ""}
            onChange={(e) => atualizarDados({ emailAcesso: e.target.value })}
            className={errors.emailAcesso ? "border-destructive" : ""}
          />
          {errors.emailAcesso ? (
            <p className="text-destructive text-xs mt-1">{errors.emailAcesso}</p>
          ) : (
            <p className="text-muted-foreground text-xs mt-1">
              Este será seu login para acessar o sistema
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="senha">Senha *</Label>
            <div className="relative">
              <Input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••"
                value={dados.senha ?? ""}
                onChange={(e) => atualizarDados({ senha: e.target.value })}
                className={errors.senha ? "border-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.senha ? (
              <p className="text-destructive text-xs mt-1">{errors.senha}</p>
            ) : (
              <p className="text-muted-foreground text-xs mt-1">
                Mínimo 6 caracteres, incluindo letras e números
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
            <div className="relative">
              <Input
                id="confirmarSenha"
                type={mostrarConfirmarSenha ? "text" : "password"}
                placeholder="••••••"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className={errors.confirmarSenha ? "border-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {mostrarConfirmarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmarSenha && (
              <p className="text-destructive text-xs mt-1">{errors.confirmarSenha}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="notificacoes"
            checked={dados.aceitaNotificacoes ?? true}
            onCheckedChange={(checked) =>
              atualizarDados({ aceitaNotificacoes: checked as boolean })
            }
          />
          <Label htmlFor="notificacoes" className="text-sm font-normal leading-relaxed cursor-pointer">
            Aceito receber notificações por e-mail sobre licitações, atualizações do SICAF
            e comunicações do Portal Cadbrasil
          </Label>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onAnterior} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button onClick={handleProximo} className="gap-2">
          Próximo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EtapaLogin;
