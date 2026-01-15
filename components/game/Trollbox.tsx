import React, { useState, useEffect, useRef } from 'react';
import { 
  TROLL_USERS, 
  TROLL_MESSAGES, 
  LIQUIDATION_MESSAGES,
  VIP_KOL_MESSAGES,
  getRandomItem, 
  UserRole 
} from '../../utils/gameLogic';
import { MessageCircle, Shield, Bot, Fish, AlertOctagon, Minimize2, Maximize2 } from 'lucide-react';

interface TrollboxProps {
  lang: 'en' | 'zh';
  isActive: boolean;
  onNewMessage: (text: string) => void;
  isVip: boolean;
}

interface ChatMessage {
  id: number;
  user: string;
  role: UserRole | 'SYSTEM';
  text: string;
  color: string;
  isSystem?: boolean;
}

const NORMIE_COLORS = ['#c9d1d9', '#8b949e', '#f0f6fc', '#babbbd'];

export const Trollbox: React.FC<TrollboxProps> = ({ lang, isActive, onNewMessage, isVip }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const addMessage = () => {
      // 5% chance for a SYSTEM Alert
      const isSystemEvent = Math.random() < 0.05;

      if (isSystemEvent) {
         const msgObj = getRandomItem(LIQUIDATION_MESSAGES);
         const text = msgObj[lang];
         const newMessage: ChatMessage = {
           id: Date.now(),
           user: "SYSTEM",
           role: 'SYSTEM',
           text: text,
           color: '#ff3860', // Red
           isSystem: true
         };
         setMessages(prev => {
            const updated = [...prev, newMessage];
            if (updated.length > 30) return updated.slice(updated.length - 30);
            return updated;
         });
         onNewMessage(text);
         return;
      }

      // Normal User Message or VIP Rage
      const userObj = getRandomItem(TROLL_USERS);
      let text = "";
      
      // VIP MODE RAGE Logic (20% chance if VIP)
      if (isVip && Math.random() < 0.2) {
          text = getRandomItem(VIP_KOL_MESSAGES)[lang];
      } else {
          text = getRandomItem(TROLL_MESSAGES)[lang];
      }
      
      // Determine color based on role
      let color = getRandomItem(NORMIE_COLORS);
      if (userObj.role === 'MOD') color = '#00ff9d'; // Green
      if (userObj.role === 'WHALE') color = '#d29922'; // Gold
      if (userObj.role === 'BOT') color = '#a371f7'; // Purple

      const newMessage: ChatMessage = {
        id: Date.now(),
        user: userObj.name,
        role: userObj.role,
        text: text,
        color: color
      };

      setMessages(prev => {
        const updated = [...prev, newMessage];
        if (updated.length > 30) return updated.slice(updated.length - 30); 
        return updated;
      });
      onNewMessage(text);
    };

    // Add initial messages
    addMessage();

    // Randomly add messages loop
    const loop = () => {
      // Speed settings:
      // Normal: 1.5s to 3.0s
      // VIP: 0.5s to 2.0s
      const baseSpeed = isVip ? 500 : 1500; 
      const timeout = Math.random() * 1500 + baseSpeed; 
      
      timeoutId = setTimeout(() => {
        addMessage();
        loop();
      }, timeout);
    };

    loop();

    // Cleanup function to prevent loop stacking on re-renders
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    }; 
  }, [isActive, lang, onNewMessage, isVip]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current && isExpanded) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isExpanded]);

  const renderBadge = (role: UserRole | 'SYSTEM') => {
    switch (role) {
      case 'MOD': return <Shield size={10} className="text-term-green inline mr-1" fill="currentColor" />;
      case 'BOT': return <Bot size={10} className="text-purple-400 inline mr-1" />;
      case 'WHALE': return <Fish size={10} className="text-yellow-500 inline mr-1" />;
      case 'SYSTEM': return <AlertOctagon size={10} className="text-term-red inline mr-1" />;
      default: return null;
    }
  };

  return (
    <div className={`bg-terminal border border-term-grid flex flex-col transition-all duration-300 shadow-lg overflow-hidden ${isExpanded ? 'h-full' : 'h-10'}`}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-2 text-xs font-bold flex items-center gap-2 uppercase tracking-wider cursor-pointer hover:bg-term-grid/80 transition-colors select-none flex-shrink-0 ${isExpanded ? 'bg-term-grid text-term-text' : 'bg-term-grid/50 text-secondary'}`}
      >
        <MessageCircle size={14} /> 
        {lang === 'zh' ? '韭菜聊天室' : 'Trollbox'}
        
        {isExpanded && (
           <>
            <span className="ml-auto w-2 h-2 rounded-full bg-term-green animate-pulse"></span>
            <span className="text-[10px] text-secondary">LIVE</span>
           </>
        )}
        
        <div className="ml-auto">
             {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </div>
      </div>
      
      {isExpanded && (
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-2 space-y-2 font-mono text-xs bg-black/50 min-h-0"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`break-words ${msg.isSystem ? 'bg-red-900/20 p-1 rounded border-l-2 border-term-red' : ''}`}>
            {/* User Badges & Name */}
            {!msg.isSystem && (
              <span style={{ color: msg.color }} className="font-bold mr-2">
                {renderBadge(msg.role)}
                [{msg.user}]:
              </span>
            )}

            {/* Message Content */}
            <span className={msg.isSystem ? 'text-term-red font-bold' : 'text-secondary opacity-90'}>
              {msg.isSystem && renderBadge('SYSTEM')}
              {msg.text}
            </span>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-secondary italic opacity-50 text-center mt-10">
            Connecting to IRC...
          </div>
        )}
      </div>
      )}
    </div>
  );
};