import { NotFound } from "@/components/common/not-found";
import { Layout } from "@/components/layout";
import { Entry } from "@/types";

export default ({ posts }: { posts: Entry[] }) => {
  return (
    <Layout>
      <NotFound />
    </Layout>
  );
};
