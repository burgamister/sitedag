import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "ru" | "en";

export type Translations = {
  header: {
    navAbout: string;
    navLearning: string;
    navContacts: string;
    langToggle: string;
  };
  hero: {
    cta: string;
    ctaBlock: string;
    click: string;
  };
  about: {
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    desc: string;
    cta: string;
  };
  whyUs: {
    title: string;
    titleHighlight: string;
    cards: Array<{ title: string; text: string }>;
  };
  prices: {
    title: string;
    individual: string;
    group: string;
  };
  signUp: string;
  courses: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    priceLabel: string;
    features: string[];
  }>;
  contacts: {
    address: string;
    email: string;
    phone: string;
    telegram: string;
    inst: string;
  };
  levelTestIntro: {
    text: string;
    fullGas: string;
    quickContact: string;
    modalTitle: string;
    modalDesc: string;
    namePlaceholder: string;
    contactPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    close: string;
  };
  levelTest: {
    badge: string;
    title: string;
    question: string;
    confirm: string;
    confirmed: string;
    correctAnswer: string;
    helperText: string;
    check: string;
    result: string;
    sendResult: string;
    modalTitle: string;
    modalDesc: string;
    modalResult: string;
    namePlaceholder: string;
    contactPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    fillError: string;
    sendError: string;
    contactHint: string;
    close: string;
  };
  footer: {
    address: string;
    email: string;
    phone: string;
  };
};

