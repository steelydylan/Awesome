import Link from "next/link";

export const LinkButton: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <>
      <Link href={href}>
        <a href={href} className="link-button">
          {children}
        </a>
      </Link>
      <style jsx>
        {`
          .link-button {
            border-radius: 20px;
            padding: 12px 50px;
            display: inline-block;
            background-color: var(--c-primary);
            color: #fff;
            font-size: var(--text-lg);
          }
        `}
      </style>
    </>
  );
};
