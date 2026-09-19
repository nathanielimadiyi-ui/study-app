import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  Camera,
  Plus,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  X,
  Check,
  Trash2,
  PenLine,
  Link2,
  Globe,
  AlignLeft,
  FileText,
  Play,
  Pause,
  MoreHorizontal,
  LoaderCircle,
  Loader2,
  ChevronRight,
  Sparkles,
  Settings,
  RotateCcw,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { FlashcardViewer, DEFAULT_NIGERIA_CARDS } from './FlashcardViewer';
import { QuizViewer, DEFAULT_NIGERIA_QUIZ_QUESTIONS } from './QuizViewer';
import {
  FolderLinesIcon,
  ChatBubblesIcon,
  WandStarsIcon,
  AudioWaveSparkleIcon,
  VideoOverviewIcon,
  SlideDeckIcon,
  FlashcardsIcon,
  QuizIcon,
  InfographicIcon,
  ReportsIcon,
  CopyOverlapIcon,
  BookThumb,
} from './icons';
import { StudioToolItem } from '../types';

interface WorkspaceScreenProps {
  projectTitle?: string;
  onBack: () => void;
  onOpenSettings: () => void;
  onSelectStudioTool?: (tool: StudioToolItem) => void;
  onTriggerToast: (msg: string) => void;
}

type Tab = 'sources' | 'chat' | 'studio';

interface SourceItem {
  id: string;
  name: string;
  kind: 'website' | 'file' | 'text';
  error?: boolean;
  enabled: boolean;
}

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

type StudioKey =
  | 'audio'
  | 'video'
  | 'slides'
  | 'flashcards'
  | 'quiz'
  | 'infographic'
  | 'reports';

interface Output {
  id: string;
  key: StudioKey;
  label: string;
  when: string;
  instructions?: string;
  details?: any;
  status?: 'making' | 'ready';
  sourcesCount?: number;
}

const CARD = '#1D1F2A';

const STUDIO_ITEMS: {
  key: StudioKey;
  label: string;
  icon: React.FC<any>;
  color: string;
  text: string;
  bgHex: string;
}[] = [
  { key: 'audio', label: 'Audio Overview', icon: AudioWaveSparkleIcon, color: '#c58af9', text: '#e8eaed', bgHex: '#2E303D' },
  { key: 'video', label: 'Video Overview', icon: VideoOverviewIcon, color: '#84c99b', text: '#e8eaed', bgHex: '#293430' },
  { key: 'slides', label: 'Slide Deck', icon: SlideDeckIcon, color: '#fdd663', text: '#e8eaed', bgHex: '#363529' },
  { key: 'flashcards', label: 'Flashcards', icon: FlashcardsIcon, color: '#f6a56b', text: '#e8eaed', bgHex: '#372C2D' },
  { key: 'quiz', label: 'Quiz', icon: QuizIcon, color: '#76d7ea', text: '#e8eaed', bgHex: '#263238' },
  { key: 'infographic', label: 'Infographic', icon: InfographicIcon, color: '#d3a5f7', text: '#e8eaed', bgHex: '#362835' },
  { key: 'reports', label: 'Reports', icon: ReportsIcon, color: '#e6e19d', text: '#e8eaed', bgHex: '#353528' },
];

const uid = () => Math.random().toString(36).slice(2, 9);

