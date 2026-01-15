import React from 'react';

export type SectionId = 'overview' | 'mechanics' | 'logic' | 'database' | 'uiux' | 'tech';

export interface NavItem {
  id: SectionId;
  label: string;
  icon?: React.ReactNode;
}

export interface SectionProps {
  isActive: boolean;
}