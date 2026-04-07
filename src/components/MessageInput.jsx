import { useState } from 'react'

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4">
        <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 px-4 py-3 shadow-[0px_2px_4px_-1px_rgba(7,16,32,0.06),0px_4px_8px_0px_rgba(7,16,32,0.08)]">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything..."
          disabled={disabled}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.58105 14.4563V0.956299M6.58105 0.956299L0.956055 6.5813M6.58105 0.956299L12.2061 6.5813"
              stroke="currentColor"
              strokeOpacity="1"
              strokeWidth="1.9125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
