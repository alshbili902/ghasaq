export const siteConfig = {
  name: "عالم سوسو الأدبي — من دحوم إلى سوسو",
  shortName: "إلى سوسو",
  description:
    "مساحة أدبية هادئة وخاصة كُتبت بكل الحب من دحوم إلى سوسو؛ ليلٌ هادئ وكلماتٌ حانية تذكّركِ بأنكِ لستِ مطالبةً بأن تكوني بخيرٍ في كلّ حين.",
  themeColor: "#35111F",
  backgroundColor: "#35111F",
  locale: "ar",
  direction: "rtl" as const,
  /**
   * Optional canonical site URL. Set NEXT_PUBLIC_SITE_URL in the deployment environment
   * once the final domain is known. No domain is assumed or fabricated by default.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  hero: {
    introLine: "إِلَى سُوسُو، بِكُلِّ الحُبّ",
    heading: "يا سوسو، في عتمةِ هذا العالمِ لكِ ضوء",
    paragraph:
      "أعرف أنّ في قلبكِ من الأفكار ما لا يُقال، ومن التعب ما تُخفيه ابتسامتكِ عن العيون. لذلك صنعتُ لكِ هذه المساحة؛ لتكون ليلًا هادئًا تلجئين إليه حين تضجّ الدنيا في رأسكِ، وكلمةً حانيةً تجدينها حين تقسين على نفسكِ، ونافذةً صغيرةً تُذكّركِ بأنّكِ لستِ مطالبةً بأن تكوني بخيرٍ في كلّ حين. هنا، يمكنكِ أن تستريحي من كلّ شيء، وأن تكوني أنتِ، فحسب.",
    signatureQuote: "بعضُ الأشياءِ الجميلةِ لا تُهدى باليد، بل تُكتب بالقلب.",
    signatureAttribution: "من دحوم إلى سوسو",
    primaryButtons: {
      letters: {
        label: "افتحي رسالتكِ",
        href: "/letters",
      },
      library: {
        label: "إلى عالمكِ الجميل",
        href: "/library",
      },
    },
  },
} as const;
