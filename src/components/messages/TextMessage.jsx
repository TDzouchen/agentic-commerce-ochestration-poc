export default function TextMessage({ message }) {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-gray-800 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-md">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start mb-4">
      <div className="flex items-center gap-2 mb-2">
        {/* AI avatar placeholder */}
        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src="/images/ai-avatar.png"
            alt="AI"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
        <span className="gradient-text text-sm font-semibold">AI Assistant</span>
      </div>
      <div className="max-w-lg">
        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {message.text}
        </p>
        {message.timestamp && (
          <span className="text-xs text-gray-400 mt-1 block">{message.timestamp}</span>
        )}
      </div>
      {/* Action icons: copy, like, dislike */}
      <div className="flex items-center gap-3 mt-2">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="4" y="1" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2" y="3" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 6V2.5C4 1.67 4.67 1 5.5 1S7 1.67 7 2.5V6h3.5a1 1 0 011 1v.34l-1.5 5A1 1 0 019.04 13H4V6z" stroke="currentColor" strokeWidth="1.2" />
            <rect x="1" y="6" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10 8V11.5c0 .83-.67 1.5-1.5 1.5S7 12.33 7 11.5V8H3.5a1 1 0 01-1-1v-.34l1.5-5A1 1 0 014.96 1H10v7z" stroke="currentColor" strokeWidth="1.2" />
            <rect x="10" y="1" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
