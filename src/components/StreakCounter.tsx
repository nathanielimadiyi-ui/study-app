import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Calendar,
  Trophy,
  Zap,
  Sparkles,
  CheckCircle2,
  X,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Play
} from 'lucide-react';
import { StreakData } from '../types';

const STREAK_STORAGE_KEY = 'studysync_user_streak_v1';

// Helper to format date as YYYY-MM-DD
export const getFormattedDate = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Calculate difference in days between two YYYY-MM-DD date strings
export const getDaysDiff = (dateStr1: string, dateStr2: string): number => {
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = d1.getTime() - d2.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

// Initialize or update consecutive daily streak
export const getOrUpdateStreak = (): { data: StreakData; justUpdated: boolean } => {
  const today = getFormattedDate();
  const saved = localStorage.getItem(STREAK_STORAGE_KEY);

  if (!saved) {
    // Generate initial active streak for demonstration (3 days active)
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const dayBeforeDate = new Date();
    dayBeforeDate.setDate(dayBeforeDate.getDate() - 2);

    const initialStreak: StreakData = {
      currentStreak: 3,
      longestStreak: 5,
      lastLoginDate: today,
      historyDates: [
        getFormattedDate(dayBeforeDate),
        getFormattedDate(yesterdayDate),
        today,
      ],
    };
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(initialStreak));
    return { data: initialStreak, justUpdated: true };
  }

  try {
    const current: StreakData = JSON.parse(saved);
    const diff = getDaysDiff(today, current.lastLoginDate);

    if (diff === 0) {
      // Already logged in today
      return { data: current, justUpdated: false };
    } else if (diff === 1) {
      // Consecutive day login! Increment streak
      const newStreak = current.currentStreak + 1;
      const updated: StreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(current.longestStreak, newStreak),
        lastLoginDate: today,
        historyDates: Array.from(new Set([...(current.historyDates || []), today])),
      };
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(updated));
      return { data: updated, justUpdated: true };
    } else if (diff > 1) {
      // Missed one or more days, start fresh streak of 1
      const updated: StreakData = {
        currentStreak: 1,
        longestStreak: current.longestStreak,
        lastLoginDate: today,
        historyDates: Array.from(new Set([...(current.historyDates || []), today])),
      };
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(updated));
      return { data: updated, justUpdated: true };
    }

    return { data: current, justUpdated: false };
  } catch (e) {
    console.error('Failed to parse streak data', e);
    const fallback: StreakData = {
      currentStreak: 1,
      longestStreak: 1,
      lastLoginDate: today,
      historyDates: [today],
    };
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(fallback));
    return { data: fallback, justUpdated: true };
  }
};

