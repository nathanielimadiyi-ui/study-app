import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed left-1/2 bottom-24 -translate-x-1/2 z-50 bg-[#262838] border border-[#34364B] text-white text-[13px] font-medium px-5 py-2.5 rounded-full shadow-2xl transition-all duration-200 pointer-events-none max-w-[85%] text-center"
    >
      {message}
    </div>
  );
};
