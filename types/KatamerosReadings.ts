type KatamerosReading = {
    sections: Section[];
}

type Verse = {
    id: number;
    bookId: number;
    chapter: number;
    number: number;
    text: string;
  };
  
  type Passage = {
    bookId: number;
    chapter: number;
    ref: string;
    verses: Verse[];
  };
  
  type Reading = {
    id: number;
    title: string | null;
    introduction: string | null;
    conclusion: string | null;
    passages: Passage[];
  };
  
  type SubSection = {
    id: number;
    title: string;
    introduction: string | null;
    readings: Reading[];
  };
  
  type Section = {
    id: number;
    title: string;
    subSections: SubSection[];
  };