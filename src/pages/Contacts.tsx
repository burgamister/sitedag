import Header from "@/components/Header";
import { useLanguage } from "@/lib/i18n";

const Contacts = () => {
  const { t } = useLanguage();
  const interactiveLinkClass =
    "group relative inline-flex w-fit items-center overflow-hidden px-3 py-2 font-montserrat font-semibold uppercase tracking-[0.01em] text-foreground/85 transition-colors duration-300 hover:bg-foreground hover:text-background";

  return (
    <div className="relative min-h-[100svh] overflow-x-hidden bg-background text-foreground">
      <Header />

      <main className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 pb-10 pt-24 sm:px-6 md:pt-28">
        <section className="flex w-full max-w-4xl flex-col items-center justify-center gap-10 text-center md:gap-12">
          <div className="flex flex-col items-center gap-4 md:gap-5">
            <a href="https://2gis.ru/makhachkala/firm/70000001076543413" className={`${interactiveLinkClass} font-montserrat text-lg font-semibold uppercase tracking-[0.01em] text-foreground/80 md:text-xl`}>
              {t.contacts.address}
            </a>
            <a href="mailto:dagenglish@mail.ru" className={`${interactiveLinkClass} text-lg md:text-xl`}>
              <span className="relative z-10">{t.contacts.email}</span>
            </a>
            <a href="tel:+79604099905" className={`${interactiveLinkClass} text-lg md:text-xl`}>
              <span className="relative z-10">{t.contacts.phone}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a
              href="https://t.me/dagenglish"
              target="_blank"
              rel="noopener noreferrer"
              className={`${interactiveLinkClass} text-lg md:text-xl`}
            >
              <span className="relative z-10">{t.contacts.telegram}</span>
            </a>
            <a
              href="https://instagram.com/dagenglish"
              target="_blank"
              rel="noopener noreferrer"
              className={`${interactiveLinkClass} text-lg md:text-xl`}
            >
              <span className="relative z-10">{t.contacts.inst}</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contacts;
