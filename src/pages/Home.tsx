import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoFull from "@/assets/logo-full.png";
import dagestanOrnament from "@/assets/dagestan-ornament-strip.jpg";
import { useNavigate } from "react-router-dom";

const whyDagEnglishItems = [
  {
    id: "01",
    title: "поддержка в чате",
    text: "Отвечаем быстро в чате и по телефону. Помогаем с вопросами по урокам, домашке и расписанию.",
  },
  {
    id: "02",
    title: "удобные материалы",
    text: "Все материалы структурированы и доступны в одном месте: теория, практика, словари и трекер прогресса.",
  },
  {
    id: "03",
    title: "гибкая оплата",
    text: "Выбирайте комфортный формат: поурочно или пакетами. Прозрачные условия без скрытых платежей.",
  },
  {
    id: "04",
    title: "безопасная среда",
    text: "Доброжелательная атмосфера, уважение к каждому ученику и стабильная платформа для онлайн-занятий.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
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
      <section id="about" className="relative flex min-h-screen items-center bg-background px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto w-full max-w-[1600px] text-center">
          <p className="font-montserrat text-base italic tracking-[0.18em] text-foreground/55 md:text-lg">о школе</p>

          <div className="mx-auto mt-8 max-w-[1400px] md:mt-10">
            <h2 className="font-main text-[clamp(2.8rem,6vw,7.2rem)] font-medium leading-[1.07] tracking-[-0.02em] text-foreground">
              <span className="text-[hsl(16_33%_33%)]">дагинглиш</span> - английский
              <span className="block"> легко и с юмором</span>
            </h2>

            <p className="mx-auto mt-10 max-w-[980px] font-montserrat text-[clamp(1.3rem,1.9vw,2.4rem)] leading-[1.25] text-foreground/75">
              Уютные уроки с живой практикой, удобным расписанием и теплой поддержкой преподавателя.
            </p>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="mt-10 inline-flex w-full max-w-[760px] items-center justify-center rounded-[3rem] bg-[hsl(16_33%_30%)] px-10 py-7 font-montserrat text-[clamp(1.15rem,1.6vw,2rem)] font-medium uppercase tracking-[0.06em] text-background"
            >
              записаться
            </button>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="relative bg-background px-4 py-12 md:px-6 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="font-main text-3xl md:text-5xl font-bold tracking-[0.015em] text-foreground mb-4 inline-block relative pb-3">
              ОБУЧЕНИЕ
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-foreground"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-fade-in">
            {["индивидуально", "группа"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => navigate("/courses")}
                className="group relative aspect-[2/3] w-full overflow-hidden rounded-[26px] border border-[hsl(16_33%_33%/0.25)] bg-white text-left transition-transform duration-300 hover:-translate-y-1"
                aria-label={mode}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${dagestanOrnament})`,
                    backgroundRepeat: "repeat-y",
                    backgroundSize: "116% auto",
                    backgroundPosition: "center top",
                  }}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[hsl(16_33%_33%)] opacity-95 mix-blend-screen" />
                <span aria-hidden="true" className="absolute inset-0 bg-white/10 transition-colors duration-300 group-hover:bg-white/0" />
                <span className="absolute bottom-5 left-5 rounded-md bg-white/78 px-3 py-1 font-main text-2xl font-semibold tracking-[0.015em] text-[hsl(16_33%_33%)] md:bottom-7 md:left-7 md:text-3xl">
                  {mode}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why DagEnglish Section */}
      <section id="why-us" className="bg-foreground/[0.05] px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-xl md:mb-14">
            <h2 className="font-main text-5xl font-bold leading-[0.9] tracking-tight text-foreground md:text-7xl">
              почему
              <span className="block">дагинглиш</span>
            </h2>
            <p className="mt-6 max-w-md font-montserrat text-base leading-snug text-foreground/75">
              мы - современная школа английского.
              <br />
              вот несколько наших преимуществ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {whyDagEnglishItems.map((item, index) => (
              <div key={item.title} className="relative pt-7 md:pt-9">
                <span className="absolute left-2 top-0 font-montserrat text-xs font-semibold tracking-[0.14em] text-foreground/40">
                  {item.id}
                </span>
                <article className="relative h-[360px] overflow-hidden rounded-[26px] border border-foreground/10 bg-background p-6 md:h-[390px]">
                  <span className="pointer-events-none absolute right-4 top-3 font-montserrat text-6xl font-semibold leading-none text-foreground/[0.07] md:text-7xl">
                    {item.id}
                  </span>
                  <h3 className="relative z-10 font-main text-4xl font-bold leading-[0.92] tracking-tight text-foreground md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="relative z-10 mt-4 max-w-[90%] font-montserrat text-[15px] leading-[1.25] text-foreground/60">
                    {item.text}
                  </p>

                  {index === 0 && (
                    <div className="absolute bottom-11 left-6 flex gap-2">
                      {["h", "e", "l", "p"].map((letter, letterIndex) => (
                        <span
                          key={letter}
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/20 bg-background font-main text-5xl font-bold text-foreground shadow-sm"
                          style={{ transform: `rotate(${[-4, 5, -2, 7][letterIndex]}deg)` }}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  )}

                  {index === 1 && (
                    <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between">
                      <span className="h-20 w-20 rounded-full border border-cyan-400" />
                      <span className="mx-3 h-px flex-1 bg-cyan-300" />
                      <span className="font-montserrat text-cyan-400">→</span>
                      <span className="h-20 w-20 rounded-2xl bg-cyan-400" />
                    </div>
                  )}

                  {index === 2 && (
                    <p className="absolute -bottom-3 left-6 whitespace-nowrap font-montserrat text-7xl font-light text-foreground/80 md:text-8xl">
                      1500₽ = 1 урок
                    </p>
                  )}

                  {index === 3 && (
                    <>
                      <span className="absolute bottom-[31%] left-0 right-0 h-px bg-foreground/40" />
                      <span className="absolute bottom-0 left-1/2 top-[68%] w-px bg-foreground/40" />
                      <span className="absolute bottom-0 left-[14%] top-[32%] w-px rotate-45 bg-cyan-300" />
                    </>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
