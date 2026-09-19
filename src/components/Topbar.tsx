import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface TopbarProps {
  progressPercent: number;
  onBack?: () => void;
  canGoBack: boolean;
  isOnLight?: boolean;
  onSkip?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  progressPercent,
  onBack,
  canGoBack,
  isOnLight = false,
  onSkip,
}) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-20 pointer-events-none"
      style={{
        paddingTop: 'max(env(safe-area-inset-top, 0px), 8px)',
      }}
    >
      <div className="max-w-[780px] mx-auto px-4 min-[380px]:px-5 py-2.5 flex items-center gap-3">
        {canGoBack ? (
          <button
            onClick={onBack}
            className={`min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full transition-transform active:scale-90 pointer-events-auto cursor-pointer ${
              isOnLight ? 'text-[#24202C] hover:bg-black/5' : 'text-white/90 hover:bg-white/10'
            }`}
            aria-label="Back"
          >
            <ChevronLeft size={24} strokeWidth={2.4} />
          </button>
        ) : (
          <div className="w-11 h-11" />
        )}

        <div
          className={`flex-1 h-[7px] rounded-full overflow-hidden ${
            isOnLight ? 'bg-[#DDD6EC]' : 'bg-[#2E3040]'
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isOnLight ? 'bg-[#8B4CE2]' : 'bg-[#8B7CF6]'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>

        {onSkip ? (
          <button
            onClick={onSkip}
            className={`min-h-[44px] px-3.5 flex items-center justify-center rounded-full text-[12.5px] font-bold tracking-wide transition-all active:scale-95 pointer-events-auto cursor-pointer shadow-sm ${
              isOnLight
                ? 'text-[#8B4CE2] bg-purple-100/80 hover:bg-purple-200/80'
                : 'text-white/80 bg-white/10 hover:bg-white/15 border border-white/10 hover:text-white'
            }`}
          >
            Skip
          </button>
        ) : (
          <div className="w-11 h-11" />
        )}
      </div>
    </header>
  );
};
