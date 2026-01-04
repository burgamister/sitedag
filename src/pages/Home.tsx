import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoFull from "@/assets/logo-full.png";
import { Instagram, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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
          <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/30" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,320L240,280L360,160L480,200L600,120L720,180L840,100L960,140L1080,80L1200,160L1320,120L1440,180L1440,320L0,320Z" />
          </svg>
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto text-accent/20" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,320L200,260L320,140L480,220L640,100L800,160L960,80L1120,180L1280,120L1440,200L1440,320L0,320Z" />
          </svg>
        </div>

        {/* Center Logo */}
        <div className="relative z-20 flex items-center justify-center">
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
      <section id="about" className="relative py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="font-montserrat text-3xl md:text-5xl font-extrabold text-foreground mb-2 inline-block relative pb-3">
              О НАС
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-foreground"></span>
            </h2>
          </div>
          
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <p className="font-montserrat text-foreground text-base md:text-lg leading-relaxed">
              Мы — школа английского языка, вдохновленная красотой и культурой Дагестана. Наша миссия — сделать изучение английского языка доступным и увлекательным для каждого, сочетая современные методики преподавания с уважением к традициям и особенностям нашего региона.
            </p>
            
            <p className="font-montserrat text-foreground text-base md:text-lg leading-relaxed">
              Мы верим, что знание английского языка открывает новые горизонты и возможности. Наши опытные преподаватели помогут вам достичь ваших целей, будь то подготовка к экзаменам, улучшение разговорных навыков или изучение языка для профессионального роста.
            </p>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="relative py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="font-montserrat text-3xl md:text-5xl font-extrabold text-foreground mb-4 inline-block relative pb-3">
              ОБУЧЕНИЕ
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-foreground"></span>
            </h2>
            <p className="font-montserrat text-foreground/70 text-base md:text-lg mt-6">
              Выберите подходящий для вас формат обучения
            </p>
          </div>
          
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Individual Lessons (clickable - opens bottom sheet) */}
            <div className="border-b border-foreground/20 pb-6 md:pb-8">
              <Sheet>
                <SheetTrigger asChild>
                  <button type="button" className="w-full text-left">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 md:gap-8">
                      <div className="flex-1">
                        <h3 className="font-montserrat text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">
                          ИНДИВИДУАЛЬНО
                        </h3>
                        <p className="font-montserrat text-foreground/70 text-sm md:text-base">
                          Персональный подход, гибкий график, индивидуальная программа
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="font-montserrat text-2xl md:text-3xl font-bold text-foreground">
                          1 200 ₽
                        </div>
                        <div className="font-montserrat text-xs md:text-sm text-foreground/60 mt-1">
                          за занятие
                        </div>
                      </div>
                    </div>
                  </button>
                </SheetTrigger>

                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="font-extrabold text-foreground">ИНДИВИДУАЛЬНО</SheetTitle>
                    <SheetDescription className="text-foreground/80">Персональные занятия и индивидуальная программа.</SheetDescription>
                  </SheetHeader>

                  <div className="py-4 space-y-4">
                    <p className="text-foreground/80">
                      Персональные занятия, разработанные под ваши цели и уровень. Преподаватель составляет индивидуальную программу,
                      даёт домашние задания и даёт подробную обратную связь после каждого урока.
                    </p>

                    <ul className="list-none pl-0 text-foreground/70 space-y-2">
                      <li className="flex"><span className="mr-3 text-foreground">-</span><span>Индивидуальная учебная программа под ваши цели</span></li>
                      <li className="flex"><span className="mr-3 text-foreground">-</span><span>Гибкий график и удобное время занятий</span></li>
                      <li className="flex"><span className="mr-3 text-foreground">-</span><span>Разговорная практика, произношение и грамматика</span></li>
                      <li className="flex"><span className="mr-3 text-foreground">-</span><span>Домашние задания и регулярная обратная связь</span></li>
                    </ul>
                  </div>

                  <SheetFooter className="pt-4">
                    <div className="w-full">
                      <div className="text-foreground/80 mb-2">Длительность занятия: 60 минут</div>
                      <Button className="w-full bg-primary text-white px-4 py-3 rounded-lg shadow-md hover:bg-green-600 hover:text-background transition-colors">
                        Записаться
                      </Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            {/* Group Lessons (clickable - opens bottom sheet) */}
            <div className="border-b border-foreground/20 pb-6 md:pb-8">
              <Sheet>
                <SheetTrigger asChild>
                  <button type="button" className="w-full text-left">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 md:gap-8">
                      <div className="flex-1">
                        <h3 className="font-montserrat text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">
                          С ГРУППОЙ
                        </h3>
                        <p className="font-montserrat text-foreground/70 text-sm md:text-base">
                          3 занятия в неделю, группа до 6 человек, разговорный клуб
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="font-montserrat text-2xl md:text-3xl font-bold text-foreground">
                          5 500 ₽
                        </div>
                        <div className="font-montserrat text-xs md:text-sm text-foreground/60 mt-1">
                          в месяц
                        </div>
                      </div>
                    </div>
                  </button>
                </SheetTrigger>

                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="font-extrabold text-foreground">С ГРУППОЙ</SheetTitle>
                    <SheetDescription className="text-foreground/80">Групповые занятия для регулярной практики.</SheetDescription>
                  </SheetHeader>

                  <div className="py-4 space-y-4">
                    <p className="text-foreground/80">
                      Формат для тех, кто предпочитает живое общение и групповую динамику. Уроки построены так, чтобы каждый участник
                      получал достаточно говорильной практики и обратной связи от преподавателя.
                    </p>

                    <ul className="list-none pl-0 text-foreground/70 space-y-2">
                      <li className="flex"><span className="mr-3 text-foreground">—</span><span>3 занятия в неделю — постоянная практика</span></li>
                      <li className="flex"><span className="mr-3 text-foreground">—</span><span>Группа до 6 человек — комфортный формат</span></li>
                      <li className="flex"><span className="mr-3 text-foreground">—</span><span>Темы, материалы и задания для разговорной практики</span></li>
                      <li className="flex"><span className="mr-3 text-foreground">—</span><span>Регулярные мини-тесты и проверка прогресса</span></li>
                    </ul>
                  </div>

                  <SheetFooter className="pt-4">
                    <div className="w-full">
                      <div className="text-foreground/80 mb-2">Формат: онлайн / оффлайн (по договоренности)</div>
                      <Button className="w-full bg-primary text-white px-4 py-3 rounded-lg shadow-md hover:bg-green-600 hover:text-background transition-colors">
                        Записаться
                      </Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="relative py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="font-montserrat text-3xl md:text-5xl font-extrabold text-foreground mb-4 inline-block relative pb-3">
              КОНТАКТЫ
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-foreground"></span>
            </h2>
            <p className="font-montserrat text-foreground/70 text-base md:text-lg mt-6">
              Заполните форму, и мы поможем начать ваш путь к английскому языку
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 animate-fade-in">
            <div>
              <Input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Ваш email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Textarea
                placeholder="Ваше сообщение"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`min-h-[120px] md:min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.message}</p>}
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
          <div className="mt-8 md:mt-12 text-center animate-fade-in">
            <p className="text-foreground/50 text-xs md:text-sm mb-4">или ты, напиши нам</p>
            <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
              <a
                href="https://instagram.com/dagenglish"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 md:w-6 h-5 md:h-6 text-foreground/60 hover:text-primary" />
              </a>

              <a
                href="https://t.me/dagenglish"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <Send className="w-5 md:w-6 h-5 md:h-6 text-foreground/60 hover:text-primary" />
              </a>

              <a
                href="https://wa.me/79288699696"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-5 md:w-6 h-5 md:h-6 text-foreground/60 hover:text-primary" />
              </a>

              <a
                href="https://vk.com/dagenglish"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 transition-transform"
              >
                <svg className="w-5 md:w-6 h-5 md:h-6 text-foreground/60 hover:text-primary" viewBox="0 0 24 24" fill="currentColor">
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