import React, { useState, useEffect } from 'react';
import {
  Layers,
  HelpCircle,
  Headphones,
  FileText,
  Network,
  Sparkles,
  Check,
  Edit3,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ArrowLeft,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  CheckCircle2,
  Clock,
  Eye,
  FolderPlus
} from 'lucide-react';
import { StudioToolItem, SavedStudioItem } from '../types';
import { STUDIO_TOOLS } from '../data/mockData';

interface StudioWorkspaceProps {
  projectTitle: string;
  onTriggerToast: (msg: string) => void;
}

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({
  projectTitle,
  onTriggerToast,
}) => {
  // Persistence for Saved Studio Items
  const storageKey = `workspace_studio_${encodeURIComponent(projectTitle)}`;
  const [savedItems, setSavedItems] = useState<SavedStudioItem[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Provide default initial mock saved items for immediate reopening & exploration
    return [
      {
        id: 'sample-flashcards-1',
        toolId: 'tool-flashcards',
        toolTitle: 'Flashcards',
        toolIcon: 'flashcards',
        bgHex: '#6937a1',
        title: `${projectTitle} Core Flashcards`,
        instructions: 'Focus on high-yield definitions and cellular mechanics',
        updatedAt: 'Saved earlier',
        content: {
          cards: [
            {
              front: 'What is the primary role of ATP in cellular processes?',
              back: 'ATP acts as the universal chemical energy currency, powering active transport, mechanical work, and biosynthesis.',
            },
            {
              front: 'What molecule is produced during the Calvin cycle?',
              back: 'Glyceraldehyde-3-phosphate (G3P), which is subsequently used to synthesize glucose and other carbohydrates.',
            },
            {
              front: 'Define osmotic pressure in semipermeable membranes.',
              back: 'The minimum pressure needed to prevent the inward flow of pure solvent across a semipermeable membrane.',
            },
          ],
        },
      },
      {
        id: 'sample-guide-1',
        toolId: 'tool-guide',
        toolTitle: 'Study Guide',
        toolIcon: 'guide',
        bgHex: '#1f5f5b',
        title: `${projectTitle} Quick Review Guide`,
        instructions: 'Structured breakdown of key terms and electron transport mechanisms',
        updatedAt: 'Saved yesterday',
        content: {
          guide: {
            summary: `High-yield synthesis covering foundational concepts for ${projectTitle}.`,
            sections: [
              {
                term: 'Aerobic Respiration',
                category: 'Key Concept',
                definition: 'Process of cellular respiration that takes place in the presence of oxygen gas to produce energy from food.',
              },
              {
                term: 'Electron Transport Chain',
                category: 'Mechanism',
                definition: 'Series of protein complexes that couple redox reactions to establish an electrochemical proton gradient powering ATP synthesis.',
              },
              {
                term: 'Chemiosmosis',
                category: 'Process',
                definition: 'Movement of ions across a semipermeable membrane bound structure, down their electrochemical gradient through ATP synthase.',
              },
            ],
          },
        },
      },
    ];
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedItems));
    } catch {
      // fallback
    }
  }, [savedItems, storageKey]);

  // Current active tool / editor session state
  const [activeTool, setActiveTool] = useState<StudioToolItem | null>(null);
  const [activeSavedId, setActiveSavedId] = useState<string | null>(null);

  // Form & Generation States
  const [instructions, setInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState<'preview' | 'edit'>('preview');

  // Generated / Editable Content State
  const [resultTitle, setResultTitle] = useState('');
  const [generatedCards, setGeneratedCards] = useState<Array<{ front: string; back: string }>>([]);
  const [generatedQuiz, setGeneratedQuiz] = useState<{
    question: string;
    options: Array<{ label: string; correct: boolean }>;
    explanation: string;
  }>({
    question: '',
    options: [],
    explanation: '',
  });
  const [generatedGuide, setGeneratedGuide] = useState<{
    summary: string;
    sections: Array<{ term: string; category: string; definition: string }>;
  }>({
    summary: '',
    sections: [],
  });
  const [generatedAudio, setGeneratedAudio] = useState<{
    title: string;
    duration: string;
    summary: string;
    takeaways: string[];
  }>({
    title: '',
    duration: '3:15',
    summary: '',
    takeaways: [],
  });
  const [generatedMindmap, setGeneratedMindmap] = useState<{
    centralNode: string;
    branches: Array<{ title: string; notes: string; color: string }>;
  }>({
    centralNode: '',
    branches: [],
  });

  // Interactive preview state for Flashcards & Quiz
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(30);

  // Helper to open a tool fresh
  const handleOpenTool = (tool: StudioToolItem) => {
    setActiveTool(tool);
    setActiveSavedId(null);
    setActiveTabMode('preview');
    setFlashcardIndex(0);
    setFlashcardFlipped(false);
    setQuizSelected(null);
    setQuizSubmitted(false);

    // Default instructions based on tool type
    let defaultInstr = '';
    switch (tool.icon) {
      case 'flashcards':
        defaultInstr = 'Key definitions, high-yield exam terms, and core processes';
        break;
      case 'quiz':
        defaultInstr = 'Multiple choice questions testing application and mechanisms';
        break;
      case 'guide':
        defaultInstr = 'Structured notes covering definitions, formulas, and common exam traps';
        break;
      case 'audio':
        defaultInstr = '3-minute conversational walk-through of essential topics';
        break;
      case 'mindmap':
        defaultInstr = 'Hierarchical concept map connecting core mechanisms to sub-topics';
        break;
    }
    setInstructions(defaultInstr);
    setResultTitle(`${projectTitle} ${tool.title}`);

    // Generate initial default result so user sees a starting point immediately
    generateMockResult(tool.id, defaultInstr, `${projectTitle} ${tool.title}`);
  };

  // Reopen a saved result
  const handleReopenSaved = (saved: SavedStudioItem) => {
    const matchingTool = STUDIO_TOOLS.find((t) => t.id === saved.toolId) || {
      id: saved.toolId,
      title: saved.toolTitle,
      description: 'Saved studio item',
      bgHex: saved.bgHex,
      icon: saved.toolIcon,
    };

    setActiveTool(matchingTool);
    setActiveSavedId(saved.id);
    setResultTitle(saved.title);
    setInstructions(saved.instructions);
    setActiveTabMode('preview');
    setFlashcardIndex(0);
    setFlashcardFlipped(false);
    setQuizSelected(null);
    setQuizSubmitted(false);

    // Restore saved content
    if (saved.content.cards) setGeneratedCards(saved.content.cards);
    if (saved.content.quiz) setGeneratedQuiz(saved.content.quiz);
    if (saved.content.guide) setGeneratedGuide(saved.content.guide);
    if (saved.content.audio) setGeneratedAudio(saved.content.audio);
    if (saved.content.mindmap) setGeneratedMindmap(saved.content.mindmap);

    onTriggerToast(`Reopened "${saved.title}"`);
  };

  // Generate mock result based on tool and instructions
  const generateMockResult = (toolId: string, customInstructions: string, titleToUse: string) => {
    const instrLower = customInstructions.toLowerCase();

    if (toolId === 'tool-flashcards') {
      let cards = [
        {
          front: `What is the core driving force behind ${projectTitle}?`,
          back: 'Concentration gradients, electrochemical potential, and chemical equilibrium regulate steady-state rates.',
        },
        {
          front: 'What is the functional difference between passive and active mechanisms?',
          back: 'Passive processes proceed spontaneously along gradient directions with zero energy input; active processes couple to chemical energy (e.g. ATP).',
        },
        {
          front: 'How does allosteric feedback maintain equilibrium?',
          back: 'Downstream products bind to regulatory non-catalytic sites, inducing conformational changes that modulate throughput.',
        },
      ];

      if (instrLower.includes('exam') || instrLower.includes('formula') || instrLower.includes('high-yield')) {
        cards = [
          {
            front: 'What is the rate-limiting step formula rule?',
            back: 'Overall reaction flux is governed by the step with the highest activation energy barrier under physiological conditions.',
          },
          {
            front: 'How do you calculate Gibbs free energy change (ΔG)?',
            back: 'ΔG = ΔH - TΔS. A negative ΔG indicates an exergonic and thermodynamically favorable reaction.',
          },
          {
            front: 'What constitutes an enzyme saturation threshold?',
            back: 'When all catalytic active sites are occupied by substrate, reaching maximum theoretical velocity (Vmax).',
          },
        ];
      } else if (instrLower.includes('beginner') || instrLower.includes('simple') || instrLower.includes('easy')) {
        cards = [
          {
            front: `What is the main purpose of studying ${projectTitle}?`,
            back: 'To understand the fundamental building blocks and how interconnected systems reliably function.',
          },
          {
            front: 'What are the two major components to remember?',
            back: 'Inputs (substrates or signals) and Outputs (products or target actions).',
          },
          {
            front: 'What happens if regulation fails?',
            back: 'Loss of homeostasis, wasted resources, or buildup of toxic intermediate metabolites.',
          },
        ];
      }
      setGeneratedCards(cards);
    } else if (toolId === 'tool-quiz') {
      let quiz = {
        question: `In the context of ${projectTitle}, which statement accurately describes the regulatory control mechanism?`,
        options: [
          { label: 'Feedback inhibition selectively halts intermediate pathway synthesis', correct: true },
          { label: 'Substrate levels fluctuate unpredictably without cellular sensors', correct: false },
          { label: 'Reactions proceed exclusively in thermodynamic equilibrium at all times', correct: false },
          { label: 'Energy expenditure remains zero across active transport phases', correct: false },
        ],
        explanation: 'Feedback inhibition uses end-product accumulation to regulate earlier pathway enzymes, ensuring efficient resource management.',
      };

      if (instrLower.includes('hard') || instrLower.includes('application')) {
        quiz = {
          question: `If the temperature increases beyond the optimal threshold in ${projectTitle}, what is the primary consequence on kinetics?`,
          options: [
            { label: 'Rate increases indefinitely according to collision theory', correct: false },
            { label: 'Thermal denaturation disrupts tertiary conformation, precipitating rate collapse', correct: true },
            { label: 'Equilibrium constant shifts to favor reactant depletion entirely', correct: false },
            { label: 'Activation energy barrier is permanently reduced to zero', correct: false },
          ],
          explanation: 'Elevated temperatures initially increase molecular kinetic energy, but soon denature secondary and tertiary structures, destroying functional active sites.',
        };
      }
      setGeneratedQuiz(quiz);
    } else if (toolId === 'tool-guide') {
      setGeneratedGuide({
        summary: `Structured review guide for ${projectTitle} synthesized according to: "${customInstructions || 'Core fundamentals'}".`,
        sections: [
          {
            term: 'Primary Mechanism',
            category: 'Core Concept',
            definition: 'The essential chemical or structural sequence responsible for the primary phenomenon under study.',
          },
          {
            term: 'Rate Determination',
            category: 'Kinetics',
            definition: 'Key parameters and constraints that dictate how rapidly changes occur within physiological limits.',
          },
          {
            term: 'Critical Boundary Conditions',
            category: 'Exam Trap',
            definition: 'Always verify standard units, pH assumptions, and temperature baselines before formulating calculations.',
          },
        ],
      });
    } else if (toolId === 'tool-audio') {
      setGeneratedAudio({
        title: `${titleToUse} Audio Brief`,
        duration: '3:15',
        summary: `A concise 3-minute conversational audio review covering the essentials of ${projectTitle}.`,
        takeaways: [
          'Master the foundational terminology before diving into complex multi-step cascades.',
          'Identify the energetic drivers and where coupled reactions provide the necessary driving force.',
          'Practice recall by explaining the 3 major steps aloud without referencing notes.',
        ],
      });
    } else if (toolId === 'tool-mindmap') {
      setGeneratedMindmap({
        centralNode: projectTitle,
        branches: [
          { title: 'Core Principles', notes: 'Definitions, axioms, and primary rules', color: '#8B7CF6' },
          { title: 'Mechanisms', notes: 'Step-by-step pathway reactions and catalysts', color: '#3A66A3' },
          { title: 'Regulation', notes: 'Feedback loops, inhibitors, and checkpoints', color: '#317342' },
          { title: 'Exam Review', notes: 'High-yield formulas and common pitfalls', color: '#8b6b08' },
        ],
      });
    }
  };

  // Trigger regeneration on button click
  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeTool) return;

    setIsGenerating(true);
    setTimeout(() => {
      generateMockResult(activeTool.id, instructions, resultTitle || `${projectTitle} ${activeTool.title}`);
      setIsGenerating(false);
      onTriggerToast(`Generated mock ${activeTool.title}!`);
    }, 550);
  };

  // Save Result Handler
  const handleSaveResult = () => {
    if (!activeTool) return;

    const finalTitle = resultTitle.trim() || `${projectTitle} ${activeTool.title}`;
    const timestamp = 'Just now';

    let contentToSave: SavedStudioItem['content'] = {};
    if (activeTool.id === 'tool-flashcards') contentToSave = { cards: generatedCards };
    else if (activeTool.id === 'tool-quiz') contentToSave = { quiz: generatedQuiz };
    else if (activeTool.id === 'tool-guide') contentToSave = { guide: generatedGuide };
    else if (activeTool.id === 'tool-audio') contentToSave = { audio: generatedAudio };
    else if (activeTool.id === 'tool-mindmap') contentToSave = { mindmap: generatedMindmap };

    if (activeSavedId) {
      // Update existing item
      setSavedItems((prev) =>
        prev.map((item) =>
          item.id === activeSavedId
            ? {
                ...item,
                title: finalTitle,
                instructions,
                updatedAt: 'Updated just now',
                content: contentToSave,
              }
            : item
        )
      );
      onTriggerToast(`Saved changes to "${finalTitle}"`);
    } else {
      // Create new item
      const newItem: SavedStudioItem = {
        id: `saved-${Date.now()}`,
        toolId: activeTool.id,
        toolTitle: activeTool.title,
        toolIcon: activeTool.icon,
        bgHex: activeTool.bgHex,
        title: finalTitle,
        instructions,
        updatedAt: timestamp,
        content: contentToSave,
      };
      setSavedItems((prev) => [newItem, ...prev]);
      setActiveSavedId(newItem.id);
      onTriggerToast(`Saved "${finalTitle}" to Studio`);
    }
  };

  // Delete a saved studio item
  const handleDeleteSaved = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    if (activeSavedId === id) {
      setActiveSavedId(null);
    }
    onTriggerToast(`Deleted "${title}"`);
  };

  // ================= VIEW: TOOL LIST & SAVED RESULTS =================
  if (!activeTool) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Studio Tools Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C6CADB]">
              Create New Study Material
            </h3>
            <span className="text-[11px] text-[#8B90A5]">Pick a tool to customize</span>
          </div>

          <div className="grid gap-2.5">
            {STUDIO_TOOLS.map((tool) => {
              const renderIcon = () => {
                switch (tool.icon) {
                  case 'flashcards':
                    return <Layers size={18} strokeWidth={2} />;
                  case 'quiz':
                    return <HelpCircle size={18} strokeWidth={2} />;
                  case 'audio':
                    return <Headphones size={18} strokeWidth={2} />;
                  case 'guide':
                    return <FileText size={18} strokeWidth={2} />;
                  case 'mindmap':
                    return <Network size={18} strokeWidth={2} />;
                }
              };

              return (
                <button
                  key={tool.id}
                  onClick={() => handleOpenTool(tool)}
                  className="flex items-center gap-3.5 w-full text-left rounded-2xl p-3.5 transition-transform active:scale-[0.985] text-white cursor-pointer shadow-md group hover:brightness-105"
                  style={{ backgroundColor: tool.bgHex }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-none group-hover:scale-105 transition-transform">
                    {renderIcon()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-bold">{tool.title}</div>
                    <div className="text-[11.5px] font-medium opacity-85 truncate mt-0.5">
                      {tool.description}
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    Create →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Saved Studio Materials Section */}
        <div className="pt-2 border-t border-[#2F3142]/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C6CADB]">
                Saved Studio Materials
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#1D1F2A] border border-[#2F3142] text-[10px] font-bold text-[#8B7CF6]">
                {savedItems.length}
              </span>
            </div>
            <span className="text-[11px] text-[#8B90A5]">Reopen & review anytime</span>
          </div>

          {savedItems.length === 0 ? (
            <div className="text-center py-8 px-4 bg-[#1D1F2A]/60 border border-dashed border-[#2F3142] rounded-2xl">
              <FolderPlus size={28} className="mx-auto text-[#6E7388] mb-2" />
              <p className="text-xs font-medium text-[#C6CADB]">No saved materials yet</p>
              <p className="text-[11px] text-[#8B90A5] mt-1 max-w-[260px] mx-auto">
                Choose any tool above, enter your instructions, generate, and save results to build your study collection.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleReopenSaved(item)}
                  className="w-full flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#1D1F2A] border border-[#2F3142] hover:border-[#8B7CF6]/60 transition-all cursor-pointer group shadow-sm text-left"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-none shadow"
                      style={{ backgroundColor: item.bgHex }}
                    >
                      {item.toolTitle.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13.5px] font-bold text-[#F4F5FA] truncate">
                          {item.title}
                        </span>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#232533] text-[#A6ACCD] font-medium border border-[#2F3142]">
                          {item.toolTitle}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8B90A5] truncate mt-0.5">
                        {item.instructions || 'Custom generated materials'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-none">
                    <span className="text-[10px] text-[#6E7388] flex items-center gap-1">
                      <Clock size={10} />
                      {item.updatedAt}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSaved(item.id, item.title, e)}
                      className="w-7 h-7 rounded-lg text-[#8B90A5] hover:text-[#DF5D4F] hover:bg-[#DF5D4F]/10 flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete saved item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= VIEW: ACTIVE TOOL GENERATOR & EDITOR =================
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Bar inside Tool view */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2F3142]">
        <button
          type="button"
          onClick={() => setActiveTool(null)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#8B7CF6] hover:text-[#A798FF] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>All Studio Tools</span>
        </button>

        <div className="flex items-center gap-2">
          {activeSavedId && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
              Saved in Project
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveResult}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B7CF6] hover:bg-[#7A6BD0] text-white text-xs font-bold transition-all shadow cursor-pointer active:scale-95"
          >
            <Save size={13} />
            <span>Save Result</span>
          </button>
        </div>
      </div>

      {/* Tool Banner & Title input */}
      <div className="p-4 rounded-2xl border border-[#2F3142] bg-[#1D1F2A] shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow"
            style={{ backgroundColor: activeTool.bgHex }}
          >
            {activeTool.title.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={resultTitle}
              onChange={(e) => setResultTitle(e.target.value)}
              placeholder="Material Title..."
              className="w-full text-[15px] font-bold text-white bg-transparent outline-none border-b border-transparent focus:border-[#8B7CF6] transition-colors"
            />
            <span className="text-[11px] text-[#8B90A5]">{activeTool.description}</span>
          </div>
        </div>

        {/* Step 1: Instructions Box */}
        <div className="mt-3 pt-3 border-t border-[#2F3142]/60">
          <label className="block text-xs font-semibold text-[#C6CADB] mb-1.5">
            Instructions & Focus:
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Focus on membrane transport, high-yield exam formulas, beginner friendly..."
              className="w-full text-xs text-[#F4F5FA] placeholder-[#6E7388] bg-[#14151D] border border-[#2F3142] rounded-xl p-2.5 outline-none focus:border-[#8B7CF6] transition-colors resize-none"
            />
          </div>

          {/* Quick instruction chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              'Key definitions',
              'Exam high-yield',
              'Step-by-step mechanism',
              'Beginner friendly',
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setInstructions((prev) => (prev ? `${prev}, ${chip}` : chip))}
                className="px-2 py-1 rounded-lg bg-[#232533] hover:bg-[#2B2E3E] text-[10.5px] font-medium text-[#B9A6F7] border border-[#2F3142] transition-colors cursor-pointer"
              >
                + {chip}
              </button>
            ))}
          </div>

          {/* Generate Button */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={() => handleGenerate()}
            className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-[#7768D6] to-[#8B7CF6] hover:brightness-105 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow cursor-pointer transition-all active:scale-[0.99]"
          >
            <Sparkles size={14} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? 'Generating Material...' : 'Generate Mock Result'}</span>
          </button>
        </div>
      </div>

      {/* Step 2: Result Section Header with Preview / Edit Tabs */}
      <div className="flex items-center justify-between pt-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#C6CADB]">
          Result Content
        </h4>

        <div className="flex items-center gap-1 bg-[#1D1F2A] border border-[#2F3142] rounded-xl p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTabMode('preview')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTabMode === 'preview'
                ? 'bg-[#8B7CF6] text-white'
                : 'text-[#8B90A5] hover:text-white'
            }`}
          >
            <Eye size={12} />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabMode('edit')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTabMode === 'edit'
                ? 'bg-[#8B7CF6] text-white'
                : 'text-[#8B90A5] hover:text-white'
            }`}
          >
            <Edit3 size={12} />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Result Display based on Tool & Mode */}

      {/* ================= FLASHCARDS ================= */}
      {activeTool.id === 'tool-flashcards' && (
        <div>
          {activeTabMode === 'preview' ? (
            <div className="flex flex-col items-center">
              <div className="text-xs font-semibold text-[#8B90A5] mb-2.5">
                Card {generatedCards.length > 0 ? flashcardIndex + 1 : 0} of {generatedCards.length}
              </div>

              {generatedCards.length > 0 ? (
                <div
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="w-full min-h-[200px] bg-[#1D1F2A] border border-[#2F3142] rounded-2xl p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#8B7CF6] transition-all relative shadow-md"
                >
                  <span className="absolute top-3 right-3 text-[11px] font-medium text-[#8B90A5] flex items-center gap-1">
                    <RotateCw size={12} /> Tap to flip
                  </span>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8B7CF6] mb-2">
                    {flashcardFlipped ? 'Answer' : 'Question'}
                  </div>
                  <p className="text-[15px] font-semibold text-white leading-relaxed">
                    {flashcardFlipped
                      ? generatedCards[flashcardIndex]?.back
                      : generatedCards[flashcardIndex]?.front}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#8B90A5]">No cards generated yet.</p>
              )}

              <div className="flex items-center justify-between w-full mt-4">
                <button
                  type="button"
                  disabled={flashcardIndex === 0}
                  onClick={() => {
                    setFlashcardIndex((i) => Math.max(0, i - 1));
                    setFlashcardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1D1F2A] border border-[#2F3142] text-xs font-semibold disabled:opacity-30 enabled:hover:bg-[#232533] flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={15} /> Prev
                </button>
                <button
                  type="button"
                  disabled={flashcardIndex >= generatedCards.length - 1}
                  onClick={() => {
                    setFlashcardIndex((i) => Math.min(generatedCards.length - 1, i + 1));
                    setFlashcardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#8B7CF6] text-white text-xs font-semibold disabled:opacity-30 enabled:hover:bg-[#7A6BD0] flex items-center gap-1 cursor-pointer shadow"
                >
                  Next <ChevronRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            /* Edit Mode for Flashcards */
            <div className="space-y-3">
              {generatedCards.map((card, idx) => (
                <div key={idx} className="p-3.5 bg-[#1D1F2A] border border-[#2F3142] rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#8B7CF6]">
                    <span>Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setGeneratedCards((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="text-xs text-[#8B90A5] hover:text-[#DF5D4F] cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <label className="text-[10.5px] font-semibold text-[#8B90A5] block mb-1">Front (Question):</label>
                    <input
                      type="text"
                      value={card.front}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeneratedCards((prev) =>
                          prev.map((c, i) => (i === idx ? { ...c, front: val } : c))
                        );
                      }}
                      className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none focus:border-[#8B7CF6]"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] font-semibold text-[#8B90A5] block mb-1">Back (Answer):</label>
                    <textarea
                      rows={2}
                      value={card.back}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeneratedCards((prev) =>
                          prev.map((c, i) => (i === idx ? { ...c, back: val } : c))
                        );
                      }}
                      className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none focus:border-[#8B7CF6] resize-none"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setGeneratedCards((prev) => [
                    ...prev,
                    { front: 'New question', back: 'New answer' },
                  ])
                }
                className="w-full py-2.5 rounded-xl border border-dashed border-[#3A3C4E] hover:border-[#8B7CF6] text-xs font-semibold text-[#B9A6F7] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add New Card
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= PRACTICE QUIZ ================= */}
      {activeTool.id === 'tool-quiz' && (
        <div>
          {activeTabMode === 'preview' ? (
            <div className="space-y-3.5 bg-[#1D1F2A] border border-[#2F3142] rounded-2xl p-4 shadow-md">
              <div className="text-sm font-bold text-white leading-relaxed">
                {generatedQuiz.question || 'No question generated yet.'}
              </div>

              <div className="space-y-2">
                {generatedQuiz.options.map((opt, i) => {
                  let stateStyle = 'bg-[#232533] border-[#3A3C4E] text-[#EDEEF5]';
                  if (quizSubmitted) {
                    if (opt.correct) stateStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    else if (quizSelected === i) stateStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else if (quizSelected === i) {
                    stateStyle = 'bg-[#8B7CF6]/20 border-[#8B7CF6] text-white';
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (!quizSubmitted) setQuizSelected(i);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-[13.5px] font-medium transition-all cursor-pointer ${stateStyle}`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  type="button"
                  disabled={quizSelected === null}
                  onClick={() => setQuizSubmitted(true)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-[#8B7CF6] text-white font-bold text-xs disabled:opacity-40 enabled:hover:bg-[#7A6BD0] cursor-pointer shadow"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="pt-2 text-center border-t border-[#2F3142]">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1 mb-1">
                    <CheckCircle2 size={14} /> Correct answer recorded
                  </div>
                  {generatedQuiz.explanation && (
                    <p className="text-[11.5px] text-[#8B90A5] max-w-sm mx-auto mb-2">
                      {generatedQuiz.explanation}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setQuizSelected(null);
                      setQuizSubmitted(false);
                    }}
                    className="text-xs text-[#8B7CF6] hover:underline cursor-pointer"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Edit Mode for Practice Quiz */
            <div className="p-4 bg-[#1D1F2A] border border-[#2F3142] rounded-2xl space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#8B90A5] block mb-1">Question:</label>
                <textarea
                  rows={2}
                  value={generatedQuiz.question}
                  onChange={(e) =>
                    setGeneratedQuiz((prev) => ({ ...prev, question: e.target.value }))
                  }
                  className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-xl p-2.5 outline-none focus:border-[#8B7CF6]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#8B90A5] block">
                  Options (select radio to mark correct):
                </label>
                {generatedQuiz.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct-opt"
                      checked={opt.correct}
                      onChange={() =>
                        setGeneratedQuiz((prev) => ({
                          ...prev,
                          options: prev.options.map((o, idx) => ({
                            ...o,
                            correct: idx === i,
                          })),
                        }))
                      }
                      className="cursor-pointer accent-[#8B7CF6]"
                    />
                    <input
                      type="text"
                      value={opt.label}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeneratedQuiz((prev) => ({
                          ...prev,
                          options: prev.options.map((o, idx) =>
                            idx === i ? { ...o, label: val } : o
                          ),
                        }));
                      }}
                      className="flex-1 text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none focus:border-[#8B7CF6]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8B90A5] block mb-1">Explanation:</label>
                <textarea
                  rows={2}
                  value={generatedQuiz.explanation}
                  onChange={(e) =>
                    setGeneratedQuiz((prev) => ({ ...prev, explanation: e.target.value }))
                  }
                  className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-xl p-2.5 outline-none focus:border-[#8B7CF6] resize-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= STUDY GUIDE ================= */}
      {activeTool.id === 'tool-guide' && (
        <div>
          {activeTabMode === 'preview' ? (
            <div className="space-y-3">
              {generatedGuide.summary && (
                <div className="p-3 bg-[#1D1F2A] border border-[#2F3142] rounded-xl text-xs text-[#A6ACCD]">
                  {generatedGuide.summary}
                </div>
              )}

              {generatedGuide.sections.map((sec, i) => (
                <div key={i} className="p-3.5 bg-[#1D1F2A] rounded-xl border border-[#2F3142] shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B7CF6]">
                    {sec.category || 'Key Concept'}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{sec.term}</div>
                  <div className="text-xs text-[#C6CADB] mt-1.5 leading-relaxed">
                    {sec.definition}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Edit Mode for Study Guide */
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#8B90A5] block mb-1">Guide Summary:</label>
                <textarea
                  rows={2}
                  value={generatedGuide.summary}
                  onChange={(e) =>
                    setGeneratedGuide((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-xl p-2.5 outline-none focus:border-[#8B7CF6]"
                />
              </div>

              {generatedGuide.sections.map((sec, i) => (
                <div key={i} className="p-3 bg-[#1D1F2A] border border-[#2F3142] rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#8B7CF6]">Section #{i + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setGeneratedGuide((prev) => ({
                          ...prev,
                          sections: prev.sections.filter((_, idx) => idx !== i),
                        }))
                      }
                      className="text-xs text-[#8B90A5] hover:text-[#DF5D4F] cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Category"
                      value={sec.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeneratedGuide((prev) => ({
                          ...prev,
                          sections: prev.sections.map((s, idx) =>
                            idx === i ? { ...s, category: val } : s
                          ),
                        }));
                      }}
                      className="text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Term / Concept"
                      value={sec.term}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeneratedGuide((prev) => ({
                          ...prev,
                          sections: prev.sections.map((s, idx) =>
                            idx === i ? { ...s, term: val } : s
                          ),
                        }));
                      }}
                      className="text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Definition / Explanation"
                    value={sec.definition}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGeneratedGuide((prev) => ({
                        ...prev,
                        sections: prev.sections.map((s, idx) =>
                          idx === i ? { ...s, definition: val } : s
                        ),
                      }));
                    }}
                    className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none resize-none"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setGeneratedGuide((prev) => ({
                    ...prev,
                    sections: [
                      ...prev.sections,
                      { term: 'New Topic', category: 'Concept', definition: 'Explanation notes...' },
                    ],
                  }))
                }
                className="w-full py-2.5 rounded-xl border border-dashed border-[#3A3C4E] hover:border-[#8B7CF6] text-xs font-semibold text-[#B9A6F7] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add New Guide Section
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= AUDIO RECAP ================= */}
      {activeTool.id === 'tool-audio' && (
        <div>
          {activeTabMode === 'preview' ? (
            <div className="space-y-4 text-center bg-[#1D1F2A] border border-[#2F3142] rounded-2xl p-5 shadow-md">
              <div className="w-14 h-14 rounded-full bg-[#8b6b08]/20 border border-[#8b6b08]/40 mx-auto flex items-center justify-center text-[#d19a17]">
                <button
                  type="button"
                  onClick={() => setAudioPlaying(!audioPlaying)}
                  className="w-11 h-11 rounded-full bg-[#8b6b08] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  {audioPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
              </div>

              <div>
                <h4 className="font-bold text-white text-[15px]">
                  {generatedAudio.title || `${projectTitle} Audio Brief`}
                </h4>
                <p className="text-xs text-[#8B90A5] mt-1">{generatedAudio.summary}</p>
              </div>

              <div
                className="w-full bg-[#14151D] h-2 rounded-full overflow-hidden relative cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  setAudioProgress(p);
                }}
              >
                <div
                  className="bg-[#8b6b08] h-full rounded-full transition-all"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#8B90A5]">
                <span>0:45</span>
                <span>{generatedAudio.duration || '3:15'}</span>
              </div>

              {generatedAudio.takeaways.length > 0 && (
                <div className="pt-3 border-t border-[#2F3142] text-left space-y-1.5">
                  <div className="text-[11px] font-bold text-[#C6CADB]">Key Spoken Points:</div>
                  {generatedAudio.takeaways.map((point, i) => (
                    <div key={i} className="text-xs text-[#8B90A5] flex items-start gap-2">
                      <span className="text-[#8b6b08] font-bold">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Edit Mode for Audio Recap */
            <div className="p-4 bg-[#1D1F2A] border border-[#2F3142] rounded-2xl space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#8B90A5] block mb-1">Audio Title:</label>
                <input
                  type="text"
                  value={generatedAudio.title}
                  onChange={(e) =>
                    setGeneratedAudio((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8B90A5] block mb-1">Narration Summary:</label>
                <textarea
                  rows={2}
                  value={generatedAudio.summary}
                  onChange={(e) =>
                    setGeneratedAudio((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8B90A5] block mb-1">
                  Key Takeaways (one per line):
                </label>
                <textarea
                  rows={3}
                  value={generatedAudio.takeaways.join('\n')}
                  onChange={(e) =>
                    setGeneratedAudio((prev) => ({
                      ...prev,
                      takeaways: e.target.value.split('\n').filter(Boolean),
                    }))
                  }
                  className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MIND MAP ================= */}
      {activeTool.id === 'tool-mindmap' && (
        <div>
          {activeTabMode === 'preview' ? (
            <div className="relative min-h-[220px] bg-[#14151D] rounded-2xl border border-[#2F3142] p-4 flex items-center justify-center overflow-hidden shadow-inner">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#8B7CF6" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#3A66A3" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#317342" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#8b6b08" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Central node */}
              <div className="relative z-10 px-3.5 py-2 rounded-xl bg-[#8B7CF6] text-white text-xs font-extrabold shadow-lg text-center max-w-[140px]">
                {generatedMindmap.centralNode || projectTitle}
              </div>

              {/* Branch nodes */}
              {generatedMindmap.branches.map((b, idx) => {
                const posStyles = [
                  'top-3 left-3',
                  'top-3 right-3',
                  'bottom-3 left-3',
                  'bottom-3 right-3',
                ];
                return (
                  <div
                    key={idx}
                    className={`absolute ${posStyles[idx % posStyles.length]} z-10 px-2.5 py-1.5 rounded-lg text-white text-[11px] font-bold shadow`}
                    style={{ backgroundColor: b.color || '#3A66A3' }}
                  >
                    <div>{b.title}</div>
                    {b.notes && <div className="text-[9px] opacity-80 font-normal">{b.notes}</div>}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Edit Mode for Mind Map */
            <div className="p-4 bg-[#1D1F2A] border border-[#2F3142] rounded-2xl space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#8B90A5] block mb-1">Central Node:</label>
                <input
                  type="text"
                  value={generatedMindmap.centralNode}
                  onChange={(e) =>
                    setGeneratedMindmap((prev) => ({ ...prev, centralNode: e.target.value }))
                  }
                  className="w-full text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#8B90A5] block">Branches:</label>
                {generatedMindmap.branches.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeneratedMindmap((prev) => ({
                          ...prev,
                          branches: prev.branches.map((br, i) =>
                            i === idx ? { ...br, title: val } : br
                          ),
                        }));
                      }}
                      className="flex-1 text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none"
                      placeholder="Branch title"
                    />
                    <input
                      type="text"
                      value={b.notes}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeneratedMindmap((prev) => ({
                          ...prev,
                          branches: prev.branches.map((br, i) =>
                            i === idx ? { ...br, notes: val } : br
                          ),
                        }));
                      }}
                      className="w-36 text-xs text-white bg-[#14151D] border border-[#2F3142] rounded-lg p-2 outline-none"
                      placeholder="Notes"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
