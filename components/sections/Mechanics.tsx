import React from 'react';
import { Badge } from '../ui/Badge';
import { SectionProps } from '../../types';

export const Mechanics: React.FC<SectionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-border pb-5 mb-8">
        <Badge type="core">GAMEPLAY</Badge>
        <h1 className="text-4xl font-bold mb-2 text-primary">核心遊戲機制</h1>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">回合制設計</h2>
      <p className="leading-relaxed text-secondary mb-4">
        遊戲嚴格限制為 10 個回合。這種短節奏設計是為了鼓勵重複遊玩，並讓「結局」的衝擊力最大化。
      </p>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">互動限制</h3>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li><strong>無止損/止盈功能：</strong> 刻意移除這些專業工具，強迫使用者進行「梭哈 (All-in)」式賭博。</li>
        <li><strong>強制性新聞閱讀：</strong> 新聞欄位必須位於視覺中心，確保使用者在點擊按鈕前閱讀荒謬的市場背景。</li>
      </ul>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">音效反饋機制 (Tone.js)</h3>
      <p className="leading-relaxed text-secondary mb-4">音效不僅是裝飾，而是心理暗示工具：</p>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li><strong>獲利：</strong> 高頻、清脆的合成器大三和弦 (Major Triad)，激發多巴胺。</li>
        <li><strong>虧損：</strong> 低頻、失真的鋸齒波 (Sawtooth)，製造焦慮感。</li>
        <li><strong>第 10 回合（破產）：</strong> 使用粉紅噪音 (Pink Noise) 加上不和諧音程，模擬耳鳴或系統崩潰的聽覺感受。</li>
      </ul>
    </div>
  );
};