import React from 'react';
import { Badge } from '../ui/Badge';
import { NoteBox } from '../ui/NoteBox';
import { CodeBlock } from '../ui/CodeBlock';
import { SectionProps } from '../../types';

export const Logic: React.FC<SectionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-border pb-5 mb-8">
        <Badge type="core">CRITICAL</Badge>
        <h1 className="text-4xl font-bold mb-2 text-primary">第 10 回合：絕對破產算法</h1>
        <p className="text-secondary">本章節解釋如何透過代碼實現「決定論式」的結局。</p>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-primary border-b border-border pb-2">算法邏輯流程</h2>
      <p className="leading-relaxed text-secondary mb-4">
        在第 10 回合，我們不再使用 <code>Math.random()</code> 來決定漲跌，而是根據<strong>使用者的選擇</strong>進行反向操作。
      </p>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">偽代碼實現 (Pseudo-code)</h3>
      <CodeBlock code={`function calculateOutcome(userChoice, currentTurn) {
    if (currentTurn < 10) {
        // 前9回合：標準隨機漫步
        // 60% 機率小賺，40% 機率小賠，保持黏著度
        return randomWalk(); 
    } else {
        // 第10回合：鐮刀模式 (The Sickle Mode)
        if (userChoice === 'LONG') {
            // 使用者做多：資產價格崩盤 99%
            // 結果：本金幾乎歸零
            return -0.99; 
        } else if (userChoice === 'SHORT') {
            // 使用者做空：軋空 (Short Squeeze) 暴漲 1000%
            // 結果：保證金不足，資產變為負數 (破產)
            return 10.0; 
        }
    }
}`} />

      <NoteBox title="開發者筆記：為什麼做空要漲 1000%？">
        在現實金融中，做多的最大損失是本金歸零 (-100%)。但做空的損失理論上是無限的。為了在遊戲中製造最戲劇化的「負債」效果，當使用者在最後一關選擇「做空」時，我們必須讓資產價格呈現幾何級數暴漲，這樣結算時：
        <br />
        <code className="text-accent bg-[rgba(110,118,129,0.2)] px-1 rounded block mt-2 p-2">NewBalance = Balance * (1 - 10.0) = Balance * -9</code>
        <br />
        這會瞬間創造出巨額債務。
      </NoteBox>

      <h3 className="text-xl font-medium mt-8 mb-4 text-accent">圖表渲染欺騙</h3>
      <p className="leading-relaxed text-secondary mb-4">Canvas 繪圖引擎在第 10 回合必須配合數據：</p>
      <ul className="list-disc list-inside text-secondary space-y-2 pl-4">
        <li>若做多失敗：畫出一條垂直向下的紅線，直接穿透圖表底部。</li>
        <li>若做空失敗：畫出一條垂直向上的綠線，衝出畫布邊界。</li>
      </ul>
    </div>
  );
};