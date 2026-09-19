import React, { useState } from 'react';
import { X, Check, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface AccountScreenProps {
  onContinueGoogle: (email?: string) => void;
  onContinueApple?: (email?: string) => void;
  onLoginClick: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  onContinueGoogle,
  onContinueApple,
  onLoginClick,
}) => {
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showAppleModal, setShowAppleModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<'nathaniel' | 'custom'>('nathaniel');
  const [customEmail, setCustomEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [appleEmailChoice, setAppleEmailChoice] = useState<'share' | 'hide'>('share');

  const handleCompleteGoogleSignIn = (emailToUse: string) => {
    setIsSigningIn(true);
    setTimeout(() => {
      setIsSigningIn(false);
      setShowGoogleModal(false);
      onContinueGoogle(emailToUse);
    }, 600);
  };

  const handleCompleteAppleSignIn = () => {
    setIsSigningIn(true);
    const chosenEmail = appleEmailChoice === 'share' ? 'nathaniel@icloud.com' : 'privaterelay@appleid.com';
    setTimeout(() => {
      setIsSigningIn(false);
      setShowAppleModal(false);
      if (onContinueApple) {
        onContinueApple(chosenEmail);
      } else {
        onContinueGoogle(chosenEmail);
      }
    }, 600);
  };

  return (
    <div className="max-w-[600px] w-full mx-auto px-4 min-[380px]:px-6 pt-20 sm:pt-24 pb-28 sm:pb-32 min-h-[100dvh] flex flex-col justify-center">
      {/* Visual account panel with atmospheric gradient */}
      <div className="relative rounded-[24px] overflow-hidden min-h-[250px] sm:min-h-[290px] bg-gradient-to-b from-[#3B2854] to-[#241D33] flex items-end shadow-2xl border border-white/5">
        <div className="absolute top-[28px] -right-[25px] w-[130px] h-[45px] bg-[#AA9DBD]/30 rounded-full blur-[2px]" />
        <div className="absolute top-[140px] -left-[30px] w-[130px] h-[45px] bg-[#AA9DBD]/25 rounded-full blur-[2px]" />

        <div className="relative w-full text-center px-6 py-7 sm:py-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9C2DC] text-[12px] font-medium mb-3">
            <Mail size={13} className="text-[#8AB4F8]" />
            <span>Account Setup</span>
          </div>
          <h2 className="text-[24px] sm:text-[26px] font-extrabold tracking-[-0.01em] text-[#F4F5FA]">
            Create Your Account
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-[#C9C2DC] mt-1.5 sm:mt-2 max-w-[380px] mx-auto">
            Connect your account to save notebooks, audio overviews, and study materials.
          </p>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="mt-5 space-y-3">
        {/* Primary Google Login Button */}
        <button
          onClick={() => setShowGoogleModal(true)}
          className="flex items-center justify-center gap-3 w-full min-h-[52px] sm:min-h-[56px] bg-[#26222F] border-[1.5px] border-[#454052] rounded-2xl p-4 text-[15px] sm:text-[15.5px] font-bold text-white transition-all duration-200 active:scale-[0.98] hover:bg-[#2E2937] cursor-pointer shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
            <path
              fill="#4285F4"
              d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.96-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.14-4.06 1.14-3.12 0-5.77-2.11-6.71-4.95H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.63H1.29a11.99 11.99 0 0 0 0 10.74l4-3.09Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44A11.96 11.96 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.63l4 3.09C6.23 6.88 8.88 4.77 12 4.77Z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Sign up with Apple Button */}
        <button
          onClick={() => setShowAppleModal(true)}
          className="flex items-center justify-center gap-3 w-full min-h-[52px] sm:min-h-[56px] bg-white text-black hover:bg-[#f2f2f2] rounded-2xl p-4 text-[15px] sm:text-[15.5px] font-bold transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 170 170" fill="currentColor" className="shrink-0">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.5-7.71-11.45-14.01-6.1-9.76-10.87-20.91-14.34-33.45-3.48-12.54-5.22-24.32-5.22-35.34 0-16.52 4.13-29.89 12.38-40.11 8.26-10.22 18.7-15.44 31.33-15.66 4.95 0 10.43 1.25 16.44 3.75 6.02 2.51 9.94 3.75 11.77 3.75 1.52 0 5.48-1.29 11.89-3.87 6.41-2.58 11.84-3.75 16.29-3.51 12.16.65 22.06 5.38 29.7 14.19-10.66 6.42-15.88 15.34-15.66 26.77.22 8.92 3.64 16.52 10.27 22.78 6.63 6.26 14.34 9.78 23.13 10.57-2.39 7.18-5.54 15.22-9.45 24.13zM119.22 31.84c0-7.39 2.66-14.35 7.98-20.87 5.33-6.52 11.96-10.43 19.89-11.74.22 1.09.33 2.18.33 3.26 0 7.39-2.83 14.45-8.49 21.19-5.65 6.74-12.39 10.43-20.21 11.08-.22-.98-.33-1.96-.33-2.92z" />
          </svg>
          <span>Sign up with Apple</span>
        </button>
      </div>

      {/* Alternative direct login option */}
      <button
        onClick={() => {
          setShowGoogleModal(true);
        }}
        className="min-h-[44px] flex items-center justify-center mx-auto mt-3 text-[13px] text-[#8B90A5] hover:text-[#C9C2DC] transition-colors cursor-pointer"
      >
        Already have an account? Log in
      </button>

      {/* ---------------- GOOGLE SIGN IN MODAL ---------------- */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-[420px] bg-[#202124] text-[#e8eaed] rounded-[24px] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-7">
            {/* Close button */}
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-[#9aa0a6] hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Google Logo */}
            <div className="flex flex-col items-center text-center mt-1">
              <svg width="34" height="34" viewBox="0 0 24 24" className="mb-3">
                <path
                  fill="#4285F4"
                  d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.96-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.14-4.06 1.14-3.12 0-5.77-2.11-6.71-4.95H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.63H1.29a11.99 11.99 0 0 0 0 10.74l4-3.09Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44A11.96 11.96 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.63l4 3.09C6.23 6.88 8.88 4.77 12 4.77Z"
                />
              </svg>
              <h3 className="text-[20px] font-medium text-[#e8eaed]">Sign in with Google</h3>
              <p className="text-[13px] text-[#9aa0a6] mt-1">
                Choose an account to continue to NotebookLM
              </p>
            </div>

            {/* Account Selection Options */}
            <div className="mt-6 space-y-2">
              {/* Primary Account Tile */}
              <button
                type="button"
                onClick={() => setSelectedAccount('nathaniel')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer text-left ${
                  selectedAccount === 'nathaniel'
                    ? 'border-[#8ab4f8] bg-[#8ab4f8]/10'
                    : 'border-white/10 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-[15px] shrink-0">
                    N
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-[#e8eaed] truncate">Nathaniel Qimadiyi</div>
                    <div className="text-[12px] text-[#9aa0a6] truncate">nathanielqimadiyi@gmail.com</div>
                  </div>
                </div>
                {selectedAccount === 'nathaniel' && (
                  <div className="w-5 h-5 rounded-full bg-[#8ab4f8] text-[#202124] flex items-center justify-center shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                )}
              </button>

              {/* Custom Gmail Tile */}
              <button
                type="button"
                onClick={() => setSelectedAccount('custom')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer text-left ${
                  selectedAccount === 'custom'
                    ? 'border-[#8ab4f8] bg-[#8ab4f8]/10'
                    : 'border-white/10 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#3c4043] text-[#e8eaed] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-[#e8eaed]">Use another account</div>
                    <div className="text-[12px] text-[#9aa0a6]">Sign in with any @gmail.com</div>
                  </div>
                </div>
                {selectedAccount === 'custom' && (
                  <div className="w-5 h-5 rounded-full bg-[#8ab4f8] text-[#202124] flex items-center justify-center shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                )}
              </button>
            </div>

            {/* Custom Email Input Field if selected */}
            {selectedAccount === 'custom' && (
              <div className="mt-3">
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="Enter email or phone"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#131314] border border-white/20 text-[14px] text-white placeholder:text-[#80868b] outline-none focus:border-[#8ab4f8] transition"
                  autoFocus
                />
              </div>
            )}

            {/* Disclosures */}
            <div className="mt-5 flex items-start gap-2 text-[11.5px] text-[#9aa0a6] leading-relaxed">
              <ShieldCheck size={16} className="text-[#8ab4f8] shrink-0 mt-0.5" />
              <span>To continue, Google will share your name, email address, and profile picture with NotebookLM.</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="px-4 py-2 text-[13.5px] text-[#9aa0a6] hover:text-white rounded-full transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSigningIn || (selectedAccount === 'custom' && !customEmail.trim())}
                onClick={() => {
                  const finalEmail =
                    selectedAccount === 'nathaniel'
                      ? 'nathanielqimadiyi@gmail.com'
                      : customEmail.trim();
                  handleCompleteGoogleSignIn(finalEmail);
                }}
                className="px-5 py-2.5 rounded-full bg-[#8ab4f8] hover:bg-[#a8c7fa] text-[#202124] text-[13.5px] font-semibold flex items-center gap-2 transition active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSigningIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#202124] border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ---------------- APPLE SIGN IN MODAL ---------------- */}
      {showAppleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-[420px] bg-[#1C1C1E] text-white rounded-[24px] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-7">
            {/* Close button */}
            <button
              onClick={() => setShowAppleModal(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Apple Logo */}
            <div className="flex flex-col items-center text-center mt-1">
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mb-3 shadow-md">
                <svg width="24" height="24" viewBox="0 0 170 170" fill="currentColor">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.5-7.71-11.45-14.01-6.1-9.76-10.87-20.91-14.34-33.45-3.48-12.54-5.22-24.32-5.22-35.34 0-16.52 4.13-29.89 12.38-40.11 8.26-10.22 18.7-15.44 31.33-15.66 4.95 0 10.43 1.25 16.44 3.75 6.02 2.51 9.94 3.75 11.77 3.75 1.52 0 5.48-1.29 11.89-3.87 6.41-2.58 11.84-3.75 16.29-3.51 12.16.65 22.06 5.38 29.7 14.19-10.66 6.42-15.88 15.34-15.66 26.77.22 8.92 3.64 16.52 10.27 22.78 6.63 6.26 14.34 9.78 23.13 10.57-2.39 7.18-5.54 15.22-9.45 24.13zM119.22 31.84c0-7.39 2.66-14.35 7.98-20.87 5.33-6.52 11.96-10.43 19.89-11.74.22 1.09.33 2.18.33 3.26 0 7.39-2.83 14.45-8.49 21.19-5.65 6.74-12.39 10.43-20.21 11.08-.22-.98-.33-1.96-.33-2.92z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-white">Sign up with Apple</h3>
              <p className="text-[13px] text-[#A1A1A6] mt-1">
                Use your Apple ID to create an account for NotebookLM
              </p>
            </div>

            {/* Apple User Info Card */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#2C2C2E] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[15px] shrink-0">
                N
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-white truncate">Nathaniel Qimadiyi</div>
                <div className="text-[12px] text-[#A1A1A6] truncate">Apple ID Account</div>
              </div>
            </div>

            {/* Privacy / Hide My Email options */}
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setAppleEmailChoice('share')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer text-left ${
                  appleEmailChoice === 'share'
                    ? 'border-[#0A84FF] bg-[#0A84FF]/15'
                    : 'border-white/10 bg-[#2C2C2E]/60 hover:bg-[#2C2C2E]'
                }`}
              >
                <div>
                  <div className="text-[13.5px] font-medium text-white">Share My Email</div>
                  <div className="text-[11.5px] text-[#A1A1A6]">nathaniel@icloud.com</div>
                </div>
                {appleEmailChoice === 'share' && (
                  <div className="w-5 h-5 rounded-full bg-[#0A84FF] text-white flex items-center justify-center shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setAppleEmailChoice('hide')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer text-left ${
                  appleEmailChoice === 'hide'
                    ? 'border-[#0A84FF] bg-[#0A84FF]/15'
                    : 'border-white/10 bg-[#2C2C2E]/60 hover:bg-[#2C2C2E]'
                }`}
              >
                <div>
                  <div className="text-[13.5px] font-medium text-white">Hide My Email</div>
                  <div className="text-[11.5px] text-[#A1A1A6]">Create unique private relay address</div>
                </div>
                {appleEmailChoice === 'hide' && (
                  <div className="w-5 h-5 rounded-full bg-[#0A84FF] text-white flex items-center justify-center shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                )}
              </button>
            </div>

            {/* Apple Privacy Notice */}
            <div className="mt-4 flex items-start gap-2 text-[11px] text-[#8E8E93] leading-relaxed">
              <ShieldCheck size={15} className="text-[#0A84FF] shrink-0 mt-0.5" />
              <span>Apple will forward developer communications to your personal email while keeping your true address private if chosen.</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAppleModal(false)}
                className="px-4 py-2 text-[13.5px] text-[#8E8E93] hover:text-white rounded-full transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSigningIn}
                onClick={handleCompleteAppleSignIn}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-[13.5px] font-semibold flex items-center gap-2 transition active:scale-95 disabled:opacity-50 cursor-pointer shadow"
              >
                {isSigningIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Continue with Apple</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

