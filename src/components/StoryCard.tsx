import React from 'react';
import { StoryStep } from '../types';

interface StoryCardProps {
  step: StoryStep;
}

export const StoryCard: React.FC<StoryCardProps> = ({ step }) => {
  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center bg-[#07080C] overflow-hidden">
      {/* Native full-screen on mobile, cinematic framed card on desktop */}
      <div className="relative w-full h-full min-h-[100dvh] sm:min-h-0 sm:h-auto sm:w-[min(100vw,calc(100vh*9/19.5))] sm:aspect-[9/19.5] overflow-hidden bg-[#101220] shadow-2xl rounded-none sm:rounded-[32px] sm:border sm:border-white/10 flex flex-col justify-center">
        {/* Visual background illustration based on theme */}
        <div className="absolute inset-0 z-0">
          {step.illustrationTheme === 'biology' && (
            <div className="w-full h-full relative bg-gradient-to-b from-[#181135] via-[#0E1528] to-[#080911]">
              <div className="absolute inset-0 opacity-40">
                <svg className="w-full h-full" viewBox="0 0 360 780" fill="none">
                  <circle cx="180" cy="280" r="140" fill="url(#bioGrad)" opacity="0.25" />
                  <path
                    d="M60 160 C 120 220, 240 220, 300 280 C 360 340, 240 400, 180 460 C 120 520, 60 580, 120 640"
                    stroke="#8B7CF6"
                    strokeWidth="3"
                    strokeDasharray="6 8"
                    opacity="0.6"
                  />
                  <path
                    d="M300 160 C 240 220, 120 220, 60 280 C 0 340, 120 400, 180 460 C 240 520, 300 580, 240 640"
                    stroke="#3A66A3"
                    strokeWidth="3"
                    strokeDasharray="6 8"
                    opacity="0.6"
                  />
                  <g fill="#A78BFA" opacity="0.8">
                    <circle cx="90" cy="220" r="8" />
                    <circle cx="270" cy="220" r="8" />
                    <circle cx="180" cy="340" r="10" />
                    <circle cx="120" cy="460" r="7" />
                    <circle cx="240" cy="460" r="7" />
                  </g>
                  <defs>
                    <radialGradient id="bioGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8B7CF6" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          )}

          {step.illustrationTheme === 'attention' && (
            <div className="w-full h-full relative bg-gradient-to-b from-[#2A1428] via-[#1A1224] to-[#090810]">
              <div className="absolute inset-0 opacity-45">
                <svg className="w-full h-full" viewBox="0 0 360 780" fill="none">
                  <circle cx="180" cy="300" r="120" stroke="#E11D48" strokeWidth="2" opacity="0.3" />
                  <circle cx="180" cy="300" r="80" stroke="#F43F5E" strokeWidth="3" strokeDasharray="8 6" opacity="0.5" />
                  <circle cx="180" cy="300" r="40" fill="#E11D48" opacity="0.2" />
                  {/* Rapid notification sparks */}
                  <rect x="70" y="180" width="80" height="24" rx="12" fill="#E11D48" opacity="0.6" />
                  <rect x="210" y="220" width="90" height="24" rx="12" fill="#8B7CF6" opacity="0.5" />
                  <rect x="80" y="380" width="100" height="24" rx="12" fill="#F59E0B" opacity="0.5" />
                  <rect x="200" y="420" width="85" height="24" rx="12" fill="#3B82F6" opacity="0.6" />
                  {/* Cooked flame accent */}
                  <path d="M180 260 Q195 285 180 310 Q165 285 180 260 Z" fill="#F43F5E" opacity="0.8" />
                </svg>
              </div>
            </div>
          )}

          {step.illustrationTheme === 'textbook' && (
            <div className="w-full h-full relative bg-gradient-to-b from-[#161C30] via-[#101424] to-[#07080E]">
              <div className="absolute inset-0 opacity-40">
                <svg className="w-full h-full" viewBox="0 0 360 780" fill="none">
                  {/* Heavy textbook stack */}
                  <rect x="90" y="240" width="180" height="30" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
                  <rect x="80" y="275" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                  <rect x="70" y="312" width="220" height="35" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
                  {/* Fast modern pulse line */}
                  <path d="M40 420 Q120 380 180 430 T320 410" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="180" cy="430" r="6" fill="#F43F5E" />
                </svg>
              </div>
            </div>
          )}

          {step.illustrationTheme === 'overload' && (
            <div className="w-full h-full relative bg-gradient-to-b from-[#1F142D] via-[#131122] to-[#07080D]">
              <div className="absolute inset-0 opacity-40">
                <svg className="w-full h-full" viewBox="0 0 360 780" fill="none">
                  <path d="M60 200 L180 300 L300 220" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M180 300 L90 420 L270 410" stroke="#8B5CF6" strokeWidth="2" />
                  <path d="M180 300 L180 480" stroke="#EC4899" strokeWidth="2" strokeDasharray="6 6" />
                  <circle cx="180" cy="300" r="18" fill="#4F46E5" opacity="0.7" />
                  <circle cx="90" cy="420" r="14" fill="#9333EA" opacity="0.6" />
                  <circle cx="270" cy="410" r="14" fill="#DB2777" opacity="0.6" />
                </svg>
              </div>
            </div>
          )}

          {step.illustrationTheme === 'solution' && (
            <div className="w-full h-full relative bg-gradient-to-b from-[#1A1A3C] via-[#13182C] to-[#080911]">
              <div className="absolute inset-0 opacity-50">
                <svg className="w-full h-full" viewBox="0 0 360 780" fill="none">
                  {/* Clean cards floating in harmony */}
                  <g filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))">
                    <rect x="70" y="210" width="220" height="54" rx="14" fill="#2E2055" stroke="#7C3AED" strokeWidth="1.5" />
                    <circle cx="100" cy="237" r="12" fill="#8B5CF6" />
                    <rect x="125" y="228" width="130" height="8" rx="4" fill="#C4B5FD" />
                    <rect x="125" y="242" width="80" height="6" rx="3" fill="#8B5CF6" opacity="0.7" />

                    <rect x="70" y="280" width="220" height="54" rx="14" fill="#1C2E4A" stroke="#2563EB" strokeWidth="1.5" />
                    <circle cx="100" cy="307" r="12" fill="#3B82F6" />
                    <rect x="125" y="298" width="120" height="8" rx="4" fill="#93C5FD" />
                    <rect x="125" y="312" width="70" height="6" rx="3" fill="#3B82F6" opacity="0.7" />

                    <rect x="70" y="350" width="220" height="54" rx="14" fill="#1B382F" stroke="#059669" strokeWidth="1.5" />
                    <circle cx="100" cy="377" r="12" fill="#10B981" />
                    <rect x="125" y="368" width="140" height="8" rx="4" fill="#A7F3D0" />
                    <rect x="125" y="382" width="90" height="6" rx="3" fill="#10B981" opacity="0.7" />
                  </g>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Shading overlay gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#07080C]/75 via-[#07080C]/20 via-55% to-[#07080C]/85 pointer-events-none" />

        {/* Text presentation */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 min-[380px]:px-8 sm:px-[9%] pointer-events-none">
          <h2 className="text-[27px] min-[360px]:text-[31px] sm:text-[37px] lg:text-[42px] font-extrabold tracking-[-0.02em] leading-[1.15] max-w-[360px] text-[#F4F5FA] drop-shadow-md">
            {step.title}{' '}
            {step.highlightText && (
              <span className="text-[#B9A6F7]">{step.highlightText}</span>
            )}
          </h2>
          <p className="text-[14px] min-[360px]:text-[15px] sm:text-[16px] text-[#B7BCD0] mt-3.5 max-w-[320px] leading-[1.5] drop-shadow">
            {step.subtitle}{' '}
            {step.id === 'h1' && step.highlightText && (
              <>
                <span className="text-[#B9A6F7]">{step.highlightText}</span>{' '}
                {step.afterHighlight}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
