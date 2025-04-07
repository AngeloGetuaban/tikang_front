import React from 'react';
import { X } from 'lucide-react';

export default function WarningPopup({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md flex items-start space-x-3 animate-fade-in">
      <div className="flex-1">
        <p className="font-semibold">Warning</p>
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClose}>
        <X size={18} className="text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
}
