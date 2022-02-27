import type { NextPage } from "next";
import "../api/fire";
import { Meta } from "../../src/components/templates/Meta";
import { Container } from "../../src/components/atoms/Container";
import { LayoutDummy } from "../../src/components/templates/LayoutDummy";

const Explain: NextPage = () => {
  return (
    <LayoutDummy>
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
    </LayoutDummy>
  );
};

export default Explain;
