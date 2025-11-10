// frontend/src/components/Modal.jsx
import { Fragment } from 'react';

export default function Modal({ show, onClose, title, children }) {
  if (!show) {
    return null;
  }

  return (
    //
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} //
    >
      {/*  */}
      <div
        className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl"
        onClick={e => e.stopPropagation()} //
      >
        {/*  */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            {/*  */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/*  */}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}