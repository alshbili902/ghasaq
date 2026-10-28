export interface SongLocalAudioSource {
  /** Public URL path served by Next.js from public/audio */
  src: string;
  /** Exact filesystem path inside the project */
  expectedFilePath: string;
  /** Audio MIME type */
  mimeType: string;
}

export interface RomanticSongItem {
  id: string;
  title: string;
  artist: string;
  displayTitleAndArtist: string;
  isEnglishTitle: boolean;
  arabicCaption: string;
  poeticSubtitle: string;
  moodBadge: string;
  localAudio: SongLocalAudioSource;
  artworkUrl: string;
  releaseNote: string;
}

export const romanticSongs: readonly RomanticSongItem[] = [
  {
    id: "adele-love-song",
    title: "Love Song",
    artist: "Adele",
    displayTitleAndArtist: "Love Song — Adele",
    isEnglishTitle: true,
    poeticSubtitle: "حين يصبحُ الحضورُ وحدهُ وطنًا وأمانًا",
    arabicCaption:
      "لأنّ بعضَ الأرواحِ حين تحضرُ يهدأُ معها كلُّ شيء، وتغدو الدّنيا أوسعَ وأحنّ. هذه الأغنيةُ بصوتِ أديل الدّافئِ تشبهُ ذلك الشّعورَ الهادئَ بأنّكِ مهما ابتعدتِ أو انشغلتِ، تظلّينَ الشّيءَ الأجملَ والأصدقَ في القلب.",
    moodBadge: "حنينٌ دافئ",
    localAudio: {
      src: "/audio/adele-love-song.mp3",
      expectedFilePath: "public/audio/adele-love-song.mp3",
      mimeType: "audio/mpeg",
    },
    artworkUrl: "https://i.ytimg.com/vi/0wPhbmeNSOs/hqdefault.jpg",
    releaseNote: "من ألبوم 21 — النّسخة الرّسميّة",
  },
  {
    id: "shawn-mendes-treat-you-better",
    title: "Treat You Better",
    artist: "Shawn Mendes",
    displayTitleAndArtist: "Treat You Better — Shawn Mendes",
    isEnglishTitle: true,
    poeticSubtitle: "لأنّكِ تستحقّينَ دائمًا الأجملَ والأكرمَ والأصدق",
    arabicCaption:
      "اخترتُها لتذكّركِ دائمًا بأنّكِ تستحقّينَ من الحياةِ ومن نفسكِ معاملةً تليقُ برقّةِ قلبكِ؛ ألّا تقسي على روحكِ، وألّا تقبلي بأقلَّ من الطّمأنينةِ والتّقديرِ واللّطفِ في كلِّ تفاصيلِ أيّامكِ.",
    moodBadge: "تقديرٌ وعهد",
    localAudio: {
      src: "/audio/shawn-mendes-treat-you-better.mp3",
      expectedFilePath: "public/audio/shawn-mendes-treat-you-better.mp3",
      mimeType: "audio/mpeg",
    },
    artworkUrl: "https://i.ytimg.com/vi/lY2yjAdbvdQ/hqdefault.jpg",
    releaseNote: "من ألبوم Illuminate — النّسخة الرّسميّة",
  },
  {
    id: "ali-kakooli-wala-saaba",
    title: "ولا صعبة",
    artist: "علي كاكولي",
    displayTitleAndArtist: "ولا صعبة — علي كاكولي",
    isEnglishTitle: false,
    poeticSubtitle: "عذوبةُ اللّحنِ الخليجيّ حين يبوحُ بصدقِ المودّة",
    arabicCaption:
      "أغنيةٌ تحملُ في لحنها وكلماتها دفئًا قريبًا من الرّوح، تقولُ ببساطةٍ وصدقٍ إنّ الأشياءَ الصّادقةَ لا تحتاجُ إلى تكلّف، وإنّ مكانكِ في القلبِ محفوظٌ بتفاصيلهِ الصّغيرةِ التي لا تُنسى.",
    moodBadge: "شجنٌ عذب",
    localAudio: {
      src: "/audio/ali-kakooli-wala-saaba.mp3",
      expectedFilePath: "public/audio/ali-kakooli-wala-saaba.mp3",
      mimeType: "audio/mpeg",
    },
    artworkUrl: "https://i.ytimg.com/vi/RZNlJSER2fI/hqdefault.jpg",
    releaseNote: "الإصدارُ الرّسمي — ألحان عبد العزيز الويس",
  },
  {
    id: "elissa-faker",
    title: "فاكر",
    artist: "إليسا",
    displayTitleAndArtist: "فاكر — إليسا",
    isEnglishTitle: false,
    poeticSubtitle: "إهداءُ الزّيارةِ الأولى — الأغنيةُ التي تقولُ ما تعجزُ عنهُ الكلمات",
    arabicCaption:
      "هناك أغانٍ لا نختارها عبثًا، بل لأنّها تلمسُ وترًا خفيًّا في الوجدان. «فاكر» هي الأغنيةُ التي تستقبلكِ في عتبةِ هذا العالم، وتبقى هنا في ركنِ أغانيكِ متى أردتِ العودةَ إلى دفءِ لحنها.",
    moodBadge: "إهداءٌ خاصّ",
    localAudio: {
      src: "/audio/elissa-faker.mp3",
      expectedFilePath: "public/audio/elissa-faker.mp3",
      mimeType: "audio/mpeg",
    },
    artworkUrl: "https://i.ytimg.com/vi/f7mgm_sRdaA/hqdefault.jpg",
    releaseNote: "من ألبوم أسعد وحدة — النّسخة الصّوتيّة الرّسميّة",
  },
] as const;
