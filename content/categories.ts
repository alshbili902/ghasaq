export type LetterCategoryId =
  | "heavy-heart"
  | "study-fatigue"
  | "memory-betrayal"
  | "not-enough"
  | "need-serenity"
  | "before-exam"
  | "after-hard-day"
  | "remember-your-worth"
  | "short-letters-long-days"
  | "no-occasion";

export interface LetterCategory {
  id: LetterCategoryId;
  label: string;
  description: string;
}

export const letterCategories: readonly LetterCategory[] = [
  {
    id: "heavy-heart",
    label: "رسائل حين يثقل القلب",
    description: "كلماتٌ تضع يدها برفقٍ على كتفكِ حين تتزاحم المشاعر دون تفسير.",
  },
  {
    id: "study-fatigue",
    label: "حين تتعبين من الدراسة",
    description: "استراحةٌ صغيرة لعقلكِ المرهق من طول السهر وكثرة الصفحات.",
  },
  {
    id: "memory-betrayal",
    label: "حين تخذلكِ ذاكرتكِ",
    description: "تذكيرٌ صادق بأن ما نسيتِه تحت الضغط لا يمحو صدق سعيِك.",
  },
  {
    id: "not-enough",
    label: "حين تشعرين أنكِ لستِ كافية",
    description: "مرآةٌ منصفة تعيد إليكِ صورتكِ الحقيقية بعيدًا عن قسوة المقارنات.",
  },
  {
    id: "need-serenity",
    label: "حين تحتاجين إلى الطمأنينة",
    description: "نوافذُ من السكينة تهدّئ ضجيج القلق وتعيد للروح اتزانها.",
  },
  {
    id: "before-exam",
    label: "رسائل قبل الاختبار",
    description: "رفقةٌ هادئة تسبق دخولكِ القاعة، لتتذكّري أنكِ أكبر من أي ورقة.",
  },
  {
    id: "after-hard-day",
    label: "رسائل بعد يومٍ صعب",
    description: "ملاذٌ مسائي يغسل عنكِ غبار يومٍ ثقيل ويمنحكِ حقّ الراحة.",
  },
  {
    id: "remember-your-worth",
    label: "رسائل لتذكيركِ بقيمتكِ",
    description: "لأن قيمتكِ أصيلةٌ فيكِ، لا تمنحها درجةٌ ولا ينتقص منها تعثّر.",
  },
  {
    id: "short-letters-long-days",
    label: "رسائل قصيرة لأيامٍ طويلة",
    description: "ومضاتٌ حانية سريعة القراءة للأوقات التي لا تتّسع للكثير من الكلام.",
  },
  {
    id: "no-occasion",
    label: "رسائل بلا مناسبة، سوى أنكِ تستحقينها",
    description: "رسائلُ كُتبت لأن وجودكِ وحده سببٌ كافٍ لقول شيءٍ جميل.",
  },
] as const;

export type ArticleCategoryId =
  | "serenity"
  | "self-compassion"
  | "study-and-exams"
  | "fear-of-failure"
  | "invisible-fatigue"
  | "small-saving-things"
  | "worth-beyond-achievement"
  | "quiet-hope"
  | "letters-to-the-heart"
  | "unscheduled-reflections";

export interface ArticleCategory {
  id: ArticleCategoryId;
  label: string;
  description: string;
}

export const articleCategories: readonly ArticleCategory[] = [
  {
    id: "serenity",
    label: "الطمأنينة",
    description: "تأمّلاتٌ في معنى السكون الداخلي وسط عالمٍ لا يتوقّف عن الركض.",
  },
  {
    id: "self-compassion",
    label: "الرفق بالنفس",
    description: "عن التخلّي عن الجلاد الداخلي وتعلّم مخاطبة الذات بلغةٍ أرحم.",
  },
  {
    id: "study-and-exams",
    label: "الدراسة والاختبارات",
    description: "قراءةٌ إنسانية هادئة لضغوط التعلّم والامتحانات وما وراء الدرجات.",
  },
  {
    id: "fear-of-failure",
    label: "الخوف من الفشل",
    description: "تفكيكُ الرهبة من التعثّر واستعادة الشجاعة في المحاولة دون شروط.",
  },
  {
    id: "invisible-fatigue",
    label: "التعب الذي لا يُرى",
    description: "إنصافٌ لذلك الإرهاق الصامت الذي لا يظهر في الملامح ولا يُقاس بالساعات.",
  },
  {
    id: "small-saving-things",
    label: "الأشياء الصغيرة التي تنقذ يومًا",
    description: "التفاصيلُ البسيطة التي تعيد الدفء إلى الأيام الرمادية.",
  },
  {
    id: "worth-beyond-achievement",
    label: "قيمة الإنسان بعيدًا عن الإنجاز",
    description: "فلسفةُ الكينونة الكاملة التي لا تنتظر شهادةً لتثبت جدارتها بالحياة.",
  },
  {
    id: "quiet-hope",
    label: "الأمل الهادئ",
    description: "أملٌ ناضجٌ وصادق، لا يعدُ بالمستحيل لكنّه يفتح نافذةً للغد.",
  },
  {
    id: "letters-to-the-heart",
    label: "رسائل إلى القلب",
    description: "نصوصٌ وجدانية قريبةٌ من الروح، تُقرأ على مهلٍ في هدأة الليل.",
  },
  {
    id: "unscheduled-reflections",
    label: "خواطر بلا موعد",
    description: "شذراتٌ أدبية وتأمّلاتٌ حرّة كُتبت في لحظاتِ صفاءٍ صادق.",
  },
] as const;

export interface LetterItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  categoryId: LetterCategoryId;
  categoryLabel: string;
  openingSalutation: string;
  paragraphs: string[];
  highlightedQuote: string;
  closingLine: string;
  signature: string;
  readingMinutes: number;
  moodTag: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  pullQuote?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  categoryId: ArticleCategoryId;
  categoryLabel: string;
  readingMinutes: number;
  sections: ArticleSection[];
  quotableLines: string[];
  closingReflection: string;
}

export function getLetterCategoryById(id: LetterCategoryId): LetterCategory | undefined {
  return letterCategories.find((c) => c.id === id);
}

export function getArticleCategoryById(id: ArticleCategoryId): ArticleCategory | undefined {
  return articleCategories.find((c) => c.id === id);
}
