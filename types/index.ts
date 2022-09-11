export type ArticleData = {
  title: string;
  date: string;
  category: string;
  writtenBy: string;
  tags?: string[];
  thumbnail?: string;
  description?: string;
  original?: boolean;
  hideThumbnail?: boolean;
  status?: "open" | "draft" | "close";
};

export type Tag = {
  id: string;
  title: string;
};

export type Article = {
  content?: string;
  data: ArticleData;
  permalink: string;
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
};
