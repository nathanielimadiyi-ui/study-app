import { QuestionStep, StoryStep, LessonItem, LibraryItem, StudioToolItem } from '../types';

export const QUESTION_STEPS: QuestionStep[] = [
  {
    id: 'q1',
    nextId: 'q2',
    progressPercent: 0,
    title: 'What describes you best?',
    iconType: 'school',
    fieldKey: 'role',
    options: [
      { label: 'Undergrad' },
      { label: 'High School' },
      { label: 'Middle School' },
      { label: 'Grad Student' },
      { label: 'Professional' },
      { label: 'Educator' },
      { label: 'Other', wide: true }
    ]
  },
  {
    id: 'q2',
    nextId: 'q3',
    progressPercent: 5.9,
    title: 'What do you study most?',
    iconType: 'question',
    fieldKey: 'subject',
    options: [
      { label: 'Biology' },
      { label: 'Chemistry' },
      { label: 'Psychology' },
      { label: 'Mathematics' },
      { label: 'Computer Science' },
      { label: 'English' },
      { label: 'Physics' },
      { label: 'History' },
      { label: 'Economics' },
      { label: 'Other', wide: true }
    ]
  },
  {
    id: 'q3',
    nextId: 'q4',
    progressPercent: 11.8,
    title: 'When will you graduate?',
    iconType: 'calendar',
    fieldKey: 'gradYear',
    options: [
      { label: '2026' },
      { label: '2027' },
      { label: '2028' },
      { label: '2029' },
      { label: 'Other', wide: true }
    ]
  },
  {
    id: 'q4',
    nextId: 'q5',
    progressPercent: 17.6,
    title: 'Prepping for any standardized exam?',
    iconType: 'exam',
    fieldKey: 'exam',
    options: [
      { label: 'SAT' },
      { label: 'ACT' },
      { label: 'AP exams' },
      { label: 'PSAT' },
      { label: 'GCSE' },
      { label: 'Drivers exam' },
      { label: 'Other', wide: true }
    ]
  },
  {
    id: 'q5',
    nextId: 'q6',
    progressPercent: 23.5,
    title: 'How did you find out about us?',
    iconType: 'social',
    fieldKey: 'referral',
    options: [
      { label: 'TikTok' },
      { label: 'Instagram' },
      { label: 'YouTube' },
      { label: 'Friend or classmate' },
      { label: 'Google Search' },
      { label: 'Other' },
      { label: 'Later / not sure', wide: true, isLate: true }
    ]
  },
  {
    id: 'q6',
    nextId: 'h1',
    progressPercent: 29.4,
    title: 'When is your next exam?',
    subtitle: "We'll use this to build the right study plan for you.",
    iconType: 'spacer',
    layout: 'list',
    fieldKey: 'nextExam',
    options: [
      { label: 'Tomorrow' },
      { label: 'This week' },
      { label: 'Next week' },
      { label: '2–3 weeks' }
    ]
  }
];

export const STORY_STEPS: StoryStep[] = [
  {
    id: 'h1',
    nextId: 'h2',
    progressPercent: 35.3,
    title: 'Imagine this...',
    subtitle: 'You have a',
    highlightText: 'biology exam',
    afterHighlight: 'next week.',
    illustrationTheme: 'biology'
  },
  {
    id: 'h2',
    nextId: 'h3',
    progressPercent: 41.2,
    title: 'but your attention span is',
    highlightText: 'cooked.',
    subtitle: 'And you only have short moments to study.',
    illustrationTheme: 'attention'
  },
  {
    id: 'h3',
    nextId: 'h4',
    progressPercent: 47.1,
    title: 'Textbooks are not math for TikTok.',
    subtitle: "Traditional study materials don't always fit the way students learn today.",
    illustrationTheme: 'textbook'
  },
  {
    id: 'h4',
    nextId: 'h5',
    progressPercent: 52.9,
    title: "most study materials weren't built to help your attention.",
    subtitle: 'So the experience needs to feel simpler and more engaging.',
    illustrationTheme: 'overload'
  },
  {
    id: 'h5',
    nextId: 'tags',
    progressPercent: 58.8,
    title: 'so we created',
    highlightText: 'a new way to learn.',
    subtitle: 'Short, focused learning that fits around your day.',
    illustrationTheme: 'solution'
  }
];

