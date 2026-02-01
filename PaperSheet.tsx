
import React from 'react';

interface PaperSheetProps {
  children: React.ReactNode;
  className?: string;
}

const PaperSheet: React.FC<PaperSheetProps> = ({ children, className = "" }) => {
  return (
    <div className={`paper-texture shadow-xl border border-stone-200/40 rounded-sm relative overflow-hidden ${className}`}>
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default PaperSheet;