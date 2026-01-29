import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { FileText, AlertTriangle, CheckCircle, Shield, Scale } from "lucide-react";

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Termos de Uso - CADBRASIL"
        description="Leia nossos termos de uso e condições de prestação de serviços. A CADBRASIL é uma empresa privada de assessoria especializada em cadastramento SICAF."
        canonical="/termos-de-uso"
        keywords="termos de uso, condições de uso, termos e condições, CADBRASIL, contrato de serviços, assessoria SICAF"
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Termos de Uso", url: "/termos-de-uso" }
        ]}
        ogType="article"
        article={{
          publishedTime: "2026-01-26T00:00:00Z",
          modifiedTime: "2026-01-26T00:00:00Z",
          author: "CADBRASIL",
          section: "Legal",
          tags: ["Termos de Uso", "Contrato", "Serviços", "Condições"]
        }}
        faq={[
          {
            question: "A CADBRASIL é um órgão público?",
            answer: "Não. A CADBRASIL é uma empresa privada de assessoria especializada em cadastramento SICAF. Não somos órgão público nem possuímos vínculo com o Governo Federal."
          },
          {
            question: "Qual a garantia de aprovação do cadastro SICAF?",
            answer: "Oferecemos garantia de resultado. Caso o cadastro não seja aprovado por qualquer motivo, realizamos o reembolso integral do valor investido. Nossa taxa de aprovação é de 99%."
          },
          {
            question: "Quais são as condições de pagamento?",
            answer: "O pagamento é realizado através de PIX ou Boleto Bancário. O serviço é liberado após a confirmação do pagamento. Consulte nossos valores e condições na página de cadastro."
          },
          {
            question: "Posso cancelar o serviço após o pagamento?",
            answer: "Sim, você pode solicitar o cancelamento e reembolso antes do início do processamento do cadastro. Após o início do processamento, o reembolso segue nossa política de garantia."
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
                <Scale className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground text-lg">
              Condições de prestação de serviços da CADBRASIL
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Última atualização: 26 de janeiro de 2026
            </p>
          </div>

          {/* Aviso Importante */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Aviso Importante</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  A <strong>CADBRASIL</strong> é uma <strong>empresa privada de assessoria</strong> especializada em 
                  cadastramento e renovação no SICAF. <strong>Não somos órgão público</strong> nem possuímos vínculo 
                  com o Governo Federal. Nossos serviços são de assessoria e consultoria, facilitando o processo 
                  de cadastramento junto aos órgãos competentes.
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
            
            {/* Introdução */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                1. Aceitação dos Termos
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Ao acessar e utilizar os serviços da CADBRASIL, você concorda em cumprir e estar vinculado a estes 
                  Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
                <p className="mt-2">
                  Estes termos se aplicam a todos os usuários do site, incluindo visitantes, clientes e outros que 
                  acessem ou utilizem nossos serviços.
                </p>
              </div>
            </section>

            {/* Natureza dos Serviços */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                2. Natureza dos Serviços
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-3">2.1. Serviços Prestados:</p>
                <p className="mb-4">
                  A CADBRASIL oferece uma gama completa de serviços de assessoria e consultoria em licitações públicas, incluindo:
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Leitura de Edital com IA:</strong> Análise inteligente de editais de licitação utilizando Inteligência Artificial para identificar requisitos, prazos e oportunidades.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Gestão de Contratos Jurídicos:</strong> Assessoria na gestão e acompanhamento de contratos administrativos, análise de cláusulas e cumprimento de obrigações.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Conteúdo de Licitações:</strong> Consultoria especializada em processos licitatórios, análise de editais, elaboração de propostas e estratégias de participação.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Cadastro no SICAF e outros órgãos:</strong> Cadastramento e renovação no SICAF (Sistema de Cadastramento Unificado de Fornecedores) e em outros sistemas governamentais necessários para participação em licitações.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Gestão de Certidões e Documentos:</strong> Organização, controle de validade e renovação de certidões negativas e demais documentos necessários para licitações públicas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Suporte:</strong> Suporte técnico e orientação durante todo o processo de cadastramento e participação em licitações.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Atendimento Digital Rápido:</strong> Plataforma digital com atendimento ágil e eficiente, permitindo acompanhamento em tempo real dos processos.</span>
                    </li>
                  </ul>
                </div>

                <p className="font-semibold text-foreground mb-2 mt-4">2.2. Características da Empresa:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A CADBRASIL é uma <strong>empresa privada</strong> de assessoria</li>
                  <li><strong>Não somos órgão público</strong> nem possuímos vínculo com o Governo Federal</li>
                  <li>Nossos serviços são de <strong>assessoria e consultoria</strong></li>
                  <li>Facilitamos o processo, mas a <strong>aprovação final</strong> cabe aos órgãos competentes</li>
                </ul>
              </div>
            </section>

            {/* Condições de Uso */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Condições de Uso do Site
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>Você concorda em:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Fornecer informações verdadeiras, precisas e completas ao se cadastrar</li>
                  <li>Manter e atualizar suas informações quando necessário</li>
                  <li>Não utilizar o site para fins ilegais ou não autorizados</li>
                  <li>Não tentar acessar áreas restritas do site sem autorização</li>
                  <li>Não interferir ou interromper o funcionamento do site</li>
                  <li>Não transmitir vírus ou códigos maliciosos</li>
                  <li>Respeitar os direitos de propriedade intelectual</li>
                </ul>
              </div>
            </section>

            {/* Pagamento e Preços */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Pagamento e Preços
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-2">4.1. Formas de Pagamento:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>PIX (liberação imediata após confirmação)</li>
                  <li>Boleto Bancário (compensação em até 3 dias úteis)</li>
                </ul>

                <p className="font-semibold text-foreground mb-3 mt-4">4.2. Preços e Licenças:</p>
                
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-foreground mb-3">Estrutura de Valores:</p>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-semibold text-foreground mb-1">Licença de Uso da Plataforma (Anual):</p>
                      <p className="text-lg font-bold text-primary mb-1">R$ 985,00</p>
                      <p className="text-sm text-muted-foreground">
                        Valor único anual que dá acesso completo à plataforma CADBRASIL e todos os serviços disponíveis.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-semibold text-foreground mb-1">Manutenção Gratuita:</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Incluída gratuitamente por 3 meses</strong> a partir da contratação da licença anual. 
                        Durante este período, você terá acesso a atualizações, suporte técnico e manutenção da plataforma sem custo adicional.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/60 pl-4">
                      <p className="font-semibold text-foreground mb-1">Licença de Manutenção (Mensal):</p>
                      <p className="text-lg font-bold text-primary mb-1">R$ 155,00/mês</p>
                      <p className="text-sm text-muted-foreground">
                        Após o período de 3 meses de manutenção gratuita, é necessário adquirir a licença de manutenção mensal 
                        para continuar recebendo atualizações, suporte técnico e manutenção da plataforma.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Observação:</strong> Os preços podem ser alterados a qualquer momento. O preço válido é aquele 
                  informado no momento da contratação do serviço. A licença de manutenção mensal é opcional, mas recomendada 
                  para garantir o funcionamento contínuo e atualizado da plataforma.
                </p>

                <p className="font-semibold text-foreground mb-2 mt-4">4.3. Confirmação:</p>
                <p>
                  O serviço será liberado após a confirmação do pagamento. No caso de boleto, a liberação ocorre 
                  após a compensação bancária.
                </p>
              </div>
            </section>

            {/* Garantia */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                5. Garantia e Reembolso
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-2">5.1. Garantia de Resultado:</p>
                <p>
                  Oferecemos garantia de resultado. Caso o cadastro não seja aprovado por qualquer motivo, 
                  realizamos o reembolso integral do valor investido, desde que todas as informações e documentos 
                  fornecidos estejam corretos e completos.
                </p>

                <p className="font-semibold text-foreground mb-2 mt-4">5.2. Condições para Reembolso:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Documentação completa e correta fornecida pelo cliente</li>
                  <li>Empresa em situação regular perante os órgãos competentes</li>
                  <li>Não aprovação do cadastro por questões técnicas dos órgãos públicos</li>
                </ul>

                <p className="font-semibold text-foreground mb-2 mt-4">5.3. Não Coberto pela Garantia:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Informações incorretas ou incompletas fornecidas pelo cliente</li>
                  <li>Irregularidades fiscais, trabalhistas ou jurídicas da empresa</li>
                  <li>Decisão administrativa ou judicial contrária ao cadastramento</li>
                </ul>
              </div>
            </section>

            {/* Responsabilidades */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Responsabilidades
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-2">6.1. Responsabilidades da CADBRASIL:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prestar os serviços contratados com qualidade e profissionalismo</li>
                  <li>Manter a confidencialidade dos dados do cliente</li>
                  <li>Orientar o cliente sobre a documentação necessária</li>
                  <li>Processar e enviar a documentação aos órgãos competentes</li>
                  <li>Acompanhar o andamento do processo</li>
                </ul>

                <p className="font-semibold text-foreground mb-2 mt-4">6.2. Responsabilidades do Cliente:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer informações verdadeiras e completas</li>
                  <li>Enviar toda a documentação solicitada</li>
                  <li>Manter a empresa em situação regular</li>
                  <li>Efetuar o pagamento conforme acordado</li>
                  <li>Comunicar qualquer alteração relevante</li>
                </ul>

                <p className="font-semibold text-foreground mb-2 mt-4">6.3. Limitação de Responsabilidade:</p>
                <p>
                  A CADBRASIL não se responsabiliza por decisões dos órgãos públicos competentes, 
                  alterações na legislação, ou situações fora de nosso controle que possam afetar 
                  o processo de cadastramento.
                </p>
              </div>
            </section>

            {/* Propriedade Intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Propriedade Intelectual
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Todo o conteúdo do site, incluindo textos, gráficos, logos, ícones, imagens e software, 
                  é propriedade da CADBRASIL ou de seus fornecedores de conteúdo e está protegido por leis 
                  de direitos autorais e outras leis de propriedade intelectual.
                </p>
                <p className="mt-2">
                  É proibida a reprodução, distribuição ou uso comercial do conteúdo sem autorização prévia por escrito.
                </p>
              </div>
            </section>

            {/* Modificações */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Modificações dos Termos
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Reservamos o direito de modificar estes Termos de Uso a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após sua publicação no site. 
                  É sua responsabilidade revisar periodicamente estes termos.
                </p>
              </div>
            </section>

            {/* Lei Aplicável */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Lei Aplicável e Foro
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa relacionada 
                  a estes termos será resolvida no foro da comarca de São Paulo - SP, renunciando as partes 
                  a qualquer outro, por mais privilegiado que seja.
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
                  Para questões relacionadas a estes Termos de Uso, entre em contato:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">CADBRASIL</p>
                    <p className="text-sm">CNPJ: 52.841.613/0001-55</p>
                    <p className="text-sm mt-1">E-mail: documentos@fornecedordigital.com.br</p>
                    <p className="text-sm">Telefone: (011) 2122-0202</p>
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

export default TermosUso;
