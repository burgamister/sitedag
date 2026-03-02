import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  MessageCircle,
  Sparkles,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type CourseFeature = {
  text: string;
  icon: LucideIcon;
};

type CourseCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceLabel: string;
  icon: LucideIcon;
  features: CourseFeature[];
};

const courses: CourseCard[] = [
  {
    id: "individual",
    title: "Индивидуально",
    subtitle: "Максимум внимания и программа под ваши цели",
    description:
      "Подходит, если нужен быстрый прогресс, гибкое расписание и прицельная работа над слабыми зонами.",
    price: "1 500 ₽",
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
    price: "7 000 ₽",
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

const chooseFormat = [
  {
    title: "Индивидуальный формат",
    points: [
      "У вас плотный график и нужен гибкий тайминг",
      "Нужна целевая подготовка к экзамену или собеседованию",
      "Важно получать максимум внимания преподавателя",
      "Хочется быстрее выйти на новый уровень",
    ],
  },
  {
    title: "Групповой формат",
    points: [
      "Вам важно больше разговорной практики в диалогах",
      "Нужна комфортная цена и стабильный темп занятий",
      "Нравится учиться в мотивирующей среде",
      "Хочется развивать английский через командную работу",
    ],
  },
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 pb-12 pt-28 md:px-6 md:pb-16 md:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-foreground/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 h-10 gap-2 px-3 text-foreground/70 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Назад
          </Button>

          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-3 py-1 font-montserrat text-xs uppercase tracking-[0.14em] text-foreground/70">
              <Sparkles className="h-4 w-4 text-primary" />
              ОБУЧЕНИЕ
            </p>
            <h1 className="font-main text-4xl font-bold tracking-[0.01em] text-foreground md:text-6xl">
              Форматы, которые дают реальный прогресс в английском
            </h1>
            <p className="mt-6 max-w-2xl font-montserrat text-base leading-relaxed text-foreground/75 md:text-lg">
              Выберите удобный формат: индивидуальные занятия для максимальной персонализации
              или обучение в мини-группе для живой практики и мотивации.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-2">
          {courses.map((course) => {
            const Icon = course.icon;

            return (
              <article
                key={course.id}
                className="group rounded-3xl border border-foreground/20 bg-background/85 p-7 shadow-lg shadow-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 md:p-9"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-main text-3xl font-bold tracking-[0.01em] text-foreground md:text-4xl">
                      {course.title}
                    </h2>
                    <p className="mt-2 font-montserrat text-sm text-foreground/70 md:text-base">
                      {course.subtitle}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <p className="mb-6 font-montserrat text-sm leading-relaxed text-foreground/80 md:text-base">
                  {course.description}
                </p>

                <ul className="mb-8 space-y-3">
                  {course.features.map((item) => {
                    const FeatureIcon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                          <FeatureIcon className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-montserrat text-sm text-foreground/80 md:text-base">
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex items-end justify-between border-t border-foreground/15 pt-6">
                  <div>
                    <p className="font-montserrat text-xs uppercase tracking-wide text-foreground/55">
                      {course.priceLabel}
                    </p>
                    <p className="font-main text-4xl font-bold leading-none text-foreground md:text-5xl">
                      {course.price}
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate("/contacts")}
                    className="group/button gap-2 rounded-xl bg-primary px-5 py-2.5 text-white hover:bg-primary/90"
                  >
                    Записаться
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/20 bg-foreground/[0.03] p-7 md:p-10">
          <div className="mb-8 md:mb-10">
            <h2 className="font-main text-3xl font-bold tracking-[0.01em] text-foreground md:text-4xl">
              Как выбрать формат
            </h2>
            <p className="mt-3 max-w-2xl font-montserrat text-sm leading-relaxed text-foreground/70 md:text-base">
              Если не уверены, какой формат подойдет, ориентируйтесь на ваши цели, темп и привычный
              способ обучения.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {chooseFormat.map((format) => (
              <div key={format.title}>
                <h3 className="mb-4 font-main text-2xl font-bold tracking-[0.01em] text-foreground">
                  {format.title}
                </h3>
                <ul className="space-y-3">
                  {format.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 font-montserrat text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-foreground/15 bg-background px-5 py-4">
              <Clock3 className="mb-2 h-5 w-5 text-primary" />
              <p className="font-montserrat text-xs uppercase tracking-wide text-foreground/55">Длительность</p>
              <p className="font-main text-2xl font-bold text-foreground">60 минут</p>
            </div>
            <div className="rounded-2xl border border-foreground/15 bg-background px-5 py-4">
              <Users className="mb-2 h-5 w-5 text-primary" />
              <p className="font-montserrat text-xs uppercase tracking-wide text-foreground/55">Размер группы</p>
              <p className="font-main text-2xl font-bold text-foreground">До 6 человек</p>
            </div>
            <div className="rounded-2xl border border-foreground/15 bg-background px-5 py-4 sm:col-span-2 md:col-span-1">
              <BookOpen className="mb-2 h-5 w-5 text-primary" />
              <p className="font-montserrat text-xs uppercase tracking-wide text-foreground/55">Поддержка</p>
              <p className="font-main text-2xl font-bold text-foreground">Материалы 24/7</p>
                </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
