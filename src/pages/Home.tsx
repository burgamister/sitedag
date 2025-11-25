import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoFull from "@/assets/logo-full.png";
import { Instagram, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Имя обязательно").max(100, "Имя должно быть меньше 100 символов"),
  email: z.string().trim().email("Неверный формат email").max(255, "Email должен быть меньше 255 символов"),
  message: z.string().trim().min(1, "Сообщение обязательно").max(1000, "Сообщение должно быть меньше 1000 символов")
});
const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      contactSchema.parse(formData);
      setIsSubmitting(true);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Sharp Mountain SVG Background */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/20" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,320L240,280L360,160L480,200L600,120L720,180L840,100L960,140L1080,80L1200,160L1320,120L1440,180L1440,320L0,320Z" />
          </svg>
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto text-accent/10" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,320L200,260L320,140L480,220L640,100L800,160L960,80L1120,180L1280,120L1440,200L1440,320L0,320Z" />
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
            <h2 className="font-montserrat text-4xl md:text-5xl font-semibold text-foreground mb-2 inline-block relative pb-3">
              О НАС
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground"></span>
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
            <h2 className="font-montserrat text-4xl md:text-5xl font-semibold text-foreground mb-4 inline-block relative pb-3">
              ЦЕНЫ
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground"></span>
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

      {/* Contact Section */}
      <section id="contacts" className="relative py-20 px-6 bg-background">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-montserrat text-4xl md:text-5xl font-semibold text-foreground mb-4 inline-block relative pb-3">
              СВЯЗАТЬСЯ
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground"></span>
            </h2>
            <p className="font-montserrat text-foreground/70 text-lg mt-6">
              Заполните форму, и мы поможем начать ваш путь к английскому языку
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div>
              <Input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Ваш email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Textarea
                placeholder="Ваше сообщение"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </form>

          {/* Social Media Alternative */}
          <div className="mt-12 text-center animate-fade-in">
            <p className="text-foreground/50 text-sm mb-4">или ты, напиши нам</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://instagram.com/dagenglish"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <Instagram className="w-6 h-6 text-foreground/60 hover:text-primary" />
              </a>

              <a
                href="https://t.me/dagenglish"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <Send className="w-6 h-6 text-foreground/60 hover:text-primary" />
              </a>

              <a
                href="https://wa.me/79288699696"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-6 h-6 text-foreground/60 hover:text-primary" />
              </a>

              <a
                href="https://vk.com/dagenglish"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 text-foreground/60 hover:text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .779.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.492-.085.744-.576.744z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;