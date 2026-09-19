import React from 'react';
import { ONBOARDING_LESSONS } from '../data/mockData';

export const LessonsScreen: React.FC = () => {
  return (
    <div className="max-w-[600px] w-full mx-auto px-4 min-[380px]:px-6 pt-20 sm:pt-24 pb-28 sm:pb-32 min-h-[100dvh] flex flex-col justify-center">
      <h2 className="text-[24px] min-[360px]:text-[28px] sm:text-[32px] font-extrabold tracking-[-0.02em] text-center leading-[1.22] max-w-[460px] mx-auto text-[#EDEEF5]">
        we'll turn your boring study materials into bite-sized lessons
      </h2>
      <p className="text-[14px] sm:text-[14.5px] text-[#8B90A5] text-center mt-2.5 sm:mt-3.5 max-w-[360px] mx-auto leading-[1.5]">
        Turn long chapters into short pieces you can finish quickly.
      </p>

      <div className="grid gap-2.5 mt-6 sm:mt-7 max-w-[440px] w-full mx-auto">
        {ONBOARDING_LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className="w-full text-left rounded-2xl text-white text-[14.5px] font-bold p-4 leading-[1.35] shadow-md transition-transform active:scale-[0.985] cursor-default"
            style={{ backgroundColor: lesson.bgHex }}
          >
            {lesson.title}
            <small className="block font-semibold opacity-80 text-[12.5px] mt-1">
              {lesson.subject} · {lesson.duration}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
