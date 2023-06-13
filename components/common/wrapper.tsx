import blogConfig from "@/blog.config";

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      {children}
      <style jsx>
        {`
          .wrapper {
            display: flex;
            justify-content: space-between;
            max-width: calc(var(--container-width) + 20px);
            margin: 0 auto;
            padding: 32px 10px;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              display: block;
            }
          }
        `}
      </style>
    </div>
  );
}
