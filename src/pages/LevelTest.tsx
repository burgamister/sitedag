import Header from "@/components/Header";
import { Check } from "lucide-react";
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
  const [confirmedQuestions, setConfirmedQuestions] = useState<boolean[]>(() => questions.map(() => false));
  const [questionErrors, setQuestionErrors] = useState<string[]>(() => questions.map(() => ""));
  const [unlockedQuestions, setUnlockedQuestions] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
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

    setQuestionErrors((prev) => {
      const next = [...prev];
      next[questionIndex] = "";
      return next;
    });
  };

  const canSendResults = phoneOrTelegram.trim().length > 0 || extraContact.trim().length > 0;
  const allQuestionsConfirmed = confirmedQuestions.every(Boolean);

  const confirmQuestion = (questionIndex: number) => {
    const isFilled = inputs[questionIndex].every((value) => value.trim().length > 0);
    if (!isFilled) {
      setQuestionErrors((prev) => {
        const next = [...prev];
        next[questionIndex] = "Заполните все пропуски перед подтверждением.";
        return next;
      });
      return;
    }

    setConfirmedQuestions((prev) => {
      const next = [...prev];
      next[questionIndex] = true;
      return next;
    });

    setQuestionErrors((prev) => {
      const next = [...prev];
      next[questionIndex] = "";
      return next;
    });

    if (questionIndex + 1 < questions.length) {
      setUnlockedQuestions((prev) => Math.max(prev, questionIndex + 2));
    }
  };

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
            <h1 className="mt-3 font-main text-4xl leading-[0.95] md:text-7xl">заполните пропуски</h1>
          </div>

          <div className="mt-6 space-y-4 md:mt-8 md:space-y-5">
            {questions.slice(0, unlockedQuestions).map((question, questionIndex) => (
              <article key={question.id} className="border-2 border-foreground/20 bg-background p-5 md:p-6">
                <p className="font-montserrat text-xs uppercase tracking-[0.14em] text-foreground/55">
                  вопрос {question.id}
                </p>
                <p className="mt-2 font-montserrat text-base font-semibold leading-snug text-foreground md:text-lg">
                  {question.russian}
                </p>

                <div className="mt-4 rounded-xl border border-foreground/15 bg-foreground/[0.02] p-3 md:p-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3 font-montserrat text-[15px] leading-relaxed text-foreground/85 md:text-lg">
                    {question.answers.map((_, answerIndex) => (
                      <div key={`${question.id}-${answerIndex}`} className="contents">
                        <span>{question.parts[answerIndex]}</span>
                        <input
                          value={inputs[questionIndex][answerIndex]}
                          disabled={confirmedQuestions[questionIndex]}
                          onChange={(event) => onChangeAnswer(questionIndex, answerIndex, event.target.value)}
                          className="h-11 w-[100px] border-2 border-foreground/30 bg-background px-2 text-center font-montserrat text-base font-semibold text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)] disabled:cursor-not-allowed disabled:border-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/65 md:h-12 md:w-[140px] md:px-3 md:text-lg"
                          aria-label={`Ответ ${answerIndex + 1} для вопроса ${question.id}`}
                        />
                      </div>
                    ))}
                    <span>{question.parts[question.parts.length - 1]}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
                  {!confirmedQuestions[questionIndex] ? (
                    <button
                      type="button"
                      onClick={() => confirmQuestion(questionIndex)}
                      className="inline-flex w-full items-center justify-center gap-2 border-2 border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] px-4 py-3 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-background transition-colors active:opacity-80 md:w-auto md:py-2 md:text-sm"
                    >
                      <Check className="h-4 w-4" />
                      подтвердить
                    </button>
                  ) : (
                    <p className="font-montserrat text-xs uppercase tracking-[0.08em] text-[hsl(71_33%_23%)] md:text-sm">
                      ответ подтвержден
                    </p>
                  )}

                  {questionErrors[questionIndex] && (
                    <p className="font-montserrat text-sm text-[hsl(0_82%_18%)]">
                      {questionErrors[questionIndex]}
                    </p>
                  )}
                </div>

                {submitted && (
                  <p className="mt-3 font-montserrat text-sm text-foreground/75">
                    Правильный ответ: {question.answers.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>

          {!allQuestionsConfirmed && (
            <p className="mt-5 font-montserrat text-sm text-foreground/65 md:mt-6">
              Ответьте на текущий вопрос и нажмите на галочку, чтобы открыть следующий. Если не знаете, напишите что хотите.
            </p>
          )}

          {allQuestionsConfirmed && (
            <div className="mt-8 flex flex-col items-stretch gap-4 md:mt-10 md:flex-row md:items-center">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(true);
                  setIsLeadModalOpen(true);
                }}
                className="inline-flex w-full items-center justify-center border-2 border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] px-8 py-4 font-montserrat text-base font-semibold uppercase tracking-[0.08em] text-background transition-colors active:opacity-80 md:w-auto"
              >
                проверить
              </button>

              {submitted && (
                <p className="font-main text-3xl text-[hsl(0_82%_18%)] md:text-4xl">
                  результат: {score.ok}/{score.total}
                </p>
              )}
            </div>
          )}

          {submitted && (
            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="mt-4 inline-flex w-full items-center justify-center border-2 border-[hsl(0_82%_18%)] bg-[hsl(0_82%_18%)] px-7 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-background transition-colors active:opacity-80 md:mt-6 md:w-auto"
            >
              отправить результат нам
            </button>
          )}
        </section>
      </main>

      {submitted && isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/55 px-0 py-0 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-6">
          <section className="w-full max-w-3xl max-h-[92svh] overflow-y-auto border-2 border-foreground/25 bg-background p-5 shadow-2xl md:p-7 rounded-t-2xl sm:rounded-none">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-main text-3xl leading-[0.95] text-foreground md:text-5xl">
                  отправить результат нам
                </h2>
                <p className="mt-2 max-w-2xl font-montserrat text-sm text-foreground/75 md:text-base">
                  Оставьте контакт, отправьте результаты и мы свяжемся с вами.
                </p>
                <p className="mt-3 inline-flex items-center border border-[hsl(0_82%_18%/0.3)] bg-[hsl(0_82%_18%/0.06)] px-3 py-1 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-[hsl(0_82%_18%)]">
                  результат: {score.ok}/{score.total}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center border border-foreground/30 font-montserrat text-xl text-foreground/70 transition-colors hover:bg-foreground hover:text-background"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

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

            <div className="mt-5 flex flex-col items-stretch gap-3 md:mt-6 md:flex-row md:items-center">
              <button
                type="button"
                onClick={sendResults}
                disabled={!canSendResults || isSending}
                className={`inline-flex w-full items-center justify-center border-2 px-8 py-4 font-montserrat text-base font-semibold uppercase tracking-[0.08em] transition-colors active:opacity-80 md:w-auto ${
                  canSendResults
                    ? "border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] text-background disabled:cursor-not-allowed disabled:border-foreground/30 disabled:bg-foreground/15 disabled:text-foreground/50"
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
        </div>
      )}
    </div>
  );
};

export default LevelTest;
