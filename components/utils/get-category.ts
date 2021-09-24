import blogConfig from "@/blog.config";

export const getCategory = (slug: string) => {
  const category = blogConfig.categories.find((c) => c.id === slug);
  if (!category) {
    return null;
  }
  return category;
};
