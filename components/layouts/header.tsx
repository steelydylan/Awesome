import blogConfig from "@/blog.config";
import Link from "next/link";
import { SocialList } from "../common/social-list";

export function Header() {
  return (
    <header className="header-outer">
      <div className="header-inner">
        <div className="header-content">
          <div className="social-list-wrap">
            <SocialList />
          </div>
          <div className="logo-wrap">
            <Link href="/">
              <img
                src={blogConfig.siteLogo.url}
                alt={blogConfig.siteName}
                width={blogConfig.siteLogo.width}
                height={blogConfig.siteLogo.height}
              />
            </Link>
          </div>
          {blogConfig.subNavigation.length > 0 && (
            <ul className="header-sub-nav">
              {blogConfig.subNavigation.map((n) => (
                <li key={n.url}>
                  <Link href={n.url}>{n.name}</Link>
                </li>
              ))}
            </ul>
          )}
          <ul className="header-nav">
            {blogConfig.navigation.map((n) => (
              <li key={n.url}>
                <Link href={n.url}>{n.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          .header-outer {
            background-color: #fff;
          }
          .header-inner {
            padding-top: 33px;
            top: 0;
            background-color: #fff;
            width: 100%;
            z-index: 10;
          }
          .header-content {
            max-width: calc(var(--container-width) + 20px);
            padding: 0 10px;
            margin: 0 auto;
            position: relative;
          }
          .logo-wrap {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
          }
          .header-nav {
            list-style-type: none;
            padding: 0;
            display: flex;
            justify-content: center;
            border-bottom: 3px solid #f0f4f2;
            max-width: var(--container-width);
            margin: 0 auto;
            overflow-x: auto;
          }
          .header-nav li {
            padding: 15px 25px;
            text-transform: uppercase;
            font-weight: bold;
            color: var(--c-text-gray-lighter);
          }
          .header-sub-nav {
            position: absolute;
            top: 0;
            right: 0;
            list-style-type: none;
            display: flex;
            font-size: var(--text-sm);
            color: var(--c-text);
            text-transform: uppercase;
            li {
              margin-right: 35px;
              &:last-child {
                margin-right: 10px;
              }
            }
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              display: none;
            }
          }
          .social-list-wrap {
            position: absolute;
            top: 0;
            left: 10px;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              display: none;
            }
          }
        `}
      </style>
    </header>
  );
}
