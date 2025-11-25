import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-foreground/70">
              367000, Россия, Махачкала, Улица Дахадаева 23А
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary flex-shrink-0" />
            <a 
              href="mailto:info@dagenglish.com" 
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              info@dagenglish.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary flex-shrink-0" />
            <a 
              href="tel:+79288699696" 
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              7 (928) 869-96-96
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
