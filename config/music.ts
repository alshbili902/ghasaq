export interface MusicSourceConfig {
  id: string;
  label: string;
  channelName: string;
  youtubeVideoId: string;
  watchUrl: string;
  embedUrl: string;
  verifiedViaOEmbed: boolean;
}

export interface LocalAudioConfig {
  /** Public URL path resolved by the browser */
  src: string;
  /** Exact filesystem path inside the Next.js workspace */
  expectedFilePath: string;
  mimeType: string;
}

export const musicConfig = {
  invitationCopy: {
    introLine: "إلى سوسو، بكلّ الحب",
    heading: "هل تسمحين لي أن أُهديكِ هذه الأغنية؟",
    supportingMessage:
      "هناك أغانٍ لا نختارها عبثًا، بل لأنها تقول شيئًا تعجز الكلمات عن قوله. وهذه واحدة منها، اخترتُها لكِ، وأتمنى أن تجد في قلبكِ مكانًا جميلًا.",
    songTitleAndArtist: "فاكر — إليسا",
    primaryAction: "لنستمع إليها معًا",
    secondaryAction: "سأستمع إليها لاحقًا",
  },
  song: {
    title: "فاكر",
    artist: "إليسا",
    album: "أسعد واحدة",
    localAudio: {
      src: "/audio/elissa-faker.mp3",
      expectedFilePath: "public/audio/elissa-faker.mp3",
      mimeType: "audio/mpeg",
    } satisfies LocalAudioConfig,
    /**
     * Verified official YouTube sources confirmed via YouTube oEmbed API
     * (retained for the songs library collection):
     */
    primarySource: {
      id: "elissa-official-audio",
      label: "النسخة الرسمية — قناة إليسا",
      channelName: "Elissa Official",
      youtubeVideoId: process.env.NEXT_PUBLIC_FAKER_YOUTUBE_ID || "f7mgm_sRdaA",
      watchUrl: "https://www.youtube.com/watch?v=f7mgm_sRdaA",
      embedUrl: "https://www.youtube.com/embed/f7mgm_sRdaA",
      verifiedViaOEmbed: true,
    } satisfies MusicSourceConfig,
    alternateSource: {
      id: "rotana-lyrics-video",
      label: "فيديو الكلمات الرسمي — روتانا",
      channelName: "Rotana",
      youtubeVideoId: "zp5wgtm9uHI",
      watchUrl: "https://www.youtube.com/watch?v=zp5wgtm9uHI",
      embedUrl: "https://www.youtube.com/embed/zp5wgtm9uHI",
      verifiedViaOEmbed: true,
    } satisfies MusicSourceConfig,
  },
  storageKey: "soso_music_invitation_session_v1",
} as const;
