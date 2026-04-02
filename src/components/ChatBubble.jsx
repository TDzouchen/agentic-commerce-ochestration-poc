export default function ChatBubble({ onOpen }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
      style={{ width: '320px' }}
      onClick={onOpen}
    >
      <div className="flex items-center gap-2 mb-3">
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
        <span className="gradient-text text-sm font-medium">AI Assistant</span>
      </div>
      <div className="text-sm text-gray-700 mb-3">
        Hi Alex — how can I help today?
      </div>
      <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5" />
        </svg>
        <span className="text-sm text-gray-400">Ask anything...</span>
      </div>
    </div>
  )
}
