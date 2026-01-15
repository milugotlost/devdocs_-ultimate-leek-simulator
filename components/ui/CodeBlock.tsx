import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <pre className="bg-code p-4 rounded-md overflow-x-auto border border-border my-4">
      <code className="font-mono text-accent text-sm whitespace-pre">
        {code}
      </code>
    </pre>
  );
};

export const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-[rgba(110,118,129,0.4)] px-1.5 py-0.5 rounded text-sm font-mono text-primary mx-1">
    {children}
  </span>
);