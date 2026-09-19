import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  ArrowRight,
  Check,
  X,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../utils/cn';

export interface QuizQuestion {
  id?: string;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  sourceRef?: string;
}

export interface QuizViewerProps {
  title: string;
  questions?: QuizQuestion[];
  onBack: () => void;
  onTriggerToast: (msg: string) => void;
}

export const DEFAULT_NIGERIA_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    q: 'In the Kingdom of Benin’s guild system, which royal guild was exclusively commissioned by the Oba to carve commemorative ancestor tusks and sacred court woodwork?',
    options: [
      'Igbesanmwan (Royal Wood & Ivory Carvers)',
      'Igun Eronmwon (Brass Casters Guild)',
      'Owina (Royal Weavers Guild)',
      'Isekpokin (Leather Box Makers)',
    ],
    correct: 0,
    explanation:
      'The Igbesanmwan was the royal guild of wood and ivory carvers under direct royal patronage of the Oba, producing commemorative tusks, masks, and architectural panels.',
    sourceRef: 'Sources: Pre-Colonial Benin Guild Archives & Court Metallurgy',
  },
  {
    id: 'q-2',
    q: 'Which constitutional body in the Oyo Empire held the power to present the symbolic calabash of rejection to an authoritarian Alaafin?',
    options: [
      'The Oyo Mesi (Council of Kingmakers)',
      'The Ogboni Secret Society',
      'The Aare Ona Kakanfo (Field Marshal)',
      'The Ilari (Palace Messengers)',
    ],
    correct: 0,
    explanation:
      'Led by the Bashorun (Prime Minister), the Oyo Mesi was a council of seven hereditary chiefs who served as the supreme constitutional check on the Alaafin.',
    sourceRef: 'Sources: Oyo Imperial Governance & Yoruba Political History',
  },
  {
    id: 'q-3',
    q: 'Dating back to ~500 BC in central Nigeria, which Iron Age culture is famous for hollow terracotta heads with pierced triangular eyes and intricate coiffures?',
    options: [
      'The Nok Culture',
      'The Igbo-Ukwu Metallurgical Complex',
      'The Kingdom of Ife',
      'The Daima Mound Settlement',
    ],
    correct: 0,
    explanation:
      'The Nok Culture discovered in Kaduna State and the Jos Plateau represents the earliest verified iron-smelting and sophisticated terracotta sculpting in Sub-Saharan Africa.',
    sourceRef: 'Sources: Archaeology of Central Nigeria & Nok Terracotta Analysis',
  },
  {
    id: 'q-4',
    q: 'The Kingdom of Nri was unique among pre-colonial Nigerian states because the Eze Nri maintained political order primarily through:',
    options: [
      'Moral authority, ritual sanctions, and title systems',
      'A permanent standing imperial cavalry army',
      'Strict control of coastal maritime gun trade',
      'Direct military garrisons across tributaries',
    ],
    correct: 0,
    explanation:
      'The Kingdom of Nri was a sacred theocracy where peace taboos, purification of land offenses (Ikpu Alu), and the Ozo title system governed society without an army.',
    sourceRef: 'Sources: Igbo-Ukwu Bronzes & Sacred Monarchy of Nri',
  },
  {
    id: 'q-5',
    q: 'What was the defensive network of ramparts and dry moats enclosing Benin City, documented as one of humanity’s largest earthworks, known as?',
    options: [
      'The Iya (Walls of Benin)',
      'The Sungbo Eredo',
      'The Kano Badala Ramparts',
      'The Rano Protective Moat',
    ],
    correct: 0,
    explanation:
      'The Iya (Walls of Benin) spanned over 16,000 kilometers of defensive earthworks, dry ditches, and reinforced portals protecting the Benin urban center and rural countryside.',
    sourceRef: 'Sources: Historical Geography of Benin Kingdom & Guinness Earthworks Survey',
  },
  {
    id: 'q-6',
    q: 'Who founded the Sokoto Caliphate following the 1804 reform movement, uniting various Hausa city-states under a unified administrative and judicial system?',
    options: [
      'Usman dan Fodio (Shehu)',
      'Muhammad Bello',
      'Abdullahi dan Fodio',
      'Mai Idris Alooma',
    ],
    correct: 0,
    explanation:
      'Usman dan Fodio was a renowned Islamic scholar and leader who unified the Hausa city-states into emirates under the Sokoto Caliphate, fostering scholarship and commerce.',
    sourceRef: 'Sources: 19th Century Sokoto Caliphate Manuscripts & Northern Nigerian History',
  },
];

