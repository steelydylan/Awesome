import blogConfig from "@/blog.config";
import { getArticles } from "@/utils/get-articles";
import { ApiHandler, createRouter, validate } from "next-zod-router";
import { z } from "zod";

const getValidation = {
  query: z.object({
    current: z.number(),
    tagId: z.string().optional(),
    categoryId: z.string().optional(),
  }),
  res: z.object({
    articles: z.array(
      z.object({
        content: z.string().optional(),
        data: z.object({
          title: z.string(),
          date: z.string(),
          category: z.string(),
          writtenBy: z.string(),
          tags: z.array(z.string()).optional(),
          thumbnail: z.string().optional(),
          description: z.string().optional(),
          original: z.boolean().optional(),
          hideThumbnail: z.boolean().optional(),
          status: z.string().optional(),
        }),
        permalink: z.string(),
        slug: z.string().optional(),
        id: z.string(),
        excerpt: z.string(),
        related: z.array(z.string()),
      })
    ),
  }),
};

/* Routing */
const router = createRouter();

router.get(validate(getValidation), async (req, res) => {
  const { current, categoryId, tagId } = req.query;
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
  res.status(200).json({ articles: results });
});

export type GetHandler = ApiHandler<typeof getValidation>;

/* Routing handling export */
export default router.run();
