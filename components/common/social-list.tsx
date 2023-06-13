import blogConfig from "@/blog.config";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import dynamic from "next/dynamic";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Component } from "react";

const FontAwesomeIcon = dynamic(
  () => import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon),
  {
    ssr: false,
  }
) as typeof Component<FontAwesomeIconProps>

export const SocialList = () => {
  const socialKeys = Object.keys(blogConfig.account.social);
  return (
    <>
      {socialKeys.length && (
        <ul className="social-list">
          {socialKeys.map((s: IconName) => {
            const link = blogConfig.account.social[s];
            return (
              <li key={s}>
                <a href={link} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={["fab", s]} className="icon" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
      <style jsx>
        {`
          .social-list {
            display: inline-flex;
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
          .social-list a {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            color: #fff;
            display: flex;
            background-color: var(--c-text);
            margin-right: 15px;
            justify-content: center;
            align-items: center;
          }
          .social-list :global(.icon) {
            width: 15px;
            height: 15px;
          }
        `}
      </style>
    </>
  );
};
