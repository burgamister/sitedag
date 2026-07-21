import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-8 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start md:items-center gap-3">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1 md:mt-0" />
            <a 
                href="https://2gis.ru/makhachkala/firm/70000001076543413"
                className="text-foreground/70 text-xs md:text-sm">
              {t.footer.address}
            </a>
          </div>

          <div className="flex items-start md:items-center gap-3">
            <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-1 md:mt-0" />
            <a 
              href="mailto:dagenglish@mail.ru" 
              className="text-foreground/70 hover:text-primary transition-colors text-xs md:text-sm break-all"
            >
              {t.footer.email}
            </a>
          </div>

          <div className="flex items-start md:items-center gap-3">
            <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-1 md:mt-0" />
            <a 
              href="tel:+79604099905" 
              className="text-foreground/70 hover:text-primary transition-colors text-xs md:text-sm"
            >
              {t.footer.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
