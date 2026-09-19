import React from 'react';

interface QuizScreenProps {
  selectedAnswer?: string;
  onSelectAnswer: (answer: string) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div className="max-w-[600px] w-full mx-auto px-4 min-[380px]:px-6 pt-20 sm:pt-24 pb-28 sm:pb-32 min-h-[100dvh] flex flex-col justify-center">
      <h2 className="text-[24px] min-[360px]:text-[28px] sm:text-[32px] font-extrabold tracking-[-0.02em] text-center leading-[1.22] max-w-[460px] mx-auto text-[#EDEEF5]">
        to make learning as engaging as scrolling
      </h2>
      <p className="text-[15px] sm:text-[15.5px] text-[#C6CADB] leading-[1.55] mt-3.5 sm:mt-4 max-w-[420px] mx-auto text-center">
        If you're having food energy, which molecule stores the usable energy?
      </p>

      <div className="grid gap-3 mt-6 max-w-[380px] w-full mx-auto">
        {['Oxygen', 'ATP'].map((option) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={option}
              onClick={() => onSelectAnswer(option)}
              className={`w-full min-h-[54px] rounded-2xl p-4 text-[16px] font-bold text-[#EDEEF5] transition-all duration-180 border active:scale-[0.98] cursor-pointer ${
                isSelected
                  ? 'bg-[#3A66A3] border-[#3A66A3] text-white shadow-lg'
                  : 'bg-[#232533] border-[#3A3C4E] hover:border-[#4E5066]'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
