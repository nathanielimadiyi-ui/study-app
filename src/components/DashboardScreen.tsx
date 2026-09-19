import React, { useState, useRef, useEffect } from 'react';
import {
  Settings,
  ArrowUp,
  Plus,
  MoreVertical,
  BookOpen,
  X,
  UploadCloud,
  Link as LinkIcon,
  Headphones,
  Trash2,
  ExternalLink,
  Edit3,
  Check
} from 'lucide-react';
import { HOME_LIBRARY_ITEMS } from '../data/mockData';
import { LibraryItem } from '../types';
import { StreakCounter } from './StreakCounter';

interface DashboardScreenProps {
  onOpenSettings: () => void;
  onOpenWorkspace: (topic?: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onOpenSettings,
  onOpenWorkspace,
  onTriggerToast,
}) => {
  const [query, setQuery] = useState('');
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(() => {
    return HOME_LIBRARY_ITEMS;
  });

  // Active modal state: 'pdf' | 'link' | 'audio' | 'folder' | null
  const [activeModal, setActiveModal] = useState<'pdf' | 'link' | 'audio' | 'folder' | null>(null);

  // Active item 3-dots dropdown id
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modal input states
  const [linkInput, setLinkInput] = useState('');
  const [folderInput, setFolderInput] = useState('');

  // Rename item inline or modal state
  const [renamingItemId, setRenamingItemId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Hidden file inputs for PDF and Audio upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (activeMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenuId]);

  // 1 & 2: Handle Topic Input & Submit
  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (clean) {
      const newItem: LibraryItem = {
        id: `custom-${Date.now()}`,
        title: clean,
        timeAgo: 'Just now',
      };
      setLibraryItems((prev) => [newItem, ...prev]);
      setQuery('');
      onTriggerToast(`Created project: "${clean}"`);
      onOpenWorkspace(clean);
    } else {
      onTriggerToast('Type a topic to start');
    }
  };

  // 3: PDF Upload handler
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const titleWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      const formattedTitle = titleWithoutExt.charAt(0).toUpperCase() + titleWithoutExt.slice(1);
      const newItem: LibraryItem = {
        id: `pdf-${Date.now()}`,
        title: `${formattedTitle} (PDF Notes)`,
        timeAgo: 'Just now',
      };
      setLibraryItems((prev) => [newItem, ...prev]);
      setActiveModal(null);
      onTriggerToast(`Imported PDF: "${file.name}"`);
      onOpenWorkspace(newItem.title);
    }
  };

  // 4: Link Import handler
  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLink = linkInput.trim();
    if (!cleanLink) {
      onTriggerToast('Please enter a valid link');
      return;
    }
    let domain = 'Web';
    try {
      const url = new URL(cleanLink.startsWith('http') ? cleanLink : `https://${cleanLink}`);
      domain = url.hostname.replace('www.', '');
    } catch {
      domain = 'Resource';
    }
    const newItem: LibraryItem = {
      id: `link-${Date.now()}`,
      title: `Study Guide from ${domain}`,
      timeAgo: 'Just now',
    };
    setLibraryItems((prev) => [newItem, ...prev]);
    setLinkInput('');
    setActiveModal(null);
    onTriggerToast(`Imported materials from: ${domain}`);
    onOpenWorkspace(newItem.title);
  };

  // 5: Audio File Upload handler
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const titleWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      const formattedTitle = titleWithoutExt.charAt(0).toUpperCase() + titleWithoutExt.slice(1);
      const newItem: LibraryItem = {
        id: `audio-${Date.now()}`,
        title: `${formattedTitle} (Audio Notes)`,
        timeAgo: 'Just now',
      };
      setLibraryItems((prev) => [newItem, ...prev]);
      setActiveModal(null);
      onTriggerToast(`Imported audio file: "${file.name}"`);
      onOpenWorkspace(newItem.title);
    }
  };

  // 6: New Folder handler
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    const folderName = folderInput.trim() || 'New Study Folder';
    const newItem: LibraryItem = {
      id: `folder-${Date.now()}`,
      title: `📁 ${folderName}`,
      timeAgo: 'Just now',
    };
    setLibraryItems((prev) => [newItem, ...prev]);
    setFolderInput('');
    setActiveModal(null);
    onTriggerToast(`Created folder: "${folderName}"`);
  };

  // 8: Three-dot actions
  const handleDeleteItem = (id: string, title: string) => {
    setLibraryItems((prev) => prev.filter((item) => item.id !== id));
    setActiveMenuId(null);
    onTriggerToast(`Removed: "${title}"`);
  };

  const handleStartRename = (item: LibraryItem) => {
    setRenamingItemId(item.id);
    setRenameValue(item.title);
    setActiveMenuId(null);
  };

  const handleSaveRename = (id: string) => {
    if (renameValue.trim()) {
      setLibraryItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, title: renameValue.trim() } : item
        )
      );
      onTriggerToast(`Renamed to "${renameValue.trim()}"`);
    }
    setRenamingItemId(null);
  };

  return (
    <div className="w-full min-h-screen overflow-y-auto no-scrollbar bg-[#14151D] text-[#F4F5FA] pb-24">
      {/* Hidden file input for native PDF file picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handlePdfUpload}
      />

      {/* Hidden file input for native audio file picker */}
      <input
        ref={audioFileInputRef}
        type="file"
        accept="audio/*,.mp3,.m4a,.wav,.aac,.ogg"
        className="hidden"
        onChange={handleAudioUpload}
      />

      <div className="max-w-[680px] w-full mx-auto px-4 min-[380px]:px-6 sm:px-8 py-3 sm:py-6 min-h-[100dvh] flex flex-col">
        {/* Top Header */}
        <div
          className="flex justify-between items-center h-12"
          style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 8px)' }}
        >
          {/* Daily Streak Counter Badge */}
          <StreakCounter variant="badge" onTriggerToast={onTriggerToast} />

          {/* 9: Settings Button */}
          <button
            onClick={onOpenSettings}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/90 hover:text-white transition-transform active:scale-90 cursor-pointer rounded-full hover:bg-white/5"
            aria-label="Settings"
          >
            <Settings size={24} strokeWidth={1.8} />
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mt-6 sm:mt-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center" aria-hidden="true">
            <svg width="90" height="90" viewBox="0 0 94 94" fill="none" className="w-20 h-20 sm:w-24 sm:h-24">
              <path d="M47 31c-9-7-19-9-31-7v35c12-2 22 0 31 7V31Z" fill="#4A79D7" />
              <path d="M47 31c9-7 19-9 31-7v35c-12-2-22 0-31 7V31Z" fill="#6B8FE0" />
              <path d="M47 31v35" stroke="#DDE5FF" strokeWidth="2.3" />
              <path
                d="M20 37c8-1 15 1 22 5M74 37c-8-1-15 1-22 5M20 47c8-1 15 1 22 5M74 47c-8-1-15 1-22 5"
                stroke="#DDE5FF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity=".8"
              />
              <circle cx="47" cy="15" r="11" fill="#F9C52D" />
              <path
                d="M47 1v-5M34 8l-4-4M60 8l4-4M30 19h-6M64 19h6"
                stroke="#F9C52D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-[30px] min-[360px]:text-[34px] sm:text-[40px] font-black tracking-[-0.035em] leading-[1.18] max-w-[440px] mx-auto text-[#F4F5FA]">
            What do you<br />want to learn?
          </h1>
        </div>

        {/* 1 & 2: Topic input & Submit button */}
        <form onSubmit={handleAsk} className="mt-7 sm:mt-9">
          <div className="flex items-center gap-2 bg-[#1D1F2A] border-[1.5px] border-[#2F3142] rounded-full p-1.5 pl-4 sm:p-2 sm:pl-5 shadow-lg focus-within:border-[#8B7CF6] transition-all">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about any topic..."
              className="flex-1 text-[16px] text-[#F4F5FA] placeholder-[#6E7388] bg-transparent outline-none min-w-0"
            />
            <button
              type="submit"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#232533] border border-[#2F3142] flex items-center justify-center text-white transition-transform active:scale-90 hover:bg-[#2B2E3E] cursor-pointer flex-none"
              aria-label="Ask"
            >
              <ArrowUp size={18} strokeWidth={2.4} />
            </button>
          </div>
        </form>

        {/* 3, 4, 5: Quick Source Actions (Audio, Link, PDF) */}
        <div className="grid grid-cols-3 gap-2 min-[380px]:gap-2.5 sm:flex sm:justify-center sm:gap-3.5 mt-4 sm:mt-5">
          {/* 5: Audio button */}
          <button
            type="button"
            onClick={() => setActiveModal('audio')}
            className="h-13 sm:h-14 px-2 sm:px-4 rounded-2xl sm:rounded-full bg-[#1D1F2A] border-[1.5px] border-[#303244] flex items-center justify-center gap-1.5 min-[380px]:gap-2 text-[13.5px] min-[380px]:text-[14.5px] sm:text-[15px] font-bold text-[#E9EAF1] transition-transform active:scale-95 hover:bg-[#232533] cursor-pointer"
          >
            <span className="w-5 h-5 min-[380px]:w-6 min-[380px]:h-6 rounded-full bg-[#7D68DF] flex items-center justify-center text-xs flex-none">
              🎙
            </span>
            <span className="truncate">Audio</span>
          </button>

          {/* 4: Link button */}
          <button
            type="button"
            onClick={() => setActiveModal('link')}
            className="h-13 sm:h-14 px-2 sm:px-4 rounded-2xl sm:rounded-full bg-[#1D1F2A] border-[1.5px] border-[#303244] flex items-center justify-center gap-1.5 min-[380px]:gap-2 text-[13.5px] min-[380px]:text-[14.5px] sm:text-[15px] font-bold text-[#E9EAF1] transition-transform active:scale-95 hover:bg-[#232533] cursor-pointer"
          >
            <span className="w-5 h-5 min-[380px]:w-6 min-[380px]:h-6 rounded-md bg-[#ED3F3D] flex items-center justify-center text-xs font-black flex-none">
              ▶
            </span>
            <span className="truncate">Link</span>
          </button>

          {/* 3: PDF button */}
          <button
            type="button"
            onClick={() => setActiveModal('pdf')}
            className="h-13 sm:h-14 px-2 sm:px-4 rounded-2xl sm:rounded-full bg-[#1D1F2A] border-[1.5px] border-[#303244] flex items-center justify-center gap-1.5 min-[380px]:gap-2 text-[13.5px] min-[380px]:text-[14.5px] sm:text-[15px] font-bold text-[#E9EAF1] transition-transform active:scale-95 hover:bg-[#232533] cursor-pointer"
          >
            <span className="w-5 h-5 min-[380px]:w-6 min-[380px]:h-6 rounded bg-[#7768D6] flex items-center justify-center text-[9px] font-extrabold text-white flex-none">
              PDF
            </span>
            <span className="truncate">PDF</span>
          </button>
        </div>

        {/* Daily Streak Tracker Card */}
        <div className="mt-5 sm:mt-6">
          <StreakCounter variant="card" onTriggerToast={onTriggerToast} />
        </div>

        {/* 6: Library Header & New Folder button */}
        <div className="flex items-center justify-between mt-8 sm:mt-11">
          <div className="text-[19px] sm:text-[21px] font-extrabold tracking-[-0.02em] flex items-center gap-2.5 text-[#F4F5FA]">
            <span>Your library</span>
            <span className="min-w-[32px] h-[32px] sm:min-w-[34px] sm:h-[34px] px-2 rounded-full bg-[#242633] border border-[#303244] inline-flex items-center justify-center text-[#9CA0B3] text-[13px] sm:text-[14px]">
              {libraryItems.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('folder')}
            className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full bg-[#1D1F2A] border-[1.5px] border-[#303244] text-[13px] sm:text-[14px] font-bold text-[#F0F0F4] transition-transform active:scale-95 hover:bg-[#232533] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={16} />
            <span>New folder</span>
          </button>
        </div>

        {/* 7 & 8: Library Items List, Cards, & 3-dot menus */}
        <div className="grid gap-3.5 mt-4">
          {libraryItems.map((item) => {
            const isMenuOpen = activeMenuId === item.id;
            const isRenaming = renamingItemId === item.id;

            return (
              <div key={item.id} className="relative">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (!isRenaming) {
                      onOpenWorkspace(item.title);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (!isRenaming && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onOpenWorkspace(item.title);
                    }
                  }}
                  className="min-h-[88px] w-full rounded-2xl bg-[#1D1F2A] border border-[#2C2E3E] flex items-center text-left p-4 sm:p-4.5 gap-4 transition-transform active:scale-[0.99] hover:border-[#3E4256] cursor-pointer shadow-sm group select-none"
                >
                  <div className="w-10 h-10 flex-none text-[#4D82DC] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BookOpen size={30} strokeWidth={1.8} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {isRenaming ? (
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(item.id);
                            if (e.key === 'Escape') setRenamingItemId(null);
                          }}
                          autoFocus
                          className="bg-[#232533] border border-[#8B7CF6] rounded-lg px-2 py-1 text-[14px] text-white outline-none w-full"
                        />
                        <button
                          onClick={() => handleSaveRename(item.id)}
                          className="p-1 rounded bg-[#8B7CF6] text-white hover:bg-[#7A6BD0]"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setRenamingItemId(null)}
                          className="p-1 rounded bg-[#232533] text-[#8B90A5] hover:text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <strong className={`block text-[15.5px] font-bold leading-tight truncate ${item.isUpgradeNotice ? 'text-[#C9BCF5]' : 'text-[#EDEEF5]'}`}>
                          {item.title}
                        </strong>
                        <small className="block text-[#8C91A6] text-[12.5px] mt-1.5">
                          {item.timeAgo}
                        </small>
                      </>
                    )}
                  </div>

                  {/* 8: Three-dot menu toggle button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(isMenuOpen ? null : item.id);
                    }}
                    className="text-[#73788D] w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-white transition-colors rounded-xl hover:bg-white/5 cursor-pointer flex-none"
                    aria-label="Item options"
                  >
                    <MoreVertical size={20} />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute right-3 top-16 z-40 bg-[#232533] border border-[#3A3C4E] rounded-xl shadow-2xl p-1.5 min-w-[190px] flex flex-col gap-1 text-[13.5px] font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setActiveMenuId(null);
                        onOpenWorkspace(item.title);
                      }}
                      className="min-h-[42px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#EDEEF5] hover:bg-white/5 text-left cursor-pointer"
                    >
                      <ExternalLink size={15} className="text-[#8B7CF6]" />
                      <span>Open Workspace</span>
                    </button>

                    <button
                      onClick={() => handleStartRename(item)}
                      className="min-h-[42px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#EDEEF5] hover:bg-white/5 text-left cursor-pointer"
                    >
                      <Edit3 size={15} className="text-[#4D82DC]" />
                      <span>Rename</span>
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id, item.title)}
                      className="min-h-[42px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#DF5D4F] hover:bg-[#DF5D4F]/10 text-left cursor-pointer"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 3: PDF Upload Modal */}
      {activeModal === 'pdf' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
          <div
            className="bg-[#1D1F2A] border border-[#2F3142] rounded-t-[28px] sm:rounded-3xl w-full max-w-sm sm:max-w-md p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 20px, 24px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#7768D6] flex items-center justify-center text-[9px] font-extrabold text-white">
                  PDF
                </span>
                <h3 className="font-bold text-white text-[16px]">Import PDF Notes</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#232533] text-white flex items-center justify-center cursor-pointer hover:bg-[#2B2E3E]"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-[#8B90A5] mb-5">
              Select or drop a PDF syllabus, textbook chapter, or lecture slides to automatically generate study materials.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#3A3C4E] hover:border-[#7768D6] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#232533]/50"
            >
              <UploadCloud size={32} className="mx-auto text-[#7768D6] mb-2" />
              <div className="text-sm font-bold text-[#F4F5FA]">Click to choose file</div>
              <div className="text-[11px] text-[#8B90A5] mt-1">Supports PDF up to 25MB</div>
            </div>

            <button
              onClick={() => {
                // Seed mock textbook sample if user does not pick a file
                const newItem: LibraryItem = {
                  id: `pdf-sample-${Date.now()}`,
                  title: 'Cellular Respiration Chapter (PDF)',
                  timeAgo: 'Just now',
                };
                setLibraryItems((prev) => [newItem, ...prev]);
                setActiveModal(null);
                onTriggerToast('Imported sample textbook chapter');
                onOpenWorkspace(newItem.title);
              }}
              className="w-full min-h-[46px] mt-4 py-2.5 rounded-xl bg-[#232533] border border-[#3A3C4E] text-xs font-semibold text-[#8B7CF6] hover:bg-[#2B2E3E] cursor-pointer flex items-center justify-center"
            >
              Or load sample "Cellular Respiration.pdf"
            </button>
          </div>
        </div>
      )}

      {/* 4: Link Import Modal */}
      {activeModal === 'link' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
          <div
            className="bg-[#1D1F2A] border border-[#2F3142] rounded-t-[28px] sm:rounded-3xl w-full max-w-sm sm:max-w-md p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 20px, 24px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#ED3F3D] flex items-center justify-center text-xs font-black text-white">
                  ▶
                </span>
                <h3 className="font-bold text-white text-[16px]">Import Web Link</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#232533] text-white flex items-center justify-center cursor-pointer hover:bg-[#2B2E3E]"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-[#8B90A5] mb-4">
              Paste a YouTube lecture URL, Khan Academy article, or web page to synthesize key study points.
            </p>

            <form onSubmit={handleLinkSubmit} className="space-y-4">
              <div className="flex items-center gap-2 bg-[#232533] border border-[#3A3C4E] rounded-xl px-3 py-2.5">
                <LinkIcon size={16} className="text-[#8B90A5] flex-none" />
                <input
                  type="text"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  autoFocus
                  className="bg-transparent text-[16px] text-white placeholder-[#6E7388] outline-none w-full"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLinkInput('https://youtube.com/watch?v=energy-concepts');
                  }}
                  className="text-[12px] text-[#B9A6F7] hover:underline"
                >
                  Fill example link
                </button>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 rounded-xl bg-[#ED3F3D] hover:bg-[#D93432] text-white font-bold text-sm cursor-pointer shadow-md transition-transform active:scale-95"
              >
                Import Link
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5: Audio File Upload Modal */}
      {activeModal === 'audio' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
          <div
            className="bg-[#1D1F2A] border border-[#2F3142] rounded-t-[28px] sm:rounded-3xl w-full max-w-sm sm:max-w-md p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 20px, 24px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7D68DF] flex items-center justify-center text-xs text-white">
                  🎧
                </span>
                <h3 className="font-bold text-white text-[16px]">Import Audio File</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#232533] text-white flex items-center justify-center cursor-pointer hover:bg-[#2B2E3E]"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-[#8B90A5] mb-5">
              Select or drop an audio file (lecture recording, voice memo, podcast) to generate study notes.
            </p>

            <div
              onClick={() => audioFileInputRef.current?.click()}
              className="border-2 border-dashed border-[#3A3C4E] hover:border-[#7D68DF] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#232533]/50"
            >
              <Headphones size={32} className="mx-auto text-[#7D68DF] mb-2" />
              <div className="text-sm font-bold text-[#F4F5FA]">Click to choose audio file</div>
              <div className="text-[11px] text-[#8B90A5] mt-1">Supports MP3, M4A, WAV, AAC</div>
            </div>

            <button
              onClick={() => {
                const newItem: LibraryItem = {
                  id: `audio-sample-${Date.now()}`,
                  title: 'Cellular Respiration Lecture (Audio)',
                  timeAgo: 'Just now',
                };
                setLibraryItems((prev) => [newItem, ...prev]);
                setActiveModal(null);
                onTriggerToast('Imported sample audio recording');
                onOpenWorkspace(newItem.title);
              }}
              className="w-full min-h-[46px] mt-4 py-2.5 rounded-xl bg-[#232533] border border-[#3A3C4E] text-xs font-semibold text-[#B9A6F7] hover:bg-[#2B2E3E] cursor-pointer flex items-center justify-center"
            >
              Or load sample "Lecture_Energy_Systems.mp3"
            </button>
          </div>
        </div>
      )}

      {/* 6: New Folder Modal */}
      {activeModal === 'folder' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
          <div
            className="bg-[#1D1F2A] border border-[#2F3142] rounded-t-[28px] sm:rounded-3xl w-full max-w-sm sm:max-w-md p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 20px, 24px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white text-[16px]">Create New Folder</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#232533] text-white flex items-center justify-center cursor-pointer hover:bg-[#2B2E3E]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <input
                type="text"
                value={folderInput}
                onChange={(e) => setFolderInput(e.target.value)}
                placeholder="Folder name (e.g. Biology 101)"
                autoFocus
                className="w-full bg-[#232533] border border-[#3A3C4E] rounded-xl px-4 py-3 text-[16px] text-white placeholder-[#6E7388] outline-none focus:border-[#8B7CF6]"
              />

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 rounded-xl bg-[#8B7CF6] hover:bg-[#7A6BD0] text-white font-bold text-sm cursor-pointer shadow-md transition-transform active:scale-95"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

