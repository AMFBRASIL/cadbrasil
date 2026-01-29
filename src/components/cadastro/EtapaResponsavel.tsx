import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CadastroData } from "@/pages/Cadastro";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EtapaResponsavelProps {
  dados: CadastroData;
  atualizarDados: (dados: Partial<CadastroData>) => void;
  onProximo: () => void;
  onAnterior: () => void;
}

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14);
};

/** Valida CPF: 11 dígitos, não repetidos, dígitos verificadores corretos. */
function validarCPF(cpf: string): boolean {
  const nums = cpf.replace(/\D/g, "");
  if (nums.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(nums)) return false; // 111.111.111-11, 000.000.000-00, etc.
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(nums[i], 10) * (10 - i);
  let d1 = (s * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(nums[9], 10)) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += parseInt(nums[i], 10) * (11 - i);
  let d2 = (s * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === parseInt(nums[10], 10);
}

const formatTelefone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }
  return numbers
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

const EtapaResponsavel = ({ dados, atualizarDados, onProximo, onAnterior }: EtapaResponsavelProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validarEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validar = () => {
    const novosErros: Record<string, string> = {};
    
    if (!dados.nomeResponsavel.trim()) {
      novosErros.nomeResponsavel = "Nome é obrigatório";
    }
    if (!dados.cpfResponsavel?.trim()) {
      novosErros.cpfResponsavel = "CPF é obrigatório";
    } else if (!validarCPF(dados.cpfResponsavel)) {
      novosErros.cpfResponsavel = "Digite um CPF válido";
    }
    if (!dados.cargoResponsavel.trim()) {
      novosErros.cargoResponsavel = "Cargo é obrigatório";
    }
    if (!dados.telefoneResponsavel || dados.telefoneResponsavel.replace(/\D/g, "").length < 10) {
      novosErros.telefoneResponsavel = "Telefone inválido";
    }
    if (!dados.emailResponsavel || !validarEmail(dados.emailResponsavel)) {
      novosErros.emailResponsavel = "E-mail inválido";
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
      <h2 className="text-xl font-bold text-foreground mb-1">Responsável Legal</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Dados do representante legal ou responsável pelo cadastro
      </p>

      <div className="space-y-4">
        {/* Nome */}
        <div>
          <Label htmlFor="nomeResponsavel">Nome Completo *</Label>
          <Input
            id="nomeResponsavel"
            placeholder="Nome do responsável"
            value={dados.nomeResponsavel}
            onChange={(e) => atualizarDados({ nomeResponsavel: e.target.value })}
            className={errors.nomeResponsavel ? "border-destructive" : ""}
          />
          {errors.nomeResponsavel && (
            <p className="text-destructive text-xs mt-1">{errors.nomeResponsavel}</p>
          )}
        </div>

        {/* CPF */}
        <div>
          <Label htmlFor="cpfResponsavel">CPF *</Label>
          <div className="relative">
            <Input
              id="cpfResponsavel"
              placeholder="000.000.000-00"
              value={dados.cpfResponsavel}
              onChange={(e) => {
                const v = formatCPF(e.target.value);
                atualizarDados({ cpfResponsavel: v });
                if (errors.cpfResponsavel && validarCPF(v)) {
                  setErrors((prev) => ({ ...prev, cpfResponsavel: "" }));
                }
              }}
              className={cn(
                "pr-10",
                errors.cpfResponsavel && "border-destructive"
              )}
            />
            {dados.cpfResponsavel?.trim() && validarCPF(dados.cpfResponsavel) && (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
                title="CPF válido"
              >
                <CheckCircle className="w-5 h-5" />
              </span>
            )}
            {dados.cpfResponsavel?.trim() && !validarCPF(dados.cpfResponsavel) && (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive font-semibold"
                title="CPF inválido"
              >
                −
              </span>
            )}
          </div>
          {errors.cpfResponsavel && (
            <p className="text-destructive text-xs mt-1">{errors.cpfResponsavel}</p>
          )}
        </div>

        {/* Cargo */}
        <div>
          <Label htmlFor="cargoResponsavel">Cargo *</Label>
          <Input
            id="cargoResponsavel"
            placeholder="Ex: Sócio-Administrador, Diretor, Procurador"
            value={dados.cargoResponsavel}
            onChange={(e) => atualizarDados({ cargoResponsavel: e.target.value })}
            className={errors.cargoResponsavel ? "border-destructive" : ""}
          />
          {errors.cargoResponsavel && (
            <p className="text-destructive text-xs mt-1">{errors.cargoResponsavel}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <Label htmlFor="telefoneResponsavel">Telefone / WhatsApp *</Label>
          <Input
            id="telefoneResponsavel"
            placeholder="(00) 00000-0000"
            value={dados.telefoneResponsavel}
            onChange={(e) => atualizarDados({ telefoneResponsavel: formatTelefone(e.target.value) })}
            className={errors.telefoneResponsavel ? "border-destructive" : ""}
          />
          {errors.telefoneResponsavel && (
            <p className="text-destructive text-xs mt-1">{errors.telefoneResponsavel}</p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <Label htmlFor="emailResponsavel">E-mail *</Label>
          <Input
            id="emailResponsavel"
            type="email"
            placeholder="email@empresa.com.br"
            value={dados.emailResponsavel}
            onChange={(e) => atualizarDados({ emailResponsavel: e.target.value })}
            className={errors.emailResponsavel ? "border-destructive" : ""}
          />
          {errors.emailResponsavel && (
            <p className="text-destructive text-xs mt-1">{errors.emailResponsavel}</p>
          )}
          <p className="text-muted-foreground text-xs mt-1">
            Utilizaremos este e-mail para enviar atualizações sobre o processo
          </p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onAnterior} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </Button>
        <Button onClick={handleProximo} className="gap-2">
          Próximo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EtapaResponsavel;
