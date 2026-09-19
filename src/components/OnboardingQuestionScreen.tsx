import React from 'react';
import { QuestionStep } from '../types';
import { QuestionGraphic } from './QuestionGraphic';

interface OnboardingQuestionScreenProps {
  step: QuestionStep;
  selectedValue?: string;
  onSelectOption: (val: string) => void;
}

export const OnboardingQuestionScreen: React.FC<OnboardingQuestionScreenProps> = ({
  step,
  selectedValue,
  onSelectOption,
}) => {
  return (
    <div className="max-w-[600px] w-full mx-auto px-4 min-[380px]:px-6 pt-20 sm:pt-24 pb-28 sm:pb-32 min-h-[100dvh] flex flex-col justify-center">
      <QuestionGraphic
        type={step.iconType}
        selectedValue={selectedValue}
        stepId={step.id}
      />

      <h2 className="text-[24px] min-[360px]:text-[28px] sm:text-[32px] font-extrabold tracking-[-0.02em] text-center leading-[1.22] mt-6 sm:mt-9 max-w-[460px] mx-auto text-[#F4F5FA]">
        {step.title}
      </h2>

      {step.subtitle && (
        <p className="text-[14px] sm:text-[14.5px] text-[#8B90A5] text-center mt-2.5 sm:mt-3 max-w-[360px] mx-auto leading-[1.5]">
          {step.subtitle}
        </p>
      )}

      <div
        className={`mt-6 sm:mt-8 ${
          step.layout === 'list'
            ? 'flex flex-col gap-2.5 sm:gap-3 max-w-[420px] w-full mx-auto'
            : 'grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5 sm:gap-3 max-w-[480px] w-full mx-auto'
        }`}
      >
        {step.options.map((opt, idx) => {
          const isSelected = selectedValue === opt.label;
          const isWide = opt.wide || step.layout === 'list';

          let selectedStyle = '';
          if (isSelected) {
            selectedStyle = opt.isLate
              ? 'bg-[#6F62C8] border-[#6F62C8] text-white shadow-lg'
              : 'bg-[#3A66A3] border-[#3A66A3] text-white shadow-lg';
          } else {
            selectedStyle = 'bg-[#1D1F2A] border-[#34364B] text-[#EDEEF5] hover:border-[#4E5066]';
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(opt.label)}
              className={`w-full min-h-[52px] border-[1.5px] rounded-2xl p-3.5 sm:p-4 text-[15px] font-bold transition-all duration-180 active:scale-[0.98] cursor-pointer ${
                isWide ? 'min-[360px]:col-span-2' : ''
              } ${step.layout === 'list' ? 'text-left px-5 rounded-[18px]' : 'text-center'} ${selectedStyle}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
