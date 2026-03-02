import Header from "@/components/Header";
import { Mail, MapPin, Phone } from "lucide-react";

const Contacts = () => {
  return (
    <div className="relative min-h-[100svh] md:h-[100svh] overflow-x-hidden bg-background text-foreground">
      <Header />

      <main className="relative z-10 pt-24 md:pt-28 md:h-full">
        <div className="mx-auto w-full px-4 sm:px-6 md:h-full md:px-0">
          <div className="grid grid-cols-1 gap-8 md:h-full md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-[4px] md:pl-10 md:pr-10">
            <section className="flex w-full flex-col gap-8 pt-2 pb-2 md:h-full md:max-w-[420px] md:justify-between md:pb-10 md:pt-5 md:justify-self-end">
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="font-montserrat text-xs md:text-sm uppercase tracking-[0.01px] font-semibold text-foreground/80">
                     367030, Махачкала,
                    </p>
                    <p className="font-montserrat text-xs md:text-sm uppercase tracking-[0.01px] font-semibold text-foreground/80">
                     Ленинский район,
                    </p>
                    <p className="font-montserrat text-xs md:text-sm uppercase tracking-[0.01px] font-semibold text-foreground/80">
                    ​Улица Ирчи Казака, 48, ​4 этаж
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="mailto:akb.godekan@mail.ru"
                    className="font-montserrat text-sm md:text-base font-semibold tracking-[0.001em] text-foreground/85 hover:text-primary transition-colors"
                  >
                    dagenglish@mail.ru
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="tel:+79288699696"
                    className="font-montserrat text-sm md:text-base font-semibold tracking-[0.001em] text-foreground/85 hover:text-primary transition-colors"
                  >
                    +7 (960) 409 99 05
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-8 md:gap-10 font-montserrat text-sm uppercase tracking-[0.01px] font-semibold text-foreground/50">
                <a
                  href="https://vk.com/dagenglish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  VK
                </a>
                <a
                  href="https://t.me/dagenglish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  TG
                </a>
                <a
                  href="https://instagram.com/dagenglish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  IG
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  YT
                </a>
              </div>
            </section>

            <section className="relative h-[45vh] min-h-[260px] md:h-full">
              <div className="absolute inset-3 sm:inset-5 md:inset-y-[17.5px] md:inset-x-8 overflow-hidden rounded-m">
                <iframe
                  title="DagEnglish Location"
                  src="https://yandex.com/map-widget/v1/?ll=47.5047%2C42.9849&z=16&pt=47.5047,42.9849,pm2rdm&scroll=false"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contacts;
