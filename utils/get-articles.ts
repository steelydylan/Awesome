import blogConfig from "@/blog.config";
import { Article } from "@/types/";
import { getArticlesFromFile, getArticleFromFile } from "./file";
import { getArticleFromNotion, getDatabase } from "./notion";

export const getArticles = async (): Promise<Article[]> => {
  if (blogConfig.use === "notion") {
    return getDatabase(process.env.NOTION_DATABASE_ID as string, {
      sorts: [
        {
          property: "rEYP",
          direction: "descending",
        },
      ],
    });
  }
  return getArticlesFromFile();
};

export const getArticle = async (
  slug: string
): Promise<{
  article: Article;
  related: Article[];
}> => {
  if (blogConfig.use === "notion") {
    return getArticleFromNotion(slug);
  }
  return getArticleFromFile(slug)
};
