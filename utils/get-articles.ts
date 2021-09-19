import { Article } from "@/types/";

export const getArticles = (): Article[] => {
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
        slug,
      };
    });
    return data;
    // @ts-ignore
  })(require.context("@/contents", true, /\.mdx$/));
  // @ts-ignore
  const uniq = [...new Map(entries.map((item) => [item.slug, item])).values()];
  return uniq;
};
