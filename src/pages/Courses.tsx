import { useNavigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, CalendarDays, Clock3, MessageCircle, Target, UserRound, Users } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

type CourseFeature = {
  text: string;
  icon: LucideIcon;
};

const courses: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceLabel: string;
  icon: LucideIcon;
  features: CourseFeature[];
}[] = [
  {
    id: "individual",
    title: "Индивидуально",
    subtitle: "Максимум внимания и программа под ваши цели",
    description:
      "Подходит, если нужен быстрый прогресс, гибкое расписание и прицельная работа над слабыми зонами.",
    price: "2 000 ₽",
    priceLabel: "за занятие",
    icon: UserRound,
    features: [
      { text: "Персональный план обучения", icon: Target },
      { text: "Гибкий график занятий", icon: CalendarDays },
      { text: "Урок 60 минут + домашняя практика", icon: Clock3 },
      { text: "Регулярная обратная связь от преподавателя", icon: MessageCircle },
    ],
  },
  {
    id: "group",
    title: "С группой",
    subtitle: "Живой формат с динамикой и разговорной практикой",
    description:
      "Подходит, если вам комфортнее учиться в команде, говорить больше и получать мотивацию от группы.",
    price: "8 000 ₽",
    priceLabel: "в месяц",
    icon: Users,
    features: [
      { text: "3 занятия в неделю", icon: CalendarDays },
      { text: "До 6 человек в группе", icon: Users },
      { text: "Разговорные задания на каждом занятии", icon: MessageCircle },
      { text: "Мини-тесты и контроль прогресса", icon: BadgeCheck },
    ],
  },
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100svh] bg-background px-4 pb-20 pt-28 sm:px-5 md:px-6 md:pb-28 md:pt-32">
      <Header />
      <section className="mx-auto max-w-6xl">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
        {courses.map((course) => {
          const Icon = course.icon;
          const isIndividual = course.id === "individual";
          const accentTextClass = isIndividual ? "text-[hsl(0_82%_18%)]" : "text-[hsl(71_33%_23%)]";
          const accentSoftClass = isIndividual ? "bg-[hsl(0_82%_18%/0.1)]" : "bg-[hsl(71_33%_23%/0.12)]";
          const buttonClass = isIndividual
            ? "bg-[hsl(0_82%_18%)] hover:bg-[hsl(0_82%_18%/0.88)]"
            : "bg-[hsl(71_33%_23%)] hover:bg-[hsl(71_33%_23%/0.9)]";

          return (
            <article
              key={course.id}
              className="group relative overflow-hidden rounded-[1.5rem] border-2 border-foreground/15 bg-background p-5 transition-colors duration-300 hover:border-foreground/35 md:rounded-[2rem] md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(135deg,transparent,transparent_14px,hsl(71_33%_23%/0.08)_15px,hsl(71_33%_23%/0.08)_16px)]"
              />

              <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
                <div className="pr-2">
                  <h2 className={`font-main text-[2.35rem] font-bold leading-[0.9] tracking-[-0.03em] md:text-5xl ${accentTextClass}`}>
                    {course.title}
                  </h2>
                  <p className="mt-2 font-montserrat text-sm text-foreground/70 md:text-base">
                    {course.subtitle}
                  </p>
                </div>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/20 md:h-14 md:w-14 ${accentSoftClass}`}>
                  <Icon className={`h-7 w-7 ${accentTextClass}`} />
                </div>
              </div>

              <p className="relative z-10 mb-6 font-montserrat text-sm leading-relaxed text-foreground/80 md:text-base">
                {course.description}
              </p>

              <ul className="relative z-10 mb-8 space-y-3">
                {course.features.map((item) => {
                  const FeatureIcon = item.icon;
                  return (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center ${accentSoftClass} ${accentTextClass}`}>
                        <FeatureIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-montserrat text-sm text-foreground/80 md:text-base">{item.text}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="relative z-10 flex flex-col gap-5 border-t border-foreground/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-montserrat text-xs uppercase tracking-wide text-foreground/55">{course.priceLabel}</p>
                  <p className={`font-main text-4xl font-bold leading-none md:text-5xl ${accentTextClass}`}>{course.price}</p>
                </div>
                <Button onClick={() => navigate("/level-test-intro")} className={`group/button min-h-[52px] w-full gap-2 rounded-[1rem] px-5 py-2.5 text-white sm:w-auto ${buttonClass}`}>
                  Записаться
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                </Button>
              </div>
            </article>
          );
        })}
        </div>
      </section>
    </div>
  );
};

export default Courses;
