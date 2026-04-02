import { useState } from 'react'

export default function ChatBubble({ onOpen, onSend }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const trimmed = text.trim()
    if (!trimmed) {
      // Empty submit — just open the widget
      onOpen()
      return
    }
    // Open widget and send the message
    onSend(trimmed)
    setText('')
  }

  const handleCardClick = (e) => {
    // Don't open widget if clicking inside the input area
    if (e.target.closest('form')) return
    onOpen()
  }

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
      style={{ width: '320px' }}
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-2 mb-3">
        {/* AI avatar */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <circle cx="12" cy="12" r="12" fill="#BAE0FF"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.49967 7.33325C7.19849 7.33325 5.33301 9.17003 5.33301 11.4358C5.33301 13.7016 7.19849 15.5384 9.49967 15.5384H9.91634V17.9999L13.8449 15.5384H14.4997C16.8009 15.5384 18.6663 13.7016 18.6663 11.4358C18.6663 9.17003 16.8009 7.33325 14.4997 7.33325H9.49967ZM9.08577 10.7091C9.58547 11.939 10.7379 12.7336 12.0208 12.7336C13.2643 12.7336 14.4015 11.973 14.9191 10.7959L13.9397 10.3293C13.5973 11.1085 12.844 11.6121 12.0208 11.6121C11.1714 11.6121 10.4087 11.0861 10.0778 10.2721L9.08577 10.7091Z" fill="#00474F"/>
        </svg>
        <span className="gradient-text text-sm font-medium">AI Assistant</span>
      </div>
      <div className="text-sm text-gray-700 mb-3">
        Hi Alex — how can I help today?
      </div>
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent cursor-text"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L7 13M7 1L2 6M7 1L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
