import blogConfig from "@/blog.config";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="main">
      {children}
      <style jsx>
        {`
          .main {
            flex: 1;
            margin-right: 80px;
            word-break: break-all;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              margin-right: 0;
            }
          }
        `}
      </style>
    </div>
  );
}