interface StreakCounterProps {
  variant?: 'badge' | 'card' | 'full';
  onTriggerToast?: (msg: string) => void;
  className?: string;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  variant = 'badge',
  onTriggerToast,
  className = '',
}) => {
  const [streak, setStreak] = useState<StreakData>(() => {
    return getOrUpdateStreak().data;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Sync on mount
  useEffect(() => {
    const { data, justUpdated } = getOrUpdateStreak();
    setStreak(data);
    if (justUpdated && data.currentStreak > 1 && onTriggerToast) {
      onTriggerToast(`🔥 Daily Streak updated! ${data.currentStreak} days in a row!`);
    }
  }, []);

  // Compute the current week's 7 days (Monday to Sunday)
  const weekDays = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
    // Adjust to make Monday index 0
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const monday = new Date(now);
    monday.setDate(now.getDate() + mondayOffset);

    const days = [];
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = getFormattedDate(d);
      const isToday = dateStr === getFormattedDate(now);
      const isCompleted = streak.historyDates?.includes(dateStr) || false;
      const isFuture = d > now && !isToday;

      days.push({
        label: dayLabels[i],
        dayNumber: d.getDate(),
        dateStr,
        isToday,
        isCompleted,
        isFuture,
      });
    }
    return days;
  }, [streak]);

  // Simulate consecutive login (Advancing to next consecutive day)
  const handleSimulateNextDay = () => {
    setIsSimulating(true);
    const lastDate = new Date(streak.lastLoginDate + 'T00:00:00');
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1);
    const nextDateStr = getFormattedDate(nextDate);

    const newCurrent = streak.currentStreak + 1;
    const newLongest = Math.max(streak.longestStreak, newCurrent);
    const updated: StreakData = {
      currentStreak: newCurrent,
      longestStreak: newLongest,
      lastLoginDate: nextDateStr,
      historyDates: Array.from(new Set([...(streak.historyDates || []), nextDateStr])),
    };

    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(updated));
    setStreak(updated);

    setTimeout(() => {
      setIsSimulating(false);
      if (onTriggerToast) {
        onTriggerToast(`🔥 Streak advanced! Day ${newCurrent} consecutive login achieved!`);
      }
    }, 200);
  };

  // Reset streak for testing
  const handleResetStreak = () => {
    const today = getFormattedDate();
    const reset: StreakData = {
      currentStreak: 1,
      longestStreak: streak.longestStreak,
      lastLoginDate: today,
      historyDates: [today],
    };
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(reset));
    setStreak(reset);
    if (onTriggerToast) {
      onTriggerToast('Streak reset to Day 1');
    }
  };

  // 1. COMPACT BADGE VARIANT (For Top Header)
  if (variant === 'badge') {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`h-10 px-3 min-[380px]:px-3.5 rounded-full bg-[#1F2230] border border-[#35384B] hover:border-[#FF7A00]/50 hover:bg-[#262A3B] transition-all flex items-center gap-2 active:scale-95 cursor-pointer shadow-md group ${className}`}
          aria-label={`${streak.currentStreak} day study streak`}
          title="Click to view daily streak details"
        >
          <div className="relative flex items-center justify-center">
            <Flame
              size={18}
              className="text-[#FF7A00] fill-[#FF7A00] group-hover:scale-110 transition-transform animate-pulse"
            />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FFB800] ring-2 ring-[#1F2230]"></span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[14px] font-bold text-[#F4F5FA] tracking-tight">
              {streak.currentStreak}
            </span>
            <span className="text-[11.5px] font-medium text-[#9BA1B7]">
              {streak.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
        </button>

        {/* Modal Details */}
        <StreakDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          streak={streak}
          weekDays={weekDays}
          onSimulate={handleSimulateNextDay}
          onReset={handleResetStreak}
          isSimulating={isSimulating}
        />
      </>
    );
  }

  // 2. DASHBOARD CARD VARIANT (For prominent display on Dashboard)
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`w-full rounded-2xl bg-gradient-to-br from-[#1F212E] to-[#171922] border border-[#2F3244] hover:border-[#FF7A00]/40 p-4 sm:p-5 transition-all cursor-pointer shadow-xl relative overflow-hidden group ${className}`}
      >
        {/* Subtle decorative glow */}
        <div className="absolute -right-10 -top-10 w-36 h-36 bg-[#FF7A00]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF7A00]/15 transition-all"></div>

        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Animated Flame Icon Container */}
            <div className="w-12 h-12 rounded-2xl bg-[#2A2126] border border-[#FF7A00]/25 flex items-center justify-center shrink-0 shadow-inner">
              <Flame
                size={26}
                className="text-[#FF7A00] fill-[#FF7A00] animate-pulse"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#F4F5FA] tracking-tight">
                  {streak.currentStreak} Day Streak
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF9E40] text-[11px] font-bold">
                  Active
                </span>
              </div>
              <p className="text-[12.5px] sm:text-[13px] text-[#8E94AA] truncate mt-0.5">
                {streak.currentStreak > 1
                  ? "You're on fire! Log in tomorrow to keep it going."
                  : 'Start your daily learning habit today!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-[#8E94AA] group-hover:text-white transition-colors">
            <span className="text-[12px] font-semibold hidden min-[400px]:inline">View</span>
            <ChevronRight size={18} />
          </div>
        </div>

        {/* 7-Day Weekly Mini Tracker */}
        <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-1">
          {weekDays.map((day) => (
            <div key={day.dateStr} className="flex flex-col items-center gap-1.5 flex-1">
              <span className={`text-[10.5px] font-semibold ${day.isToday ? 'text-[#FF9E40]' : 'text-[#7A8096]'}`}>
                {day.label}
              </span>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                  day.isCompleted
                    ? 'bg-[#FF7A00] text-white shadow-md shadow-[#FF7A00]/20'
                    : day.isToday
                    ? 'bg-[#2A2126] border-2 border-[#FF7A00] text-[#FF9E40]'
                    : 'bg-[#181A24] border border-white/5 text-[#5D6377]'
                }`}
              >
                {day.isCompleted ? (
                  <Flame size={14} className="fill-white" />
                ) : (
                  <span className="text-[11px] font-bold">{day.dayNumber}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Details */}
      <StreakDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        streak={streak}
        weekDays={weekDays}
        onSimulate={handleSimulateNextDay}
        onReset={handleResetStreak}
        isSimulating={isSimulating}
      />
    </>
  );
};

// MODAL / BOTTOM SHEET FOR STREAK DETAILS
interface StreakDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  streak: StreakData;
  weekDays: Array<{
    label: string;
    dayNumber: number;
    dateStr: string;
    isToday: boolean;
    isCompleted: boolean;
    isFuture: boolean;
  }>;
  onSimulate: () => void;
  onReset: () => void;
  isSimulating: boolean;
}

const StreakDetailsModal: React.FC<StreakDetailsModalProps> = ({
  isOpen,
  onClose,
  streak,
  weekDays,
  onSimulate,
  onReset,
  isSimulating,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-[460px] rounded-3xl bg-[#181A24] border border-[#2F3244] shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#FF9E40]" />
              <h2 className="text-[18px] font-bold text-[#F4F5FA]">Daily Study Streak</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8E94AA] hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
            {/* Main Streak Highlight Hero */}
            <div className="text-center py-2 flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF5100]/20 to-[#FFB800]/20 border border-[#FF7A00]/40 flex items-center justify-center mb-3 shadow-xl">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Flame size={54} className="text-[#FF7A00] fill-[#FF7A00] drop-shadow-[0_0_15px_rgba(255,122,0,0.5)]" />
                </motion.div>
                <div className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-[#FF7A00] text-white text-[11px] font-black tracking-wider uppercase shadow-md">
                  Active
                </div>
              </div>

              <h3 className="text-[38px] font-black text-white tracking-tight leading-none">
                {streak.currentStreak} <span className="text-[20px] font-bold text-[#8E94AA]">Days</span>
              </h3>
              <p className="text-[13.5px] text-[#A2A8BF] mt-1 max-w-[280px]">
                {streak.currentStreak >= 7
                  ? "Incredible milestone! You've maintained consistency for over a week."
                  : streak.currentStreak >= 3
                  ? "Great momentum! Keep logging in daily to reach the 7-day milestone."
                  : 'Every day of study builds stronger retention. Check in tomorrow!'}
              </p>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#1E212E] border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2A2233] border border-[#A78BFA]/20 flex items-center justify-center text-[#A78BFA]">
                  <Trophy size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-[#7E849C] block">Best Record</span>
                  <span className="text-[16px] font-bold text-[#F4F5FA]">{streak.longestStreak} days</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1E212E] border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D2A26] border border-[#34D399]/20 flex items-center justify-center text-[#34D399]">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-[#7E849C] block">Total Active Days</span>
                  <span className="text-[16px] font-bold text-[#F4F5FA]">
                    {streak.historyDates?.length || streak.currentStreak} days
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Activity Calendar Tracker */}
            <div className="p-4 rounded-2xl bg-[#1E212E] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-bold text-[#E2E5F0] flex items-center gap-1.5">
                  <Calendar size={15} className="text-[#FF9E40]" /> This Week's Attendance
                </span>
                <span className="text-[11px] text-[#7E849C]">
                  {weekDays.filter((d) => d.isCompleted).length} / 7 days
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 pt-1">
                {weekDays.map((day) => (
                  <div
                    key={day.dateStr}
                    className={`py-2 rounded-xl flex flex-col items-center gap-1 text-center transition-all ${
                      day.isCompleted
                        ? 'bg-[#FF7A00]/20 border border-[#FF7A00]/40'
                        : day.isToday
                        ? 'bg-white/5 border border-[#FF7A00]'
                        : 'bg-[#151720] border border-transparent opacity-60'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${day.isToday ? 'text-[#FF9E40]' : 'text-[#7E849C]'}`}>
                      {day.label}
                    </span>
                    {day.isCompleted ? (
                      <Flame size={14} className="text-[#FF7A00] fill-[#FF7A00]" />
                    ) : (
                      <span className="text-[11px] font-semibold text-[#8E94AA]">{day.dayNumber}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Consecutive Login Simulation & Debug Controls */}
            <div className="p-4 rounded-2xl bg-[#13151D] border border-dashed border-[#2F3244] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#9BA1B7] flex items-center gap-1.5">
                  <Zap size={14} className="text-[#8ab4f8]" /> Test Streak Update
                </span>
                <span className="text-[10.5px] text-[#63687E]">Updates consecutive days</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onSimulate}
                  disabled={isSimulating}
                  className="flex-1 h-10 px-3 rounded-xl bg-[#232738] hover:bg-[#2B3045] border border-[#3A405A] text-white text-[12.5px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Play size={13} className="fill-current text-[#FF9E40]" />
                  <span>Advance +1 Consecutive Day</span>
                </button>

                <button
                  onClick={onReset}
                  className="h-10 px-3 rounded-xl bg-[#1F212E] hover:bg-[#262938] border border-white/5 text-[#8E94AA] hover:text-white text-[12px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                  title="Reset to Day 1"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
