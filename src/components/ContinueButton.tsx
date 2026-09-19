import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ContinueButtonProps {
  onClick: () => void;
  isDim?: boolean;
  onDeny?: () => void;
  label?: string;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onClick,
  isDim = false,
  onDeny,
  label = 'Continue',
}) => {
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    if (isDim) {
      setShaking(true);
      if (onDeny) onDeny();
      setTimeout(() => setShaking(false), 350);
      return;
    }
    onClick();
  };

  return (
    <div
      className="fixed left-0 right-0 z-30 pointer-events-none px-4 flex justify-center"
      style={{
        bottom: 'max(env(safe-area-inset-bottom, 0px) + 16px, 24px)',
      }}
    >
      <button
        onClick={handleClick}
        className={`w-full max-w-[320px] min-h-[50px] flex items-center justify-center gap-2.5 text-[16px] sm:text-[17px] font-bold text-white px-6 py-3 rounded-full cursor-pointer
          bg-[#14151D]/80 backdrop-blur-md border border-white/15 shadow-xl transition-all duration-200 active:scale-[0.98] pointer-events-auto
          ${isDim ? 'opacity-35' : 'opacity-100 hover:bg-[#14151D] hover:border-white/25'}
          ${shaking ? 'animate-shake' : ''}
        `}
      >
        <span>{label}</span>
        <ArrowRight size={18} strokeWidth={2.6} />
      </button>
    </div>
  );
};
