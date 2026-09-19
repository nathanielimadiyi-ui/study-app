import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCw, Play, Pause, CheckCircle2 } from 'lucide-react';
import { StudioToolItem } from '../types';

interface StudioModalProps {
  tool: StudioToolItem | null;
  onClose: () => void;
}

export const StudioModal: React.FC<StudioModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1D1F2A] border border-[#2F3142] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3142]">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: tool.bgHex }}
            >
              {tool.title.charAt(0)}
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white">{tool.title}</h3>
              <p className="text-[11px] text-[#8B90A5]">{tool.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#232533] hover:bg-[#2F3142] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Dynamic Modal Content based on tool */}
        <div className="p-6 overflow-y-auto">
          {tool.id === 'tool-flashcards' && <FlashcardsView />}
          {tool.id === 'tool-quiz' && <QuizView />}
          {tool.id === 'tool-audio' && <AudioRecapView />}
          {tool.id === 'tool-guide' && <StudyGuideView />}
          {tool.id === 'tool-mindmap' && <MindMapView />}
        </div>
      </div>
    </div>
  );
};

// Sub-view: Flashcards
const FlashcardsView: React.FC = () => {
  const cards = [
    { front: 'What is the primary role of ATP in cellular processes?', back: 'ATP acts as the universal chemical energy currency, powering active transport, mechanical work, and biosynthesis.' },
    { front: 'What molecule is produced during the Calvin cycle?', back: 'Glyceraldehyde-3-phosphate (G3P), which is subsequently used to synthesize glucose and other carbohydrates.' },
    { front: 'Define osmotic pressure in semipermeable membranes.', back: 'The minimum pressure needed to prevent the inward flow of its pure solvent across a semipermeable membrane.' },
  ];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs font-semibold text-[#8B90A5] mb-3">
        Card {index + 1} of {cards.length}
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="w-full min-h-[220px] bg-[#232533] border border-[#3A3C4E] rounded-2xl p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#6F62C8] transition-all relative group"
      >
        <span className="absolute top-3 right-3 text-[11px] font-medium text-[#8B90A5] flex items-center gap-1">
          <RotateCw size={12} /> Tap to flip
        </span>
        <div className="text-xs font-bold uppercase tracking-wider text-[#8B7CF6] mb-2">
          {flipped ? 'Answer' : 'Question'}
        </div>
        <p className="text-[15px] sm:text-[16px] font-semibold text-white leading-relaxed">
          {flipped ? cards[index].back : cards[index].front}
        </p>
      </div>

      <div className="flex items-center justify-between w-full mt-5">
        <button
          disabled={index === 0}
          onClick={() => { setIndex(i => i - 1); setFlipped(false); }}
          className="px-4 py-2 rounded-xl bg-[#232533] text-sm font-semibold disabled:opacity-30 enabled:hover:bg-[#2F3142] flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <button
          disabled={index === cards.length - 1}
          onClick={() => { setIndex(i => i + 1); setFlipped(false); }}
          className="px-4 py-2 rounded-xl bg-[#8B7CF6] text-white text-sm font-semibold disabled:opacity-30 enabled:hover:bg-[#7A6BD0] flex items-center gap-1 cursor-pointer"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Sub-view: Practice Quiz
const QuizView: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const question = "Which enzyme catalyzes the unwinding of the DNA double helix during replication?";
  const options = [
    { label: "DNA Ligase", correct: false },
    { label: "Helicase", correct: true },
    { label: "RNA Polymerase", correct: false },
    { label: "Topoisomerase", correct: false }
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm font-bold text-white leading-snug">{question}</div>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let stateStyle = "bg-[#232533] border-[#3A3C4E] text-[#EDEEF5]";
          if (submitted) {
            if (opt.correct) stateStyle = "bg-emerald-900/60 border-emerald-500 text-emerald-100";
            else if (selected === i) stateStyle = "bg-rose-900/60 border-rose-500 text-rose-100";
          } else if (selected === i) {
            stateStyle = "bg-[#3A66A3] border-[#3A66A3] text-white";
          }

          return (
            <button
              key={i}
              onClick={() => { if (!submitted) setSelected(i); }}
              className={`w-full text-left p-3.5 rounded-xl border text-[14px] font-medium transition-all cursor-pointer ${stateStyle}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          disabled={selected === null}
          onClick={() => setSubmitted(true)}
          className="w-full mt-2 py-3 rounded-xl bg-[#8B7CF6] text-white font-bold text-sm disabled:opacity-40 enabled:hover:bg-[#7A6BD0] cursor-pointer"
        >
          Submit Answer
        </button>
      ) : (
        <div className="pt-2 text-center">
          <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1 mb-2">
            <CheckCircle2 size={14} /> Correct answer: Helicase
          </div>
          <button
            onClick={() => { setSelected(null); setSubmitted(false); }}
            className="text-xs text-[#8B7CF6] underline cursor-pointer"
          >
            Try another question
          </button>
        </div>
      )}
    </div>
  );
};

// Sub-view: Audio Recap
const AudioRecapView: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);

  return (
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#8b6b08]/20 border border-[#8b6b08]/40 mx-auto flex items-center justify-center text-[#d19a17]">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-12 h-12 rounded-full bg-[#8b6b08] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
      </div>

      <div>
        <h4 className="font-bold text-white text-[15px]">Cellular Respiration in 3 Minutes</h4>
        <p className="text-xs text-[#8B90A5] mt-1">Generated voice recap from course materials</p>
      </div>

      <div className="w-full bg-[#232533] h-2 rounded-full overflow-hidden relative cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
          setProgress(p);
        }}
      >
        <div className="bg-[#8b6b08] h-full rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-[11px] text-[#8B90A5]">
        <span>0:52</span>
        <span>3:10</span>
      </div>
    </div>
  );
};

// Sub-view: Study Guide
const StudyGuideView: React.FC = () => {
  return (
    <div className="space-y-3 text-left">
      <div className="p-3 bg-[#232533] rounded-xl border border-[#3A3C4E]">
        <div className="text-xs font-bold text-[#8B7CF6] uppercase tracking-wider">Key Term</div>
        <div className="text-sm font-semibold text-white mt-0.5">Aerobic Respiration</div>
        <div className="text-xs text-[#C6CADB] mt-1">Process of cellular respiration that takes place in the presence of oxygen gas to produce energy from food.</div>
      </div>
      <div className="p-3 bg-[#232533] rounded-xl border border-[#3A3C4E]">
        <div className="text-xs font-bold text-[#3A66A3] uppercase tracking-wider">Mechanism</div>
        <div className="text-sm font-semibold text-white mt-0.5">Electron Transport Chain</div>
        <div className="text-xs text-[#C6CADB] mt-1">Series of four protein complexes that couple redox reactions, creating an electrochemical gradient that leads to the creation of ATP.</div>
      </div>
    </div>
  );
};

// Sub-view: Mind Map
const MindMapView: React.FC = () => {
  return (
    <div className="relative h-[220px] bg-[#14151D] rounded-xl border border-[#2F3142] p-4 flex items-center justify-center overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#6937a1" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#317342" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="#8b6b08" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      {/* Central node */}
      <div className="relative z-10 px-3 py-1.5 rounded-lg bg-[#8B7CF6] text-white text-xs font-extrabold shadow-lg">
        Cell Metabolism
      </div>
      {/* Branch nodes */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-[#6937a1] text-white text-[11px] font-bold">
        Glycolysis
      </div>
      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded bg-[#317342] text-white text-[11px] font-bold">
        Krebs Cycle
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-2.5 py-1 rounded bg-[#8b6b08] text-white text-[11px] font-bold">
        Oxidative Phos.
      </div>
    </div>
  );
};
