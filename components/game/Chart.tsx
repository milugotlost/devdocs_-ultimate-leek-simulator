import React, { useRef, useEffect, useState } from 'react';

interface ChartProps {
  data: number[]; // Array of prices
  color: string;
  showTA: boolean;
  danmaku: string[]; // Array of active messages to float
}

interface DanmakuItem {
    id: number;
    text: string;
    y: number; // Vertical position %
    duration: number; // speed
    color: string;
}

export const Chart: React.FC<ChartProps> = ({ data, color, showTA, danmaku }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flyingComments, setFlyingComments] = useState<DanmakuItem[]>([]);
  const lastDanmakuRef = useRef<string | null>(null);

  // Handle new Danmaku
  useEffect(() => {
      if (danmaku.length > 0) {
          const latest = danmaku[danmaku.length - 1];
          if (latest !== lastDanmakuRef.current) {
              lastDanmakuRef.current = latest;
              
              const newItem: DanmakuItem = {
                  id: Date.now() + Math.random(),
                  text: latest,
                  y: Math.random() * 80 + 10, // 10% to 90% height
                  duration: Math.random() * 5 + 8, // 8s to 13s (Slower)
                  color: Math.random() > 0.5 ? '#fff' : (Math.random() > 0.5 ? '#00ff9d' : '#ff3860')
              };
              
              // Limit active comments to prevent lag (Max 15)
              setFlyingComments(prev => {
                  const updated = [...prev, newItem];
                  if (updated.length > 15) return updated.slice(updated.length - 15);
                  return updated;
              });

              // Cleanup after animation
              setTimeout(() => {
                  setFlyingComments(prev => prev.filter(item => item.id !== newItem.id));
              }, newItem.duration * 1000);
          }
      }
  }, [danmaku]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handling
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = '#1a2634';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < width; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 40) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    if (data.length < 2) return;

    // Determine scale
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = height * 0.1;

    // Draw Line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.beginPath();

    data.forEach((price, index) => {
      const x = (index / (data.length - 1)) * width;
      // Invert Y axis because canvas 0 is top
      const normalizedY = (price - min) / range;
      const y = height - (padding + normalizedY * (height - padding * 2));

      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw last point dot
    const lastPrice = data[data.length - 1];
    const lastX = width;
    const normalizedLastY = (lastPrice - min) / range;
    const lastY = height - (padding + normalizedLastY * (height - padding * 2));
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(lastX - 2, lastY, 4, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // USELESS TA DRAWING LOGIC
    // ==========================================
    if (showTA) {
      // Draw random nonsense lines
      const taColor = 'rgba(255, 255, 0, 0.4)'; // Transparent yellow
      ctx.strokeStyle = taColor;
      ctx.lineWidth = 1;
      
      // Random Triangle
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.closePath();
      ctx.stroke();

      // Random Trend Lines
      for(let i=0; i<3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * height);
        ctx.lineTo(width, Math.random() * height);
        ctx.stroke();
      }

      // Add "Support" label randomly
      ctx.fillStyle = taColor;
      ctx.font = '12px monospace';
      ctx.fillText("STRONG SUPPORT", width * 0.1, Math.random() * height);
      
       // Add "Resistance" label randomly
       ctx.fillText("RESISTANCE", width * 0.6, Math.random() * height);
       
       // Add nonsense indicator name
       ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
       ctx.fillText("FIBONACCI RETRACEMENT (FAKE)", 10, 20);
    }

  }, [data, color, showTA]);

  return (
    <div className="w-full h-full bg-terminal border border-term-grid rounded relative overflow-hidden flex flex-col">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={256} 
        className="w-full h-full block"
      />
      {/* Danmaku Overlay */}
      {flyingComments.map(item => (
          <div 
            key={item.id}
            className="absolute whitespace-nowrap font-mono font-bold text-shadow pointer-events-none animate-danmaku text-xs md:text-base opacity-90"
            style={{
                top: `${item.y}%`,
                left: '100%',
                color: item.color,
                animationDuration: `${item.duration}s`,
                textShadow: '1px 1px 2px black'
            }}
          >
              {item.text}
          </div>
      ))}
      <style>{`
        @keyframes danmaku {
            from { transform: translateX(0); }
            to { transform: translateX(-150vw); } /* Ensure it crosses the entire viewport width plus margin */
        }
        .animate-danmaku {
            animation-name: danmaku;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};