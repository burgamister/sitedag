import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoFull from "@/assets/logo-full.png";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const whyDagEnglishItems = [
  {
    id: "01",
    title: "атмосфера как дома",
    text: "У нас на уроках ты чувствуешь себя как дома. Можем чай попить, фильмы посмотерть. Главное много не наглеть!",
  },
  {
    id: "02",
    title: "упор на практику",
    text: "Уроки проводятся на английском языке, чтоб вы привыкали к языку. Не переживайте спрашивать учителя если не понимаете о чем идет речь.",
  },
  {
    id: "03",
    title: "гибкая оплата",
    text: "Выбирайте комфортный формат: поурочно или пакетами. Прозрачные условия без скрытых платежей.",
  },
  {
    id: "04",
    title: "стильные ковры",
    text: "В каждом классе у нас висят красивые дагестанские ковры. Больше можете посмотреть здесь.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#level-test-cta") {
      return;
    }

    const element = document.getElementById("level-test-cta");
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [location.hash]);

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
        <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce sm:block">
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
              <span className="text-[hsl(0_82%_18%)]">дагинглиш</span> - английский
              <span className="block"> легко и с юмором</span>
            </h2>

            <p className="mx-auto mt-10 max-w-[980px] font-montserrat text-[clamp(1.3rem,1.9vw,2.4rem)] leading-[1.25] text-foreground/75">
              Уютные уроки с живой практикой, удобным расписанием и теплой поддержкой преподавателя.
            </p>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="mt-10 inline-flex w-full max-w-[760px] items-center justify-center rounded-[3rem] bg-[hsl(0_82%_18%)] px-10 py-7 font-montserrat text-[clamp(1.15rem,1.6vw,2rem)] font-medium uppercase tracking-[0.06em] text-background"
            >
              записаться
            </button>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="relative bg-background px-4 py-12 md:px-6 md:py-20">
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center md:mb-12 animate-fade-in">
            <p className="font-montserrat text-base italic tracking-[0.18em] text-foreground/55 md:text-lg">обучение</p>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 md:flex-row md:items-end md:justify-center md:gap-3 animate-fade-in">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative h-[320px] w-full max-w-[360px] overflow-hidden border border-foreground/25 bg-background text-left md:h-[380px] md:max-w-[410px]"
              aria-label="индивидуально"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(145deg,hsl(71_33%_23%/0.14)_0%,hsl(0_82%_18%/0.12)_55%,hsl(49_52%_94%/0.95)_100%)] transition-transform duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(135deg,transparent,transparent_20px,hsl(0_82%_18%/0.15)_21px,hsl(0_82%_18%/0.15)_22px)]"
              />
              <span className="absolute bottom-7 left-7 bg-background/85 px-3 py-1 font-main text-2xl font-semibold tracking-[0.015em] text-[hsl(0_82%_18%)] md:bottom-9 md:left-9 md:text-3xl">
                индивидуально
              </span>
            </button>

            <p className="w-full max-w-[360px] px-1 text-left font-montserrat text-lg font-semibold leading-[1.05] tracking-[0.01em] text-foreground/90 md:max-w-[230px] md:self-end md:pb-2 md:text-xl">
              <span className="block">нажми,</span>
              <span className="mt-0.5 block">чтобы</span>
              <span className="mt-0.5 block">узнать подробней</span>
            </p>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative h-[320px] w-full max-w-[360px] overflow-hidden border border-foreground/25 bg-background text-left md:h-[380px] md:max-w-[410px]"
              aria-label="группа"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(145deg,hsl(71_33%_23%/0.14)_0%,hsl(0_82%_18%/0.12)_55%,hsl(49_52%_94%/0.95)_100%)] transition-transform duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(135deg,transparent,transparent_20px,hsl(0_82%_18%/0.15)_21px,hsl(0_82%_18%/0.15)_22px)]"
              />
              <span className="absolute bottom-7 left-7 bg-background/85 px-3 py-1 font-main text-2xl font-semibold tracking-[0.015em] text-[hsl(0_82%_18%)] md:bottom-9 md:left-9 md:text-3xl">
                группа
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Why DagEnglish Section */}
      <section id="why-us" className="bg-background px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-xl md:mb-14">
            <h2 className="font-main text-5xl font-bold leading-[0.9] tracking-tight text-foreground md:text-7xl">
              почему
              <span className="block text-[hsl(0_82%_18%)]">дагинглиш</span>
            </h2>
            <p className="mt-6 max-w-md font-montserrat text-base leading-snug text-foreground/75">
              мы - современная школа английского.
              <br />
              вот несколько наших преимуществ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {whyDagEnglishItems.map((item) => (
              <div key={item.title} className="relative">
                <article className="relative min-h-[220px] overflow-hidden rounded-[26px] border border-foreground/10 bg-background p-6 md:min-h-[250px]">
                  <span className="pointer-events-none absolute right-4 top-3 font-montserrat text-6xl font-semibold leading-none text-foreground/[0.07] md:text-7xl">
                    {item.id}
                  </span>
                  <h3 className="relative z-10 font-main text-4xl font-bold leading-[0.92] tracking-tight text-foreground md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="relative z-10 mt-4 max-w-[90%] font-montserrat text-[15px] leading-[1.25] text-foreground/60">
                    {item.text}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="level-test-cta" className="bg-background px-4 pb-6 md:px-6 md:pb-10">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/level-test")}
            className="group relative flex h-[72svh] w-full items-end justify-start overflow-hidden border-2 border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] p-6 text-left md:h-[82svh] md:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[hsl(71_33%_23%/0.62)]"
            />
            <span className="relative z-10 font-main text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-background">
              тест уровня
            </span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
