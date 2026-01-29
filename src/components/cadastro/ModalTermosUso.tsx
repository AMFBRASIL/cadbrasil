import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, Lock, AlertCircle, CheckCircle } from "lucide-react";

interface ModalTermosUsoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTermosUso = ({ isOpen, onClose }: ModalTermosUsoProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Termos de Uso</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">CADBRASIL - Assessoria em Licitações</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 pb-6">
          <div className="space-y-6 pt-4">
            {/* Sobre a CADBRASIL */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Sobre a CADBRASIL</h3>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CADBRASIL é uma <strong className="text-foreground">empresa privada</strong>, especialista em licitações públicas, 
                  dedicada a facilitar o acesso de fornecedores ao mercado governamental. 
                  <strong className="text-foreground"> Não somos órgão público</strong>, nem temos qualquer vínculo com o governo. 
                  Nosso objetivo é oferecer soluções inovadoras e seguras para empresas que desejam participar de licitações, 
                  com total transparência e ética.
                </p>
              </div>
            </section>

            {/* Nossos Serviços */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">Nossos Serviços</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Sistemas inteligentes de leitura de editais com Inteligência Artificial (IA), otimizando a análise de oportunidades.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Assessoria completa para cadastro no SICAF e outros sistemas de habilitação.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Todos os serviços são prestados de forma independente, sem qualquer relação com órgãos governamentais.
                  </p>
                </div>
              </div>
            </section>

            {/* Regras de Uso */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Regras de Uso</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "O usuário deve fornecer informações verdadeiras e atualizadas no momento do cadastro.",
                  "O acesso ao sistema é pessoal, intransferível e protegido por senha.",
                  "É proibido compartilhar dados de acesso com terceiros.",
                  "O uso indevido do sistema pode resultar em bloqueio ou exclusão do cadastro.",
                  "O usuário é responsável por manter a confidencialidade de suas credenciais.",
                ].map((regra, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      {index + 1}
                    </span>
                    {regra}
                  </li>
                ))}
              </ul>
            </section>

            {/* Proteção de Dados */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Proteção de Dados e LGPD</h3>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-3">
                {[
                  "Seus dados são tratados conforme a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).",
                  "As informações coletadas são utilizadas exclusivamente para fins de cadastro, contato e cumprimento de obrigações legais.",
                  "Não compartilhamos dados pessoais com terceiros sem consentimento explícito do usuário.",
                  "O usuário pode solicitar a exclusão ou atualização de seus dados a qualquer momento.",
                  "Adotamos medidas técnicas e administrativas para garantir a segurança e confidencialidade das informações.",
                ].map((item, index) => (
                  <p key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
            </section>

            {/* Rodapé */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Última atualização: 01/07/2024
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTermosUso;
