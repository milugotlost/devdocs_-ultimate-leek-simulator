import React from 'react';
import { Badge } from '../ui/Badge';
import { InlineCode, CodeBlock } from '../ui/CodeBlock';
import { SectionProps } from '../../types';

export const Database: React.FC<SectionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-border pb-5 mb-8">
        <Badge type="data">CONTENT</Badge>
        <h1 className="text-4xl font-bold mb-2 text-primary">事故資料庫 (Chaos DB)</h1>
        <p className="text-secondary">這裡定義了遊戲中出現的隨機變量。文案風格需極度誇張、諷刺。</p>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">奇怪的投資標的 (Weird Assets)</h2>
      <p className="leading-relaxed text-secondary mb-4">變量名：<code>weirdAssets</code> (Array)</p>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li><InlineCode>DOGE (狗狗幣)</InlineCode> - 經典迷因。</li>
        <li><InlineCode>隱形岩石 NFT</InlineCode> - 諷刺 NFT 市場。</li>
        <li><InlineCode>量子香蕉期貨</InlineCode> - 結合高科技術語與無厘頭物品。</li>
        <li><InlineCode>哥吉拉債券</InlineCode> - 暗示毀滅性風險。</li>
        <li><InlineCode>火星房地產</InlineCode> - 諷刺太空探索熱潮。</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">新聞事故生成 (News Events)</h2>
      <p className="leading-relaxed text-secondary mb-4">變量名：<code>chaosNews</code> (Array)。這些新聞必須作為價格波動的「理由」（藉口）。</p>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">分類 A：政治荒謬類</h3>
      <CodeBlock code={`"突發：美國總統在推特宣佈將白宮改建成加密貨幣礦場。"
"快訊：聯準會主席被外星人綁架，贖金要求為 100 顆比特幣。"`} />

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">分類 B：科技失控類</h3>
      <CodeBlock code={`"科技：AI 產生自我意識，決定將全球股市資金轉入流浪貓慈善基金。"
"災難：巨大的數據中心因散熱不良融化，變成了一座現代藝術雕像。"`} />

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">分類 C：名人效應類</h3>
      <CodeBlock code={`"娛樂：馬斯克宣佈將自己發射到冥王星，特斯拉股價出現量子疊加態。"
"市場：某網紅宣稱『錢只是幻覺』，導致美元指數瞬間歸零。"`} />

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">結局文案 (Endings)</h2>
      <p className="leading-relaxed text-secondary mb-4">第 10 回合破產時顯示的理由：</p>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li>"開發者捲款潛逃 (Rug Pull)"</li>
        <li>"鯊魚咬斷海底電纜"</li>
        <li>"國稅局認定您的存在本身就是未實現收益"</li>
      </ul>
    </div>
  );
};