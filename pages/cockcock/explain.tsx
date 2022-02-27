import type { NextPage } from "next";
import "../api/fire";
import { Layout } from "../../src/components/templates/Layout";
import { Meta } from "../../src/components/templates/Meta";
import { Container } from "../../src/components/atoms/Container";

const Explain: NextPage = () => {
  return (
    <Layout>
      <Meta />
      <Container>
        <p>最終更新:2022/02/27</p>
        <p>
          このサイトはマルソウのカクテルのレシピを検索できたらいいな〜オリジナルカクテルを共有できたらいいな〜と思い個人的に作ったサイトです。
          <br />
          欠陥だらけですがご了承ください、機能の実装やバグの修正は時間あるとき行っていきます、、、
          <br />
          どんどんカクテル追加しちゃってください！
        </p>
      </Container>
    </Layout>
  );
};

export default Explain;
