import React from 'react';
import { STUDY_TAGS } from '../data/mockData';

export const TagsScreen: React.FC = () => {
  return (
    <div className="max-w-[600px] w-full mx-auto px-4 min-[380px]:px-6 pt-20 sm:pt-24 pb-28 sm:pb-32 min-h-[100dvh] flex flex-col justify-center">
      <h2 className="text-[24px] min-[360px]:text-[28px] sm:text-[32px] font-extrabold tracking-[-0.02em] text-center leading-[1.22] max-w-[460px] mx-auto text-[#EDEEF5]">
        we'll turn your boring study materials into
      </h2>

      <div className="flex flex-wrap gap-2.5 justify-center mt-7 sm:mt-9 max-w-[420px] mx-auto">
        {STUDY_TAGS.map((tag, idx) => (
          <span
            key={idx}
            className="min-h-[44px] flex items-center justify-center px-4 py-2.5 rounded-xl text-[13.5px] font-extrabold text-white shadow-md transition-transform hover:scale-105 active:scale-95 select-none"
            style={{ backgroundColor: tag.color }}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};
