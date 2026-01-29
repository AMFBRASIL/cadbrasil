import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "551121220202";
  const message = "Olá! Gostaria de saber mais sobre o cadastro SICAF.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Chamar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline font-medium text-sm">
        Fale Conosco
      </span>
    </a>
  );
};

export default WhatsAppButton;
