import blogConfig from "@/blog.config";
import Link from "next/link";
import { SubTitle } from "../texts";

export const CategoryList = () => {
  return (
    <>
      <SubTitle>{blogConfig.widgets.categoryList.title}</SubTitle>
      <ul className="category-nav">
        {blogConfig.categories.map((category) => (
          <li key={category.id} className="category-item">
            <Link href={`/${category.id}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          .category-nav {
            list-style-type: none;
            padding: 0;
          }
          .category-item {
            border-bottom: 1px solid #dbdbdb;
            padding-top: 20px;
            padding-bottom: 20px;
            position: relative;
          }
          .category-item:first-child {
            border-top: 1px solid #dbdbdb;
          }
          .category-item:after {
            content: "";
            display: block;
            width: 20px;
            height: 20px;
            background: var(--c-primary);
            border-radius: 50%;
            position: absolute;
            right: 5px;
            top: 50%;
            margin-top: -10px;
          }
          .category-item :global(a) {
            margin-top: -20px;
            margin-bottom: -20px;
            padding-top: 20px;
            padding-bottom: 20px;
            display: block;
            position: relative;
          }
          .category-item :global(a):before {
            content: "";
            position: absolute;
            right: 10px;
            top: calc(50% - 2px);
            margin-top: -2px;
            width: 8px;
            height: 2px;
            transform: rotate(45deg);
            z-index: 1;
            display: block;
            background-color: #fff;
          }
          .category-item :global(a):after {
            content: "";
            position: absolute;
            right: 10px;
            top: calc(50% + 3px);
            margin-top: -2px;
            width: 8px;
            height: 2px;
            transform: rotate(-45deg);
            z-index: 1;
            display: block;
            background-color: #fff;
          }
        `}
      </style>
    </>
  );
};
