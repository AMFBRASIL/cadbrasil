import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Shield, 
  Database, 
  Target, 
  Scale, 
  Share2, 
  Lock, 
  Clock, 
  UserCheck, 
  Cookie, 
  Globe, 
  Bell, 
  Mail,
  Phone,
  MapPin
} from "lucide-react";

interface ModalPoliticaPrivacidadeProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPoliticaPrivacidade = ({ isOpen, onClose }: ModalPoliticaPrivacidadeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Política de Privacidade</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">CADBRASIL - Em conformidade com a LGPD</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 pb-6">
          <div className="space-y-6 pt-4">
            {/* 1. Introdução */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">1</span>
                Introdução
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg border border-border">
                A CADBRASIL, empresa especializada em serviços de licitações e cadastros para órgãos públicos, 
                está comprometida em proteger a privacidade e os dados pessoais de seus usuários. Esta Política 
                de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações 
                pessoais, em conformidade com a <strong className="text-foreground">Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
              </p>
            </section>

            {/* 2. Dados Coletados */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">2</span>
                <Database className="w-4 h-4" />
                Dados Coletados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: "Dados da Empresa", items: "CNPJ, razão social, nome fantasia, CNAE, endereço completo, telefone, email" },
                  { title: "Dados do Representante", items: "Nome completo, CPF, cargo, telefone, email" },
                  { title: "Dados de Licitação", items: "Área de atuação, experiência em licitações, certificações" },
                  { title: "Dados de Acesso", items: "Email e senha para acesso ao sistema" },
                ].map((categoria, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-medium text-sm text-foreground mb-1">{categoria.title}</h4>
                    <p className="text-xs text-muted-foreground">{categoria.items}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Finalidade */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">3</span>
                <Target className="w-4 h-4" />
                Finalidade do Tratamento
              </h3>
              <ul className="space-y-2">
                {[
                  "Cadastro e gestão de fornecedores no sistema CADBRASIL",
                  "Processamento de cadastros para SICAF e outros órgãos públicos",
                  "Análise de editais e oportunidades de licitação",
                  "Comunicação sobre serviços, atualizações e oportunidades",
                  "Cumprimento de obrigações legais e regulamentares",
                  "Melhoria dos nossos serviços e experiência do usuário",
                  "Prevenção de fraudes e segurança do sistema",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Base Legal */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">4</span>
                <Scale className="w-4 h-4" />
                Base Legal
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { base: "Execução de Contrato", desc: "Para prestação dos serviços contratados" },
                  { base: "Interesse Legítimo", desc: "Para melhorar nossos serviços e comunicação" },
                  { base: "Obrigação Legal", desc: "Para cumprir determinações legais e regulamentares" },
                  { base: "Consentimento", desc: "Para finalidades específicas quando solicitado" },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-sm text-foreground">{item.base}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Compartilhamento */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">5</span>
                <Share2 className="w-4 h-4" />
                Compartilhamento de Dados
              </h3>
              <div className="space-y-2">
                {[
                  { titulo: "Órgãos Públicos", desc: "Para cadastros em SICAF, Comprasnet e outros sistemas" },
                  { titulo: "Prestadores de Serviços", desc: "Empresas que nos auxiliam na prestação dos serviços" },
                  { titulo: "Autoridades Competentes", desc: "Quando exigido por lei ou determinação judicial" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{item.titulo}:</span>
                      <span className="text-muted-foreground ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-destructive font-medium">
                  Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins comerciais.
                </p>
              </div>
            </section>

            {/* 6. Segurança */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">6</span>
                <Lock className="w-4 h-4" />
                Armazenamento e Segurança
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Criptografia de dados",
                  "Controle de acesso rigoroso",
                  "Monitoramento contínuo",
                  "Backup regular e seguro",
                  "Treinamento da equipe",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                    <Shield className="w-3 h-3 text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Retenção */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">7</span>
                <Clock className="w-4 h-4" />
                Retenção de Dados
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Mantemos seus dados pelo tempo necessário para:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {[
                  "Prestação dos serviços contratados",
                  "Cumprimento de obrigações legais",
                  "Resolução de disputas",
                  "Exercício de direitos em processos judiciais",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. Seus Direitos */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">8</span>
                <UserCheck className="w-4 h-4" />
                Seus Direitos (LGPD)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { direito: "Acesso", desc: "Solicitar informações sobre seus dados" },
                  { direito: "Correção", desc: "Corrigir dados incorretos" },
                  { direito: "Exclusão", desc: "Solicitar exclusão de dados" },
                  { direito: "Portabilidade", desc: "Receber dados em formato estruturado" },
                  { direito: "Revogação", desc: "Revogar consentimento" },
                  { direito: "Oposição", desc: "Opor-se ao tratamento" },
                ].map((item, index) => (
                  <div key={index} className="p-2 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-medium text-xs text-foreground">{item.direito}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Cookies */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">9</span>
                <Cookie className="w-4 h-4" />
                Cookies e Tecnologias Similares
              </h3>
              <p className="text-sm text-muted-foreground">
                Utilizamos cookies para melhorar a experiência de navegação, analisar o uso do sistema, 
                personalizar conteúdo e garantir a segurança. Você pode gerenciar as configurações através do seu navegador.
              </p>
            </section>

            {/* 10. Transferências Internacionais */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">10</span>
                <Globe className="w-4 h-4" />
                Transferências Internacionais
              </h3>
              <p className="text-sm text-muted-foreground">
                Seus dados podem ser transferidos para países que ofereçam grau de proteção adequado à LGPD 
                ou mediante garantias contratuais específicas.
              </p>
            </section>

            {/* 11. Alterações */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">11</span>
                <Bell className="w-4 h-4" />
                Alterações na Política
              </h3>
              <p className="text-sm text-muted-foreground">
                Esta Política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas 
                através do sistema ou por email.
              </p>
            </section>

            {/* 12. Contato */}
            <section>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">12</span>
                <Mail className="w-4 h-4" />
                Contato
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">privacidade@cadbrasil.com.br</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">(11) 2122-0202</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Rua Dr. Luis Migliano, 1986 - São Paulo/SP - CEP: 48152-000</span>
                </div>
                <div className="flex items-center gap-3 text-sm pt-2 border-t border-border">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Encarregado de Dados (DPO): dpo@cadbrasil.com.br</span>
                </div>
              </div>
            </section>

            {/* Rodapé */}
            <div className="pt-4 border-t border-border flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Última atualização: 15/01/2025
              </p>
              <p className="text-xs text-muted-foreground">
                Versão: 1.0
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPoliticaPrivacidade;