function createMockStudioResult(key: StudioKey, notebookTitle: string, instructions: string) {
  const prompt = instructions.trim() || `Focus on key principles of ${notebookTitle}`;
  const shortPrompt = prompt.length > 50 ? prompt.slice(0, 47) + '...' : prompt;

  if (key === 'flashcards') {
    const isNigeria = notebookTitle.toLowerCase().includes('nigeria') || notebookTitle.toLowerCase().includes('pre-colonial');

    if (isNigeria) {
      return {
        title: 'Nigeria Flashcards',
        instructions: prompt,
        cards: DEFAULT_NIGERIA_CARDS,
      };
    }

    return {
      title: `${notebookTitle} Flashcards`,
      instructions: prompt,
      cards: [
        {
          id: 'card-1',
          topic: 'Foundational Principles',
          q: `Core Architecture & Theoretical Pillars of ${notebookTitle}`,
          a: `Foundational framework and axiomatic definitions for ${notebookTitle}`,
          points: [
            `Focus area: ${shortPrompt}`,
            'Standardizes core terminology, definitions, and domain scope for active recall',
            'Bridges source documentation with structured theoretical synthesis',
          ],
          explanation: `Comprehensive conceptual synthesis of ${notebookTitle} derived from active notebook sources.`,
        },
        {
          id: 'card-2',
          topic: 'Mechanisms & Dynamics',
          q: 'Operational Dynamics & Mechanism Transitions',
          a: 'Input conversion, transformation phases, and verifiable output states',
          points: [
            'Systematic step-by-step progression across all core functional stages',
            'Interlocking dependencies and critical parameter constraints',
            'Calibrated for rapid conceptual recall and active retention verification',
          ],
          explanation: 'Explains how internal mechanisms and state transitions operate during complex workloads.',
        },
        {
          id: 'card-3',
          topic: 'High-Yield Takeaways',
          q: `Comparative Analysis & High-Yield Takeaways for ${notebookTitle}`,
          a: 'Synthesized domain takeaways and critical distinction points',
          points: [
            'Key formula verifications, trade-offs, and boundary conditions',
            'Distinguishes primary active pathways from edge cases',
            'Structured high-yield revision points for comprehensive mastery',
          ],
          explanation: 'Essential high-yield points prioritized for rapid exam and research review.',
        },
      ],
    };
  }

  if (key === 'quiz') {
    const isNigeria = notebookTitle.toLowerCase().includes('nigeria') || notebookTitle.toLowerCase().includes('pre-colonial');

    if (isNigeria) {
      return {
        title: 'Nigeria Practice Quiz',
        instructions: prompt,
        questions: DEFAULT_NIGERIA_QUIZ_QUESTIONS,
      };
    }

    return {
      title: `${notebookTitle} Practice Quiz`,
      instructions: prompt,
      questions: [
        {
          q: `Based on the source material for "${notebookTitle}", which core principle best characterizes the primary methodology?`,
          options: [
            'Iterative grounded synthesis with verified retention',
            'Passive linear skimming without review',
            'Memorizing isolated keywords without context',
            'Relying on unverified assumptions',
          ],
          correct: 0,
          explanation: 'Grounded synthesis cross-examines key source definitions to ensure verified retention and comprehension.',
          sourceRef: `Sources: ${notebookTitle} Core Documentation`,
        },
        {
          q: `When applying "${shortPrompt}" to this domain, what is the primary operational objective?`,
          options: [
            'Ensuring high-yield conceptual mastery and structured recall',
            'Bypassing foundational definitions and formulas',
            'Replacing source notes with intuition alone',
            'Deferring self-testing until final evaluation',
          ],
          correct: 0,
          explanation: 'Focused diagnostic practice isolates knowledge gaps and reinforces high-yield principles systematically.',
          sourceRef: `Sources: ${notebookTitle} Study Guide`,
        },
        {
          q: 'How does multimodal review (concept synthesis flashcards + diagnostic quizzes) optimize learning outcomes?',
          options: [
            'Pairs concept takeaways with active retrieval testing to strengthen neural retention',
            'Reduces cognitive recall speed without measurable benefit',
            'Duplicates identical trivia questions across both formats',
            'Eliminates the requirement to consult primary notebook sources',
          ],
          correct: 0,
          explanation: 'Synthesized flashcards build deep conceptual frameworks while diagnostic quizzes provide active retrieval feedback.',
          sourceRef: `Sources: ${notebookTitle} Retention Framework`,
        },
      ],
    };
  }

  if (key === 'slides') {
    return {
      title: `${notebookTitle} Slide Deck`,
      instructions: prompt,
      slides: [
        {
          title: `1. Executive Overview: ${notebookTitle}`,
          points: [
            `Study focus: ${prompt}`,
            'Core definitions and structural scope',
            'Foundational principles and observed dynamics',
          ],
        },
        {
          title: '2. Comparative Analysis & Mechanics',
          points: [
            'Methodology comparison across active sources',
            'Key formula and concept verification points',
            'Common edge cases and observed trade-offs',
          ],
        },
        {
          title: '3. Actionable Exam Plan',
          points: [
            'Priority chapter focus for maximum retention',
            'Daily flashcard drills and timed mock questions',
            'Final verification checklist',
          ],
        },
      ],
    };
  }

  if (key === 'reports') {
    return {
      title: `${notebookTitle} Executive Briefing`,
      instructions: prompt,
      summary: `Comprehensive briefing on "${notebookTitle}". Synthesized to address instructions: "${prompt}".`,
      sections: [
        {
          heading: '1. Executive Briefing',
          content: `The active materials provide an authoritative foundation for ${notebookTitle}, highlighting key formulas, definitions, and step-by-step mechanisms.`,
        },
        {
          heading: '2. High-Yield Retention Points',
          content: `Synthesizing these sources reveals recurring exam patterns that reward structured comparisons over rote memorization. Applying "${shortPrompt}" yields measurable retention gains.`,
        },
        {
          heading: '3. Strategic Recommendations',
          content: 'Continue daily spaced repetition, complete weekly diagnostic quizzes, and cross-reference practice items with source notes.',
        },
      ],
    };
  }

  if (key === 'audio') {
    return {
      title: `${notebookTitle} Audio Overview`,
      instructions: prompt,
      duration: '3:20',
      transcript: `Welcome to this Audio Overview on ${notebookTitle}. In this episode, we focus on your instructions: "${prompt}". We break down the key definitions, walk through the essential mechanisms, and test your understanding with active recall questions.`,
      highlights: [
        `Focus area: ${shortPrompt}`,
        'Hosts debate the primary trade-offs and real-world implications',
        'Summary of high-yield exam takeaways',
      ],
    };
  }

  if (key === 'video') {
    return {
      title: `${notebookTitle} Video Overview`,
      instructions: prompt,
      duration: '4:15',
      scenes: [
        { title: 'Scene 1: Visual Introduction', description: `Animated introduction of ${notebookTitle} addressing "${shortPrompt}".` },
        { title: 'Scene 2: Core Mechanism Breakdown', description: 'Diagrams and flowcharts demonstrating input/output relationships.' },
        { title: 'Scene 3: Exam Problem Walkthrough', description: 'Step-by-step resolution of a high-yield exam question.' },
      ],
    };
  }

  // infographic
  return {
    title: `${notebookTitle} Infographic`,
    instructions: prompt,
    stats: [
      { label: 'Core Pillars', value: '4 Key Pillars' },
      { label: 'Retention Rate', value: '89% Recall' },
      { label: 'Target Focus', value: 'High Yield' },
    ],
    takeaways: [
      `Primary focus: ${prompt}`,
      'Systematic breakdown of underlying formulas and definitions',
      'Proven study framework for maximum exam confidence',
    ],
  };
}

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  projectTitle = 'Untitled Notebook',
  onBack,
  onOpenSettings,
  onTriggerToast,
}) => {
  const [tab, setTab] = useState<Tab>('studio');
  const [title, setTitle] = useState(projectTitle);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(projectTitle);

  // Sync title with projectTitle when prop changes
  useEffect(() => {
    setTitle(projectTitle);
    setTitleDraft(projectTitle);
  }, [projectTitle]);

  const sourcesStorageKey = `notebook_sources_${encodeURIComponent(title)}`;
  const [sources, setSources] = useState<SourceItem[]>(() => {
    try {
      const saved = localStorage.getItem(sourcesStorageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: uid(), name: `${title} - Primary Reference`, kind: 'file', enabled: true },
      { id: uid(), name: 'Curated Web Research', kind: 'website', enabled: true },
      { id: uid(), name: 'Raw Lecture Notes', kind: 'text', enabled: true },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(sourcesStorageKey, JSON.stringify(sources));
    } catch {}
  }, [sources, sourcesStorageKey]);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid(),
      role: 'assistant',
      text: `Hello! I'm grounded in your sources for "${title}". Ask me any conceptual question, request a summary, or jump to Studio to generate audio overviews and quizzes.`,
    },
  ]);

  // Persistent studio outputs
  const outputsStorageKey = `notebook_studio_outputs_${encodeURIComponent(title)}`;
  const [outputs, setOutputs] = useState<Output[]>(() => {
    try {
      const saved = localStorage.getItem(outputsStorageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default initial items matching user's reference screenshot
    return [
      {
        id: 'default-flashcards-1',
        key: 'flashcards',
        label: 'Nigeria Flashcards',
        when: '88d ago',
        status: 'ready',
        sourcesCount: 6,
        details: createMockStudioResult('flashcards', 'Foundations and Kingdoms of Pre-Colonial Nigeria', ''),
      },
      {
        id: 'default-quiz-1',
        key: 'quiz',
        label: 'Nigeria Quiz',
        when: '88d ago',
        status: 'ready',
        sourcesCount: 6,
        details: createMockStudioResult('quiz', 'Foundations and Kingdoms of Pre-Colonial Nigeria', ''),
      },
      {
        id: 'default-quiz-2',
        key: 'quiz',
        label: 'Nigeria Quiz',
        when: '88d ago',
        status: 'ready',
        sourcesCount: 6,
        details: createMockStudioResult('quiz', 'Foundations and Kingdoms of Pre-Colonial Nigeria', ''),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(outputsStorageKey, JSON.stringify(outputs));
    } catch {}
  }, [outputs, outputsStorageKey]);

  // Studio Generator Modal State
  const [studioModalOpen, setStudioModalOpen] = useState(false);
  const [activeToolKey, setActiveToolKey] = useState<StudioKey>('flashcards');
  const [studioInstructions, setStudioInstructions] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState<any>(null);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

  // Reopened Saved Result View/Edit State
  const [viewingOutput, setViewingOutput] = useState<Output | null>(null);
  const [isEditingViewingOutput, setIsEditingViewingOutput] = useState(false);
  const [editViewingDraft, setEditViewingDraft] = useState<any>(null);

  const [generating, setGenerating] = useState<StudioKey | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [react, setReact] = useState<'up' | 'down' | null>(null);
  const [menu, setMenu] = useState<null | 'header' | 'sources' | 'chip'>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');

  const replyTimer = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const enabledSources = sources.filter((s) => s.enabled);
  const sourceCount = enabledSources.length;
  const sourceWord = `${sourceCount} source${sourceCount === 1 ? '' : 's'}`;

  useEffect(() => {
    return () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, tab]);

  /* ---------------- studio actions ---------------- */
  // Simplified Studio Tool Action: Tapping any tool adds an item below saying "Making...", then completes in ~2.4s
  const openStudioTool = (key: StudioKey) => {
    const meta = STUDIO_ITEMS.find((i) => i.key === key) || STUDIO_ITEMS[0];
    const shortTopic = title.includes('Nigeria') || title.includes('Pre-Colon') 
      ? 'Nigeria' 
      : title.length > 25 ? title.slice(0, 22) + '...' : title;
    const label = `${shortTopic} ${meta.label}`;
    const newId = uid();
    const result = createMockStudioResult(key, title, `Focus on key principles of ${title}`);

    const newOutput: Output = {
      id: newId,
      key,
      label,
      when: 'Just now',
      status: 'making',
      sourcesCount: sourceCount || 6,
      details: result,
    };

    setOutputs((prev) => [newOutput, ...prev]);
    onTriggerToast(`Making ${meta.label.toLowerCase()}...`);

    setTimeout(() => {
      setOutputs((prev) =>
        prev.map((item) =>
          item.id === newId ? { ...item, status: 'ready', when: 'Just now' } : item
        )
      );
      onTriggerToast(`${meta.label} ready! ✨`);
    }, 2400);
  };

  const handleGenerateMock = (keyToUse?: StudioKey) => {
    const k = keyToUse || activeToolKey;
    setIsGeneratingDraft(true);
    setTimeout(() => {
      const result = createMockStudioResult(k, title, studioInstructions || `Focus on key principles of ${title}`);
      setGeneratedDraft(result);
      setIsGeneratingDraft(false);
      const meta = STUDIO_ITEMS.find((i) => i.key === k);
      onTriggerToast(`Mock ${meta?.label || 'result'} generated`);
    }, 450);
  };

  const handleSaveResult = () => {
    if (!generatedDraft) return;
    const item = STUDIO_ITEMS.find((i) => i.key === activeToolKey)!;
    const newOutput: Output = {
      id: uid(),
      key: activeToolKey,
      label: generatedDraft.title || item.label,
      when: 'Just now',
      instructions: studioInstructions,
      details: generatedDraft,
      status: 'ready',
      sourcesCount: sourceCount || 6,
    };
    setOutputs((prev) => [newOutput, ...prev]);
    setStudioModalOpen(false);
    onTriggerToast(`${newOutput.label} saved to Studio`);
  };

  const handleOpenViewingOutput = (o: Output) => {
    if (o.status === 'making') {
      onTriggerToast(`Still making ${o.label}... It will be ready in a moment!`);
      return;
    }
    setViewingOutput(o);
    setIsEditingViewingOutput(false);
    setEditViewingDraft(JSON.parse(JSON.stringify(o.details || {})));
  };

  const handleSaveReopenedEdit = () => {
    if (!viewingOutput || !editViewingDraft) return;
    const updatedOutput: Output = {
      ...viewingOutput,
      label: editViewingDraft.title || viewingOutput.label,
      details: editViewingDraft,
      when: 'Updated just now',
    };
    setOutputs((prev) => prev.map((o) => (o.id === viewingOutput.id ? updatedOutput : o)));
    setViewingOutput(updatedOutput);
    setIsEditingViewingOutput(false);
    onTriggerToast('Saved changes to Studio');
  };

  const handleDeleteViewingOutput = () => {
    if (!viewingOutput) return;
    setOutputs((prev) => prev.filter((o) => o.id !== viewingOutput.id));
    setViewingOutput(null);
    setIsEditingViewingOutput(false);
    onTriggerToast('Output removed from Studio');
  };

  const startAudioFromChat = () => {
    setTab('studio');
    openStudioTool('audio');
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: uid(), role: 'user', text }]);
    setInput('');
    setTyping(true);
    replyTimer.current = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: 'assistant',
          text:
            sourceCount > 0
              ? `Based on your ${sourceWord} for "${title}": "${text}" is addressed through systematic breakdown in your notes. Key elements emphasize structured understanding and rapid application.`
              : 'Add or enable at least one source so I can ground my responses strictly in your study materials.',
        },
      ]);
    }, 1100);
  };

  const copyLast = async () => {
    const last = [...messages].reverse().find((m) => m.role === 'assistant');
    try {
      await navigator.clipboard.writeText(last ? last.text : `Notebook: ${title}`);
    } catch {}
    onTriggerToast('Copied to clipboard');
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
    onTriggerToast('Share link copied');
  };

  const addSource = (name: string, kind: SourceItem['kind']) => {
    setSources((s) => [...s, { id: uid(), name, kind, enabled: true }]);
    onTriggerToast('Source added to notebook');
  };

  const submitSheet = () => {
    const v = draft.trim();
    if (!v) return;
    const isUrl = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\S*)$/i.test(v);
    addSource(
      isUrl ? v.replace(/^https?:\/\//, '').split('/')[0] : v.slice(0, 40),
      isUrl ? 'website' : 'text'
    );
    setDraft('');
    setSheetOpen(false);
  };

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) addSource(f.name, 'file');
    e.target.value = '';
  };

  return (
    <div className="app-shell flex items-stretch justify-center bg-[#14151D] text-[#F4F5FA] select-none w-full h-full min-h-screen">
      <div className="relative w-full max-w-[680px] h-full min-h-screen bg-[#14151D] flex flex-col overflow-hidden mx-auto">
        {/* ------------------------------ header ------------------------------ */}
        <header className="app-header shrink-0 flex items-center gap-1 px-3 min-[380px]:px-4 border-b border-[#2F3142] bg-[#14151D] relative z-30">
          <button
            className="p-2 -ml-2 rounded-full active:bg-white/10 transition-colors cursor-pointer"
            aria-label="Back to dashboard"
            onClick={onBack}
          >
            <ArrowLeft size={25} strokeWidth={1.9} className="text-[#F4F5FA]" />
          </button>
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => {
                setTitle(titleDraft.trim() || 'Untitled Notebook');
                setEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              }}
              className="ml-3 flex-1 min-w-0 bg-[#1D1F2A] border border-[#2F3142] rounded-lg px-3 py-1.5 text-[18px] font-medium outline-none focus:border-[#8B7CF6] text-[#F4F5FA]"
            />
          ) : (
            <h1
              onClick={() => {
                setTitleDraft(title);
                setEditingTitle(true);
              }}
              className="ml-3 flex-1 min-w-0 truncate text-[19px] font-medium tracking-[0.1px] cursor-pointer hover:opacity-90"
              title="Click to rename"
            >
              {title}
            </h1>
          )}
          <button
            onClick={share}
            className="p-2.5 rounded-full active:bg-white/10 transition-colors cursor-pointer"
            aria-label="Share"
          >
            <Share2 size={21} strokeWidth={1.9} className="text-[#F4F5FA]" />
          </button>
          <button
            onClick={() => setMenu(menu === 'header' ? null : 'header')}
            className="p-2 rounded-full active:bg-white/10 transition-colors cursor-pointer"
            aria-label="More"
          >
            <MoreVertical size={22} className="text-[#F4F5FA]" />
          </button>
          {menu === 'header' && (
            <div className="absolute right-3 top-[60px] w-56 rounded-2xl bg-[#1D1F2A] border border-[#2F3142] shadow-2xl shadow-black/50 py-2 z-50 fade-in">
              <MenuButton
                icon={<PenLine size={17} />}
                label="Rename notebook"
                onClick={() => {
                  setTitleDraft(title);
                  setEditingTitle(true);
                  setMenu(null);
                }}
              />
              <MenuButton
                icon={<Link2 size={17} />}
                label="Copy share link"
                onClick={() => {
                  setMenu(null);
                  share();
                }}
              />
              <MenuButton
                icon={<Settings size={17} />}
                label="Settings"
                onClick={() => {
                  setMenu(null);
                  onOpenSettings();
                }}
              />
              <MenuButton
                icon={<Trash2 size={17} className="text-[#f28b82]" />}
                label="Clear notebook"
                danger
                onClick={() => {
                  setMenu(null);
                  setMessages([]);
                  setOutputs([]);
                  onTriggerToast('Notebook outputs cleared');
                }}
              />
            </div>
          )}
        </header>

        {/* ------------------------------ screens ------------------------------ */}
        <div className="flex-1 relative overflow-hidden">
          {tab === 'studio' && (
            <StudioScreen
              outputs={outputs}
              onOpenTool={openStudioTool}
              playing={playing}
              setPlaying={setPlaying}
              onViewOutput={handleOpenViewingOutput}
            />
          )}
          {tab === 'chat' && (
            <ChatScreen
              sourceWord={sourceWord}
              sourceCount={sourceCount}
              sources={sources}
              toggleSource={(id) =>
                setSources((s) =>
                  s.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x))
                )
              }
              react={react}
              setReact={setReact}
              onCopy={copyLast}
              onAudio={startAudioFromChat}
              messages={messages}
              typing={typing}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              scrollRef={scrollRef}
              chipOpen={menu === 'chip'}
              setChipOpen={(open) => setMenu(open ? 'chip' : null)}
            />
          )}
          {tab === 'sources' && (
            <SourcesScreen
              sources={sources}
              removeAll={() => {
                setSources([]);
                onTriggerToast('All sources removed');
              }}
              openSheet={() => setSheetOpen(true)}
              pickFile={() => fileRef.current?.click()}
              menuOpen={menu === 'sources'}
              setMenuOpen={(open) => setMenu(open ? 'sources' : null)}
            />
          )}
        </div>

        {/* ------------------------------ bottom nav ------------------------------ */}
        <nav
          className="app-bottom-nav shrink-0 bg-[#1D1F2A] border-t border-[#2F3142] flex z-30"
          aria-label="Notebook sections"
        >
          <NavItem
            label="Sources"
            active={tab === 'sources'}
            onClick={() => setTab('sources')}
            icon={(filled) => (
              <FolderLinesIcon filled={filled} width={25} height={25} />
            )}
          />
          <NavItem
            label="Chat"
            active={tab === 'chat'}
            onClick={() => setTab('chat')}
            icon={(filled) => (
              <ChatBubblesIcon filled={filled} width={26} height={26} />
            )}
          />
          <NavItem
            label="Studio"
            active={tab === 'studio'}
            onClick={() => setTab('studio')}
            icon={(filled) => (
              <WandStarsIcon filled={filled} width={25} height={25} />
            )}
          />
        </nav>

        {/* ------------------------------ add-source sheet ------------------------------ */}
        {sheetOpen && (
          <div className="absolute inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/60 fade-in cursor-pointer"
              onClick={() => setSheetOpen(false)}
            />
            <div
              className="absolute bottom-0 left-0 right-0 rounded-t-[28px] bg-[#1D1F2A] sheet-up border-t border-[#2F3142]"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-3" />
              <div className="flex items-center justify-between px-6 pt-4 pb-3">
                <h2 className="text-[18px] font-medium text-[#F4F5FA]">Add source</h2>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="p-2 -mr-2 rounded-full active:bg-white/10 cursor-pointer"
                >
                  <X size={20} className="text-[#8B90A5]" />
                </button>
              </div>
              <div className="px-6 pb-2">
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitSheet()}
                  placeholder="Paste a link or text"
                  className="w-full h-[52px] rounded-2xl bg-[#14151D] border border-[#2F3142] px-4 text-[15px] outline-none placeholder:text-[#8B90A5] focus:border-[#8B7CF6] text-[#F4F5FA]"
                />
                <button
                  onClick={submitSheet}
                  disabled={!draft.trim()}
                  className="mt-4 w-full h-[52px] rounded-full bg-[#8B7CF6] text-white text-[15px] font-medium disabled:opacity-40 active:scale-[0.99] transition cursor-pointer hover:bg-[#7A6BD0]"
                >
                  Add source
                </button>
                <button
                  onClick={() => {
                    fileRef.current?.click();
                    setSheetOpen(false);
                  }}
                  className="mt-2.5 w-full h-[52px] rounded-full border border-[#2F3142] text-[14px] font-medium text-[#F4F5FA] active:bg-white/5 transition cursor-pointer"
                >
                  Upload a file instead
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------ studio generator modal sheet ------------------------------ */}
        {studioModalOpen && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-black/75 fade-in cursor-pointer"
              onClick={() => setStudioModalOpen(false)}
            />
            <div
              className="relative max-h-[88%] rounded-t-[28px] bg-[#1D1F2A] sheet-up border-t border-[#2F3142] flex flex-col overflow-hidden shadow-2xl"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-3 shrink-0" />
              
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 pt-3.5 pb-3 border-b border-white/5 shrink-0">
                {(() => {
                  const meta = STUDIO_ITEMS.find((i) => i.key === activeToolKey)!;
                  const Icon = meta.icon;
                  return (
                    <div className="flex items-center gap-3">
                      <span
                        className="size-9 rounded-xl bg-[#1b1e26] grid place-items-center shrink-0"
                        style={{ color: meta.color }}
                      >
                        <Icon width={20} height={20} occlude="#1b1e26" />
                      </span>
                      <div>
                        <h3 className="text-[16.5px] font-medium text-[#e8eaed]">
                          {meta.label} Studio
                        </h3>
                        <p className="text-[12px] text-[#80868b]">
                          Enter instructions & edit mock result
                        </p>
                      </div>
                    </div>
                  );
                })()}
                <button
                  onClick={() => setStudioModalOpen(false)}
                  className="p-2 -mr-2 rounded-full active:bg-white/10 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={20} className="text-[#9aa0a6]" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
                {/* 1. Enter instructions */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[13.5px] font-medium text-[#e8eaed] flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#8ab4f8]" />
                      <span>Enter instructions</span>
                    </label>
                    <span className="text-[11.5px] text-[#80868b]">Frontend Mock</span>
                  </div>
                  <textarea
                    value={studioInstructions}
                    onChange={(e) => setStudioInstructions(e.target.value)}
                    placeholder="Enter instructions (e.g. 'Focus on chapter 3 formulas and provide 5 questions')..."
                    className="w-full h-20 rounded-xl bg-[#1b1e26] border border-white/10 p-3 text-[14px] text-[#e8eaed] placeholder:text-[#80868b] outline-none focus:border-[#8ab4f8]/60 resize-none transition"
                  />
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    {[
                      { label: 'High-Yield Exam', prompt: 'High-yield exam review with key formulas and pitfalls' },
                      { label: 'Core Definitions', prompt: 'Comprehensive conceptual definitions with verified source grounding' },
                      { label: 'Step-by-step', prompt: 'Step-by-step mechanism breakdown and visual walkthrough' },
                      { label: 'Key Formulas', prompt: 'Mathematical expressions, derivations, and test variables' },
                    ].map((pill, idx) => (
                      <button
                        key={idx}
                        onClick={() => setStudioInstructions(pill.prompt)}
                        className="shrink-0 px-2.5 py-1 rounded-full text-[11.5px] bg-white/5 hover:bg-white/10 text-[#c4c7cc] active:scale-95 transition cursor-pointer"
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleGenerateMock(activeToolKey)}
                    disabled={isGeneratingDraft}
                    className="w-full h-11 rounded-xl bg-[#2b303c] border border-white/10 hover:border-white/20 text-[#e8eaed] text-[13.5px] font-medium flex items-center justify-center gap-2 active:scale-[0.99] transition cursor-pointer"
                  >
                    {isGeneratingDraft ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin text-[#8ab4f8]" />
                        <span>Generating mock result...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} className="text-[#8ab4f8]" />
                        <span>Generate mock result</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Edit the result */}
                {generatedDraft && (
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#81c995]" />
                        <span className="text-[14px] font-medium text-[#e8eaed]">Edit the result</span>
                      </div>
                      <span className="text-[11.5px] text-[#9aa0a6]">Editable before saving</span>
                    </div>

                    {/* Result Title */}
                    <div>
                      <label className="text-[12px] text-[#9aa0a6] block mb-1">Title</label>
                      <input
                        value={generatedDraft.title || ''}
                        onChange={(e) =>
                          setGeneratedDraft({ ...generatedDraft, title: e.target.value })
                        }
                        className="w-full h-10 rounded-xl bg-[#1b1e26] border border-white/10 px-3 text-[14px] text-[#e8eaed] outline-none focus:border-[#8ab4f8]/60"
                      />
                    </div>

                    {/* Flashcards Editor */}
                    {activeToolKey === 'flashcards' && generatedDraft.cards && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12.5px] text-[#9aa0a6] font-medium">
                            Cards ({generatedDraft.cards.length})
                          </span>
                          <button
                            onClick={() =>
                              setGeneratedDraft({
                                ...generatedDraft,
                                cards: [
                                  ...generatedDraft.cards,
                                  { q: 'New Concept Question', a: 'Detailed answer or explanation.' },
                                ],
                              })
                            }
                            className="text-[12px] text-[#8ab4f8] font-medium flex items-center gap-1 active:scale-95 transition cursor-pointer"
                          >
                            <Plus size={14} /> Add card
                          </button>
                        </div>
                        {generatedDraft.cards.map((card: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-[#1b1e26] border border-white/5 space-y-2 relative"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11.5px] font-semibold text-[#f6a56b]">
                                CARD {idx + 1}
                              </span>
                              {generatedDraft.cards.length > 1 && (
                                <button
                                  onClick={() =>
                                    setGeneratedDraft({
                                      ...generatedDraft,
                                      cards: generatedDraft.cards.filter((_: any, i: number) => i !== idx),
                                    })
                                  }
                                  className="text-[#9aa0a6] hover:text-[#f28b82] p-1 cursor-pointer"
                                  title="Delete card"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                            <div>
                              <input
                                value={card.q}
                                onChange={(e) => {
                                  const updated = [...generatedDraft.cards];
                                  updated[idx] = { ...updated[idx], q: e.target.value };
                                  setGeneratedDraft({ ...generatedDraft, cards: updated });
                                }}
                                placeholder="Question"
                                className="w-full h-9 rounded-lg bg-black/20 border border-white/5 px-2.5 text-[13.5px] text-[#e8eaed] outline-none focus:border-[#8ab4f8]/50"
                              />
                            </div>
                            <div>
                              <textarea
                                value={card.a}
                                onChange={(e) => {
                                  const updated = [...generatedDraft.cards];
                                  updated[idx] = { ...updated[idx], a: e.target.value };
                                  setGeneratedDraft({ ...generatedDraft, cards: updated });
                                }}
                                placeholder="Answer"
                                className="w-full h-16 rounded-lg bg-black/20 border border-white/5 p-2 text-[13px] text-[#9aa0a6] outline-none focus:border-[#8ab4f8]/50 resize-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quiz Editor */}
                    {activeToolKey === 'quiz' && generatedDraft.questions && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12.5px] text-[#9aa0a6] font-medium">
                            Questions ({generatedDraft.questions.length})
                          </span>
                          <button
                            onClick={() =>
                              setGeneratedDraft({
                                ...generatedDraft,
                                questions: [
                                  ...generatedDraft.questions,
                                  {
                                    q: 'New Practice Question?',
                                    options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
                                    correct: 0,
                                    explanation: 'Clear explanation grounded in source materials.',
                                  },
                                ],
                              })
                            }
                            className="text-[12px] text-[#8ab4f8] font-medium flex items-center gap-1 active:scale-95 transition cursor-pointer"
                          >
                            <Plus size={14} /> Add question
                          </button>
                        </div>
                        {generatedDraft.questions.map((qItem: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-[#1b1e26] border border-white/5 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11.5px] font-semibold text-[#76d7ea]">
                                QUESTION {idx + 1}
                              </span>
                              {generatedDraft.questions.length > 1 && (
                                <button
                                  onClick={() =>
                                    setGeneratedDraft({
                                      ...generatedDraft,
                                      questions: generatedDraft.questions.filter((_: any, i: number) => i !== idx),
                                    })
                                  }
                                  className="text-[#9aa0a6] hover:text-[#f28b82] p-1 cursor-pointer"
                                  title="Delete question"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                            <input
                              value={qItem.q}
                              onChange={(e) => {
                                const updated = [...generatedDraft.questions];
                                updated[idx] = { ...updated[idx], q: e.target.value };
                                setGeneratedDraft({ ...generatedDraft, questions: updated });
                              }}
                              className="w-full h-9 rounded-lg bg-black/20 border border-white/5 px-2.5 text-[13.5px] text-[#e8eaed] outline-none"
                            />
                            <div className="space-y-1.5">
                              {qItem.options.map((opt: string, optIdx: number) => (
                                <div key={optIdx} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`quiz_opt_${idx}`}
                                    checked={qItem.correct === optIdx}
                                    onChange={() => {
                                      const updated = [...generatedDraft.questions];
                                      updated[idx] = { ...updated[idx], correct: optIdx };
                                      setGeneratedDraft({ ...generatedDraft, questions: updated });
                                    }}
                                    className="cursor-pointer"
                                  />
                                  <input
                                    value={opt}
                                    onChange={(e) => {
                                      const updated = [...generatedDraft.questions];
                                      const updatedOpts = [...updated[idx].options];
                                      updatedOpts[optIdx] = e.target.value;
                                      updated[idx] = { ...updated[idx], options: updatedOpts };
                                      setGeneratedDraft({ ...generatedDraft, questions: updated });
                                    }}
                                    className="flex-1 h-8 rounded-lg bg-black/20 border border-white/5 px-2 text-[12.5px] text-[#c4c7cc] outline-none"
                                  />
                                </div>
                              ))}
                            </div>
                            <input
                              value={qItem.explanation}
                              onChange={(e) => {
                                const updated = [...generatedDraft.questions];
                                updated[idx] = { ...updated[idx], explanation: e.target.value };
                                setGeneratedDraft({ ...generatedDraft, questions: updated });
                              }}
                              placeholder="Explanation"
                              className="w-full h-8 rounded-lg bg-black/20 border border-white/5 px-2 text-[12px] text-[#80868b] outline-none italic"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Slides Editor */}
                    {activeToolKey === 'slides' && generatedDraft.slides && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12.5px] text-[#9aa0a6] font-medium">
                            Slides ({generatedDraft.slides.length})
                          </span>
                          <button
                            onClick={() =>
                              setGeneratedDraft({
                                ...generatedDraft,
                                slides: [
                                  ...generatedDraft.slides,
                                  { title: `Slide ${generatedDraft.slides.length + 1}: Overview`, points: ['Key topic point', 'Secondary breakdown'] },
                                ],
                              })
                            }
                            className="text-[12px] text-[#8ab4f8] font-medium flex items-center gap-1 active:scale-95 transition cursor-pointer"
                          >
                            <Plus size={14} /> Add slide
                          </button>
                        </div>
                        {generatedDraft.slides.map((slide: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-[#1b1e26] border border-white/5 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11.5px] font-semibold text-[#fdd663]">
                                SLIDE {idx + 1}
                              </span>
                              {generatedDraft.slides.length > 1 && (
                                <button
                                  onClick={() =>
                                    setGeneratedDraft({
                                      ...generatedDraft,
                                      slides: generatedDraft.slides.filter((_: any, i: number) => i !== idx),
                                    })
                                  }
                                  className="text-[#9aa0a6] hover:text-[#f28b82] p-1 cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                            <input
                              value={slide.title}
                              onChange={(e) => {
                                const updated = [...generatedDraft.slides];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setGeneratedDraft({ ...generatedDraft, slides: updated });
                              }}
                              className="w-full h-9 rounded-lg bg-black/20 border border-white/5 px-2.5 text-[13.5px] text-[#e8eaed] outline-none"
                            />
                            <div className="space-y-1.5">
                              {slide.points.map((pt: string, pIdx: number) => (
                                <input
                                  key={pIdx}
                                  value={pt}
                                  onChange={(e) => {
                                    const updated = [...generatedDraft.slides];
                                    const updatedPts = [...updated[idx].points];
                                    updatedPts[pIdx] = e.target.value;
                                    updated[idx] = { ...updated[idx], points: updatedPts };
                                    setGeneratedDraft({ ...generatedDraft, slides: updated });
                                  }}
                                  className="w-full h-8 rounded-lg bg-black/20 border border-white/5 px-2 text-[12.5px] text-[#c4c7cc] outline-none"
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reports Editor */}
                    {activeToolKey === 'reports' && generatedDraft.sections && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[12px] text-[#9aa0a6] block mb-1">Executive Summary</label>
                          <textarea
                            value={generatedDraft.summary || ''}
                            onChange={(e) =>
                              setGeneratedDraft({ ...generatedDraft, summary: e.target.value })
                            }
                            className="w-full h-18 rounded-xl bg-[#1b1e26] border border-white/10 p-2.5 text-[13px] text-[#c4c7cc] outline-none resize-none"
                          />
                        </div>
                        {generatedDraft.sections.map((sec: any, idx: number) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-[#1b1e26] border border-white/5 space-y-2">
                            <input
                              value={sec.heading}
                              onChange={(e) => {
                                const updated = [...generatedDraft.sections];
                                updated[idx] = { ...updated[idx], heading: e.target.value };
                                setGeneratedDraft({ ...generatedDraft, sections: updated });
                              }}
                              className="w-full h-9 rounded-lg bg-black/20 border border-white/5 px-2.5 text-[13.5px] font-medium text-[#e6e19d] outline-none"
                            />
                            <textarea
                              value={sec.content}
                              onChange={(e) => {
                                const updated = [...generatedDraft.sections];
                                updated[idx] = { ...updated[idx], content: e.target.value };
                                setGeneratedDraft({ ...generatedDraft, sections: updated });
                              }}
                              className="w-full h-18 rounded-lg bg-black/20 border border-white/5 p-2 text-[13px] text-[#9aa0a6] outline-none resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Audio / Video / Infographic Editor */}
                    {(activeToolKey === 'audio' || activeToolKey === 'video' || activeToolKey === 'infographic') && (
                      <div className="p-3.5 rounded-2xl bg-[#1b1e26] border border-white/5 space-y-3">
                        <div>
                          <label className="text-[12px] text-[#9aa0a6] block mb-1">
                            {activeToolKey === 'audio' ? 'Audio Script / Transcript' : activeToolKey === 'video' ? 'Video Narrative' : 'Summary'}
                          </label>
                          <textarea
                            value={generatedDraft.transcript || generatedDraft.summary || ''}
                            onChange={(e) =>
                              setGeneratedDraft({
                                ...generatedDraft,
                                transcript: e.target.value,
                                summary: e.target.value,
                              })
                            }
                            className="w-full h-24 rounded-lg bg-black/20 border border-white/5 p-2.5 text-[13px] text-[#c4c7cc] outline-none resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 3. Save the result Footer */}
              <div className="p-4 border-t border-[#2F3142] bg-[#1D1F2A] flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setStudioModalOpen(false)}
                  className="flex-1 h-12 rounded-full border border-[#2F3142] text-[14px] font-medium text-[#8B90A5] active:bg-white/5 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveResult}
                  disabled={!generatedDraft}
                  className="flex-[2] h-12 rounded-full bg-[#8B7CF6] text-white text-[14.5px] font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition cursor-pointer shadow-lg disabled:opacity-40 hover:bg-[#7A6BD0]"
                >
                  <Check size={18} />
                  <span>Save to Studio</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------ view & edit reopened output modal sheet / FlashcardViewer / QuizViewer ------------------------------ */}
        {viewingOutput && viewingOutput.key === 'flashcards' && (
          <FlashcardViewer
            title={viewingOutput.label}
            cards={viewingOutput.details?.cards}
            onBack={() => {
              setViewingOutput(null);
              setIsEditingViewingOutput(false);
            }}
            onTriggerToast={onTriggerToast}
          />
        )}

        {viewingOutput && viewingOutput.key === 'quiz' && (
          <QuizViewer
            title={viewingOutput.label}
            questions={viewingOutput.details?.questions}
            onBack={() => {
              setViewingOutput(null);
              setIsEditingViewingOutput(false);
            }}
            onTriggerToast={onTriggerToast}
          />
        )}

        {viewingOutput && viewingOutput.key !== 'flashcards' && viewingOutput.key !== 'quiz' && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-black/70 fade-in cursor-pointer"
              onClick={() => {
                setViewingOutput(null);
                setIsEditingViewingOutput(false);
              }}
            />
            <div
              className="relative max-h-[85%] rounded-t-[28px] bg-[#1D1F2A] sheet-up border-t border-[#2F3142] flex flex-col overflow-hidden"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-3 shrink-0" />
              
              <div className="flex items-center justify-between px-5 pt-3.5 pb-3 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                  <span className="text-[16.5px] font-medium text-[#e8eaed] truncate">
                    {viewingOutput.label}
                  </span>
                  <span className="text-[11.5px] text-[#80868b] bg-white/5 px-2.5 py-0.5 rounded-full shrink-0">
                    {viewingOutput.when}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      if (isEditingViewingOutput) {
                        handleSaveReopenedEdit();
                      } else {
                        setIsEditingViewingOutput(true);
                      }
                    }}
                    className={cn(
                      'p-2 rounded-full cursor-pointer transition flex items-center gap-1 text-[13px] font-medium px-2.5',
                      isEditingViewingOutput
                        ? 'bg-[#8ab4f8] text-[#1b1e26]'
                        : 'active:bg-white/10 text-[#8ab4f8]'
                    )}
                    title={isEditingViewingOutput ? 'Save changes' : 'Edit result'}
                  >
                    {isEditingViewingOutput ? (
                      <>
                        <Check size={16} />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <PenLine size={16} />
                        <span>Edit</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDeleteViewingOutput}
                    className="p-2 rounded-full active:bg-white/10 text-[#9aa0a6] hover:text-[#f28b82] cursor-pointer transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setViewingOutput(null);
                      setIsEditingViewingOutput(false);
                    }}
                    className="p-2 -mr-1 rounded-full active:bg-white/10 cursor-pointer"
                  >
                    <X size={20} className="text-[#9aa0a6]" />
                  </button>
                </div>
              </div>

              {/* Instructions badge if present */}
              {viewingOutput.instructions && (
                <div className="px-5 py-2 bg-black/20 border-b border-white/5 flex items-center gap-2 text-[12px] text-[#9aa0a6]">
                  <Sparkles size={13} className="text-[#8ab4f8] shrink-0" />
                  <span className="truncate">
                    Prompt: "{viewingOutput.instructions}"
                  </span>
                </div>
              )}

              {/* Content Area */}
              <div className="p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
                {isEditingViewingOutput ? (
                  /* EDITING MODE FOR REOPENED SAVED RESULT */
                  <div className="space-y-4">
                    <div>
                      <label className="text-[12px] text-[#9aa0a6] block mb-1">Result Title</label>
                      <input
                        value={editViewingDraft?.title || ''}
                        onChange={(e) =>
                          setEditViewingDraft({ ...editViewingDraft, title: e.target.value })
                        }
                        className="w-full h-10 rounded-xl bg-[#1b1e26] border border-white/10 px-3 text-[14px] text-[#e8eaed] outline-none focus:border-[#8ab4f8]/60"
                      />
                    </div>

                    {viewingOutput.key === 'slides' && editViewingDraft?.slides && (
                      <div className="space-y-3">
                        {editViewingDraft.slides.map((slide: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-xl bg-[#1b1e26] border border-white/5 space-y-2">
                            <input
                              value={slide.title}
                              onChange={(e) => {
                                const slides = [...editViewingDraft.slides];
                                slides[idx] = { ...slides[idx], title: e.target.value };
                                setEditViewingDraft({ ...editViewingDraft, slides });
                              }}
                              className="w-full h-8 rounded-lg bg-black/20 border border-white/5 px-2 text-[13px] text-[#e8eaed]"
                            />
                            {slide.points.map((pt: string, pIdx: number) => (
                              <input
                                key={pIdx}
                                value={pt}
                                onChange={(e) => {
                                  const slides = [...editViewingDraft.slides];
                                  const pts = [...slides[idx].points];
                                  pts[pIdx] = e.target.value;
                                  slides[idx] = { ...slides[idx], points: pts };
                                  setEditViewingDraft({ ...editViewingDraft, slides });
                                }}
                                className="w-full h-7 rounded-lg bg-black/20 border border-white/5 px-2 text-[12px] text-[#c4c7cc]"
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {viewingOutput.key === 'reports' && editViewingDraft?.sections && (
                      <div className="space-y-3">
                        <textarea
                          value={editViewingDraft.summary || ''}
                          onChange={(e) =>
                            setEditViewingDraft({ ...editViewingDraft, summary: e.target.value })
                          }
                          className="w-full h-16 rounded-xl bg-[#1b1e26] border border-white/10 p-2 text-[13px] text-[#c4c7cc] resize-none"
                        />
                        {editViewingDraft.sections.map((sec: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-xl bg-[#1b1e26] border border-white/5 space-y-2">
                            <input
                              value={sec.heading}
                              onChange={(e) => {
                                const sections = [...editViewingDraft.sections];
                                sections[idx] = { ...sections[idx], heading: e.target.value };
                                setEditViewingDraft({ ...editViewingDraft, sections });
                              }}
                              className="w-full h-8 rounded-lg bg-black/20 border border-white/5 px-2 text-[13px] text-[#e6e19d]"
                            />
                            <textarea
                              value={sec.content}
                              onChange={(e) => {
                                const sections = [...editViewingDraft.sections];
                                sections[idx] = { ...sections[idx], content: e.target.value };
                                setEditViewingDraft({ ...editViewingDraft, sections });
                              }}
                              className="w-full h-14 rounded-lg bg-black/20 border border-white/5 p-2 text-[12.5px] text-[#9aa0a6] resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => setIsEditingViewingOutput(false)}
                        className="flex-1 h-10 rounded-full border border-white/15 text-[13.5px] text-[#c4c7cc] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveReopenedEdit}
                        className="flex-1 h-10 rounded-full bg-[#e8eaed] text-[#1b1e26] text-[13.5px] font-medium cursor-pointer"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                ) : (
                  /* VIEWING MODE FOR REOPENED SAVED RESULT */
                  <>
                    {viewingOutput.key === 'slides' && viewingOutput.details?.slides && (
                      <div className="space-y-3">
                        {viewingOutput.details.slides.map((slide: any, idx: number) => (
                          <div key={idx} className="p-4 rounded-2xl bg-[#1b1e26] border border-white/5">
                            <div className="text-[12px] font-semibold text-[#fdd663] mb-1">
                              SLIDE {idx + 1}: {slide.title}
                            </div>
                            <ul className="list-disc list-inside space-y-1.5 text-[13.5px] text-[#9aa0a6] mt-2">
                              {slide.points.map((pt: string, pIdx: number) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {viewingOutput.key === 'reports' && viewingOutput.details?.sections && (
                      <div className="space-y-4">
                        {viewingOutput.details.summary && (
                          <p className="text-[14.5px] leading-relaxed text-[#c4c7cc] bg-[#1b1e26] p-4 rounded-2xl border border-white/5">
                            {viewingOutput.details.summary}
                          </p>
                        )}
                        {viewingOutput.details.sections.map((sec: any, idx: number) => (
                          <div key={idx} className="p-4 rounded-2xl bg-[#1b1e26] border border-white/5">
                            <h4 className="text-[15px] font-medium text-[#e6e19d] mb-1.5">{sec.heading}</h4>
                            <p className="text-[13.5px] text-[#9aa0a6] leading-relaxed">{sec.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Audio Transcript / Highlights */}
                    {viewingOutput.key === 'audio' && viewingOutput.details && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-[#1b1e26] border border-white/5">
                          <span className="text-[12px] font-semibold text-[#c58af9] mb-1.5 block">
                            TRANSCRIPT OVERVIEW ({viewingOutput.details.duration || '3:20'})
                          </span>
                          <p className="text-[14px] text-[#c4c7cc] leading-relaxed">
                            {viewingOutput.details.transcript}
                          </p>
                        </div>
                        {viewingOutput.details.highlights && (
                          <div className="p-4 rounded-2xl bg-[#1b1e26] border border-white/5 space-y-2">
                            <span className="text-[12px] font-semibold text-[#8ab4f8] block">Key Highlights</span>
                            <ul className="list-disc list-inside space-y-1.5 text-[13px] text-[#9aa0a6]">
                              {viewingOutput.details.highlights.map((h: string, hIdx: number) => (
                                <li key={hIdx}>{h}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Fallback view */}
                    {(!viewingOutput.details ||
                      (!viewingOutput.details.cards &&
                        !viewingOutput.details.questions &&
                        !viewingOutput.details.slides &&
                        !viewingOutput.details.sections &&
                        !viewingOutput.details.transcript)) && (
                      <div className="p-5 rounded-2xl bg-[#1b1e26] border border-white/5 text-center">
                        <Sparkles className="mx-auto text-[#aec4ff] mb-3" size={28} />
                        <p className="text-[14.5px] text-[#e8eaed]">
                          {viewingOutput.label} generated and grounded in your active notebook sources.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* click-away layer for popovers */}
        {menu && (
          <div className="absolute inset-0 z-20" onClick={() => setMenu(null)} />
        )}

        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={onPickFile}
        />
      </div>
    </div>
  );
};

/* ============================== nav item ============================== */
function NavItem({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: (filled: boolean) => React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="flex-1 flex flex-col items-center justify-start pt-2.5 pb-1.5 gap-[3px] group cursor-pointer"
    >
      <span
        className={cn(
          'transition-colors',
          active ? 'text-[#e8eaed]' : 'text-[#9aa0a6] group-active:text-[#c4c7cc]'
        )}
      >
        {icon(active)}
      </span>
      <span
        className={cn(
          'text-[12px] font-medium tracking-[0.15px] transition-colors',
          active ? 'text-[#e8eaed]' : 'text-[#9aa0a6]'
        )}
      >
        {label}
      </span>
    </button>
  );
}

/* ============================== menu button ============================== */
function MenuButton({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3.5 px-5 py-3 text-left active:bg-white/5 transition-colors cursor-pointer"
    >
      <span className={danger ? 'text-[#f28b82]' : 'text-[#c4c7cc]'}>{icon}</span>
      <span
        className={cn(
          'text-[14px] font-medium',
          danger ? 'text-[#f28b82]' : 'text-[#e8eaed]'
        )}
      >
        {label}
      </span>
    </button>
  );
}

/* ============================== STUDIO ============================== */
function StudioScreen({
  outputs,
  onOpenTool,
  playing,
  setPlaying,
  onViewOutput,
}: {
  outputs: Output[];
  onOpenTool: (k: StudioKey) => void;
  playing: string | null;
  setPlaying: (id: string | null) => void;
  onViewOutput: (out: Output) => void;
}) {
  return (
    <div className="studio-screen h-full overflow-y-auto overscroll-contain no-scrollbar px-4 min-[380px]:px-5 pt-4 pb-12">
      {/* 2-Column Tool Grid matching screenshot */}
      <h2 className="text-[16px] font-medium text-[#F4F5FA]">Generate new</h2>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-3">
        {STUDIO_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onOpenTool(item.key)}
              style={{ backgroundColor: item.bgHex }}
              className="h-14 sm:h-16 rounded-[18px] border border-white/5 flex items-center gap-3 px-3.5 text-left transition active:scale-[0.97] cursor-pointer hover:brightness-110 shadow-sm"
            >
              <span style={{ color: item.color }} className="shrink-0">
                <Icon width={22} height={22} occlude={item.bgHex} />
              </span>
              <span className="text-[13.5px] sm:text-[14px] font-medium text-[#F4F5FA] leading-tight truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Generated Outputs List */}
      {outputs.length === 0 ? (
        <div className="studio-empty mt-12 flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <WandStarsIcon width={32} height={32} className="text-[#9aa0a6]" />
          <p className="mt-3 text-[14.5px] font-medium text-[#e8eaed]">
            No studio outputs yet
          </p>
          <p className="mt-1 text-[13px] text-[#80868b] max-w-[260px]">
            Tap any tool above to generate reports, flashcards, or quizzes.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <div className="divide-y divide-white/5">
            {outputs.map((o) => (
              <OutputCard
                key={o.id}
                output={o}
                playing={playing === o.id}
                onToggle={() => setPlaying(playing === o.id ? null : o.id)}
                onClick={() => onViewOutput(o)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OutputCard({
  output,
  playing,
  onToggle,
  onClick,
}: {
  output: Output;
  playing: boolean;
  onToggle: () => void;
  onClick: () => void;
}) {
  const meta = STUDIO_ITEMS.find((i) => i.key === output.key) || STUDIO_ITEMS[0];
  const Icon = meta.icon;
  const isMaking = output.status === 'making';

  if (output.key === 'audio' && !isMaking) {
    return (
      <div className="py-3 px-1 flex items-center gap-3.5 hover:bg-white/[0.03] transition-colors rounded-xl">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="size-10 rounded-full bg-[#8B7CF6] text-white grid place-items-center shrink-0 active:scale-95 transition cursor-pointer"
        >
          {playing ? (
            <Pause size={17} className="text-white" fill="currentColor" />
          ) : (
            <Play size={17} className="text-white ml-0.5" fill="currentColor" />
          )}
        </button>
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onClick}>
          <p className="text-[14.5px] font-medium text-[#F4F5FA] truncate">
            {output.label}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            {playing ? (
              <span className="flex items-center gap-[3px] h-3.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="eq-bar w-[3px] h-3.5 rounded-full bg-[#c58af9]"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </span>
            ) : (
              <span className="text-[12px] text-[#8B90A5]">
                {output.sourcesCount || 6} sources • {output.when}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClick}
          className="p-2 rounded-full active:bg-white/10 cursor-pointer text-[#8B90A5]"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="py-3 px-1 flex items-center gap-3.5 cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors rounded-xl group"
    >
      <div
        className="size-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ color: meta.color }}
      >
        {isMaking ? (
          <Loader2 size={21} className="animate-spin text-[#8ab4f8]" />
        ) : (
          <Icon width={24} height={24} occlude="#14151D" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14.5px] sm:text-[15px] font-medium text-[#F4F5FA] truncate">
          {output.label}
        </p>
        <div className="text-[12px] sm:text-[12.5px] text-[#8B90A5] mt-0.5 flex items-center gap-2">
          {isMaking ? (
            <span className="text-[#8ab4f8] font-medium inline-flex items-center gap-1.5 animate-pulse">
              Making...
            </span>
          ) : (
            <span>
              {output.sourcesCount || 6} sources • {output.when}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="p-2 rounded-full active:bg-white/10 cursor-pointer text-[#8B90A5] opacity-80 group-hover:opacity-100"
      >
        <MoreHorizontal size={19} />
      </button>
    </div>
  );
}

/* ============================== CHAT ============================== */
function ChatScreen({
  sourceWord,
  sourceCount,
  sources,
  toggleSource,
  react,
  setReact,
  onCopy,
  onAudio,
  messages,
  typing,
  input,
  setInput,
  sendMessage,
  scrollRef,
  chipOpen,
  setChipOpen,
}: {
  sourceWord: string;
  sourceCount: number;
  sources: SourceItem[];
  toggleSource: (id: string) => void;
  react: 'up' | 'down' | null;
  setReact: (r: 'up' | 'down' | null) => void;
  onCopy: () => void;
  onAudio: () => void;
  messages: Msg[];
  typing: boolean;
  input: string;
  setInput: (v: string) => void;
  sendMessage: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  chipOpen: boolean;
  setChipOpen: (open: boolean) => void;
}) {
  return (
    <div className="h-full relative">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto overscroll-contain no-scrollbar px-4 min-[380px]:px-6 pt-6 pb-32"
      >
        <BookThumb size={62} />
        <h2 className="mt-7 text-[19px] font-medium text-[#e8eaed]">
          {sourceWord}
        </h2>
        <div className="chat-summary-actions mt-8 flex items-center gap-8 min-[380px]:gap-11 pl-2">
          <button
            onClick={onCopy}
            className="text-[#8B90A5] active:text-white transition-colors cursor-pointer"
            aria-label="Copy"
          >
            <CopyOverlapIcon width={23} height={23} occlude="#14151D" />
          </button>
          <button
            onClick={() => setReact(react === 'up' ? null : 'up')}
            aria-label="Good response"
            className={cn(
              'transition-colors active:scale-90 cursor-pointer',
              react === 'up' ? 'text-white' : 'text-[#c4c7cc]'
            )}
          >
            <ThumbsUp
              size={22}
              strokeWidth={1.7}
              fill={react === 'up' ? 'currentColor' : 'none'}
            />
          </button>
          <button
            onClick={() => setReact(react === 'down' ? null : 'down')}
            aria-label="Bad response"
            className={cn(
              'transition-colors active:scale-90 cursor-pointer',
              react === 'down' ? 'text-white' : 'text-[#c4c7cc]'
            )}
          >
            <ThumbsDown
              size={22}
              strokeWidth={1.7}
              fill={react === 'down' ? 'currentColor' : 'none'}
            />
          </button>
        </div>
        <button
          onClick={onAudio}
          className="chat-audio-action mt-11 w-full min-h-12 h-[58px] rounded-full border border-[#3f454e] flex items-center justify-center gap-3.5 active:bg-white/5 transition cursor-pointer"
        >
          <AudioWaveSparkleIcon width={22} height={22} className="text-[#e8eaed]" />
          <span className="text-[16px] font-medium text-[#e8eaed]">
            Audio Overview
          </span>
        </button>
        <p className="mt-6 text-[13px] leading-snug font-semibold text-[#8b9096]">
          NotebookLM can be inaccurate, so double-check grounded references.
        </p>

        {/* messages */}
        {messages.length > 0 && (
          <div className="mt-9 space-y-3">
            {messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="flex justify-end rise-in">
                  <div className="max-w-[85%] rounded-[20px] rounded-br-md bg-[#242738] border border-[#2F3142] px-4 py-3 text-[14.5px] leading-relaxed text-[#F4F5FA]">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="rise-in">
                  <div className="text-[14.5px] leading-relaxed text-[#e8eaed] pr-2">
                    {m.text}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2 py-1">
                    <span className="size-3.5 rounded-[4px] bg-[#8ab4f8]/25 grid place-items-center">
                      <span className="size-1.5 rounded-[2px] bg-[#8ab4f8]" />
                    </span>
                    <span className="text-[11.5px] font-medium text-[#9aa0a6]">
                      {sourceWord}
                    </span>
                  </div>
                </div>
              )
            )}
            {typing && (
              <div className="flex gap-1.5 py-2 rise-in">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 rounded-full bg-[#9aa0a6] animate-pulse"
                    style={{ animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* input bar */}
      <div className="chat-composer absolute bottom-0 left-0 right-0 z-30 bg-[#14151D]">
        {/* chip popover */}
        {chipOpen && (
          <div className="absolute bottom-[76px] right-3 w-60 rounded-2xl bg-[#1D1F2A] border border-[#2F3142] shadow-2xl shadow-black/50 py-2 fade-in">
            <p className="px-5 pt-2 pb-2.5 text-[12px] font-semibold uppercase tracking-wider text-[#8B90A5]">
              Select sources
            </p>
            {sources.length === 0 && (
              <p className="px-5 pb-3 text-[13.5px] text-[#8B90A5]">
                No sources yet.
              </p>
            )}
            {sources.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleSource(s.id)}
                className="w-full flex items-center gap-3 px-5 py-2.5 active:bg-white/5 transition-colors text-left cursor-pointer"
              >
                <span
                  className={cn(
                    'size-[18px] rounded-full border grid place-items-center shrink-0 transition-colors',
                    s.enabled
                      ? 'bg-[#8B7CF6] border-[#8B7CF6]'
                      : 'border-[#6E7388]'
                  )}
                >
                  {s.enabled && (
                    <Check size={12} strokeWidth={3.5} className="text-white" />
                  )}
                </span>
                <SourceGlyph source={s} small />
                <span className="text-[14px] text-[#F4F5FA] truncate">
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="rounded-t-[24px] bg-[#1D1F2A] border-t border-x border-[#2F3142] pl-5 pr-2.5 py-3.5 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask ${sourceWord}...`}
            className="flex-1 min-w-0 bg-transparent text-[16px] text-[#F4F5FA] placeholder:text-[#6E7388] outline-none select-text"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setChipOpen(!chipOpen);
            }}
            className="h-11 pl-3 pr-2.5 rounded-full bg-[#242738] border border-[#2F3142] flex items-center gap-2 active:bg-[#2F3142] transition-colors shrink-0 cursor-pointer"
          >
            <FolderLinesIcon width={19} height={19} className="text-[#e8eaed]" />
            <span className="text-[14.5px] font-medium text-[#e8eaed]">
              {sourceCount}
            </span>
            <ChevronDown
              size={17}
              className={cn(
                'text-[#c4c7cc] transition-transform',
                chipOpen && 'rotate-180'
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== SOURCES ============================== */
function SourceGlyph({ source, small = false }: { source: SourceItem; small?: boolean }) {
  if (source.error) {
    return (
      <span
        className={cn(
          'rounded-full bg-[#f0514f] grid place-items-center shrink-0',
          small ? 'size-4' : 'size-6'
        )}
      >
        <span
          className={cn(
            'font-bold text-white leading-none',
            small ? 'text-[10px]' : 'text-[14px]'
          )}
        >
          !
        </span>
      </span>
    );
  }

  const cls = small ? 'text-[#9aa0a6]' : 'text-[#9aa0a6]';
  const size = small ? 15 : 22;
  if (source.kind === 'website') return <Globe size={size} className={cls} strokeWidth={1.7} />;
  if (source.kind === 'file') return <FileText size={size} className={cls} strokeWidth={1.7} />;
  return <AlignLeft size={size} className={cls} strokeWidth={1.7} />;
}

function SourcesScreen({
  sources,
  removeAll,
  openSheet,
  pickFile,
  menuOpen,
  setMenuOpen,
}: {
  sources: SourceItem[];
  removeAll: () => void;
  openSheet: () => void;
  pickFile: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <div className="h-full relative">
      <div className="flex items-center justify-between px-4 min-[380px]:px-6 pt-4 pb-1 relative z-30">
        <h2 className="text-[17px] font-medium text-[#e8eaed]">Sources</h2>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 -mr-1.5 rounded-full active:bg-white/10 transition-colors cursor-pointer"
            aria-label="Source options"
          >
            <MoreVertical size={20} className="text-[#e8eaed]" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 w-56 rounded-2xl bg-[#1D1F2A] border border-[#2F3142] shadow-2xl shadow-black/50 py-2 fade-in">
              <MenuButton
                icon={<Trash2 size={17} className="text-[#f28b82]" />}
                label="Remove all sources"
                danger
                onClick={() => {
                  setMenuOpen(false);
                  removeAll();
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto no-scrollbar h-[calc(100%-56px)] pb-40">
        <div className="mt-2">
          {sources.map((s) => (
            <div
              key={s.id}
              className="flex min-h-14 items-center gap-4 px-4 min-[380px]:px-6 py-3.5 active:bg-white/[0.03] transition-colors"
            >
              <SourceGlyph source={s} />
              <span className="text-[16px] text-[#F4F5FA] flex-1 truncate">{s.name}</span>
              <span
                className={cn(
                  'text-[12px] px-2 py-0.5 rounded-md font-medium shrink-0',
                  s.enabled ? 'bg-[#8B7CF6]/20 text-[#A6ACCD]' : 'bg-red-500/10 text-red-400'
                )}
              >
                {s.enabled ? 'Active' : 'Muted'}
              </span>
            </div>
          ))}
          {sources.length === 0 && (
            <p className="px-4 min-[380px]:px-6 pt-10 text-[14px] text-[#8B90A5] text-center">
              No sources yet. Add one to get started.
            </p>
          )}
        </div>
      </div>
      {/* floating actions */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 min-[380px]:gap-4 px-3 pb-7 pt-10"
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 28px)',
        }}
      >
        <button
          onClick={pickFile}
          aria-label="Take a photo"
          className="size-14 rounded-full bg-[#1D1F2A] border border-[#2F3142] text-[#F4F5FA] grid place-items-center shadow-lg shadow-black/30 active:scale-95 transition shrink-0 cursor-pointer hover:bg-[#242738]"
        >
          <Camera size={24} strokeWidth={1.8} className="text-[#F4F5FA]" />
        </button>
        <button
          onClick={openSheet}
          className="h-14 pl-6 pr-8 rounded-full bg-[#8B7CF6] text-white flex items-center gap-3 shadow-lg shadow-black/30 active:scale-[0.98] transition cursor-pointer hover:bg-[#7A6BD0]"
        >
          <Plus size={21} strokeWidth={2.2} className="text-white" />
          <span className="text-[16px] font-medium text-white">
            Add a source
          </span>
        </button>
      </div>
    </div>
  );
}
