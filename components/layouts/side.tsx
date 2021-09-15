import Link from "next/link";
import { SubTitle } from "@/components/texts";
import blogConfig from "@/blog.config";
import { Profile } from "../sides/profile";
import { CategoryList } from "../common/category-list";
import { TagList } from "../common/tag-list";

export const Side: React.VFC = () => (
  <div className="side">
    <Profile />
    <div className="category-list-wrap">
      <CategoryList />
    </div>
    <SubTitle>TAG</SubTitle>
    <TagList tags={blogConfig.tags} />
    <style jsx>
      {`
        .side {
          flex-basis: 340px;
        }
        .category-list-wrap {
          margin-bottom: 30px;
        }
      `}
    </style>
  </div>
);
