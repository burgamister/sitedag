import Header from "@/components/Header";
import logoFull from "@/assets/logo-full.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
const Home = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Mountain SVG Background */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/20" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto text-accent/10" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>

        {/* Center Logo */}
        <div className="relative z-10 flex items-center justify-center">
          <img src={logoFull} alt="DagEnglish" className="w-auto h-32 md:h-48 lg:h-64" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-foreground/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="relative py-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-foreground mb-4">
              КОНТАКТЫ
            </h2>
            <p className="font-montserrat text-foreground/70 text-lg max-w-2xl mx-auto">
              Свяжитесь с нами, и мы поможем начать ваш путь к английскому языку
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-foreground mb-1">Email</h3>
                  <a href="mailto:info@dagenglish.com" className="text-foreground/70 hover:text-primary transition-colors">
                    info@dagenglish.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-foreground mb-1">Телефон</h3>
                  <a href="tel:+79999999999" className="text-foreground/70 hover:text-primary transition-colors">
                    +7 (999) 999-99-99
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-foreground mb-1">Адрес</h3>
                  <p className="text-foreground/70">
                    Махачкала, Дагестан
                  </p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-accent/20 rounded-lg border border-accent/30">
                <h3 className="font-montserrat font-semibold text-foreground mb-2">Часы работы</h3>
                <p className="text-foreground/70 text-sm">
                  Понедельник - Пятница: 9:00 - 20:00<br />
                  Суббота: 10:00 - 18:00<br />
                  Воскресенье: Выходной
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg border border-border shadow-lg animate-fade-in">
              <h3 className="font-montserrat text-2xl font-semibold text-foreground mb-6">
                Напишите нам
              </h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-montserrat text-sm font-medium text-foreground mb-2">
                    Имя
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-montserrat text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-montserrat text-sm font-medium text-foreground mb-2">
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-montserrat text-sm font-medium text-foreground mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите о ваших целях изучения английского..."
                    rows={5}
                    className="w-full resize-none"
                  />
                </div>

                <Button type="submit" className="w-full font-montserrat font-semibold">
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;