import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Lock, Eye, FileText, Mail, Phone } from "lucide-react";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Política de Privacidade - CADBRASIL"
        description="Conheça nossa política de privacidade e como protegemos seus dados pessoais. A CADBRASIL está em conformidade com a LGPD e garante total segurança das informações."
        canonical="/politica-de-privacidade"
        keywords="política de privacidade, LGPD, proteção de dados, privacidade, segurança de dados, CADBRASIL, dados pessoais"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Política de Privacidade", url: "/politica-de-privacidade" }
        ]}
        ogType="article"
        article={{
          publishedTime: "2026-01-26T00:00:00Z",
          modifiedTime: "2026-01-26T00:00:00Z",
          author: "CADBRASIL",
          section: "Legal",
          tags: ["Privacidade", "LGPD", "Proteção de Dados", "Segurança"]
        }}
        faq={[
          {
            question: "Quais dados pessoais a CADBRASIL coleta?",
            answer: "Coletamos apenas os dados necessários para prestação dos serviços de cadastramento SICAF, incluindo informações da empresa (CNPJ, razão social), dados do responsável legal (nome, CPF, e-mail, telefone) e documentos necessários para o processo de cadastramento."
          },
          {
            question: "Como a CADBRASIL protege meus dados?",
            answer: "Utilizamos tecnologias de segurança avançadas, incluindo criptografia SSL, armazenamento seguro e acesso restrito aos dados. Todos os nossos processos estão em conformidade com a LGPD (Lei Geral de Proteção de Dados)."
          },
          {
            question: "Meus dados são compartilhados com terceiros?",
            answer: "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para prestação do serviço (como envio de documentos aos órgãos competentes do SICAF) ou quando exigido por lei."
          },
          {
            question: "Como posso exercer meus direitos sob a LGPD?",
            answer: "Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados através do e-mail documentos@fornecedordigital.com.br ou pelo telefone (011) 2122-0202."
          }
        ]}
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground text-lg">
              Transparência e segurança no tratamento dos seus dados pessoais
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Última atualização: 26 de janeiro de 2026
            </p>
          </div>

          {/* Conteúdo */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
            
            {/* Introdução */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                1. Introdução
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  A CADBRASIL ("nós", "nosso" ou "empresa") está comprometida com a proteção da privacidade e dos dados pessoais de nossos clientes e visitantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
                <p>
                  Ao utilizar nossos serviços ou acessar nosso site, você concorda com as práticas descritas nesta política.
                </p>
              </div>
            </section>

            {/* Dados Coletados */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                2. Dados Coletados
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-2">2.1. Dados da Empresa:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>CNPJ ou CPF</li>
                  <li>Razão Social e Nome Fantasia</li>
                  <li>CNAE (Código Nacional de Atividades Econômicas)</li>
                  <li>Endereço completo (CEP, logradouro, número, complemento, bairro, cidade, UF)</li>
                </ul>

                <p className="font-semibold text-foreground mb-2 mt-4">2.2. Dados do Responsável Legal:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nome completo</li>
                  <li>CPF</li>
                  <li>Cargo/Função</li>
                  <li>E-mail</li>
                  <li>Telefone</li>
                </ul>

                <p className="font-semibold text-foreground mb-2 mt-4">2.3. Dados de Acesso:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>E-mail de acesso ao portal</li>
                  <li>Senha (armazenada de forma criptografada)</li>
                  <li>Preferências de notificação</li>
                </ul>

                <p className="font-semibold text-foreground mb-2 mt-4">2.4. Documentos:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Contrato Social ou Estatuto</li>
                  <li>Certidões diversas</li>
                  <li>Documentos dos sócios</li>
                  <li>Outros documentos necessários para o cadastramento SICAF</li>
                </ul>
              </div>
            </section>

            {/* Finalidade */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                3. Finalidade do Uso dos Dados
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Prestação dos serviços de cadastramento e renovação no SICAF</li>
                  <li>Processamento e análise de documentos</li>
                  <li>Comunicação com o cliente sobre o andamento dos serviços</li>
                  <li>Envio de notificações e atualizações sobre o cadastro</li>
                  <li>Cumprimento de obrigações legais e regulatórias</li>
                  <li>Melhoria dos nossos serviços e experiência do usuário</li>
                  <li>Prevenção de fraudes e garantia de segurança</li>
                </ul>
              </div>
            </section>

            {/* Compartilhamento */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Compartilhamento de Dados
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais.</p>
                <p className="font-semibold text-foreground mb-2 mt-4">Podemos compartilhar seus dados apenas nas seguintes situações:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Com órgãos públicos competentes, quando necessário para o processo de cadastramento SICAF</li>
                  <li>Com prestadores de serviços que nos auxiliam na operação (ex: serviços de e-mail, hospedagem), sempre sob contrato de confidencialidade</li>
                  <li>Quando exigido por lei, ordem judicial ou autoridade competente</li>
                  <li>Para proteção de nossos direitos legais ou prevenção de fraudes</li>
                </ul>
              </div>
            </section>

            {/* Segurança */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Segurança dos Dados
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Criptografia SSL/TLS para transmissão de dados</li>
                  <li>Armazenamento seguro em servidores protegidos</li>
                  <li>Controle de acesso restrito aos dados</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backup regular dos dados</li>
                  <li>Treinamento da equipe em proteção de dados</li>
                </ul>
              </div>
            </section>

            {/* Direitos do Titular */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Direitos do Titular dos Dados
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>De acordo com a LGPD, você possui os seguintes direitos:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                  <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</li>
                  <li><strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar a remoção de dados desnecessários ou excessivos</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Revogação do consentimento:</strong> Retirar seu consentimento a qualquer momento</li>
                  <li><strong>Informação sobre compartilhamento:</strong> Saber com quem compartilhamos seus dados</li>
                </ul>
                <p className="mt-4">
                  Para exercer seus direitos, entre em contato conosco através dos canais indicados no final desta política.
                </p>
              </div>
            </section>

            {/* Retenção */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Retenção de Dados
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, 
                  ou pelo período exigido por lei. Após esse período, os dados serão eliminados ou anonimizados de forma segura.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Cookies e Tecnologias Similares
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, 
                  analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies 
                  através das configurações do seu navegador.
                </p>
              </div>
            </section>

            {/* Alterações */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Alterações nesta Política
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página 
                  regularmente para se manter informado sobre como protegemos seus dados. A data da última atualização 
                  está indicada no topo desta página.
                </p>
              </div>
            </section>

            {/* Contato */}
            <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Contato
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  Para questões relacionadas a esta Política de Privacidade ou para exercer seus direitos, entre em contato:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">E-mail:</p>
                      <a href="mailto:documentos@fornecedordigital.com.br" className="text-primary hover:underline">
                        documentos@fornecedordigital.com.br
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Telefone:</p>
                      <a href="tel:+551121220202" className="text-primary hover:underline">
                        (011) 2122-0202
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">CADBRASIL</p>
                    <p className="text-sm">CNPJ: 52.841.613/0001-55</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