export const STUDY_TAGS = [
  { label: 'Flashcards', color: '#5b37a8' },
  { label: 'Reading', color: '#3e7a91' },
  { label: 'Videos', color: '#d19a17' },
  { label: 'Chapters', color: '#a95458' },
  { label: 'Practice questions', color: '#5b37a8' },
  { label: 'Quiz', color: '#d19a17' },
  { label: 'Study group', color: '#5b37a8' },
  { label: 'Notes', color: '#a95458' }
];

export const ONBOARDING_LESSONS: LessonItem[] = [
  {
    id: 'l1',
    title: 'Cellular respiration',
    subject: 'Biology',
    duration: '5 min',
    bgHex: '#8b6b08'
  },
  {
    id: 'l2',
    title: 'DNA replication',
    subject: 'Biology',
    duration: '4 min',
    bgHex: '#6937a1'
  },
  {
    id: 'l3',
    title: 'Photosynthesis',
    subject: 'Biology',
    duration: '6 min',
    bgHex: '#a34b47'
  },
  {
    id: 'l4',
    title: 'Membrane transport',
    subject: 'Biology',
    duration: '3 min',
    bgHex: '#317342'
  }
];

export const HOME_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'item-0',
    title: 'Foundations and Kingdoms of Pre-Colonial Nigeria',
    timeAgo: 'Opened 88d ago',
  },
  {
    id: 'item-1',
    title: 'Upgrade plan to access notes! ✨',
    timeAgo: 'Opened about 1 year ago',
    isUpgradeNotice: true
  },
  {
    id: 'item-2',
    title: 'Physics Key Points on Energy Concepts',
    timeAgo: 'Opened about 1 year ago'
  },
  {
    id: 'item-3',
    title: 'Analyzing Themes in Song Lyrics',
    timeAgo: 'Opened over 1 year ago'
  },
  {
    id: 'item-4',
    title: 'Unavailable Transcript and Study Guide Steps',
    timeAgo: 'Opened over 1 year ago'
  },
  {
    id: 'item-5',
    title: 'Optimizing JAMB Exam Preparation Strategies',
    timeAgo: 'Opened over 1 year ago'
  },
  {
    id: 'item-6',
    title: 'Chemistry Review: Periodic Trends',
    timeAgo: 'Opened over 1 year ago'
  }
];

export const WORKSPACE_SOURCES: LessonItem[] = [
  {
    id: 'ws-1',
    title: 'Biology: Energy and Cells',
    subject: 'Continue learning',
    duration: '8 min',
    bgHex: '#6937a1'
  },
  {
    id: 'ws-2',
    title: 'Exam Prep: Practice Questions',
    subject: '10 questions',
    duration: '',
    bgHex: '#214e7d'
  },
  {
    id: 'ws-3',
    title: 'Academic Writing Basics',
    subject: 'New lesson available',
    duration: '',
    bgHex: '#317342'
  },
  {
    id: 'ws-4',
    title: 'Understanding Cell Respiration',
    subject: 'Recommended',
    duration: '',
    bgHex: '#8b6b08'
  }
];

export const STUDIO_TOOLS: StudioToolItem[] = [
  {
    id: 'tool-flashcards',
    title: 'Flashcards',
    description: 'Quick recall cards from your sources',
    bgHex: '#6937a1',
    icon: 'flashcards'
  },
  {
    id: 'tool-quiz',
    title: 'Practice Quiz',
    description: 'Test yourself before the exam',
    bgHex: '#214e7d',
    icon: 'quiz'
  },
  {
    id: 'tool-audio',
    title: 'Audio Recap',
    description: 'A short spoken summary to listen to',
    bgHex: '#8b6b08',
    icon: 'audio'
  },
  {
    id: 'tool-guide',
    title: 'Study Guide',
    description: 'Key terms and concepts, organized',
    bgHex: '#317342',
    icon: 'guide'
  },
  {
    id: 'tool-mindmap',
    title: 'Mind Map',
    description: 'See how the topics connect',
    bgHex: '#a95458',
    icon: 'mindmap'
  }
];
