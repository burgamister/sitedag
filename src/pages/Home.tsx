import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoFull from "@/assets/logo-full.png";
import mountainsImage from "@/assets/image.png";
import markerStrokeRed from "@/assets/marker-stroke-red.webp";
import markerStroke from "@/assets/marker-stroke.webp";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();

  useEffect(() => {
    if (location.hash !== "#level-test-cta" && location.hash !== "#prices") {
      return;
    }

    const element = document.getElementById(location.hash.slice(1));
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: location.hash === "#prices" ? "start" : "center" });
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <img
            src={mountainsImage}
            alt=""
            aria-hidden="true"
            className="relative left-1/2 h-auto w-[clamp(720px,210vw,980px)] max-w-none -translate-x-1/2 translate-y-[10vw] object-bottom opacity-90 sm:left-0 sm:w-full sm:translate-x-0 sm:translate-y-12 md:translate-y-16"
          />
        </div>

        <div className="relative z-20 flex -translate-y-14 flex-col items-center justify-center px-4 text-center md:-translate-y-20">
          <img
            src={logoFull}
            alt="DagEnglish"
            className="pointer-events-none relative z-20 h-32 w-auto md:h-48 lg:h-64"
          />
          <button
            type="button"
            onClick={() => navigate("/level-test-intro")}
            aria-label={`${t.hero.cta} ${t.hero.ctaBlock}`}
            className="mt-3 inline-flex w-full max-w-[42rem] flex-col items-center justify-center gap-0.75 px-4 font-montserrat text-[clamp(0.9rem,2.35vw,1.55rem)] font-semibold lowercase leading-[1.02] tracking-normal text-foreground transition-colors duration-150 hover:text-[hsl(0_82%_18%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:mt-4"
          >
            <span className="text-center text-balance">
              {t.hero.cta}
              <span className="block">{t.hero.ctaBlock}</span>
            </span>
            <span className="font-montserrat text-[0.72rem] font-medium lowercase tracking-[0.16em] text-foreground/60 sm:text-xs">
              {t.hero.click}
            </span>
          </button>
        </div>
      </section>

      <section id="about" className="relative bg-background px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-[1600px] text-center">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-main text-[clamp(2.4rem,6vw,7.2rem)] font-bold leading-[1.07] tracking-[-0.05em] text-foreground">
              <span className="font-handwrite font-bold text-[hsl(0_82%_18%)]">{t.about.titleStart}</span> {t.about.titleHighlight}
              <span className="block"> {t.about.titleEnd}</span>
            </h2>

            <p className="mx-auto mt-8 max-w-[980px] font-montserrat text-[clamp(1.1rem,1.9vw,2.4rem)] leading-[1.4] text-foreground/75">
              {t.about.desc}
            </p>

            <button
              type="button"
              onClick={() => navigate("/level-test-intro")}
              className="mt-8 inline-flex w-full max-w-[760px] items-center justify-center rounded-[3rem] bg-[hsl(0_82%_18%)] px-8 py-5 md:py-7 font-montserrat text-[clamp(1rem,1.6vw,2rem)] font-medium uppercase tracking-[0.06em] text-background active:scale-[0.98] transition-transform"
            >
              {t.about.cta}
            </button>
          </div>
        </div>
      </section>

      <section id="why-us" className="relative overflow-hidden bg-background px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
            <h2 className="font-main text-[clamp(3.4rem,10vw,8rem)] font-bold leading-[0.82] tracking-[-0.05em] text-foreground">
              {t.whyUs.title}
              <span className="block font-handwrite text-[hsl(0_82%_18%)]">{t.whyUs.titleHighlight}</span>
            </h2>
          </div>

          <div className="relative mx-auto flex max-w-5xl flex-col gap-8 md:min-h-[600px] md:gap-0">
            {t.whyUs.cards.map((card, index) => {
              const isFirst = index === 0;
              return (
                <article
                  key={index}
                  className={`relative overflow-hidden rounded-[1.75rem] ${
                    isFirst
                      ? "border border-foreground/15 bg-background md:mb-16 md:w-[58%] md:rounded-[2rem]"
                      : "bg-[hsl(71_33%_23%)] md:absolute md:bottom-0 md:right-0 md:w-[58%] md:rounded-[2rem]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute select-none font-main text-[clamp(6rem,16vw,12rem)] font-bold leading-none ${
                      isFirst
                        ? "right-4 top-2 text-foreground/[0.04]"
                        : "left-4 top-2 text-background/[0.06]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10 p-6 md:p-10">
                    <div>
                      <h3
                        className={`font-main text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.86] tracking-tight ${
                          isFirst ? "text-foreground" : "text-background md:text-right"
                        }`}
                      >
                        {card.title.split("\n").map((line, i) => (
                          <span key={i}>
                            {i > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </h3>
                    </div>
                    <div className={`mt-10 max-w-md ${isFirst ? "" : "md:ml-auto"} md:mt-16`}>
                      <p
                        className={`font-montserrat text-sm leading-[1.7] md:text-base md:leading-[1.65] ${
                          isFirst ? "text-foreground/65" : "text-background/65 md:text-right"
                        }`}
                      >
                        {card.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
 
      <section id="prices" className="relative bg-background px-4 py-12 md:px-6 md:py-20">
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <p className="font-montserrat text-4xl font-bold tracking-tight text-foreground md:text-6xl">{t.prices.title}</p>
          </div>

          <div className="flex flex-col gap-5 md:hidden">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[112px] w-full items-center justify-center overflow-hidden px-4 py-5 text-center active:scale-[0.99] transition-transform sm:min-h-[120px] sm:py-6"
              aria-label={t.prices.individual}
              style={loweredIndividualLessonMarkerStyle}
            >
              <span className={individualLessonTextClassName}>{t.prices.individual}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[112px] w-full items-center justify-center overflow-hidden px-4 py-5 text-center active:scale-[0.99] transition-transform sm:min-h-[120px] sm:py-6"
              aria-label={t.prices.group}
              style={groupLessonMarkerStyle}
            >
              <span className={lessonTextClassName}>{t.prices.group}</span>
            </button>
          </div>

          <div className="hidden md:grid md:grid-cols-2 md:items-stretch md:gap-8">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[152px] w-full items-center justify-center overflow-hidden px-6 py-7 text-center active:scale-[0.99] transition-transform lg:min-h-[180px] lg:px-8 lg:py-8"
              aria-label={t.prices.individual}
              style={loweredIndividualLessonMarkerStyle}
            >
              <span className={individualLessonTextClassName}>{t.prices.individual}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="group relative flex min-h-[152px] w-full items-center justify-center overflow-hidden px-6 py-7 text-center active:scale-[0.99] transition-transform lg:min-h-[180px] lg:px-8 lg:py-8"
              aria-label={t.prices.group}
              style={groupLessonMarkerStyle}
            >
              <span className={lessonTextClassName}>{t.prices.group}</span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
