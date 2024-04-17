type KatamerosReadingsRAW = {
    sections: {
      id: number;
      title: string;
      introduction: string | null;
      readings: {
        id: number;
        title: string | null;
        introduction: string | null;
        conclusion: string | null;
        passages: {
          bookId: number;
          bookTranslation: string;
          chapter: number;
          ref: string;
          verses: {
            id: number;
            bibleId: number;
            bookId: number;
            chapter: number;
            number: number;
            text: string;
          }[];
        }[];
      }[];
    }[];
}