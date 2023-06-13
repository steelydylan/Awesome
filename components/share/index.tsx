import blogConfig from "@/blog.config";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { HatebuIcon } from "../icons/hatebu";
import dynamic from "next/dynamic";
import { Component } from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

const FontAwesomeIcon = dynamic(
  () => import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon),
  {
    ssr: false,
  }
) as typeof Component<FontAwesomeIconProps>

export const Share = ({
  permalink,
  title,
}: {
  permalink: string;
  title: string;
}) => {
  if (blogConfig.widgets.share.socials.length === 0) {
    return null;
  }
  return (
    <div className="share">
      <div className="share-text">{blogConfig.widgets.share.title}</div>
      <div className="share-link-wrap">
        {blogConfig.widgets.share.socials.map((s: IconName | "hatebu") => {
          let href = "";
          if (s === "twitter") {
            href = `https://twitter.com/intent/tweet?url=${permalink}&text=${title}`;
          } else if (s === "facebook") {
            href = `https://www.facebook.com/sharer/sharer.php?u=${permalink}`;
          } else if (s === "hatebu") {
            href = `https://b.hatena.ne.jp/entry/panel/?url=${permalink}&btitle=${title}`;
          }
          return (
            <a
              href={href}
              className={`social-link ${s}`}
              target="_blank"
              rel="noreferrer"
            >
              {s !== "hatebu" && <FontAwesomeIcon icon={["fab", s]} />}
              {s === "hatebu" && (
                // <img src="/images/hatebu.svg" alt="" className="hatebu-img" />
                <span className="hatebu-img">
                  <HatebuIcon />
                </span>
              )}
            </a>
          );
        })}
      </div>
      <style jsx>
        {`
          .share {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            border-top: 1px solid #dbdbdb;
            padding: 40px 0;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              display: block;
            }
          }
          .share-text {
            font-size: var(--text-sm);
            color: var(--c-text-gray-lighter);
            margin-right: 25px;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              margin-right: 0;
              margin-bottom: 20px;
            }
          }

          .share-link-wrap {
            display: inline-flex;
          }

          .social-link {
            width: 30px;
            height: 30px;
            display: inline-block;
            color: #fff;
            padding: 7px;
            margin-right: 25px;
            border-radius: 5px;
            &.twitter {
              background-color: #4aaae8;
            }
            &.facebook {
              background-color: #405a93;
            }
            &.instagram {
              background-color: #eb3861;
            }
            &.hatebu {
              padding: 0;
              width: 35px;
              height: 35px;
              margin-top: -3px;
            }
            &:last-child {
              margin-right: 0;
            }
            .hatebu-img {
              width: 35px;
              height: 35px;
              display: block;
              color: #0078c2;
              :global(svg) {
                width: 100%;
                height: 100%;
              }
            }
          }
        `}
      </style>
    </div>
  );
};
