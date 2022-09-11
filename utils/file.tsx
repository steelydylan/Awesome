import blogConfig from "@/blog.config";
import { Article } from "@/types";
import { renderToString } from "react-dom/server";

export const getArticlesFromFile = () => {
  // Get articles from folder
  const entries = ((ctx: any) => {
    const keys = ctx.keys();
    const values = keys.map(ctx);
    const data = keys.map((key, index) => {
      // Create slug from filename
      const paths = key.split("/");
      paths.pop();
      const slug = paths.pop();
      const { default: content, ...extra } = values[index];
      // Parse document
      return {
        content,
        data: extra,
        permalink: `${blogConfig.siteUrl}/${extra.category}/${slug}`,
        slug,
      };
    });
    return data;
    // @ts-ignore
  })(require.context("@/contents", true, /\.mdx$/));
  const uniq = [
    // @ts-ignore
    ...new Map<string, Article>(
      entries.map((item) => [item.slug, item])
    ).values(),
  ];
  return uniq.filter((u) => {
    if (u.data.status === "open" || !u.data.status) {
      return true;
    }
    if (u.data.status === "draft" && process.env.NODE_ENV === "development") {
      return true;
    }
    return false;
  });
};

export const getArticleFromFile = async (slug: string) => {
  const article = await import(`@/contents/${slug}/index.mdx`);
  const { default: Default, ...data } = article;
  const articles = await getArticlesFromFile();
  const { related } = data;

  return {
    article: {
      content: renderToString(<Default />),
      data,
      permalink: `${blogConfig.siteUrl}/${data.category}/${slug}`,
      slug,
    } as Article,
    related: related
      ? articles
          .filter((p) => {
            return related.some((r) => r === p.slug);
          })
          .map((r) => {
            const { content, ...d } = r;
            return d;
          })
      : [],
  };
};
