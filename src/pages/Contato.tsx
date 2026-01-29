import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { enviarContato } from "@/lib/api";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Building2
} from "lucide-react";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    assunto: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await enviarContato({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone || undefined,
        empresa: formData.empresa || undefined,
        assunto: formData.assunto,
        mensagem: formData.mensagem,
      });

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });

      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        assunto: "",
        mensagem: ""
      });
    } catch (err) {
      toast({
        title: "Erro ao enviar",
        description: err instanceof Error ? err.message : "Tente novamente em instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contatoInfo = [
    {
      icon: Phone,
      titulo: "Telefone",
      info: "(011) 2122-0202",
      link: "tel:+551121220202"
    },
    {
      icon: MessageCircle,
      titulo: "WhatsApp",
      info: "(011) 2122-0202",
      link: "https://wa.me/551121220202"
    },
    {
      icon: Mail,
      titulo: "E-mail",
      info: "documentos@fornecedordigital.com.br",
      link: "mailto:documentos@fornecedordigital.com.br"
    },
    {
      icon: Clock,
      titulo: "Horário de Atendimento",
      info: "Seg a Sex: 8h às 18h",
      link: null
    }
  ];

  const jsonLdContactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contato - CADBRASIL",
    description: "Entre em contato com a CADBRASIL para tirar dúvidas sobre cadastro SICAF e licitações públicas.",
    url: "https://cadbrasil.com.br/contato",
    mainEntity: {
      "@type": "Organization",
      name: "CADBRASIL",
      telephone: "+55-11-2122-0202",
      email: "documentos@fornecedordigital.com.br",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Dr. Luis Migliano, 1986",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "05711-001",
        addressCountry: "BR"
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      }
    }
  };

  return (
    <>
      <SEO
        title="Contato - Fale Conosco"
        description="Entre em contato com a CADBRASIL. Tire suas dúvidas sobre cadastro SICAF, licitações públicas e nossos serviços de assessoria. Atendimento de segunda a sexta, das 8h às 18h."
        keywords="contato cadbrasil, telefone sicaf, email licitações, fale conosco, atendimento sicaf, suporte cadastro, whatsapp cadbrasil"
        canonical="/contato"
        jsonLd={jsonLdContactPage}
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Entre em Contato
              </h1>
              <p className="text-lg text-white/90">
                Estamos prontos para ajudar sua empresa a conquistar o mercado de licitações públicas
              </p>
            </div>
          </div>
        </section>

        {/* Contato Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Informações de Contato */}
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6">
                  <Building2 className="w-4 h-4" />
                  CADBRASIL
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Fale com Nossa Equipe
                </h2>
                <p className="text-muted-foreground mb-8">
                  Nossa equipe de especialistas está pronta para esclarecer suas dúvidas 
                  sobre cadastro SICAF, licitações públicas e todos os nossos serviços.
                </p>

                <div className="space-y-4 mb-8">
                  {contatoInfo.map((item, index) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{item.titulo}</h3>
                          <p className="text-muted-foreground">{item.info}</p>
                        </div>
                      </div>
                    );

                    return item.link ? (
                      <a 
                        key={index} 
                        href={item.link} 
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={index}>{content}</div>
                    );
                  })}
                </div>

                {/* Endereço */}
                <div className="p-6 bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                      <p className="text-muted-foreground text-sm">
                        Rua Dr. Luis Migliano, 1986<br />
                        São Paulo/SP - CEP: 05711-001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário de Contato */}
              <div className="bg-muted/30 p-8 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Envie sua Mensagem</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Nome da empresa"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="assunto">Assunto *</Label>
                    <Input
                      id="assunto"
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                      placeholder="Ex: Dúvida sobre cadastro SICAF"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Escreva sua mensagem aqui..."
                      required
                      rows={5}
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gap-2" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ao enviar, você concorda com nossa política de privacidade.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Aviso */}
        <section className="py-8 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Importante:</strong> A CADBRASIL é uma empresa privada 
                de assessoria, sem vínculo com órgãos governamentais. Nosso serviço consiste em 
                orientação e suporte para cadastramento em sistemas de licitações públicas.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contato;
