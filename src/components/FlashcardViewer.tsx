import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  RotateCcw,
  BookmarkCheck,
  RotateCw,
} from 'lucide-react';

export interface Flashcard {
  id?: string;
  topic?: string;
  q: string; // The front concept / focal concept headline
  a: string; // The core takeaway / key definition
  points?: string[]; // High-yield study bullet points
  explanation?: string; // Deep contextual overview / exam relevance
}

interface FlashcardViewerProps {
  title: string;
  cards?: Flashcard[];
  onBack: () => void;
  onTriggerToast: (msg: string) => void;
}

export const DEFAULT_NIGERIA_CARDS: Flashcard[] = [
  {
    id: 'card-1',
    topic: 'Kingdom of Benin',
    q: 'Guild Specialization: The Igbesanmwan Wood & Ivory Carvers',
    a: 'Royal guild of wood and ivory artisans operating under direct Oba commission.',
    points: [
      'Exclusive Royal Commission: Produced commemorative ancestor altar tusks, Queen Mother heads, and sacred palace panels.',
      'Protected Trade Secrets: Maintained strictly within hereditary guild compounds to preserve metallurgical & carving techniques.',
      'Socio-Political Standing: Held high prestige and designated titles within the royal court hierarchy.',
    ],
    explanation: 'The guild system organized Benin craftsmanship into specialized hereditary guilds to sustain royal artistic and religious standards.',
  },
  {
    id: 'card-2',
    topic: 'Oyo Empire',
    q: 'Constitutional Monarchy: The Alaafin of Oyo',
    a: 'Supreme constitutional and spiritual ruler of the imperial Yoruba state.',
    points: [
      'Executive Authority: Governed provinces through royal emissaries and appointed supreme cavalry generals (Aare Ona Kakanfo).',
      'Constitutional Checks: Authority was actively counterbalanced by the Oyo Mesi (Council of Seven Kingmakers) and the Ogboni Society.',
      'Rejection Protocol: If an Alaafin acted autocratically, the council presented the calabash of rejection to mandate abdication.',
    ],
    explanation: 'The Oyo political system was an intricate constitutional monarchy that distributed authority between monarch and civilian councils.',
  },
  {
    id: 'card-3',
    topic: 'Oyo Empire',
    q: 'State Council & Kingmakers: The Oyo Mesi',
    a: 'Council of seven hereditary noble kingmakers headed by the Bashorun (Prime Minister).',
    points: [
      'Vetting & Succession: Held sole responsibility for vetting, electing, and crowning successive Alaafins.',
      'Checks & Balances: Held legal power to veto imperial decrees and check royal centralization.',
      'Civic Representation: Represented non-royal ward citizens and state interests at the capital of Oyo-Ile.',
    ],
    explanation: 'Led by the Bashorun, the Oyo Mesi served as the fundamental institutional check preserving constitutional balance in Oyo.',
  },
  {
    id: 'card-4',
    topic: 'Nok Civilization',
    q: 'Early Iron Metallurgy & Terracotta: The Nok Culture (~500 BC)',
    a: 'Sub-Saharan Africa’s earliest verified iron-smelting and figurative terracotta tradition.',
    points: [
      'Distinctive Artistry: Famous for hollow clay sculptures with pierced triangular eyes, flared nostrils, and elaborate coiffures.',
      'Early Metallurgical Mastery: Excavated iron-smelting bloomery furnaces dating from ~500 BC across Kaduna and the Jos Plateau.',
      'Archaeological Significance: Precursor to subsequent regional sculptural and metallurgical traditions in central West Africa.',
    ],
    explanation: 'The Nok Culture demonstrates independent early development of iron technology and complex artistic specialization in West Africa.',
  },
  {
    id: 'card-5',
    topic: 'Kingdom of Nri',
    q: 'Sacred Theocracy: Kingdom of Nri & Igbo-Ukwu Bronzes',
    a: 'Spiritual theocracy led by the Eze Nri celebrated for intricate 9th-century bronze metallurgy.',
    points: [
      'Moral Authority: Ruled without a standing army through spiritual sanctions, peace taboos, and the Ozo title system.',
      'Igbo-Ukwu Bronzes: Renowned for sophisticated lost-wax casting technique with exquisite micro-beading and filigree detail.',
      'Cosmic Cleansing: Granted exclusive authority to purify land offenses (Ikpu Alu) across regional Igbo settlements.',
    ],
    explanation: 'The Kingdom of Nri was a unique religious and political network that integrated economic prosperity with spiritual authority.',
  },
  {
    id: 'card-6',
    topic: 'Sokoto Caliphate',
    q: '1804 Reform Movement: Usman dan Fodio & Caliphate Governance',
    a: 'Islamic scholar who founded the Sokoto Caliphate, uniting regional city-states.',
    points: [
      'Administrative Consolidation: Unified fragmented Hausa kingdoms into organized emirates with standardized judicial codes.',
      'Literary Renaissance: Extensive philosophical and legal writings in Arabic, Fulfulde, and Hausa promoting civic justice and literacy.',
      'Commercial Expansion: Developed massive trans-regional textile manufacturing, agriculture, and caravan trade networks.',
    ],
    explanation: 'The Sokoto Caliphate created one of the largest pre-colonial states in 19th-century Africa, transforming scholarship and trade.',
  },
  {
    id: 'card-7',
    topic: 'Kingdom of Benin',
    q: 'Monumental Earthworks: The Iya (Walls of Benin City)',
    a: 'Massive interconnected defensive rampart and moat network enclosing Benin City.',
    points: [
      'Engineering Scale: Estimated over 16,000 km of interconnected earthworks spanning urban and rural districts.',
      'Defensive Fortification: Combined steep dry moats, earthen ramparts, and fortified portals against regional conflicts.',
      'World Heritage: Recognized as one of the largest human-engineered earthwork constructions in pre-modern history.',
    ],
    explanation: 'The Iya represented sophisticated civic planning and defense engineering coordinated by the Oba and urban guilds.',
  },
  {
    id: 'card-8',
    topic: 'Kanem-Bornu Empire',
    q: 'Trans-Saharan Commercial Network: Kanem-Bornu Empire',
    a: 'Long-standing empire controlling Lake Chad crossroads and trans-Saharan trade corridors.',
    points: [
      'Strategic Commerce: Controlled northern oasis routes trading salt from Bilma, natron, horses, leatherwork, and textiles.',
      'Cavalry Force: Maintained heavy armored cavalry equipped with Mediterranean warhorses and mail armor.',
      'Dynastic Longevity: Governed under the Mais of the Sayfawa dynasty for nearly one thousand years.',
    ],
    explanation: 'Kanem-Bornu connected Central Sudan with North Africa and the Mediterranean, establishing lasting diplomatic ties.',
  },
];

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  title,
  cards = DEFAULT_NIGERIA_CARDS,
  onBack,
  onTriggerToast,
}) => {
  const activeCards = cards && cards.length > 0 ? cards : DEFAULT_NIGERIA_CARDS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const safeIndex = currentIndex % activeCards.length;
  const currentCard = activeCards[safeIndex] || activeCards[0];

  const handleNext = () => {
    setShowAnswer(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeCards.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeCards.length) % activeCards.length);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    onTriggerToast('Flashcards share link copied to clipboard');
  };

  const displayTitle = title.includes('Flashcards')
    ? title
    : title.includes('Nigeria') || title.includes('Pre-Colon')
      ? 'Nigeria Flashcards'
      : `${title} Flashcards`;

  // Animation variants for switching cards
  const cardSlideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 140 : dir < 0 ? -140 : 0,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? 12 : dir < 0 ? -12 : 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 380,
        damping: 30,
        mass: 0.7,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 140 : -140,
      opacity: 0,
      scale: 0.92,
      rotateY: dir < 0 ? 12 : -12,
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as const,
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#13141C] text-[#F4F5FA] flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="shrink-0 bg-[#13141C] z-20 pt-1 border-b border-white/5">
        <div className="h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-3.5 min-w-0">
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
              <span className="text-[11px] text-[#8B90A5] block -mt-0.5 truncate">
                Card {safeIndex + 1} of {activeCards.length} • Active Concept Synthesis
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 relative">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              aria-label="Share"
            >
              <Share2 size={19} strokeWidth={1.8} />
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              aria-label="More options"
            >
              <MoreVertical size={19} strokeWidth={1.8} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-52 rounded-2xl bg-[#1D1F2A] border border-[#2F3142] shadow-2xl py-2 z-50">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setCurrentIndex(0);
                    setDirection(0);
                    setShowAnswer(false);
                    onTriggerToast('Reset flashcard deck');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[13.5px] hover:bg-white/5 text-[#E8EAED] cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw size={15} />
                  Reset deck
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Deck Progress Bar */}
        <div className="h-1 bg-white/5 w-full overflow-hidden">
          <motion.div
            className="h-full bg-[#8ab4f8]"
            initial={{ width: 0 }}
            animate={{ width: `${((safeIndex + 1) / activeCards.length) * 100}%` }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* INTERACTIVE STUDY FLASHCARD CAROUSEL WITH FLUID MOTION ANIMATION */}
      <div className="flex-1 max-w-[540px] w-full mx-auto px-4 min-[380px]:px-5 pt-3 pb-4 flex flex-col justify-between overflow-hidden relative">
        {/* Card Carousel Stage with AnimatePresence */}
          <div className="w-full flex-1 flex items-center justify-center relative min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentCard.id || 'card'}-${safeIndex}`}
                custom={direction}
                variants={cardSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -55 || info.velocity.x < -300) {
                    handleNext();
                  } else if (info.offset.x > 55 || info.velocity.x > 300) {
                    handlePrev();
                  }
                }}
                onClick={() => setShowAnswer((prev) => !prev)}
                className="w-full h-[60vh] min-h-[390px] max-h-[520px] bg-[#22242F] rounded-[32px] p-7 min-[380px]:p-8 flex flex-col justify-between shadow-2xl transition-shadow duration-200 cursor-pointer select-none overflow-y-auto no-scrollbar border border-white/5 hover:border-white/10"
              >
                {/* Card Top Row: Concept Category & Exact Dynamic Counter */}
                <div className="flex items-center justify-between shrink-0 pb-2.5 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    {currentCard.topic && (
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8ab4f8] bg-[#8ab4f8]/10 px-2.5 py-0.5 rounded">
                        {currentCard.topic}
                      </span>
                    )}
                    <span className="text-[12px] font-medium text-[#8B90A5] bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                      {safeIndex + 1} / {activeCards.length}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTriggerToast(`Card ${safeIndex + 1} of ${activeCards.length}: ${currentCard.topic || 'Concept'}`);
                    }}
                    className="text-[#7E8295] hover:text-white transition-colors p-1 -mr-1 cursor-pointer"
                    aria-label="Card options"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Card Content Area: Concept Headline (Front) vs Synthesized Takeaways (Back) */}
                <div className="my-auto py-3">
                  <AnimatePresence mode="wait">
                    {!showAnswer ? (
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="text-left space-y-3"
                      >
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#8ab4f8]">
                          <Sparkles size={14} />
                          <span>Core Focus Area</span>
                        </div>
                        <h2 className="text-[23px] min-[380px]:text-[25px] sm:text-[26px] font-normal leading-[1.36] text-[#F4F5FA]">
                          {currentCard.q}
                        </h2>
                        <p className="text-[13px] text-[#8B90A5] pt-1">
                          Tap to reveal key definition, synthesized study points, and historical context.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-3.5 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-block text-[11.5px] font-semibold tracking-wider uppercase text-[#81C995] bg-[#81C995]/10 px-2.5 py-0.5 rounded">
                            Key Takeaway & Definition
                          </span>
                          <span className="text-[11.5px] text-[#7E8295] flex items-center gap-1">
                            <BookmarkCheck size={13} className="text-[#81C995]" />
                            Synthesized
                          </span>
                        </div>

                        <h2 className="text-[19px] min-[380px]:text-[21px] font-medium leading-[1.32] text-[#81C995]">
                          {currentCard.a}
                        </h2>

                        {/* Bullet points of the synthesized concept */}
                        {currentCard.points && currentCard.points.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-white/5">
                            <p className="text-[11.5px] uppercase tracking-wider text-[#7E8295] font-semibold">
                              Core Study Takeaways:
                            </p>
                            <ul className="space-y-1.5 text-[13px] text-[#C4C7CC] leading-snug">
                              {currentCard.points.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-[#81C995] shrink-0 font-bold">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {currentCard.explanation && (
                          <p className="text-[12.5px] text-[#8B90A5] leading-relaxed pt-1.5 border-t border-white/5">
                            {currentCard.explanation}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Bottom Row: Flip Toggle Hint */}
                <div className="text-center pt-2.5 shrink-0 border-t border-white/5 flex items-center justify-center gap-1.5">
                  <RotateCw size={13} className="text-[#7E8295]" />
                  <span className="text-[12.5px] font-normal text-[#7E8295] hover:text-[#C4C7CC] transition-colors">
                    {showAnswer ? 'Tap to flip to Concept Overview' : 'Tap to flip to Key Study Takeaways'}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Section Below Card */}
          <div className="mt-4 flex flex-col items-center gap-3.5 shrink-0">
            {/* Dynamic Deck Position Indicator Dots */}
            <div className="flex items-center justify-center gap-1.5 py-0.5">
              {activeCards.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setDirection(dotIdx > safeIndex ? 1 : -1);
                    setCurrentIndex(dotIdx);
                    setShowAnswer(false);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === safeIndex ? 'w-6 bg-[#8ab4f8]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to card ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Feedback Thumbs Row */}
            <div className="flex items-center justify-center gap-7 pt-0.5">
              <button
                onClick={() => {
                  setFeedback((curr) => (curr === 'up' ? null : 'up'));
                  onTriggerToast('Thanks for your feedback! 👍');
                }}
                className={`p-1.5 transition-colors cursor-pointer ${
                  feedback === 'up' ? 'text-[#81C995]' : 'text-[#7E8295] hover:text-white'
                }`}
                aria-label="Thumbs up"
              >
                <ThumbsUp size={19} strokeWidth={1.7} />
              </button>
              <button
                onClick={() => {
                  setFeedback((curr) => (curr === 'down' ? null : 'down'));
                  onTriggerToast('Feedback noted 👎');
                }}
                className={`p-1.5 transition-colors cursor-pointer ${
                  feedback === 'down' ? 'text-[#E06C75]' : 'text-[#7E8295] hover:text-white'
                }`}
                aria-label="Thumbs down"
              >
                <ThumbsDown size={19} strokeWidth={1.7} />
              </button>
            </div>

            {/* Android Navigation Home Bar Indicator */}
            <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-0.5 mb-1"></div>
          </div>
        </div>
    </div>
  );
};

