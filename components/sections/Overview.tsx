import React from 'react';
import { Badge } from '../ui/Badge';
import { NoteBox } from '../ui/NoteBox';
import { SectionProps } from '../../types';

export const Overview: React.FC<SectionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-border pb-5 mb-8">
        <Badge type="ui">PROJECT SPEC v1.0</Badge>
        <h1 className="text-4xl font-bold mb-2 text-primary">終極韭菜模擬器 2026：開發總覽</h1>
        <p className="text-secondary">Ultimate Leek Simulator - Developer Manual</p>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">項目願景</h2>
      <p className="leading-relaxed text-secondary mb-4">
        這不是一款為了贏而設計的遊戲，而是一款<strong>互動式諷刺藝術作品</strong>。其核心目標是透過一個看似公平的投資模擬界面，讓使用者在不知不覺中走向預定的毀滅（破產）。遊戲過程需充滿加密貨幣圈、股市和荒謬新聞的黑色幽默。
      </p>

      <NoteBox title="核心哲學">
        開發者必須謹記：<strong>「希望是毀滅的先決條件」</strong>。在前 9 回合必須給予使用者適度的甜頭或小幅挫折，讓他們以為自己掌握了規律，然後在第 10 回合進行「降維打擊」。
      </NoteBox>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">遊戲流程 (Game Loop)</h3>
      <ol className="list-decimal list-inside text-secondary space-y-2 pl-4">
        <li><strong>初始化：</strong> 給予 $10,000 美金，回合數設為 1/10。</li>
        <li><strong>標的生成：</strong> 每回合隨機生成一個極其荒謬的投資標的（如：量子香蕉）。</li>
        <li><strong>新聞注入：</strong> 配合標的顯示一則與現實脫節的新聞（如：總統被綁架）。</li>
        <li><strong>決策：</strong> 使用者選擇「做多 (Long)」或「做空 (Short)」。</li>
        <li><strong>結算：</strong>
          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
            <li>回合 1-9：偽隨機波動，讓資金起伏。</li>
            <li>回合 10：觸發 <code>DeathTrigger()</code>，強制歸零。</li>
          </ul>
        </li>
      </ol>
    </div>
  );
};