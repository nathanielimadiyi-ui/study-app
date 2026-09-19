import React from 'react';
import { X, Globe, Moon, Cloud, Shield, RotateCcw, MessageCircle, ExternalLink, Star, FileText, Lock } from 'lucide-react';

interface SettingsScreenProps {
  userEmail?: string | null;
  onClose: () => void;
  onLogout: () => void;
  onTriggerToast: (msg: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userEmail,
  onClose,
  onLogout,
  onTriggerToast,
}) => {
  const displayName = userEmail ? (userEmail.split('@')[0] || 'User') : 'User';
  const displayInitial = displayName.charAt(0).toUpperCase();

  return (
    <div
      className="w-full min-h-[100dvh] bg-[#14151D] text-[#F4F5FA] overflow-y-auto no-scrollbar"
      style={{
        paddingTop: 'max(env(safe-area-inset-top, 0px), 8px)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 24px, 32px)',
      }}
    >
      <div className="max-w-[680px] w-full mx-auto px-4 min-[380px]:px-6 sm:px-8 py-4 sm:py-6 flex flex-col">
        {/* Top Close Button */}
        <div className="flex justify-end items-center h-12">
          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#242633] hover:bg-[#2E3142] flex items-center justify-center text-white text-[28px] font-light transition-transform active:scale-95 cursor-pointer shadow-md"
            aria-label="Close settings"
          >
            <X size={20} strokeWidth={2.4} />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-[28px] min-[360px]:text-[32px] sm:text-[34px] font-black tracking-[-0.03em] mt-6 sm:mt-8 mb-6 sm:mb-7 text-[#F4F5FA]">
          Settings
        </h1>

        {/* Profile Card */}
        <button
          onClick={() => onTriggerToast(`Account: ${userEmail || 'Personal Study Account'}`)}
          className="min-h-[96px] sm:h-[104px] border border-[#2F3141] bg-[#1D1F2A] hover:bg-[#222432] rounded-[22px] px-4 sm:px-5 flex items-center justify-between transition-transform active:scale-[0.99] cursor-pointer shadow-sm"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-[54px] h-[54px] sm:w-[62px] sm:h-[62px] rounded-full bg-[#1a73e8] flex items-center justify-center text-white text-[20px] sm:text-[22px] font-extrabold shadow-md flex-none">
              {displayInitial}
            </div>
            <div className="text-left">
              <span className="text-[16px] sm:text-[17px] font-bold block text-[#EDEEF5] capitalize">
                {userEmail ? displayName : 'Nathaniel'}
              </span>
              <span className="text-[12px] text-[#8B90A5]">
                {userEmail || 'nathanielqimadiyi@gmail.com'}
              </span>
            </div>
          </div>
          <span className="text-[26px] sm:text-[28px] text-[#777C90] leading-none">›</span>
        </button>

        {/* Upgrade Button */}
        <button
          onClick={() => onTriggerToast('Upgrade to Unlimited Pass')}
          className="w-full min-h-[56px] sm:h-16 mt-4 sm:mt-5 rounded-[19px] bg-[#9A86EE] hover:bg-[#8B77DF] text-white text-[16.5px] sm:text-[18px] font-extrabold shadow-[0_12px_28px_rgba(139,124,246,0.28)] transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
        >
          Upgrade to Unlimited
        </button>

        {/* Section 1: Account */}
        <div className="mt-8">
          <div className="text-[12px] font-extrabold tracking-[1.8px] text-[#696E83] mx-1 mb-3 uppercase">
            Account
          </div>
          <div className="border border-[#2F3141] bg-[#1D1F2A] rounded-[20px] overflow-hidden divide-y divide-[#2B2D3C]">
            <button
              onClick={() => onTriggerToast('Change Language')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <Globe size={18} />
              </span>
              <span className="flex-1 text-left">Change Language</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>

            <button
              onClick={() => onTriggerToast('Theme selector')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <Moon size={18} />
              </span>
              <span className="flex-1 text-left">Theme</span>
              <span className="text-[14px] text-[#8B90A5] mr-1">System</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>

            <button
              onClick={() => onTriggerToast('Draft Uploads')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <Cloud size={18} />
              </span>
              <span className="flex-1 text-left">Draft Uploads</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>
          </div>
        </div>

        {/* Section 2: Subscription */}
        <div className="mt-8">
          <div className="text-[12px] font-extrabold tracking-[1.8px] text-[#696E83] mx-1 mb-3 uppercase">
            Subscription
          </div>
          <div className="border border-[#2F3141] bg-[#1D1F2A] rounded-[20px] overflow-hidden divide-y divide-[#2B2D3C]">
            <button
              onClick={() => onTriggerToast('Manage Subscription')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <Shield size={18} />
              </span>
              <span className="flex-1 text-left">Manage Subscription</span>
              <span className="px-3 py-1.5 rounded-full bg-[#242633] border border-[#303244] text-[#B7BAC8] text-[11px] font-bold">
                Free Plan
              </span>
            </button>

            <button
              onClick={() => onTriggerToast('Restore Purchases')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <RotateCcw size={18} />
              </span>
              <span className="flex-1 text-left">Restore Purchases</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>
          </div>
        </div>

        {/* Section 3: Support */}
        <div className="mt-8">
          <div className="text-[12px] font-extrabold tracking-[1.8px] text-[#696E83] mx-1 mb-3 uppercase">
            Support
          </div>
          <div className="border border-[#2F3141] bg-[#1D1F2A] rounded-[20px] overflow-hidden divide-y divide-[#2B2D3C]">
            <button
              onClick={() => onTriggerToast('Contact Support')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <MessageCircle size={18} />
              </span>
              <span className="flex-1 text-left">Contact Support</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>

            <button
              onClick={() => onTriggerToast('Opening official website')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <ExternalLink size={18} />
              </span>
              <span className="flex-1 text-left">Go to Website</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>

            <button
              onClick={() => onTriggerToast('Thank you for rating Study App!')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <Star size={18} />
              </span>
              <span className="flex-1 text-left">Rate Us</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>

            <button
              onClick={() => onTriggerToast('Terms of Service')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <FileText size={18} />
              </span>
              <span className="flex-1 text-left">Terms of Service</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>

            <button
              onClick={() => onTriggerToast('Privacy Policy')}
              className="w-full h-[66px] flex items-center gap-4 px-5 text-[#EDEDF2] text-[15.5px] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-6 text-[#B4B8C8] flex justify-center">
                <Lock size={18} />
              </span>
              <span className="flex-1 text-left">Privacy Policy</span>
              <span className="text-[24px] text-[#73788D]">›</span>
            </button>
          </div>
        </div>

        {/* Log Out Button */}
        <button
          onClick={onLogout}
          className="w-full h-16 mt-9 rounded-[19px] bg-[#DF5D4F] hover:bg-[#CF4C3E] text-white text-[18px] font-extrabold shadow-lg transition-all active:scale-[0.98] cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
