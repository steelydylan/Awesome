import blogConfig from "@/blog.config";
import { CodeBlock } from "@/components/notion/CodeBlock";
import { Text } from "@/components/notion/Text";

import { Client } from "@notionhq/client";
import {
  QueryDatabaseParameters,
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Fragment } from "react";
import { renderToString } from "react-dom/server";
import { Article } from "../types";
import { uploadToR2 } from "./cloudflare";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (
  databaseId: string,
  args: Omit<QueryDatabaseParameters, "database_id"> = {}
) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    ...args,
  });
  const { results } = response;
  const posts = await Promise.all(
    results.map(async (result: PageObjectResponse) => {
      const d = result.properties;
      const item = {
        thumbnail: "",
        authors: "",
        slug: "",
        published: "no",
        date: "",
        description: "",
        page: "",
        id: result.id,
        category: "",
      };
      await Promise.all(
        Object.keys(d).map(async (key) => {
          const property = d[key];
          if (property.type === "people") {
            item[key.toLowerCase()] = property.people
              .map((p) => (p as any).name)
              .join(",");
          } else if (property.type === "rich_text") {
            item[key.toLowerCase()] = property.rich_text[0]?.plain_text;
          } else if (property.type === "files") {
            if (property.files[0]?.type === "external") {
              item[key.toLowerCase()] = property.files[0].name;
            } else {
              let src = property.files[0]?.file?.url;
              if (src && process.env.CLOUD_FLARE_ACCOUNT_ID) {
                const fileName =
                  result.id +
                  "_" +
                  result.last_edited_time +
                  "_" +
                  src.split("/").pop().replace(/\?.*$/, "");
                try {
                  src = await uploadToR2(src, fileName);
                } catch (e) {
                  console.log(e);
                }
              }
              item[key.toLowerCase()] = src;
            }
          } else if (property.type === "title") {
            item[key.toLowerCase()] = property.title[0]?.plain_text;
          } else if (property.type === "checkbox") {
            item[key.toLowerCase()] = property.checkbox;
          } else if (property.type === "multi_select") {
            item[key.toLowerCase()] = property.multi_select?.[0]?.name;
          } else if (property.type === "select") {
            item[key.toLowerCase()] = property.select?.name;
          } else if (property.type === "date") {
            item[key.toLowerCase()] = property.date?.start;
          }
        })
      );
      // console.log(item)
      return {
        content: "",
        data: {
          tags: [],
          title: item.page,
          date: item.date,
          category: item.category,
          writtenBy: item.authors,
          thumbnail: item.thumbnail,
          id: item.id,
          description: item.description,
          status: item.published ? "open" : "draft",
        },
        permalink: `${blogConfig.siteUrl}/${item.category}/${item.slug}`,
        slug: item.slug,
        id: item.id,
        excerpt: "",
        related: [],
      } as Article;
    })
  );

  return posts;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results as BlockObjectResponse[];
};

const renderBlock = async (block: BlockObjectResponse) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={block.paragraph.rich_text} />
        </p>
      );
    case "code":
      return (
        <CodeBlock text={block.code.rich_text} lang={block.code.language} />
      );
    case "heading_1":
      return (
        <h1>
          <Text text={block.heading_1.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={block.heading_2.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={block.heading_3.rich_text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.rich_text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={block.to_do.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      const blocks = await Promise.all(
        value.children?.map(async (b) => {
          const block = await renderBlock(b);
          return <Fragment key={b.id}>{block}</Fragment>;
        })
      );
      return (
        <details>
          <summary>
            <Text text={block.toggle.rich_text} />
          </summary>
          {blocks}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      // eslint-disable-next-line no-case-declarations
      const image = block[type];
      // eslint-disable-next-line no-case-declarations
      let src = image.type === "external" ? image.external.url : image.file.url;
      // eslint-disable-next-line no-case-declarations
      const caption = image.caption ? image.caption[0]?.plain_text : "";
      if (src && process.env.CLOUD_FLARE_ACCOUNT_ID) {
        const fileName = block.id + "_";
        block.last_edited_time +
          "_" +
          src.split("/").pop().replace(/\?.*$/, "");
        try {
          src = await uploadToR2(src, fileName);
        } catch (e) {
          console.log(e);
        }
      }
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "bookmark":
      return (
        <iframe
          title="bookmark"
          src={`/embed/?url=${block.bookmark.url}`}
          className="embed"
        />
      );
    case "embed":
      return <iframe title="embed" src={block.embed.url} className="embed" />;
    case "child_database":
      return <div>{block.child_database.title}</div>;
    case "divider":
      return <hr />;
    case "quote":
      return (
        <div className="quote">
          <div className="quote-prepend">“</div>
          <div className="quote-inner">
            <Text text={block.quote.rich_text} />
          </div>
          <div className="quote-append">”</div>
        </div>
      );
    case "callout":
      return (
        <div className="callout">
          {block.callout.icon.type === "emoji" && (
            <span>{block.callout.icon.emoji}</span>
          )}
          <div className="callout-inner">
            <Text text={block.callout.rich_text} />
          </div>
        </div>
      );
    case "column_list":
      return (
        <div className="flex">
          {(block.column_list.children as any).map((c) => renderBlock(c))}
        </div>
      );
    case "column":
      return <div className="flex-1">カラム</div>;
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export const getNotionArticle = async (blocks: BlockObjectResponse[]) => {
  if (!blocks) {
    return <div />;
  }

  const finalBlocks = await Promise.all(
    blocks.map(async (block) => {
      const renderedBlock = await renderBlock(block);
      return <Fragment key={block.id}>{renderedBlock}</Fragment>;
    })
  );

  return <div>{finalBlocks}</div>;
};

export const getArticleFromNotion = async (slug: string) => {
  const posts = await getDatabase(process.env.NOTION_DATABASE_ID as string);
  const post = posts.find((p) => p.slug === slug);
  const page = await getPage(post.id);
  const blocks = await getBlocks(post.id);
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const childDatabasedBlocks = await Promise.all(
    blocks
      .filter((block) => block.type === "child_database")
      .map(async (block) => {
        return {
          id: block.id,
          // children: await getDatabase(block.id)
        };
      })
  );

  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      // eslint-disable-next-line no-param-reassign
      block[block.type].children = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  const blocksWithChildDatabase = blocksWithChildren.map((block) => {
    if (block.type === "child_database") {
      // block[block.type]['children'] = childDatabasedBlocks.find(
      //   (x) => x.id === block.id
      // )?.children
    }
    return block;
  });

  const notionArticle = await getNotionArticle(blocksWithChildDatabase);

  const article = {
    ...post,
    content: renderToString(<div>{notionArticle}</div>),
  } as Article;

  return {
    article,
    related: [],
  };
};
