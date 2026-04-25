import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoFull from "@/assets/logo-full.png";
import markerStrokeRed from "@/assets/marker-stroke-red.png";
import markerStroke from "@/assets/marker-stroke.png";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const whyDagEnglishItems = [
  {
    id: "01",
    title: "атмосфера как дома",
    text: "У нас на уроках ты чувствуешь себя как дома. Можем чай попить, фильмы посмотреть. Главное много не наглеть!",
  },
  {
    id: "02",
    title: "упор на практику",
    text: "Уроки проводятся на английском языке, чтоб вы привыкали к языку. Не переживайте спрашивать учителя, если не понимаете о чем идет речь.",
  },
];

const createLessonMarkerStyle = (markerUrl: string) => ({
  backgroundImage: `url(${markerUrl})`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "center" as const,
  backgroundSize: "105%",
});

const individualLessonMarkerStyle = createLessonMarkerStyle(markerStrokeRed);
const groupLessonMarkerStyle = createLessonMarkerStyle(markerStroke);
const loweredIndividualLessonMarkerStyle = {
  ...individualLessonMarkerStyle,
  backgroundPosition: "center 45%" as const,
};
const lessonTextClassName =
  "relative z-10 max-w-[10.5ch] px-2 font-main text-[clamp(1.55rem,4vw+0.7rem,3.35rem)] font-bold leading-[0.9] tracking-[-0.02em] text-background text-balance sm:max-w-[11.5ch]";
const individualLessonTextClassName =
  "relative z-10 max-w-[11.5ch] px-2 font-main text-[clamp(1.35rem,3.1vw+0.65rem,2.95rem)] font-bold leading-[0.92] tracking-[-0.03em] text-background whitespace-nowrap";

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

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="w-full h-auto text-accent/30" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,320L240,280L360,160L480,200L600,120L720,180L840,100L960,140L1080,80L1200,160L1320,120L1440,180L1440,320L0,320Z" />
          </svg>
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto text-accent/20" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,320L200,260L320,140L480,220L640,100L800,160L960,80L1120,180L1280,120L1440,200L1440,320L0,320Z" />
          </svg>
        </div>

        <div className="relative z-20 flex items-center justify-center">
          <img src={logoFull} alt="DagEnglish" className="w-auto h-32 md:h-48 lg:h-64" />
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce sm:block">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-foreground/50 rounded-full"></div>
          </div>
        </div>
      </section>

      <section id="about" className="relative bg-background px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-[1600px] text-center">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-main text-[clamp(2.4rem,6vw,7.2rem)] font-medium leading-[1.07] tracking-[-0.02em] text-foreground">
              <span className="font-handwrite text-[hsl(0_82%_18%)]">дагинглиш</span> - английский
              <span className="block"> легко и с юмором</span>
            </h2>

            <p className="mx-auto mt-8 max-w-[980px] font-montserrat text-[clamp(1.1rem,1.9vw,2.4rem)] leading-[1.4] text-foreground/75">
              Уютные уроки с живой практикой, удобным расписанием и теплой поддержкой преподавателя.
            </p>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="mt-8 inline-flex w-full max-w-[760px] items-center justify-center rounded-[3rem] bg-[hsl(0_82%_18%)] px-8 py-5 md:py-7 font-montserrat text-[clamp(1rem,1.6vw,2rem)] font-medium uppercase tracking-[0.06em] text-background active:scale-[0.98] transition-transform"
            >
              записаться
            </button>
          </div>
        </div>
      </section>

      <section id="prices" className="relative bg-background px-4 py-12 md:px-6 md:py-20">
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <p className="font-montserrat text-4xl font-bold tracking-tight text-foreground md:text-6xl">Занятия</p>
          </div>

          <div className="flex flex-col gap-5 md:hidden">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[112px] w-full items-center justify-center overflow-hidden px-4 py-5 text-center active:scale-[0.99] transition-transform sm:min-h-[120px] sm:py-6"
              aria-label="индивидуально"
              style={loweredIndividualLessonMarkerStyle}
            >
              <span className={individualLessonTextClassName}>индивидуально</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[112px] w-full items-center justify-center overflow-hidden px-4 py-5 text-center active:scale-[0.99] transition-transform sm:min-h-[120px] sm:py-6"
              aria-label="группа"
              style={groupLessonMarkerStyle}
            >
              <span className={lessonTextClassName}>группа</span>
            </button>
          </div>

          <div className="hidden md:grid md:grid-cols-2 md:items-stretch md:gap-8">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[152px] w-full items-center justify-center overflow-hidden px-6 py-7 text-center active:scale-[0.99] transition-transform lg:min-h-[180px] lg:px-8 lg:py-8"
              aria-label="индивидуально"
              style={loweredIndividualLessonMarkerStyle}
            >
              <span className={individualLessonTextClassName}>индивидуально</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[152px] w-full items-center justify-center overflow-hidden px-6 py-7 text-center active:scale-[0.99] transition-transform lg:min-h-[180px] lg:px-8 lg:py-8"
              aria-label="группа"
              style={groupLessonMarkerStyle}
            >
              <span className={lessonTextClassName}>группа</span>
            </button>
          </div>
        </div>
      </section>

