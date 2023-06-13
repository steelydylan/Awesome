import { getArticleFromNotion } from "@/utils/notion";
import { ApiHandler, createRouter, validate } from "next-zod-router";
import { z } from "zod";

const getValidation = {
  query: z.object({
    slug: z.string(),
  }),
  res: z.object({
    article: z.object({
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
    }),
  }),
};

/* Routing */
const router = createRouter();

router.get(validate(getValidation), async (req, res) => {
  const slug = req.query.slug;
  const { article } = await getArticleFromNotion(slug);
  res.status(200).json({ article });
});

export type GetHandler = ApiHandler<typeof getValidation>;

/* Routing handling export */
export default router.run();
