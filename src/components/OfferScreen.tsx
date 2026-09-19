import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface OfferScreenProps {
  onClaimTrial: () => void;
}

export const OfferScreen: React.FC<OfferScreenProps> = ({ onClaimTrial }) => {
  useEffect(() => {
    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#8B7CF6', '#8B4CE2', '#F9C52D', '#60A5FA', '#34D399', '#EC4899'],
      });
    };

    // Realistic celebration blast sequence
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Side cannons for extra celebratory momentum
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors: ['#8B7CF6', '#8B4CE2', '#F9C52D', '#34D399'],
        zIndex: 9999,
      });
    }, 320);

    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors: ['#8B7CF6', '#8B4CE2', '#F9C52D', '#60A5FA'],
        zIndex: 9999,
      });
    }, 480);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-[#FFFFFF] to-[#F3E9FF] text-[#24202C] flex flex-col justify-center">
      <div className="max-w-[600px] w-full mx-auto px-4 min-[380px]:px-6 pt-20 sm:pt-24 pb-28 sm:pb-32 flex flex-col justify-center">
        <div className="text-[11px] font-extrabold tracking-[1.5px] uppercase text-[#8A8494]">
          Limited time
        </div>
        <h2 className="text-[28px] min-[360px]:text-[32px] sm:text-[36px] font-black tracking-[-0.02em] mt-2.5 sm:mt-3.5 text-[#24202C]">
          Unlimited Pass
        </h2>
        <p className="text-[14.5px] sm:text-[15px] font-semibold text-[#6F6878] mt-1.5 sm:mt-2">
          3 days free
        </p>

        {/* Feature perks pill list for high polish */}
        <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 bg-white/75 backdrop-blur-sm border border-purple-100 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-3 text-[14px] sm:text-[14.5px] font-medium text-slate-800">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#8B4CE2] flex items-center justify-center font-bold text-xs flex-none">✓</span>
            <span>Unlimited AI Flashcard & Quiz Generation</span>
          </div>
          <div className="flex items-center gap-3 text-[14px] sm:text-[14.5px] font-medium text-slate-800">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#8B4CE2] flex items-center justify-center font-bold text-xs flex-none">✓</span>
            <span>Full audio recaps & spoken summaries</span>
          </div>
          <div className="flex items-center gap-3 text-[14px] sm:text-[14.5px] font-medium text-slate-800">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#8B4CE2] flex items-center justify-center font-bold text-xs flex-none">✓</span>
            <span>Instant PDF & study material breakdown</span>
          </div>
        </div>

        <button
          onClick={onClaimTrial}
          className="w-full min-h-[52px] sm:min-h-[56px] mt-8 sm:mt-10 bg-[#8B4CE2] hover:bg-[#7E3DDC] text-white text-[16px] font-bold rounded-2xl p-4 shadow-[0_12px_26px_rgba(139,76,226,0.35)] transition-all duration-150 active:scale-[0.98] cursor-pointer"
        >
          Claim my FREE trial
        </button>
      </div>
    </div>
  );
};
