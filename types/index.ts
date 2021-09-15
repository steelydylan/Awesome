export type EntryData = {
  title: string;
  date: string;
  category: string;
  writtenBy: string;
  tags?: string[];
  thumbnail?: string;
  description?: string;
};

export type Tag = {
  id: string;
  title: string;
};

export type Entry = {
  content: string;
  data: EntryData;
  slug?: string;
  id: string;
  excerpt: string;
  related: string[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  emoji: string;
};
