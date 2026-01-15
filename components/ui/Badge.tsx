import React from 'react';

type BadgeType = 'core' | 'ui' | 'data';

interface BadgeProps {
  type: BadgeType;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  const styles = {
    core: 'bg-[rgba(248,81,73,0.2)] text-danger border-danger',
    ui: 'bg-[rgba(88,166,255,0.2)] text-accent border-accent',
    data: 'bg-[rgba(210,153,34,0.2)] text-warn border-warn',
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded-xl text-xs font-bold uppercase border ${styles[type]} mb-2`}>
      {children}
    </span>
  );
};