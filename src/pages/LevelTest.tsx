import Header from "@/components/Header";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();
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
        next[questionIndex] = t.levelTest.fillError;
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
        throw new Error(text || t.levelTest.error);
      }

      setSendStatus("success");
    } catch (error) {
      setSendStatus("error");
      setSendError(error instanceof Error ? error.message : t.levelTest.sendError);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-background">
      <Header />

      <main className="px-4 pb-14 pt-28 sm:px-5 md:px-6 md:pb-24 md:pt-32">
        <section className="mx-auto max-w-4xl">
          <div className="rounded-[1.75rem] bg-[hsl(71_33%_23%)] px-5 py-7 text-background shadow-[10px_10px_0_hsl(0_82%_18%/0.14)] md:rounded-[2rem] md:px-10 md:py-10">
            <p className="font-montserrat text-sm uppercase tracking-[0.16em] text-background/80 md:text-base">
              {t.levelTest.badge}
            </p>
            <h1 className="mt-3 font-main text-[clamp(2.7rem,12vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.04em] md:text-7xl">{t.levelTest.title}</h1>
          </div>

          <div className="mt-6 space-y-4 md:mt-8 md:space-y-5">
            {questions.slice(0, unlockedQuestions).map((question, questionIndex) => (
              <article key={question.id} className="rounded-[1.5rem] border-2 border-foreground/15 bg-background p-4 shadow-[6px_6px_0_hsl(71_33%_23%/0.08)] md:p-6">
                <p className="font-montserrat text-xs uppercase tracking-[0.14em] text-foreground/55">
                  {t.levelTest.question} {question.id}
                </p>
                <p className="mt-2 font-montserrat text-base font-semibold leading-snug text-foreground md:text-lg">
                  {question.russian}
                </p>

                <div className="mt-4 rounded-[1.1rem] bg-foreground/[0.04] p-3 md:p-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3 font-montserrat text-[15px] leading-relaxed text-foreground/85 md:text-lg">
                    {question.answers.map((_, answerIndex) => (
                      <div key={`${question.id}-${answerIndex}`} className="contents">
                        <span>{question.parts[answerIndex]}</span>
                        <input
                          value={inputs[questionIndex][answerIndex]}
                          disabled={confirmedQuestions[questionIndex]}
                          onChange={(event) => onChangeAnswer(questionIndex, answerIndex, event.target.value)}
                          className="h-11 w-[96px] rounded-none border-2 border-foreground/25 bg-background px-2 text-center font-montserrat text-base font-semibold text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)] disabled:cursor-not-allowed disabled:border-foreground/15 disabled:bg-foreground/10 disabled:text-foreground/65 md:h-12 md:w-[140px] md:px-3 md:text-lg"
                          aria-label={`${t.levelTest.question} ${question.id} - ${t.levelTest.confirm}`}
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
                      className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[1rem] border-2 border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] px-4 py-3 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-background transition-colors active:opacity-80 md:min-h-0 md:w-auto md:py-2 md:text-sm"
                    >
                      <Check className="h-4 w-4" />
                      {t.levelTest.confirm}
                    </button>
                  ) : (
                    <p className="font-montserrat text-xs uppercase tracking-[0.08em] text-[hsl(71_33%_23%)] md:text-sm">
                      {t.levelTest.confirmed}
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
                    {t.levelTest.correctAnswer}: {question.answers.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>

          {!allQuestionsConfirmed && (
            <p className="mt-5 font-montserrat text-sm text-foreground/65 md:mt-6">
              {t.levelTest.helperText}
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
                className="inline-flex min-h-[56px] w-full items-center justify-center rounded-[1.1rem] border-2 border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] px-8 py-4 font-montserrat text-base font-semibold uppercase tracking-[0.08em] text-background transition-colors active:opacity-80 md:w-auto"
              >
                {t.levelTest.check}
              </button>

              {submitted && (
                <p className="font-main text-3xl text-[hsl(0_82%_18%)] md:text-4xl">
                  {t.levelTest.result}: {score.ok}/{score.total}
                </p>
              )}
            </div>
          )}

          {submitted && (
            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="mt-4 inline-flex min-h-[56px] w-full items-center justify-center rounded-[1.1rem] border-2 border-[hsl(0_82%_18%)] bg-[hsl(0_82%_18%)] px-7 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-background transition-colors active:opacity-80 md:mt-6 md:w-auto"
            >
              {t.levelTest.sendResult}
            </button>
          )}
        </section>
      </main>

      {submitted && isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/55 px-0 py-0 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-6">
          <section className="max-h-[90svh] w-full max-w-xl overflow-y-auto rounded-t-[1.4rem] border-0 border-foreground/25 bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-[1.5rem] sm:border-2 sm:p-5 sm:pb-5 md:p-7">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-main text-[2rem] font-bold leading-[0.9] text-foreground sm:text-[2.35rem] md:text-5xl">
                  {t.levelTest.modalTitle}
                </h2>
                <p className="mt-3 max-w-2xl font-montserrat text-[0.92rem] leading-snug text-foreground/75 sm:text-sm md:text-base">
                  {t.levelTest.modalDesc}
                </p>
                <p className="mt-3 inline-flex items-center border border-[hsl(0_82%_18%/0.3)] bg-[hsl(0_82%_18%/0.06)] px-3 py-1 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-[hsl(0_82%_18%)]">
                  {t.levelTest.modalResult}: {score.ok}/{score.total}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/30 font-montserrat text-xl text-foreground/70 transition-colors hover:bg-foreground hover:text-background"
                aria-label={t.levelTest.close}
              >
                ×
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:mt-6">
              <input
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                className="h-12 w-full rounded-none border-2 border-foreground/30 bg-background px-3 font-montserrat text-base text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)]"
                placeholder={t.levelTest.namePlaceholder}
                aria-label={t.levelTest.namePlaceholder}
              />
              <input
                value={phoneOrTelegram}
                onChange={(event) => setPhoneOrTelegram(event.target.value)}
                className="h-12 w-full rounded-none border-2 border-foreground/30 bg-background px-3 font-montserrat text-base text-foreground outline-none transition-colors focus:border-[hsl(0_82%_18%)]"
                placeholder={t.levelTest.contactPlaceholder}
                aria-label={t.levelTest.contactPlaceholder}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={sendResults}
                disabled={!canSendResults || isSending}
                className={`inline-flex min-h-[54px] w-full items-center justify-center border-2 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.08em] transition-colors active:opacity-80 sm:w-auto sm:px-7 ${
                  canSendResults
                    ? "border-[hsl(71_33%_23%)] bg-[hsl(71_33%_23%)] text-background disabled:cursor-not-allowed disabled:border-foreground/30 disabled:bg-foreground/15 disabled:text-foreground/50"
                    : "cursor-not-allowed border-foreground/30 bg-foreground/15 text-foreground/50"
                }`}
              >
                {isSending ? t.levelTest.submitting : t.levelTest.submit}
              </button>
              {!canSendResults && (
                <p className="font-montserrat text-sm text-foreground/65">
                  {t.levelTest.contactHint}
                </p>
              )}
              {sendStatus === "success" && (
                <p className="font-montserrat text-sm text-[hsl(71_33%_23%)]">
                  {t.levelTest.success}
                </p>
              )}
              {sendStatus === "error" && (
                <p className="font-montserrat text-sm text-[hsl(0_82%_18%)]">
                  {t.levelTest.error}: {sendError}
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
