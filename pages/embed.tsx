import { NextPageContext } from "next";
import parser, { OgpParserResult } from "ogp-parser";

const Embed = ({ embed, url }: { embed: OgpParserResult; url: string }) => {
  const ogUrl = embed.ogp["og:url"]?.[0] ?? "";
  const domain = ogUrl ? new URL(ogUrl).hostname : "";

  return (
    <div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="embed-link"
        style={{ maxWidth: "780px" }}
      >
        <div className="embed-inner">
          <h1 className="embed-title">{embed.title}</h1>
          {embed.ogp["og:description"] && (
            <p className="embed-description">{embed.ogp["og:description"]}</p>
          )}
          <img
            src={`https://www.google.com/s2/favicons?sz=32&domain=${domain}`}
            width="14"
            height="14"
            className="embed-site-icon"
            alt="site-icon"
          />
          {domain}
        </div>
        <div className="w-30 h-30" style={{ width: "120px", height: "120px" }}>
          <img
            src={embed.ogp["og:image"]?.[0] ?? ""}
            className="embed-thumb"
            alt="open graph"
          />
        </div>
      </a>
      <style jsx>
        {`
          .embed-link {
            display: flex;
            border-radius: 0.125rem;
            border-width: 1px;
            border-color: #d1d5db;
          }
          .embed-inner {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            padding-left: 1rem;
            padding-right: 1rem;
            flex: 1 1 0%;
          }
          .embed-title {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          .embed-description {
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 24rem;
          }
          .embed-site-icon {
            display: inline-block;
            margin-right: 0.5rem;
            width: 1rem;
            height: 1rem;
          }
          .embed-thumb {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

Embed.getInitialProps = async (ctx: NextPageContext) => {
  const url = ctx.query.url as string;
  const embed = await parser(url as string);
  return {
    embed,
    url,
  };
};

export default Embed;
