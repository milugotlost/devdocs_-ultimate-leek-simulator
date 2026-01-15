import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface NoteBoxProps {
  title: string;
  children: React.ReactNode;
}

export const NoteBox: React.FC<NoteBoxProps> = ({ title, children }) => {
  return (
    <div className="bg-[rgba(210,153,34,0.1)] border-l-4 border-warn p-4 my-6 rounded-r-md">
      <span className="font-bold text-warn block mb-2 flex items-center gap-2">
        <AlertTriangle size={16} />
        {title}
      </span>
      <div className="text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
};