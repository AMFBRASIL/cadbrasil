import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Eduardo",
      role: "CEO - Tech Solutions LTDA",
      content:
        "Tentei fazer o SICAF sozinho e perdi meses com erros. Com a CADBRASIL, em 2 dias estava tudo aprovado. Já ganhei 3 licitações!",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Proprietária - MS Uniformes ME",
      content:
        "Como MEI, achava impossível vender para o governo. A equipe da CADBRASIL me orientou em tudo e hoje forneco para órgãos federais.",
      rating: 5,
    },
    {
      name: "Roberto Almeida",
      role: "Diretor - Almeida Construções",
      content:
        "A renovação do nosso SICAF estava atrasada há 3 meses. A CADBRASIL regularizou tudo em 48 horas. Profissionais excepcionais!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            O que nossos clientes{" "}
            <span className="text-gradient">dizem sobre nós</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full hero-gradient flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-warning text-warning"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
