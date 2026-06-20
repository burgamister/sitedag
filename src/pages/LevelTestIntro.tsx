import Header from "@/components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LevelTestIntro = () => {
  const navigate = useNavigate();
  const [isQuickFormOpen, setIsQuickFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [sendError, setSendError] = useState("");

  const canSend = contact.trim().length > 0;

  const sendQuickLead = async () => {
    if (!canSend || isSending) {
      return;
    }

    setIsSending(true);
    setSendStatus("idle");
    setSendError("");

    try {
      const apiUrl = import.meta.env.VITE_LEVEL_TEST_API_URL || "/api/level-test";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadType: "quick_contact",
          name: name.trim(),
          primaryContact: contact.trim(),
          secondaryContact: "",
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Не удалось отправить заявку");
      }

      setSendStatus("success");
      setName("");
      setContact("");
    } catch (error) {
      setSendStatus("error");
      setSendError(error instanceof Error ? error.message : "Ошибка отправки");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-background text-foreground">
      <Header />

      <main className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 pb-8 pt-28 sm:px-5 md:px-6 md:pb-12 md:pt-32">
        <section className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col justify-between bg-background px-0 py-2 sm:rounded-[2rem] sm:p-6 md:p-8">
            <p className="font-montserrat text-[1.05rem] font-semibold leading-[1.42] text-foreground/85 sm:text-lg md:text-2xl md:leading-[1.35]">
              Для того, чтобы мы максимально точно могли определить уровень, пройдите наш тест, пожалуйста - это быстро.
              Не переживайте о правильности ответов и не бойтесь ошибиться - чем честнее ответы, тем лучше мы поймем,
              как добиться с Вами максимального результата.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8">
              <button
                type="button"
                onClick={() => navigate("/level-test")}
                className="min-h-[64px] w-full rounded-[1.35rem] bg-[hsl(0_82%_18%)] px-5 py-4 font-main text-[clamp(2rem,11vw,3.2rem)] font-bold lowercase leading-[0.9] text-background transition-transform active:scale-[0.98] sm:rounded-[2rem] sm:px-6 sm:py-5 md:text-5xl"
              >
                Все, полный газ
              </button>
              <button
                type="button"
                onClick={() => setIsQuickFormOpen(true)}
                className="min-h-[76px] w-full rounded-[1.1rem] border-2 border-foreground/25 px-4 py-4 text-left font-main text-[clamp(1.35rem,6.8vw,2.15rem)] font-bold lowercase leading-[0.95] text-foreground transition-colors hover:bg-foreground hover:text-background sm:rounded-[1.5rem] sm:px-5 md:text-4xl"
              >
                Особо времени тоже нету, давай я цифры скину - цинканите мне
              </button>
            </div>
          </div>
        </section>
      </main>

      {isQuickFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/55 px-0 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-6">
          <section className="max-h-[90svh] w-full max-w-xl overflow-y-auto rounded-t-[1.4rem] border-0 border-foreground/25 bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-[1.5rem] sm:border-2 sm:p-5 sm:pb-5 md:p-7">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-main text-[2rem] font-bold leading-[0.9] text-foreground sm:text-[2.35rem] md:text-5xl">оставьте контакт</h2>
                <p className="mt-3 font-montserrat text-[0.92rem] leading-snug text-foreground/70 sm:text-sm md:text-base">
                  Напишите имя и телефон или Telegram. Мы с Вами свяжемся.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickFormOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/30 font-montserrat text-xl text-foreground/70 transition-colors hover:bg-foreground hover:text-background"
                aria-label="Закрыть"
              >
                x
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:mt-6">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-12 w-full rounded-none border-2 border-foreground/30 bg-background px-3 font-montserrat text-base text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)]"
                placeholder="Имя"
                aria-label="Имя"
              />
              <input
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                className="h-12 w-full rounded-none border-2 border-foreground/30 bg-background px-3 font-montserrat text-base text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)]"
                placeholder="Телефон или Telegram"
                aria-label="Телефон или Telegram"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={sendQuickLead}
                disabled={!canSend || isSending}
                className="inline-flex min-h-[54px] w-full items-center justify-center border-2 border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-background transition-colors active:opacity-80 disabled:cursor-not-allowed disabled:border-foreground/30 disabled:bg-foreground/15 disabled:text-foreground/50 sm:w-auto sm:px-7"
              >
                {isSending ? "отправка..." : "оставить контакт"}
              </button>
              {sendStatus === "success" && <p className="font-montserrat text-sm text-[hsl(71_33%_23%)]">Заявка отправлена.</p>}
              {sendStatus === "error" && <p className="font-montserrat text-sm text-[hsl(0_82%_18%)]">Ошибка: {sendError}</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default LevelTestIntro;