export const QuizViewer: React.FC<QuizViewerProps> = ({
  title,
  questions = DEFAULT_NIGERIA_QUIZ_QUESTIONS,
  onBack,
  onTriggerToast,
}) => {
  const activeQuestions =
    questions && questions.length > 0 ? questions : DEFAULT_NIGERIA_QUIZ_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentQ = activeQuestions[currentIndex];
  const selectedChoice = selectedAnswers[currentIndex];
  const hasAnsweredCurrent = selectedChoice !== undefined;
  const isCorrectCurrent = hasAnsweredCurrent && selectedChoice === currentQ.correct;

  // Calculate score
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctAnswersCount = Object.entries(selectedAnswers).filter(
    ([qIdx, choice]) => activeQuestions[Number(qIdx)]?.correct === choice
  ).length;

  const scorePercentage = Math.round((correctAnswersCount / activeQuestions.length) * 100);

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // Prevent changing after selection
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));

    if (optionIndex === currentQ.correct) {
      onTriggerToast('Correct! Great job! ✨');
    } else {
      onTriggerToast('Incorrect. Check the explanation below.');
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    onTriggerToast('Quiz reset');
  };

  const displayTitle = title.includes('Quiz')
    ? title
    : `${title} Quiz`;

  return (
    <div className="fixed inset-0 z-50 bg-[#13141C] text-[#F4F5FA] flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Header */}
      <header className="shrink-0 bg-[#13141C] z-20 border-b border-white/5">
        <div className="h-14 flex items-center justify-between px-4 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft size={22} strokeWidth={2} />
            </button>
            <div className="min-w-0">
              <h1 className="text-[18px] font-normal text-[#F4F5FA] tracking-tight truncate">
                {displayTitle}
              </h1>
              <span className="text-[11.5px] text-[#8B90A5] block -mt-0.5">
                Diagnostic Assessment • Grounded in Notebook Sources
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 relative">
            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                onTriggerToast('Quiz link copied to clipboard');
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              aria-label="Share"
            >
              <Share2 size={19} strokeWidth={1.8} />
            </button>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              aria-label="More"
            >
              <MoreVertical size={19} strokeWidth={1.8} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-48 rounded-2xl bg-[#1D1F2A] border border-[#2F3142] shadow-2xl py-2 z-50">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleReset();
                  }}
                  className="w-full text-left px-4 py-2.5 text-[13.5px] hover:bg-white/5 text-[#E8EAED] cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw size={15} />
                  Restart Quiz
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Question Progress Bar */}
        <div className="h-1 bg-white/5 w-full">
          <div
            className="h-full bg-[#8ab4f8] transition-all duration-300"
            style={{
              width: `${((currentIndex + (hasAnsweredCurrent ? 1 : 0)) / activeQuestions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      {submitted ? (
        /* QUIZ RESULTS SUMMARY */
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6 max-w-[620px] w-full mx-auto space-y-6">
          <div className="text-center p-8 rounded-3xl bg-[#1D1F2A] border border-white/10 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#8ab4f8]/10 text-[#8ab4f8] flex items-center justify-center mx-auto">
              <Award size={32} />
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#F4F5FA]">Quiz Completed!</h2>
              <p className="text-[14px] text-[#8B90A5] mt-1">
                You scored {correctAnswersCount} out of {activeQuestions.length} ({scorePercentage}%)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 max-w-[320px] mx-auto">
              <div className="p-3 rounded-2xl bg-[#14151D] border border-emerald-500/20 text-center">
                <span className="text-[20px] font-bold text-[#81C995] block">{correctAnswersCount}</span>
                <span className="text-[11.5px] text-[#8B90A5]">Correct</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#14151D] border border-red-500/20 text-center">
                <span className="text-[20px] font-bold text-[#E06C75] block">
                  {activeQuestions.length - correctAnswersCount}
                </span>
                <span className="text-[11.5px] text-[#8B90A5]">Review Needed</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 h-12 rounded-full border border-white/10 text-[14px] font-medium text-[#E8EAED] hover:bg-white/5 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw size={16} />
                Retake Quiz
              </button>
              <button
                onClick={onBack}
                className="flex-1 h-12 rounded-full bg-[#8ab4f8] text-[#13141C] text-[14px] font-semibold hover:bg-[#7ba4e8] active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={16} />
                Done
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-3 pt-2">
            <h3 className="text-[15px] font-medium text-[#E8EAED] px-1">Detailed Review</h3>
            {activeQuestions.map((q, idx) => {
              const userChoice = selectedAnswers[idx];
              const isCorrect = userChoice === q.correct;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#1D1F2A] border border-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#8B90A5]">Question {idx + 1}</span>
                    <span
                      className={cn(
                        'text-[11.5px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1',
                        isCorrect
                          ? 'bg-emerald-500/10 text-[#81C995]'
                          : 'bg-red-500/10 text-[#E06C75]'
                      )}
                    >
                      {isCorrect ? <Check size={12} /> : <X size={12} />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-[15px] text-[#F4F5FA] font-medium leading-snug">{q.q}</p>
                  
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[13px] p-2.5 rounded-xl bg-[#14151D] text-[#81C995] border border-emerald-500/20">
                      ✓ Correct: {q.options[q.correct]}
                    </div>
                    {!isCorrect && userChoice !== undefined && (
                      <div className="text-[13px] p-2.5 rounded-xl bg-[#14151D] text-[#E06C75] border border-red-500/20">
                        ✗ Your answer: {q.options[userChoice]}
                      </div>
                    )}
                  </div>

                  <p className="text-[12.5px] text-[#8B90A5] italic pt-1">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION VIEW */
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 max-w-[620px] w-full mx-auto flex flex-col justify-between">
          <div className="space-y-5">
            {/* Question Counter & Meta */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-[#8ab4f8] bg-[#8ab4f8]/10 px-3 py-1 rounded-full">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              {hasAnsweredCurrent && (
                <span
                  className={cn(
                    'text-[12.5px] font-semibold flex items-center gap-1',
                    isCorrectCurrent ? 'text-[#81C995]' : 'text-[#E06C75]'
                  )}
                >
                  {isCorrectCurrent ? <Check size={15} /> : <X size={15} />}
                  {isCorrectCurrent ? 'Correct' : 'Review Answer'}
                </span>
              )}
            </div>

            {/* Question Stem */}
            <h2 className="text-[20px] sm:text-[22px] font-normal leading-[1.38] text-[#F4F5FA]">
              {currentQ.q}
            </h2>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedChoice === idx;
                const isTheCorrectOption = idx === currentQ.correct;

                let optionStyles = 'bg-[#1E202B] border-white/5 hover:border-white/15 text-[#E8EAED]';

                if (hasAnsweredCurrent) {
                  if (isTheCorrectOption) {
                    optionStyles =
                      'bg-emerald-950/40 border-emerald-500/50 text-[#81C995] font-medium shadow-lg shadow-emerald-950/20';
                  } else if (isSelected && !isCorrectCurrent) {
                    optionStyles =
                      'bg-red-950/40 border-red-500/50 text-[#E06C75]';
                  } else {
                    optionStyles = 'bg-[#1E202B]/60 border-white/5 text-[#7E8295] opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnsweredCurrent}
                    className={cn(
                      'w-full text-left p-4 rounded-2xl border text-[15px] leading-snug transition-all flex items-start gap-3.5 cursor-pointer',
                      optionStyles
                    )}
                  >
                    <span
                      className={cn(
                        'w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[12px] font-semibold mt-0.5 border',
                        hasAnsweredCurrent && isTheCorrectOption
                          ? 'border-emerald-500 bg-emerald-500/20 text-[#81C995]'
                          : hasAnsweredCurrent && isSelected
                            ? 'border-red-500 bg-red-500/20 text-[#E06C75]'
                            : 'border-white/10 bg-black/20 text-[#8B90A5]'
                      )}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {hasAnsweredCurrent && isTheCorrectOption && (
                      <Check size={18} className="text-[#81C995] shrink-0 mt-0.5" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrectCurrent && (
                      <X size={18} className="text-[#E06C75] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box (Appears after answer is selected) */}
            {hasAnsweredCurrent && (
              <div className="p-4 rounded-2xl bg-[#181A24] border border-white/10 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#8ab4f8]">
                  <Sparkles size={15} />
                  <span>Explanation & Source Context</span>
                </div>
                <p className="text-[13.5px] text-[#C4C7CC] leading-relaxed">
                  {currentQ.explanation}
                </p>
                {currentQ.sourceRef && (
                  <p className="text-[11.5px] text-[#7E8295] pt-1 border-t border-white/5">
                    {currentQ.sourceRef}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Bottom Controls */}
          <div className="pt-6 pb-2 shrink-0 flex items-center justify-between gap-3 border-t border-white/5 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="h-12 px-5 rounded-full border border-white/10 text-[14px] font-medium text-[#C4C7CC] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className="h-12 px-6 rounded-full bg-[#8ab4f8] text-[#13141C] text-[14px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7ba4e8] active:scale-98 transition flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>{currentIndex === activeQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