const ru: Translations = {
  header: {
    navAbout: "О НАС",
    navLearning: "ОБУЧЕНИЕ",
    navContacts: "КОНТАКТЫ",
    langToggle: "EN",
  },
  hero: {
    cta: "хочу научиться",
    ctaBlock: "говорить по-английски",
    click: "[нажми]",
  },
  about: {
    titleStart: "Дагинглиш",
    titleHighlight: "- английский",
    titleEnd: "легко и с юмором",
    desc: "Уютные уроки с живой практикой, удобным расписанием и теплой поддержкой преподавателя.",
    cta: "записаться",
  },
  whyUs: {
    title: "почему",
    titleHighlight: "Дагинглиш?",
    cards: [
      {
        title: "атмосфера\nкак дома",
        text: "У нас на уроках Вы чувствуете себя как дома. Можем чай попить, фильмы посмотерть. Главное много не наглеть!",
      },
      {
        title: "упор на\nпрактику",
        text: "Уроки проводятся на английском языке, чтоб Вы привыкали к языку. Если не понимаете о чем речь - смело спрашивайте у учителя.",
      },
    ],
  },
  prices: {
    title: "Занятия",
    individual: "индивидуально",
    group: "группа",
  },
  courses: [
    {
      id: "individual",
      title: "Индивидуально",
      subtitle: "Максимум внимания и программа под ваши цели",
      description:
        "Подходит, если нужен быстрый прогресс, гибкое расписание и прицельная работа над слабыми зонами.",
      price: "2 000 ₽",
      priceLabel: "за занятие",
      features: [
        "Персональный план обучения",
        "Гибкий график занятий",
        "Урок 60 минут + домашняя практика",
        "Регулярная обратная связь от преподавателя",
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
      features: [
        "3 занятия в неделю",
        "До 6 человек в группе",
        "Разговорные задания на каждом занятии",
        "Мини-тесты и контроль прогресса",
      ],
    },
  ],
  signUp: "записаться",
  contacts: {
    address: "Улица Ирчи Казака, 48, 4 этаж",
    email: "dagenglish@mail.ru",
    phone: "+7 (960) 409 99 05",
    telegram: "telegram",
    inst: "inst",
  },
  levelTestIntro: {
    text: "Для того, чтобы мы максимально точно могли определить уровень, пройдите наш тест, пожалуйста - это быстро. Не переживайте о правильности ответов и не бойтесь ошибиться - чем честнее ответы, тем лучше мы поймем, как добиться с Вами максимального результата.",
    fullGas: "Все, полный газ",
    quickContact: "Особо времени тоже нету, давай я цифры скину - цинканите мне",
    modalTitle: "оставьте контакт",
    modalDesc: "Напишите имя и телефон или Telegram. Мы с Вами свяжемся.",
    namePlaceholder: "Имя",
    contactPlaceholder: "Телефон или Telegram",
    submit: "оставить контакт",
    submitting: "отправка...",
    success: "Заявка отправлена.",
    error: "Ошибка",
    close: "Закрыть",
  },
  levelTest: {
    badge: "тест уровня",
    title: "заполните пропуски",
    question: "вопрос",
    confirm: "подтвердить",
    confirmed: "ответ подтвержден",
    correctAnswer: "Правильный ответ",
    helperText: "Ответьте на текущий вопрос и нажмите на галочку, чтобы открыть следующий. Если не знаете, напишите что хотите.",
    check: "проверить",
    result: "результат",
    sendResult: "отправить результат нам",
    modalTitle: "отправить результат нам",
    modalDesc: "Оставьте контакт, отправьте результаты и мы свяжемся с Вами.",
    modalResult: "результат",
    namePlaceholder: "Имя",
    contactPlaceholder: "Телефон или Telegram",
    submit: "отправить результат",
    submitting: "отправка...",
    success: "Заявка отправлена. Мы свяжемся с вами и подберем группу.",
    error: "Не удалось отправить заявку",
    fillError: "Заполните все пропуски перед подтверждением.",
    sendError: "Ошибка отправки",
    contactHint: "Укажите хотя бы один контакт для отправки.",
    close: "Закрыть",
  },
  footer: {
    address: "Улица Ирчи Казака, 48, 4 этаж",
    email: "dagenglish@mail.ru",
    phone: "+7 (960) 409 99 05",
  },
};

const en: Translations = {
  header: {
    navAbout: "ABOUT",
    navLearning: "COURSES",
    navContacts: "CONTACTS",
    langToggle: "RU",
  },
  hero: {
    cta: "i want to learn",
    ctaBlock: "to speak english",
    click: "[click]",
  },
  about: {
    titleStart: "DagEnglish",
    titleHighlight: "- english",
    titleEnd: "easily and with humor",
    desc: "Cozy lessons with live practice, flexible schedule and warm teacher support.",
    cta: "sign up",
  },
  whyUs: {
    title: "why",
    titleHighlight: "DagEnglish?",
    cards: [
      {
        title: "home-like\natmosphere",
        text: "In our lessons you feel at home. We can drink tea, watch movies. Just don't get too cheeky!",
      },
      {
        title: "focus on\npractice",
        text: "Lessons are conducted in English so you get used to the language. If you don't understand something, feel free to ask the teacher.",
      },
    ],
  },
  prices: {
    title: "Lessons",
    individual: "individual",
    group: "group",
  },
  courses: [
    {
      id: "individual",
      title: "Individual",
      subtitle: "Maximum attention and a program tailored to your goals",
      description:
        "Perfect if you need fast progress, a flexible schedule and targeted work on weak areas.",
      price: "2 000 ₽",
      priceLabel: "per lesson",
      features: [
        "Personal learning plan",
        "Flexible class schedule",
        "60 min lesson + home practice",
        "Regular feedback from teacher",
      ],
    },
    {
      id: "group",
      title: "Group",
      subtitle: "Dynamic format with speaking practice",
      description:
        "Perfect if you prefer learning in a team, speaking more and getting motivation from the group.",
      price: "8 000 ₽",
      priceLabel: "per month",
      features: [
        "3 lessons per week",
        "Up to 6 people per group",
        "Speaking tasks every lesson",
        "Mini-tests and progress tracking",
      ],
    },
  ],
  signUp: "sign up",
  contacts: {
    address: "Irchi Kazaka Street, 48, 4th floor",
    email: "dagenglish@mail.ru",
    phone: "+7 (960) 409 99 05",
    telegram: "telegram",
    inst: "instagram",
  },
  levelTestIntro: {
    text: "For us to accurately determine your level, please take our test — it's quick. Don't worry about correct answers or making mistakes — the more honest your answers, the better we'll understand how to achieve maximum results with you.",
    fullGas: "Full speed ahead",
    quickContact: "No time for that, let me drop my contacts — hit me up",
    modalTitle: "leave a contact",
    modalDesc: "Write your name and phone or Telegram. We'll get in touch.",
    namePlaceholder: "Name",
    contactPlaceholder: "Phone or Telegram",
    submit: "leave contact",
    submitting: "sending...",
    success: "Request sent.",
    error: "Error",
    close: "Close",
  },
  levelTest: {
    badge: "level test",
    title: "fill in the blanks",
    question: "question",
    confirm: "confirm",
    confirmed: "answer confirmed",
    correctAnswer: "Correct answer",
    helperText: "Answer the current question and click the checkmark to unlock the next one. If you don't know, just write anything.",
    check: "check",
    result: "result",
    sendResult: "send us the result",
    modalTitle: "send us the result",
    modalDesc: "Leave a contact, send the results and we'll get in touch.",
    modalResult: "result",
    namePlaceholder: "Name",
    contactPlaceholder: "Phone or Telegram",
    submit: "send result",
    submitting: "sending...",
    success: "Request sent. We'll contact you and find a group.",
    error: "Failed to send request",
    fillError: "Fill in all blanks before confirming.",
    sendError: "Send error",
    contactHint: "Provide at least one contact to send.",
    close: "Close",
  },
  footer: {
    address: "Irchi Kazaka Street, 48, 4th floor",
    email: "dagenglish@mail.ru",
    phone: "+7 (960) 409 99 05",
  },
};

type LanguageContextType = {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("dagenglish-lang") : null;
    return saved === "en" ? "en" : "ru";
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "ru" ? "en" : "ru";
      localStorage.setItem("dagenglish-lang", next);
      return next;
    });
  }, []);

  const t = language === "ru" ? ru : en;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};
