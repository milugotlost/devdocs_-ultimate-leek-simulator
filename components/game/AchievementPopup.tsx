
import React, { useEffect, useState, useRef } from 'react';
import { Achievement } from '../../utils/gameLogic';
import { Trophy } from 'lucide-react';

interface AchievementPopupProps {
  data: Achievement;
  lang: 'en' | 'zh';
  visible: boolean;
  onClose: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ data, lang, visible, onClose }) => {
  const [animateIn, setAnimateIn] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // This effect handles the animation cycle when 'visible' becomes true
  useEffect(() => {
    if (visible) {
      setAnimateIn(true);
      
      // Clear any existing timer to prevent overlaps
      if (timerRef.current) clearTimeout(timerRef.current);

      // Start exit timer
      timerRef.current = setTimeout(() => {
        setAnimateIn(false);
        // Wait for exit animation to finish before calling onClose
        setTimeout(onClose, 500); 
      }, 4000);
    }

    return () => {
        // Cleanup if component unmounts prematurely
        if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, onClose]); // Dependency on onClose is fine if App.tsx uses useCallback

  if (!visible && !animateIn) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 z-[9999] transform transition-all duration-500 ease-out cursor-pointer
        ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
      onClick={() => {
          setAnimateIn(false);
          setTimeout(onClose, 200);
      }}
    >
      <div className="bg-[#1b2838] border border-[#3d4450] shadow-2xl p-0 w-80 flex items-stretch rounded overflow-hidden">
         {/* Icon Section */}
         <div className="bg-[#000] w-16 flex items-center justify-center text-3xl">
            {data.icon || <Trophy className="text-yellow-500" />}
         </div>
         
         {/* Text Section */}
         <div className="flex-1 p-3 flex flex-col justify-center">
             <div className="text-[#66c0f4] text-xs font-bold uppercase mb-1">
                 {lang === 'zh' ? '解鎖成就' : 'Achievement Unlocked'}
             </div>
             <div className="text-white text-sm font-bold leading-tight mb-1">
                 {data.title[lang]}
             </div>
             <div className="text-[#8b929a] text-xs leading-tight">
                 {data.description[lang]}
             </div>
         </div>
      </div>
    </div>
  );
};
