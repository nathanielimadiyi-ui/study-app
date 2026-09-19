export type ScreenId =
  | 'q1'
  | 'q2'
  | 'q3'
  | 'q4'
  | 'q5'
  | 'q6'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'tags'
  | 'lessons'
  | 'quiz'
  | 'account'
  | 'offer'
  | 'home'
  | 'workspace'
  | 'settings';

export interface OnboardingAnswers {
  role?: string;
  subject?: string;
  gradYear?: string;
  exam?: string;
  referral?: string;
  nextExam?: string;
  quizAnswer?: string;
}

export interface QuestionStep {
  id: ScreenId;
  nextId: ScreenId;
  progressPercent: number;
  title: string;
  subtitle?: string;
  layout?: 'grid' | 'list';
  iconType: 'school' | 'question' | 'calendar' | 'exam' | 'social' | 'spacer';
  options: { label: string; wide?: boolean; isLate?: boolean }[];
  fieldKey: keyof OnboardingAnswers;
}

export interface StoryStep {
  id: ScreenId;
  nextId: ScreenId;
  progressPercent: number;
  title: string;
  highlightText?: string;
  afterHighlight?: string;
  subtitle: string;
  illustrationTheme: 'biology' | 'attention' | 'textbook' | 'overload' | 'solution';
}

export interface LibraryItem {
  id: string;
  title: string;
  timeAgo: string;
  isUpgradeNotice?: boolean;
}

export interface LessonItem {
  id: string;
  title: string;
  subject: string;
  duration: string;
  bgHex: string;
  statusLabel?: string;
}

export interface StudioToolItem {
  id: string;
  title: string;
  description: string;
  bgHex: string;
  icon: 'flashcards' | 'quiz' | 'audio' | 'guide' | 'mindmap';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface SavedStudioItem {
  id: string;
  toolId: string;
  toolTitle: string;
  toolIcon: 'flashcards' | 'quiz' | 'audio' | 'guide' | 'mindmap';
  bgHex: string;
  title: string;
  instructions: string;
  updatedAt: string;
  content: {
    cards?: Array<{ front: string; back: string }>;
    quiz?: {
      question: string;
      options: Array<{ label: string; correct: boolean }>;
      explanation: string;
    };
    guide?: {
      summary: string;
      sections: Array<{ term: string; category: string; definition: string }>;
    };
    audio?: {
      title: string;
      duration: string;
      summary: string;
      takeaways: string[];
    };
    mindmap?: {
      centralNode: string;
      branches: Array<{ title: string; notes: string; color: string }>;
    };
  };
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string; // YYYY-MM-DD
  historyDates: string[]; // List of YYYY-MM-DD strings
}
