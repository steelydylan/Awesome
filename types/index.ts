export type ArticleData = {
  title: string;
  date: string;
  category: string;
  writtenBy: string;
  tags?: string[];
  thumbnail?: string;
  description?: string;
  status?: "open" | "draft" | "close";
};

export type Tag = {
  id: string;
  title: string;
};

export type Article = {
  content: string;
  data: ArticleData;
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
