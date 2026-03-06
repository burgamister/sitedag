import Header from "@/components/Header";
import { useMemo, useState } from "react";

type TestQuestion = {
  id: number;
  russian: string;
  parts: string[];
  answers: string[];
};

const questions: TestQuestion[] = [
  {
    id: 1,
    russian: "Ты зачем пиво сломал?",
    parts: ["Why ", " you break the beer?"],
    answers: ["did"],
  },
  {
    id: 2,
    russian: "Кто уразу не может держать - не держите",
    parts: ["Those who ", " fast ", " fast"],
    answers: ["can't", "don't"],
  },
  {
    id: 3,
    russian: "Холодильник где здесь?",
    parts: ["Where ", " the fridge here?"],
    answers: ["is"],
  },
  {
    id: 4,
    russian: "Через чуть-чуть вернусь Москва",
    parts: ["I ", " be back in a bit Moscow"],
    answers: ["will"],
  },
  {
    id: 5,
    russian: "Баба купила мне айскофе",
    parts: ["Baba ", " me an ice coffee"],
    answers: ["bought"],
  },
  {
    id: 6,
    russian: "Ты че здесь в обувах?",
    parts: ["Why ", " you wearing shoes in here"],
    answers: ["are"],
  },
  {
    id: 7,
    russian: "Перевернулся я на бок, вот он лес",
    parts: ["I ", " rolled over, here is the forest"],
    answers: ["have"],
  },
  {
    id: 8,
    russian: "Она мне эпилепсию на ноги сделает? А то я уже вырастила свои волосы",
    parts: ["", " she do epilepsy on my legs? I have already ", " hair"],
    answers: ["will", "grown"],
  },
  {
    id: 9,
    russian: "У кого-нибудь есть старые ненужные сто рублей?",
    parts: ["", " anyone have old unwanted 100 rubles"],
    answers: ["does"],
  },
];

