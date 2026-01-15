import React from 'react';
import { Badge } from '../ui/Badge';
import { InlineCode } from '../ui/CodeBlock';
import { SectionProps } from '../../types';

export const UiUx: React.FC<SectionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-border pb-5 mb-8">
        <Badge type="ui">DESIGN</Badge>
        <h1 className="text-4xl font-bold mb-2 text-primary">UI/UX 設計規範</h1>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">視覺風格：Cyberpunk Terminal</h2>
      <p className="leading-relaxed text-secondary mb-4">
        介面應模仿復古 CRT 顯示器或黑客終端機。
      </p>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">色彩調色盤 (CSS Variables)</h3>
      <div className="overflow-hidden border border-border rounded-lg">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-4 bg-[#050a0e] text-white font-mono">--bg-color</td>
              <td className="p-4 text-secondary">#050a0e (深黑藍) - 背景基底</td>
            </tr>
            <tr>
              <td className="p-4 bg-[#00ff9d] text-black font-mono">--accent-green</td>
              <td className="p-4 text-secondary">#00ff9d (螢光綠) - 獲利、做多</td>
            </tr>
            <tr>
              <td className="p-4 bg-[#ff3860] text-white font-mono">--accent-red</td>
              <td className="p-4 text-secondary">#ff3860 (螢光紅) - 虧損、做空、錯誤</td>
            </tr>
            <tr>
              <td className="p-4 bg-[#1a2634] text-white font-mono">--grid-color</td>
              <td className="p-4 text-secondary">#1a2634 - 圖表網格線</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">特效技術細節</h3>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li><strong>CRT 掃描線：</strong> 使用 <InlineCode>::after</InlineCode> 偽元素和 <InlineCode>linear-gradient</InlineCode> 創建橫向掃描線覆蓋層。</li>
        <li><strong>Glitch (故障效果)：</strong> 在 Game Over 標題上應用 CSS Keyframes 動畫，隨機進行 <InlineCode>skew</InlineCode> (傾斜) 和 <InlineCode>filter: hue-rotate</InlineCode> (色相旋轉)。</li>
        <li><strong>Shake (震動)：</strong> 當發生虧損或破產時，對 <InlineCode>body</InlineCode> 應用 <InlineCode>transform: translate3d</InlineCode> 動畫。</li>
      </ul>
    </div>
  );
};