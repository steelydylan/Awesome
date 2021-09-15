import blogConfig from "@/blog.config";

export const getTagList = (tags: string[]) => {
  return tags.map((t) => blogConfig.tags.find((ta) => ta.id === t));
};
