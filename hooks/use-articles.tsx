import blogConfig from "@/blog.config";
import { Article } from "@/types";
import { useClientSWR } from "next-zod-router/swr";

export const useArticles = ({
  categoryId,
  tagId,
  current,
  defaultArticles,
}: {
  current: number;
  categoryId?: string;
  tagId?: string;
  defaultArticles: Article[];
}) => {
  if (blogConfig.use !== "notion") {
    return {
      articles: defaultArticles,
      isLoading: false,
      isError: false,
    };
  }
  const { data, error } = useClientSWR("/api/notion/articles", {
    query: {
      categoryId,
      tagId,
      current: `${current}`,
    },
  });
  return {
    articles: (data?.articles ?? defaultArticles) as Article[],
    isLoading: !error && !data,
    isError: error,
  };
};
