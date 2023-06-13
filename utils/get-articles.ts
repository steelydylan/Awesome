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

export const getFilteredArticles = async ({
  current,
  categoryId,
  tagId,
}: {
  current: number;
  categoryId?: string;
  tagId?: string;
}) => {
  const articles = await getArticles();
  const results = articles
    .filter(({ data }) => {
      if (!categoryId) {
        return true;
      }
      return data.category === categoryId;
    })
    .filter(({ data }) => {
      if (!tagId) {
        return true;
      }
      return data.tags.some((t) => t === tagId);
    })
    .sort((articleA, articleB) => {
      if (articleA.data.date > articleB.data.date) {
        return -1;
      }
      return 1;
    })
    .slice(
      current * blogConfig.article.articlesPerPage,
      current * blogConfig.article.articlesPerPage +
        blogConfig.article.articlesPerPage
    )
    .map((article) => {
      const { content, ...others } = article;
      return others;
    });
  return results;
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
  return getArticleFromFile(slug);
};
