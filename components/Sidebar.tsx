import React from 'react';
import { 
  Book, 
  Cpu, 
  Terminal, 
  Database, 
  Layout, 
  Server,
  Zap
} from 'lucide-react';
import { NavItem, SectionId } from '../types';

interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  
  const navItems: NavItem[] = [
    { id: 'overview', label: '1. 項目概述 (Overview)', icon: <Book size={18} /> },
    { id: 'mechanics', label: '2. 核心機制 (Mechanics)', icon: <Zap size={18} /> },
    { id: 'logic', label: '3. 破產算法 (The Algorithm)', icon: <Cpu size={18} /> },
    { id: 'database', label: '4. 事故資料庫 (Database)', icon: <Database size={18} /> },
    { id: 'uiux', label: '5. UI/UX 設計規範', icon: <Layout size={18} /> },
    { id: 'tech', label: '6. 技術架構 (Tech Stack)', icon: <Server size={18} /> },
  ];

  return (
    <aside className="w-[280px] bg-sidebar border-r border-border flex flex-col flex-shrink-0 h-full overflow-hidden">
      <div className="p-5 text-lg font-bold text-accent border-b border-border flex items-center gap-2.5 select-none">
        <Terminal size={24} />
        LEEK SIMULATOR
      </div>
      <ul className="list-none p-0 m-0 overflow-y-auto flex-1">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              px-5 py-3 cursor-pointer border-l-[3px] transition-all duration-200 text-sm flex items-center gap-3
              ${activeSection === item.id 
                ? 'bg-[rgba(88,166,255,0.15)] text-accent border-accent font-semibold' 
                : 'text-secondary border-transparent hover:bg-[rgba(88,166,255,0.1)] hover:text-primary'}
            `}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
      <div className="p-4 border-t border-border text-xs text-secondary text-center">
        v1.0.0 • Internal Only
      </div>
    </aside>
  );
};