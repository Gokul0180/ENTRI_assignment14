import React from 'react'

export default function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-4 w-full max-w-xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
