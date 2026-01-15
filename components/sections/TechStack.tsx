import React from 'react';
import { Badge } from '../ui/Badge';
import { InlineCode } from '../ui/CodeBlock';
import { SectionProps } from '../../types';

export const TechStack: React.FC<SectionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-border pb-5 mb-8">
        <Badge type="data">ARCHITECTURE</Badge>
        <h1 className="text-4xl font-bold mb-2 text-primary">技術架構</h1>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">文件結構</h2>
      <p className="leading-relaxed text-secondary mb-4">
        本專案採用 <strong>Single File Component (SFC)</strong> 概念，但實現在原生 HTML 中。
      </p>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li><InlineCode>index.html</InlineCode> - 包含所有結構、樣式與邏輯。</li>
        <li><strong>外部依賴：</strong> 僅限 <InlineCode>Tone.js</InlineCode> (CDN) 用於音效合成。禁用 Tailwind 或其他 UI 框架以保持輕量與可控性。</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">類別設計 (Class: MarketSimulator)</h2>
      <p className="leading-relaxed text-secondary mb-4">
        所有遊戲狀態封裝於 <InlineCode>MarketSimulator</InlineCode> 類中，避免全域變數污染。
      </p>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">關鍵方法 (Methods)</h3>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li><InlineCode>constructor()</InlineCode>: 初始化 DOM 元素綁定、音頻上下文。</li>
        <li><InlineCode>start()</InlineCode>: 重置資金 ($10,000)、清空歷史陣列、啟動 Tone.js。</li>
        <li><InlineCode>generateScenario()</InlineCode>: 從 Arrays 中隨機抽取資產與新聞。</li>
        <li><InlineCode>makeDecision(type)</InlineCode>: <strong>核心函數</strong>。處理按鈕點擊、計算盈虧、觸發第 10 回合邏輯。</li>
        <li><InlineCode>drawChart()</InlineCode>: 使用 HTML5 Canvas API 繪製動態折線圖。需處理響應式寬度 (Responsive Resize)。</li>
      </ul>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">錯誤處理</h3>
      <p className="leading-relaxed text-secondary mb-4">
        所有涉及 DOM 操作與數學計算的邏輯應包裹在 <InlineCode>try...catch</InlineCode> 中（雖在簡單遊戲中非必須，但屬良好習慣），特別是 Tone.js 的啟動必須由使用者手勢（點擊）觸發，否則瀏覽器會阻擋音效。
      </p>
    </div>
  );
};