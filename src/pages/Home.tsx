import Header from "@/components/Header";
import Map from "@/components/Map";
import logoFull from "@/assets/logo-full.png";
import { Mail, Phone, MapPin, Instagram, Send, MessageCircle } from "lucide-react";
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

      {/* About Us Section */}
      <section id="about" className="relative py-20 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-foreground mb-2 inline-block relative">
              О НАС
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground"></span>
            </h2>
          </div>
          
          <div className="space-y-6 animate-fade-in">
            <p className="font-montserrat text-foreground text-lg leading-relaxed">
              Мы — школа английского языка, вдохновленная красотой и культурой Дагестана. Наша миссия — сделать изучение английского языка доступным и увлекательным для каждого, сочетая современные методики преподавания с уважением к традициям и особенностям нашего региона.
            </p>
            
            <p className="font-montserrat text-foreground text-lg leading-relaxed">
              Мы верим, что знание английского языка открывает новые горизонты и возможности. Наши опытные преподаватели помогут вам достичь ваших целей, будь то подготовка к экзаменам, улучшение разговорных навыков или изучение языка для профессионального роста.
            </p>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="relative py-20 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-foreground mb-4 inline-block relative">
              ЦЕНЫ
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground"></span>
            </h2>
            <p className="font-montserrat text-foreground/70 text-lg mt-6">
              Выберите подходящий для вас формат обучения
            </p>
          </div>
          
          <div className="space-y-8 animate-fade-in">
            {/* Individual Lessons */}
            <div className="border-b border-foreground/20 pb-8">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h3 className="font-montserrat text-2xl font-bold text-foreground mb-3">
                    ИНДИВИДУАЛЬНО
                  </h3>
                  <p className="font-montserrat text-foreground/70 text-base">
                    Персональный подход, гибкий график, индивидуальная программа
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-montserrat text-3xl font-bold text-foreground">
                    1 200 ₽
                  </div>
                  <div className="font-montserrat text-sm text-foreground/60 mt-1">
                    за занятие
                  </div>
                </div>
              </div>
            </div>

            {/* Group Lessons */}
            <div className="border-b border-foreground/20 pb-8">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h3 className="font-montserrat text-2xl font-bold text-foreground mb-3">
                    С ГРУППОЙ
                  </h3>
                  <p className="font-montserrat text-foreground/70 text-base">
                    3 занятия в неделю, группа до 6 человек, разговорный клуб
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-montserrat text-3xl font-bold text-foreground">
                    5 500 ₽
                  </div>
                  <div className="font-montserrat text-sm text-foreground/60 mt-1">
                    в месяц
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="relative py-20 px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-foreground mb-4">
              КОНТАКТЫ
            </h2>
            <p className="font-montserrat text-foreground/70 text-lg max-w-2xl mx-auto">
              Свяжитесь с нами, и мы поможем начать ваш путь к английскому языку
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr,1fr] gap-12">
            {/* Left Side - Map */}
            <div className="animate-fade-in order-2 lg:order-1">
              <div className="sticky top-24 rounded-lg overflow-hidden border border-border shadow-lg">
                <Map />
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-8 order-1 lg:order-2">
              {/* Contact Information */}
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-foreground mb-1">Адрес</h3>
                    <p className="text-foreground/70">
                      367000, Россия, Махачкала,<br />
                      Улица Дахадаева 23А
                    </p>
                  </div>
                </div>

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
                    <a href="tel:+79288699696" className="text-foreground/70 hover:text-primary transition-colors">
                      7 (928) 869-96-96
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-card p-8 rounded-lg border border-border shadow-lg animate-fade-in">
                <h3 className="font-montserrat text-2xl font-semibold text-foreground mb-6">
                  Мы в социальных сетях
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://instagram.com/dagenglish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <Instagram className="w-6 h-6 text-primary group-hover:text-primary/80" />
                    <span className="font-montserrat font-medium text-foreground">Instagram</span>
                  </a>

                  <a
                    href="https://t.me/dagenglish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <Send className="w-6 h-6 text-primary group-hover:text-primary/80" />
                    <span className="font-montserrat font-medium text-foreground">Telegram</span>
                  </a>

                  <a
                    href="https://wa.me/79288699696"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <MessageCircle className="w-6 h-6 text-primary group-hover:text-primary/80" />
                    <span className="font-montserrat font-medium text-foreground">WhatsApp</span>
                  </a>

                  <a
                    href="https://vk.com/dagenglish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <svg className="w-6 h-6 text-primary group-hover:text-primary/80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .779.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.492-.085.744-.576.744z"/>
                    </svg>
                    <span className="font-montserrat font-medium text-foreground">VKontakte</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;