const LevelTest = () => {
  const [inputs, setInputs] = useState<string[][]>(() => questions.map((q) => q.answers.map(() => "")));
  const [submitted, setSubmitted] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [phoneOrTelegram, setPhoneOrTelegram] = useState("");
  const [extraContact, setExtraContact] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [sendError, setSendError] = useState("");

  const score = useMemo(() => {
    let ok = 0;
    let total = 0;

    questions.forEach((question, qIndex) => {
      question.answers.forEach((answer, aIndex) => {
        total += 1;
        if (inputs[qIndex][aIndex].trim().toLowerCase() === answer.toLowerCase()) {
          ok += 1;
        }
      });
    });

    return { ok, total };
  }, [inputs]);

  const onChangeAnswer = (questionIndex: number, answerIndex: number, value: string) => {
    setInputs((prev) => {
      const next = [...prev];
      next[questionIndex] = [...next[questionIndex]];
      next[questionIndex][answerIndex] = value;
      return next;
    });
  };

  const canSendResults = phoneOrTelegram.trim().length > 0 || extraContact.trim().length > 0;

  const sendResults = async () => {
    if (!canSendResults || isSending) {
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
          name: studentName.trim(),
          primaryContact: phoneOrTelegram.trim(),
          secondaryContact: extraContact.trim(),
          score: {
            ok: score.ok,
            total: score.total,
          },
          questions: questions.map((question, qIndex) => ({
            id: question.id,
            russian: question.russian,
            userAnswers: inputs[qIndex].map((value) => value.trim()),
            correctAnswers: question.answers,
          })),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Не удалось отправить заявку");
      }

      setSendStatus("success");
    } catch (error) {
      setSendStatus("error");
      setSendError(error instanceof Error ? error.message : "Ошибка отправки");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-28">
        <section className="mx-auto max-w-6xl">
          <div className="border-2 border-foreground/20 bg-[hsl(71_33%_23%)] px-6 py-8 text-background md:px-10 md:py-10">
            <p className="font-montserrat text-sm uppercase tracking-[0.16em] text-background/80 md:text-base">
              тест уровня
            </p>
            <h1 className="mt-3 font-main text-4xl leading-[0.95] md:text-7xl">допиши пропущенные слова</h1>
            <p className="mt-4 max-w-3xl font-montserrat text-sm text-background/90 md:text-base">
              В каждом задании дан полный перевод на русском и английская фраза с пропуском. Впишите
              недостающее слово (или слова).
            </p>
          </div>

          <div className="mt-6 space-y-4 md:mt-8 md:space-y-5">
            {questions.map((question, questionIndex) => (
              <article key={question.id} className="border-2 border-foreground/20 bg-background p-5 md:p-6">
                <p className="font-montserrat text-xs uppercase tracking-[0.14em] text-foreground/55">
                  вопрос {question.id}
                </p>
                <p className="mt-2 font-montserrat text-base font-semibold leading-snug text-foreground md:text-lg">
                  {question.russian}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-3">
                  {question.answers.map((answer, answerIndex) => (
                    <div key={`${question.id}-${answerIndex}`} className="contents">
                      <span className="font-montserrat text-base text-foreground/85 md:text-lg">
                        {question.parts[answerIndex]}
                      </span>
                      <input
                        value={inputs[questionIndex][answerIndex]}
                        onChange={(event) => onChangeAnswer(questionIndex, answerIndex, event.target.value)}
                        className="h-11 min-w-[96px] border-2 border-foreground/30 bg-background px-3 text-center font-montserrat text-base font-semibold text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)] md:h-12 md:min-w-[130px] md:text-lg"
                        aria-label={`Ответ ${answerIndex + 1} для вопроса ${question.id}`}
                      />
                    </div>
                  ))}
                  <span className="font-montserrat text-base text-foreground/85 md:text-lg">
                    {question.parts[question.parts.length - 1]}
                  </span>
                </div>

                {submitted && (
                  <p className="mt-3 font-montserrat text-sm text-foreground/75">
                    Правильный ответ: {question.answers.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 md:mt-10 md:flex-row md:items-center">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="inline-flex items-center justify-center border-2 border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] px-8 py-4 font-montserrat text-base font-semibold uppercase tracking-[0.08em] text-background transition-colors hover:bg-background hover:text-[hsl(71_33%_23%)]"
            >
              проверить
            </button>

            {submitted && (
              <p className="font-main text-3xl text-[hsl(0_82%_18%)] md:text-4xl">
                результат: {score.ok}/{score.total}
              </p>
            )}
          </div>

          {submitted && (
            <section className="mt-8 border-2 border-foreground/20 bg-background p-5 md:mt-10 md:p-7">
              <h2 className="font-main text-3xl leading-[0.95] text-foreground md:text-5xl">
                отправить результат нам
              </h2>
              <p className="mt-2 max-w-3xl font-montserrat text-sm text-foreground/75 md:text-base">
                Оставьте контакт, отправьте результаты и мы подберем для вас подходящую группу.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-3 md:gap-4">
                <input
                  value={studentName}
                  onChange={(event) => setStudentName(event.target.value)}
                  className="h-11 border-2 border-foreground/30 bg-background px-3 font-montserrat text-base text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)] md:h-12"
                  placeholder="Имя (необязательно)"
                  aria-label="Имя"
                />
                <input
                  value={phoneOrTelegram}
                  onChange={(event) => setPhoneOrTelegram(event.target.value)}
                  className="h-11 border-2 border-foreground/30 bg-background px-3 font-montserrat text-base text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)] md:h-12"
                  placeholder="Телефон или Telegram"
                  aria-label="Телефон или Telegram"
                />
                <input
                  value={extraContact}
                  onChange={(event) => setExtraContact(event.target.value)}
                  className="h-11 border-2 border-foreground/30 bg-background px-3 font-montserrat text-base text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)] md:h-12"
                  placeholder="Instagram / доп. контакт"
                  aria-label="Дополнительный контакт"
                />
              </div>

              <div className="mt-5 flex flex-col items-start gap-3 md:mt-6 md:flex-row md:items-center">
                <button
                  type="button"
                  onClick={sendResults}
                  disabled={!canSendResults || isSending}
                  className={`inline-flex items-center justify-center border-2 px-8 py-4 font-montserrat text-base font-semibold uppercase tracking-[0.08em] transition-colors ${
                    canSendResults
                      ? "border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] text-background hover:bg-background hover:text-[hsl(71_33%_23%)] disabled:cursor-not-allowed disabled:border-foreground/30 disabled:bg-foreground/15 disabled:text-foreground/50"
                      : "cursor-not-allowed border-foreground/30 bg-foreground/15 text-foreground/50"
                  }`}
                >
                  {isSending ? "отправка..." : "отправить результат"}
                </button>
                {!canSendResults && (
                  <p className="font-montserrat text-sm text-foreground/65">
                    Укажите хотя бы один контакт для отправки.
                  </p>
                )}
                {sendStatus === "success" && (
                  <p className="font-montserrat text-sm text-[hsl(71_33%_23%)]">
                    Заявка отправлена. Мы свяжемся с вами и подберем группу.
                  </p>
                )}
                {sendStatus === "error" && (
                  <p className="font-montserrat text-sm text-[hsl(0_82%_18%)]">
                    Не удалось отправить заявку: {sendError}
                  </p>
                )}
              </div>
            </section>
          )}
        </section>
      </main>
    </div>
  );
};

export default LevelTest;