<section id="why-us" className="bg-background px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-xl md:mb-14">
            <h2 className="font-main text-5xl font-bold leading-[0.9] tracking-tight text-foreground md:text-7xl">
              почему
              <span className="block font-handwrite text-[hsl(0_82%_18%)]">дагинглиш?</span>
            </h2>
            <p className="mt-6 max-w-md font-montserrat text-base leading-snug text-foreground/75">
              мы - современная школа английского.
              <br />
              вот несколько наших преимуществ
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Card 01 — light */}
            <article className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-background">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 select-none font-main text-[clamp(7rem,18vw,14rem)] font-bold leading-none text-foreground/[0.04]"
              >
                01
              </span>
              <div className="relative z-10 flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-0 md:p-12">
                <div className="flex-1 border-foreground/15 md:border-r md:pr-12">
                  <h3 className="font-main text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.9] tracking-tight text-foreground">
                    атмосфера<br />как дома
                  </h3>
                </div>
                <div className="md:w-[42%] md:pl-12">
                  <p className="font-montserrat text-sm leading-[1.7] text-foreground/65 md:text-base md:leading-[1.65]">
                    У нас на уроках ты чувствуешь себя как дома. Можем чай попить, фильмы посмотерть. Главное много не наглеть!
                  </p>
                </div>
              </div>
            </article>

            {/* Card 02 — dark */}
            <article className="relative overflow-hidden rounded-2xl bg-[hsl(71_33%_23%)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 select-none font-main text-[clamp(7rem,18vw,14rem)] font-bold leading-none text-background/[0.06]"
              >
                02
              </span>
              <div className="relative z-10 flex flex-col-reverse gap-4 p-6 md:flex-row md:items-center md:gap-0 md:p-12">
                <div className="md:w-[42%] md:pr-12">
                  <p className="font-montserrat text-sm leading-[1.7] text-background/65 md:text-base md:leading-[1.65]">
                    Уроки проводятся на английском языке, чтоб вы привыкали к языку. Не переживайте спрашивать учителя если не понимаете о чем идет речь.
                  </p>
                </div>
                <div className="flex-1 border-background/10 md:border-l md:pl-12">
                  <h3 className="font-main text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.9] tracking-tight text-background md:text-right">
                    упор на<br />практику
                  </h3>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
 
      <section id="level-test-cta" className="bg-background px-4 pb-6 md:px-6 md:pb-10">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/level-test")}
            className="group relative flex w-full items-center justify-center overflow-hidden rounded-[4.5rem] border-3 border-[hsl(0_82%_18%)] bg-[hsl(0_82%_18%)] px-6 py-16 text-center active:scale-[0.99] transition-transform duration-150 md:py-24"
          >
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
