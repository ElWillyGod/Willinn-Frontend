import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className, style }) => {
  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ maxHeight: '400px', ...style }}
    >
      {children}
    </div>
  );
};

export default ScrollArea;