import Link from "next/link";

export const LinkButton: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  return (
    <>
      <Link href={href} className="link-button">
        {children}
      </Link>
      <style jsx>
        {`
          :global(.link-button) {
            text-transform: uppercase;
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
